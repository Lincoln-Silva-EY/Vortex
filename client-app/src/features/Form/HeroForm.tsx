import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Segment, Button, Header } from "semantic-ui-react";
import { alignmentOptions, genderOptions, raceOptions, universeOptions } from "../../app/common/optionsSelect/options";
import { useStore } from "../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import MyTextInput from "../../app/common/inputs/MyTextInput";
import MySelectInput from "../../app/common/inputs/MySelectInput";
import { Hero } from "../../model/hero";
import * as Yup from 'yup';
import MyTextArea from "../../app/common/inputs/MyTextAreaInput";

export default observer(function HeroForm() {
    const history = useHistory();
    const { heroStore } = useStore();
    const { createHero, updateHero, loadHero } = heroStore;
    const { id } = useParams<{ id: string }>();

    const [hero, setHero] = useState({
        id: '',
        name: '',
        race: '',
        universe: '',
        gender: '',
        alignment: '',
        history: '',
        powers: '',
        placeBirth: '',
        creationDate: ''
    })

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        race: Yup.string().required('Race is required'),
        universe: Yup.string().required('Universe is required'),
        gender: Yup.string().required('Gender is required'),
        alignment: Yup.string().required('Alignment is required'),
        history: Yup.string().required('History is required'),
        powers: Yup.string().required('Powers is required'),
        placeBirth: Yup.string().required('PlaceBirth is required'),
        creationDate: Yup.string().required('CreationDate is required'),
    })
    
    useEffect(() => {
        if (id) loadHero(id).then(hero => setHero(hero!))
    }, [id, loadHero]);

    function handleSubmit(hero: Hero) {
        if (hero.id.length === 0) {
            let newHero = {
                ...hero,
                id: uuid()
            };
            createHero(newHero).then(() => history.push(`/heroes/${newHero.id}`))
        } else {
            updateHero(hero).then(() => history.push(`/heroes/${hero.id}`))
        }
    }

    return (
        <Segment clearing style={{ margin: '3em' }}>
            <Header style={{ margin: '1em' }} content='Heroes Details' sub color="blue" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={hero}
                onSubmit={values => handleSubmit(values)}
            >
                {({ handleSubmit, isValid, dirty, isSubmitting }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Name' name='name' />
                        <MySelectInput placeholder="Gender" name="gender" options={genderOptions} />
                        <MySelectInput placeholder="Race" name="race" options={raceOptions} />
                        <MySelectInput placeholder="Alignment" name="alignment" options={alignmentOptions} />
                        <MySelectInput placeholder="Universe" name="universe" options={universeOptions} />
                        <MyTextInput placeholder="Place of Birth" name="placeBirth" />
                        <MyTextInput type="date" placeholder="Creation Date" name="creationDate" />
                        <MyTextArea placeholder='History' name='history' rows={3} />
                        <MyTextArea placeholder='Powers' name='powers' rows={3} />
                        <Button
                            disabled={isSubmitting || !dirty|| !isValid}
                            loading={isSubmitting}
                            circular
                            floated="right"
                            type="submit"
                            content='Submit'
                            color="green" />
                        <Button as={Link} to={'/'} circular floated="right" type="button" content='Cancel' color="red" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
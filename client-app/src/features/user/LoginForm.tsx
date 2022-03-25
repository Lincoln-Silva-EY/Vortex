import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Form, Header, Image, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/inputs/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <Segment style={{ width: '50vw' }}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => userStore.login(values)}
                >
                    {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete='off' style={{ justifyContent: 'center' }}>
                            <Header as='h3' color="black" textAlign="center">
                                <Image src='/assets/logo.png' alt='logo'
                                    style={{ marginBottom: '2vh', width: '100px', height: "100px", marginTop: '2vh' }} />
                                <br />
                                Login in Vortex
                            </Header>
                            <Header align='center'>
                                <div style={{width: '35vw'}}><MyTextInput placeholder="Email" name="email" /></div>
                                <div style={{width: '35vw'}}><MyTextInput placeholder="Password" name="password" type="password" /></div>
                            </Header>
                            <Header align='center'>
                                <Button
                                    style={{ marginTop: '3vh', width: '35vw' }}
                                    loading={isSubmitting}
                                    positive
                                    disabled={isSubmitting || !isValid || !dirty}
                                    content='Login'
                                    type="submit"
                                    color="blue"
                                    size="large"
                                    fluid />

                                <Button
                                    as={Link} to='/register'
                                    style={{ marginTop: '2vh', marginBottom: '2vh', width: '12vw' }}
                                    content='Register'
                                    size="large" />
                            </Header>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </div>
    )
})
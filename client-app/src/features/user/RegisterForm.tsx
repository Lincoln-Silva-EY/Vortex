import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Segment, Form, Header, Button, Image } from "semantic-ui-react";
import MyTextInput from "../../app/common/inputs/MyTextInput";
import { useStore } from "../../app/stores/store";

export default function RegisterForm() {
    const { userStore } = useStore();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <Segment style={{ width: '50vw' }}>
                <Formik
                    initialValues={{ displaName: '', username: '', email: '', password: '' }}
                    onSubmit={(values) => userStore.register(values)}
                >
                    {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete='off' style={{ justifyContent: 'center' }}>
                            <Header as='h3' color="black" textAlign="center">
                                <Image src='/assets/logo.png' alt='logo'
                                    style={{ marginBottom: '2vh', width: '100px', height: "100px", marginTop: '2vh' }} />
                                <br />
                                Register in Vortex
                            </Header>
                            <Header align='center'>
                                <div style={{ width: '35vw' }}><MyTextInput placeholder="Username" name="username" /></div>
                                <div style={{ width: '35vw' }}><MyTextInput placeholder="Display Name" name="displayName" /></div>
                                <div style={{ width: '35vw' }}><MyTextInput placeholder="Email" name="email" /></div>
                                <div style={{ width: '35vw' }}><MyTextInput placeholder="Password" name="password" type="password" /></div>
                            </Header>
                            <Header align='center'>
                                <Button
                                    style={{ marginTop: '3vh', width: '35vw' }}
                                    loading={isSubmitting}
                                    positive
                                    disabled={isSubmitting || !isValid || !dirty}
                                    content='Register'
                                    type="submit"
                                    size="large"
                                    fluid />

                                <Button
                                    as={Link} to='/login'
                                    style={{ marginTop: '2vh', marginBottom: '2vh', width: '12vw' }}
                                    content='Login'
                                    size="large" />
                            </Header>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </div>
    )
}
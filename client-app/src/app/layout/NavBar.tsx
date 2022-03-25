import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();
    const { userStore } = useStore();
    return (
        <Menu fixed="top" inverted style={{ backgroundColor: '#29ABE2', height: '10vh' }}>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img style={{height:'5em', width:'5em'}} src='/assets/logo.png' alt="logo" /> <b style={{marginLeft:'0.8em', fontSize:'1.5em'}}>Vortex</b>
                </Menu.Item>
                <Menu.Item position="right">

                    {userStore.isLoggedIn ? (
                        <>
                            <Button
                                as={NavLink} to='/createHero'
                                content="Create"
                                style={{ marginRight: "1vw" }} positive color='green'
                            />
                            <Button onClick={logout} inverted content="Logout" style={{ marginRight: "1vw" }} />
                            Welcome {user?.displayName}
                        </>
                    ) : (
                        <>
                            <Button as={Link} to='/login' inverted content="Login" style={{ marginRight: "1vw" }} />
                            <Button as={Link} to='/register' inverted content="Register" style={{ marginRight: "1vw" }} />
                        </>
                    )}


                </Menu.Item>
            </Container>
        </Menu>
    )
})
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Divider, Grid, Header, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function HeroDetalis() {
    const { heroStore } = useStore();
    const { selectedHero: hero, loadHero, loadingInitial } = heroStore;
    const { id } = useParams<{ id: string }>();
    const { userStore } = useStore();
    useEffect(() => {
        if (id) loadHero(id);
    }, [id, loadHero])

    if (loadingInitial || !hero) return <LoadingComponent />;

    return (

        <Grid>
            <Grid.Column width={16}>
                <>
                    <Segment style={{ margin: '3em', padding: '3em' }} >
                        <Grid style={{ width: '79vw' }}>
                            <Grid.Column>
                                <Item.Group>
                                    <Item>
                                        <Item.Image avatar size="small" src={'/assets/hero.png'} />
                                        <Item.Content verticalAlign="middle" >
                                            <Header as='h1' content={hero.name} />
                                            <Divider style={{ width: '10vw' }} />
                                            <Header as='h3'>
                                                {hero.universe}
                                            </Header>
                                        </Item.Content>
                                        <Item.Content>
                                        {userStore.isLoggedIn ? (
                                                <>

                                                    <Button.Group>
                                                        <Button style={{ width: '12em' }} as={Link} to={`/manage/${hero.id}`} color='blue' content='Edit' />
                                                        <Button style={{ width: '12em' }} as={Link} to={'/'} color='red' content='Cancel' />
                                                    </Button.Group>

                                                </>
                                            ) : (
                                                <Button style={{ width: '12em' }} as={Link} to={'/'} color='red' content='Cancel' />
                                            )}
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </>
                <Segment style={{ margin: '3em', padding: '3em' }}>
                    <Grid>
                        <Grid.Row>
                            <Item>
                                <Item.Content verticalAlign="middle">
                                    <Header icon='magic' content={`${hero.name}'s Powers`} />
                                </Item.Content>
                            </Item>
                            </Grid.Row>
                            <Grid.Row>
                            <Item style={{ marginTop: '1em' }}>
                                <Item.Content verticalAlign="middle">
                                    <span style={{ whiteSpace: 'pre-wrap' }}>{hero.powers}</span>
                                </Item.Content>
                            </Item>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Grid.Column>
        </Grid>
    )
})

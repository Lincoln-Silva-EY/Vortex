import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, Header, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function HeroList() {
    {
        const { heroStore } = useStore();
        const { loading, heroSort, groupedHeroes } = heroStore;

        return (
            <>
                {groupedHeroes.map(([group, heroes]) => (
                    <Fragment key={group}>
                        <Header style={{marginLeft: '3em', marginBottom: '2em'}}  sub color="blue">
                            {group}
                        </Header>
                        <Card.Group style={{ width: '90vw' }}>
                            {heroes.map(hero => (
                                <Card
                                    key={hero.id}
                                    style={{ width: '13vw', height: '40vh', marginLeft: '3em' }}
                                    as={Link} to={`/heroes/${hero.id}`}
                                >
                                    <Image style={{ height: '25vh' }} src={'assets/hero.png'} />
                                    <Card.Content>
                                        <Card.Header style={{ fontSize: '1.1em' }}>{hero.name}</Card.Header>
                                        <Card.Description style={{ fontSize: '0.9em' }}>{hero.race}</Card.Description>
                                        <Card.Description style={{ fontSize: '0.8em' }}>{hero.gender}</Card.Description>
                                        <Card.Description style={{ fontSize: '0.8em' }}>{hero.alignment}</Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </Fragment>
                ))}
            </>

        )
    }
})
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import HeroList from "./HeroList";

export default observer(function HeroDashboard() {
    const { heroStore } = useStore();
    const { loadHeroes, heroRegistry} = heroStore;

    useEffect(() => {
        if(heroRegistry.size <= 1)heroStore.loadHeroes();
    }, [heroStore])

    return (
        <Grid>
            <Grid.Column width='10'>
                <HeroList />
            </Grid.Column>
        </Grid>
    )
})
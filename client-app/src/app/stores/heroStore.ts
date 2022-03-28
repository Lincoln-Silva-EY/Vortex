import { makeAutoObservable, runInAction } from "mobx";
import { Hero } from "../../model/hero";
import agent from "../api/agent";

export default class HeroStore {
    heroRegistry = new Map<string, Hero>();
    selectedHero: Hero | any;
    editMode = false;
    loading = false;
    loadingInitial = false;
    activeTab = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get heroSort() {
        return Array.from(this.heroRegistry.values()).sort();
    }

    get groupedHeroes() {
        return Object.entries(
            this.heroSort.reduce((heroes, hero) => {
                const universe = hero.universe;
                heroes[universe] = heroes[universe] ? [...heroes[universe], hero] : [hero];
                return heroes
            }, {} as { [key: string]: Hero[] })
        )
    }

    loadHeroes = async () => {
        this.loadingInitial = true;
        try {
            const heroes = await agent.Heroes.list();
            heroes.sort();
            runInAction(() => {
                heroes.forEach(hero => {
                    this.setHero(hero);
                })
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    loadHero = async (id: string) => {
        let hero = this.getHero(id);
        if (hero) {
            this.selectedHero = hero;
            return hero;
        } else {
            this.loadingInitial = true;
            try {
                hero = await agent.Heroes.details(id);
                this.setHero(hero);
                this.selectedHero = hero;
                this.setLoadingInitial(false);
                return hero;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private setHero = (hero: Hero) => {
        this.heroRegistry.set(hero.id, hero);
    }

    private getHero = (id: string) => {
        return this.heroRegistry.get(id);
    }

    createHero = async (hero: Hero) => {
        this.loading = true;
        try {
            await agent.Heroes.create(hero);
            runInAction(() => {
                this.heroRegistry.set(hero.id, hero);
                this.selectedHero = hero;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateHero = async (hero: Hero) => {
        this.loading = true;
        try {
            await agent.Heroes.update(hero);
            runInAction(() => {
                this.heroRegistry.set(hero.id, hero);
                this.selectedHero = hero;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteHero = async (id: string) => {
        this.loading = true;
        try {
            await agent.Heroes.delete(id);
            runInAction(() => {
                this.heroRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
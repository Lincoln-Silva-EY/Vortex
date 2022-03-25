import { createContext, useContext } from "react";
import HeroStore from "./heroStore";
import CommomStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store {
    heroStore: HeroStore;
    commonStore: CommomStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    heroStore: new HeroStore(),
    commonStore: new CommomStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
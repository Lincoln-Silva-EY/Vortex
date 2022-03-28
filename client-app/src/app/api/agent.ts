import axios, { AxiosResponse } from 'axios';
import { Hero } from '../../model/hero';
import { User, UserFormValues } from '../../model/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:8000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Barrer ${token}`
    return config;
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Heroes = {
    list: () => requests.get<Hero[]>('/heroes'),
    details: (id: string) => requests.get<Hero>(`/heroes/${id}`),
    create: (hero: Hero) => requests.post('/heroes', hero),
    update: (hero: Hero) => requests.put<void>(`/heroes/${hero.id}`, hero),
    delete: (id: string) => requests.del<void>(`/heroes/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Heroes,
    Account
}

export default agent;
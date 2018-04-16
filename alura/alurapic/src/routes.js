import Home from './components/home/Home.vue';
import Cadastro from './components/cadastro/Cadastro.vue';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        titulo: 'Home',
        menu: true
    },
    {
        name: 'cadastro',
        path: '/cadastro',
        component: Cadastro,
        titulo: 'Cadastro',
        menu: true
    },
    {
        name: 'altera',
        path: '/cadastro/:id',
        component: Cadastro
    },
    {
        path: '*',
        component: Home,
        menu: false
    }
];
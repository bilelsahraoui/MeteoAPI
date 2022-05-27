import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/',
        component: DefaultLayout,
        children: [
            {path: '/', name: 'Accueil', component: Home},
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
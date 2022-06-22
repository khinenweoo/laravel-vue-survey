import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/Surveys.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Layout from "../components/Layout.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/dashboard',
        component: Layout,
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/surveys', name: 'Surveys', component: Surveys}
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
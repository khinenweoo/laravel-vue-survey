import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/Dashboard.vue'
import Surveys from '../views/Surveys.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Layout from "../components/Layout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/dashboard',
        component: Layout,
        meta: {requiresAuth: true},
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/surveys', name: 'Surveys', component: Surveys}
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {path: '/login', name: 'Login', component: Login},
            {path: '/register', name: 'Register', component: Register},
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Login'})
    }else if(store.state.user.token && (to.meta.isGuest)) {
        //if user is authorized and try to access login, we need to prevent this and redirect to dashboard
        // if user has token and the route trying to access is Login or Register, redirect to dashboard
        next({name: 'Dashboard'});
    } else {
        // Otherwise let the user go on the page she was trying to access
        next()
    }
})

export default router;
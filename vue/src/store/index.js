import { data } from "autoprefixer";
import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
    },
    getters: {},
    actions: {
        register({commit}, user) {
          return axiosClient.post('/register', user)
            .then(({data}) => {
                commit('setUser', data);
                return data;
            })
        },
        login({commit}, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
    },
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
        },
        setUser: (state, userData) => {
            //to save the received user token in data inside the state
            state.user.token = userData.token;
            //save user data
            state.user.data = userData.user;
            //save this token in a session storage as well
            // becoz user need to be available and need to stay on the dashboard
            sessionStorage.setItem('TOKEN', userData.token);
            
        }
    },
    modules: {}
})

export default store;
import axios from "axios";
import store from "./store";

//create axios client and pass in the url which will be laravel api
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

// store basically include authorization token so we will need

axiosClient.interceptors.request.use(config => {
    //inject authoriztion header here
    // every request axios will make it's gonna pass that authorization token
    config.headers.Authorization = `Bearer ${store.state.user.token}`

    return config;
})

export default axiosClient;
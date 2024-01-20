import axios from "axios";

let betSoccerHttp = axios.create({
    baseURL : 'https://fast.besoccer.com',
});

betSoccerHttp.interceptors.request.use(
    (config) => {
        return config
    }
)

betSoccerHttp.interceptors.response.use(
    (response) => {
        return response
    }
)

export default betSoccerHttp
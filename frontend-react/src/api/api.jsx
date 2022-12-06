import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.response.use(
    function(response){
        return response;
    },
    function(error){
        if(error.response.status === 401 || error.response.status === 403){
            localStorage.removeItem('Authorization');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
import axios from 'axios';


const tokenService = {

    getTokens: async (request) => {
        try {
            const resp = await axios.get('http://localhost:8080/api/login', request);
            localStorage.setItem('access_token', 'Bearer ' + resp.data.access_token);
            localStorage.setItem('refresh_token', 'Bearer ' + resp.data.refresh_token);
            console.log(localStorage.getItem('access_token'));
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    },

    refreshToken: async () => {
        try {
            console.log('refresh');
            const resp = await axios.get('http://localhost:8080/api/token/refresh',{
            headers: {
                'authorization': localStorage.getItem('refresh_token')
                }
            });
            localStorage.setItem('access_token', 'Bearer ' + resp.data.access_token);
            localStorage.setItem('refresh_token', 'Bearer ' + resp.data.refresh_token);
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}

export default tokenService;
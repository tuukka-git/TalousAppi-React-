import axios from 'axios';

const userInfoService = {
    
    getYears: async () => {
            
        try {
            const resp = await axios.get("http://127.0.0.1:8080/api/years", {
                headers: {
                    'authorization': localStorage.getItem('access_token')
                    }
            });
            return resp.data;
        } catch(err) {
            console.log(err);
            return [];
        }
    },

    getMonths: async (year) => {
        try {
            const resp = await axios.get("http://127.0.0.1:8080/api/months/" + year,  {
                headers: {
                    'authorization': localStorage.getItem('access_token')
                    }
            });
            return resp.data;
        } catch(err) {
            console.log(err);
            return [];
        }
    },

    getMonthData: async (year, month) => {
        try {
            const resp = await axios.get("http://127.0.0.1:8080/api/monthdata/" + year + '/' + month,  {
                headers: {
                    'authorization': localStorage.getItem('access_token')
                    }
            });
            return resp.data;
        } catch(err) {
            console.log(err);
            return [];
        }
    }

}





export default userInfoService;
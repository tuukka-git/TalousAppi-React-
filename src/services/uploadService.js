import jwtDecode from 'jwt-decode';
import axios from 'axios';


const uploadService = {
    
    uploadCSV: async (file) => {

        const formData = new FormData();
        formData.append("file", file);
            
        try {
            const resp = await axios.post("http:///127.0.0.1:8080/api/uploadcsv", formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': localStorage.getItem('access_token')
                }
            });
            console.log(resp)
            return resp;
        } catch(err) {
            console.log(err);
        }
       
    },

    uploadTags: async (tags) => {
        try {
        const resp = await axios.post("http://127.0.0.1:8080/api/tags",  tags, {
            headers: {
            'authorization': localStorage.getItem('access_token')
            }
        });   
        return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    },

    uploadTransactions: async (t=[]) => {
        try {
        const formData = new FormData();
        for(var i = 0; i < t.length; i++) {
            formData.append(JSON.stringify(i), JSON.stringify(t[i]));
        } 
        const resp = await axios.post("http://127.0.0.1:8080/api/transactions", formData, {
            headers: {
            'authorization': localStorage.getItem('access_token')
            }
        });
        return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

}





export default uploadService;
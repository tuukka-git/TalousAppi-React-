import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import tokenService from "../services/tokenService";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        var request = {
            params: params
        };
        if(await tokenService.getTokens(request)) {
            setAuth(true);
        }
    }
    return(
        <>
        {!auth
        ?
        <div class="col-md-4 offset-md-4 ">
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" id="username" value={username}
                    onChange={e => setUsername(e.currentTarget.value)}/>
                </div>
                <div class="form-group">
                    <label  for="password">Password:</label>
                    <input type="password" class="form-control" id="password" value={password}
                    onChange={e => setPassword(e.currentTarget.value)}/>
                </div>
                <div class="text-center p-2">
                    <input type="submit" class="btn btn-primary" value="Submit" />
                </div>
            </form>
        </div>
        :
        <Redirect to='/mainpage'/>
        }
        </>
    );
}

export default Login;
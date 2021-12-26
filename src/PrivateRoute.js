import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import tokenService from './services/tokenService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  useEffect(() => {
    let token = localStorage.getItem('access_token')
    let rtoken = localStorage.getItem('refresh_token')
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();
            if(tokenExpiration > dateNow.getTime()/1000){
                setIsAuthenticated(true);
            }else{
                let tokenExpiration = jwtDecode(rtoken).exp;
                if(tokenExpiration > dateNow.getTime()/1000) {
                  tokenService.refreshToken();
                  setIsAuthenticated(true);
                } else {
                  setIsAuthenticated(false);
                }
            }
        } else {
           setIsAuthenticated(false)
        }
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;
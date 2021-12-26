import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import UploadPage from './components/UploadPage';
import Mainpage from './components/Mainpage';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/' component={Mainpage} />
        <PrivateRoute exact path='/mainpage' component={Mainpage}/>
        <PrivateRoute exact path='/upload' component={UploadPage} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;

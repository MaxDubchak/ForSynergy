import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginForm from './loginTab/login_form'
import MainPage from './usersPage/users_page'

export const isAuthenticated = function() {
    return document.cookie.indexOf('sessionid') !== -1;
};


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}


export default class MainRouter extends React.Component {
    render(){
        return (
            <main>
                <Switch>
                    <Route path="/home" component={LoginForm}/>
                    <PrivateRoute path="/users" component={MainPage}/>
                    <Redirect path="*" to="/home"/>
                </Switch>
            </main>
        )
    }
}

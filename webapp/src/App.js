import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-auth" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends Component {
  render() {
    const { loginUser } = this.props;
    return (
      <div className="h-100">
        <>
          <NotificationContainer />
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <AuthRoute
                  path="/app"
                  authUser={loginUser}
                  component={ViewApp}
                />
                <Route
                  path="/user"
                  render={(props) => <ViewUser {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/"
                  exact
                  render={(props) => <ViewMain {...props} />}
                />
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user: loginUser } = authUser;
  return { loginUser };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);

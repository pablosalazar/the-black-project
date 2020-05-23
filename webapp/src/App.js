import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-auth" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const App = () => {
  return (
    <div className="h-100">
      <React.Fragment>
        <NotificationContainer />
        <Suspense fallback={<div className="loading" />}>
          <Router basename="/">
            <Switch>
              {/* <AuthRoute path="/app" authUser={loginUser} component={ViewApp} /> */}
              <Route path="/user" render={(props) => <ViewUser {...props} />} />
              {/* <Route
                path="/error"
                exact
                render={(props) => <ViewError {...props} />}
              />
              <Route
                path="/"
                exact
                render={(props) => <ViewMain {...props} />}
              />*/}
              <Route
                path="/error"
                exact
                render={(props) => <ViewError {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Router>
        </Suspense>
      </React.Fragment>
    </div>
  );
};

export default App;

import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Parking = React.lazy(() => import('./parking'));
const Customers = React.lazy(() => import('./customers'));
const Vehicles = React.lazy(() => import('./vehicles'));
const Employees = React.lazy(() => import('./employees'));

const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/servicios-de-parqueo`}
              />
              <Route
                path={`${match.url}/servicios-de-parqueo`}
                render={(props) => <Parking {...props} />}
              />
              <Route
                path={`${match.url}/clientes`}
                render={(props) => <Customers {...props} />}
              />
              <Route
                path={`${match.url}/vehiculos`}
                render={(props) => <Vehicles {...props} />}
              />
              <Route
                path={`${match.url}/empleados`}
                render={(props) => <Employees {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));

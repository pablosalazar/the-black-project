import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const EmployeesList = React.lazy(() => import('./EmployeesList.js'));

const Employee = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/lista`} />
      <Route
        path={`${match.url}/lista`}
        render={(props) => <EmployeesList {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Employee;
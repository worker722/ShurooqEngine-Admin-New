import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const AddUsers = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/list`} component={lazy(() => import(`./userList`))} />
      <Route path={`${match.url}/new`} component={lazy(() => import(`./userCreate`))} />
      <Route path={`${match.url}/:id`} component={lazy(() => import(`./userCreate`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/list`} />
    </Switch>
  </Suspense>
);

export default AddUsers;
import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import UserCreate from "./userCreate";
import UserList from "./userList";

const AddUsers = props => {
  const { match } = props
  return (
    <Suspense>
      <Switch>
        <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
        <Route path={`${match.url}/list`} component={UserList} />
        <Route path={`${match.url}/new`} component={UserCreate} />
        <Route path={`${match.url}/:id`} component={UserCreate} />
      </Switch>
    </Suspense>
  )
};

export default AddUsers;
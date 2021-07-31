import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboards`} component={lazy(() => import(`./dashboards`))} />
        <Route path={`${APP_PREFIX_PATH}/add-user`} component={lazy(() => import(`./addUsers`))} />
        <Route path={`${APP_PREFIX_PATH}/activities`} component={lazy(() => import(`./activities`))} />
        <Route path={`${APP_PREFIX_PATH}/vendors`} component={lazy(() => import(`./vendors`))} />
        <Route path={`${APP_PREFIX_PATH}/vendor-meals`} component={lazy(() => import(`./vendorMeals`))} />
        <Route path={`${APP_PREFIX_PATH}/vendor-transports`} component={lazy(() => import(`./vendorTransports`))} />
        <Route path={`${APP_PREFIX_PATH}/vendor-amenities`} component={lazy(() => import(`./vendorAmenities`))} />
        
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboards`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);

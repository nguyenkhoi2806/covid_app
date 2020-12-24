import React, { PureComponent } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import RouteData from "./routesData";

import LayoutMain from "../hoc/layouts/main";

import { createBrowserHistory } from "history";

const RouteCustom = ({ component: Component, layout: Layout, ...props }) => (
  <Route
    {...props}
    render={(props) => {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

class RouteControl extends PureComponent {
  render() {
    return (
      <BrowserRouter history={createBrowserHistory}>
        <Switch>
          {RouteData.map((route, index) => (
            <RouteCustom
              key={index}
              exact={route.exact}
              layout={LayoutMain}
              path={route.path.toString()}
              component={route.page}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouteControl;

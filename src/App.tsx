import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Customers,
  Transactions,
  LocationDeals,
  Chains,
  RestaurantChainLocations,
} from "./Pages";
import Deals from "./Pages/Deals";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <Transactions />,
  },
  {
    path: "/Customers",
    sidebar: () => <div></div>,
    main: () => <Customers />,
  },
  {
    path: "/Deals",
    sidebar: () => <div></div>,
    main: () => <Deals />,
  },
  {
    path: "/Locations",
    sidebar: () => <div></div>,
    main: () => <RestaurantChainLocations />,
  },
  {
    path: "/Deals",
    sidebar: () => <div></div>,
    main: () => <Deals />,
  },
  {
    path: "/LocationDeals",
    sidebar: () => <div></div>,
    main: () => <LocationDeals />,
  },
  {
    path: "/Chains",
    sidebar: () => <div></div>,
    main: () => <Chains />,
  },
];
function App() {
  return (
    <>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Switch>
      </Router>
    </>
  );
}

export default App;

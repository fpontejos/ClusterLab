import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";

import KMeansPage from "../pages/KMeansPage";
import DBSCANPage from "../pages/DBSCANPage";
import AgglomerativePage from "../pages/AgglomerativePage";
import MeanShiftPage from "../pages/MeanShiftPage";
import GMMPage from "../pages/GMMPage";
// import AppNavbar from './AppNavbar';

const navlinks = [
  { path: "/kmeans", label: "K-Means", icon: "K" },
  { path: "/dbscan", label: "DBSCAN", icon: "D" },
  { path: "/agglomerative", label: "Agglomerative", icon: "A" },
  { path: "/meanshift", label: "Mean Shift", icon: "M" },
  { path: "/gmm", label: "GMM", icon: "G" },
];

const AppNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar is-large is-info
">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          ClusterLab
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          {navlinks.map((navlink) => (
            <div 
            key={`navlink-${navlink.label}`}
            className={`navbar-item is-tab is-hoverable ${
            location.pathname === navlink.path ? "is-active " : ""
          }`}

              >
              <a
                href={navlink.path}
                className={`navbar-link ${
                  location.pathname === navlink.path ? "is-active " : ""
                }`}
              >
                {/* <span className="icon is-small">
                <span>{navlink.icon}</span>
              </span> */}
                <span>{navlink.label}</span>
              </a>
              </div>
            
          ))}
        </div>
      </div>
    </nav>
  );
};
const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <Router>
        <AppNavigation />

        <main className="main-content">
          <Switch>
            <Route exact path="/kmeans" component={KMeansPage} />
            <Route exact path="/dbscan" component={DBSCANPage} />
            <Route exact path="/agglomerative" component={AgglomerativePage} />
            <Route exact path="/meanshift" component={MeanShiftPage} />
            <Route exact path="/gmm" component={GMMPage} />
            <Route exact path="/">
              <Redirect to="/kmeans" />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default AppShell;

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, Redirect } from 'react-router-dom';
import { 
  Navbar, 
  Section, 
  Container, 
  Tabs, 
  Title 
} from 'react-bulma-components';

import KMeansPage from '../pages/KMeansPage';
import DBSCANPage from '../pages/DBSCANPage';
import AgglomerativePage from '../pages/AgglomerativePage';
import MeanShiftPage from '../pages/MeanShiftPage';
import GMMPage from '../pages/GMMPage';
import AppNavbar from './AppNavbar';

const tabs = [
  { path: '/kmeans', label: 'K-Means', icon: 'K' },
  { path: '/dbscan', label: 'DBSCAN', icon: 'D' },
  { path: '/agglomerative', label: 'Agglomerative', icon: 'A' },
  { path: '/meanshift', label: 'Mean Shift', icon: 'M' },
  { path: '/gmm', label: 'GMM', icon: 'G' }
];

const TabNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <Tabs align="centered" size="large">
      {tabs.map((tab) => (
        <Tabs.Tab 
          key={tab.path} 
          active={location.pathname === tab.path}
          renderAs={Link}
          to={tab.path}
        >
          <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
          {tab.label}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <Router>

      <AppNavbar />

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
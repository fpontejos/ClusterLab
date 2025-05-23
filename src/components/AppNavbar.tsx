// components/AppNavbar.tsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import './NavMenu.css'

const navItems = [
  { path: '/kmeans', label: 'K-Means', icon: 'K' },
  { path: '/dbscan', label: 'DBSCAN', icon: 'D' },
  { path: '/agglomerative', label: 'Agglomerative', icon: 'A' },
  { path: '/meanshift', label: 'Mean Shift', icon: 'M' },
  { path: '/gmm', label: 'GMM', icon: 'G' }
];

const AppNavbar: React.FC = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  
  return (
    <Navbar color="primary">
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to="/">
          <strong>ClusterApp</strong>
        </Navbar.Item>
        <Navbar.Burger 
          className={isActive ? 'is-active' : ''}
          onClick={() => setIsActive(!isActive)}
        />
      </Navbar.Brand>

      {/* <Navbar.Menu className={isActive ? 'is-active' : ''}> */}
      <Navbar.Menu  className={isActive ? 'is-active' : ''}>
        <Navbar.Container align="end" id="navbar-main">
          {navItems.map((item) => (
            <Navbar.Item
              key={item.path}
              renderAs={Link}
              to={item.path}
              className={location.pathname === item.path ? 'is-active' : ''}
            >
              <span className="icon-text">
                <span className="icon">
                  <strong>{item.icon}</strong>
                </span>
                <span>{item.label}</span>
              </span>
            </Navbar.Item>
          ))}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default AppNavbar;

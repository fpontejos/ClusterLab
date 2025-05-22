import React from 'react';
import { 
  IonApp, 
  IonRouterOutlet, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { 
  analytics, 
  grid, 
  triangle, 
  resize, 
  ellipse 
} from 'ionicons/icons';

import KMeansPage from '../pages/KMeansPage';
import DBSCANPage from '../pages/DBSCANPage';
import AgglomerativePage from '../pages/AgglomerativePage';
import MeanShiftPage from '../pages/MeanShiftPage';
import GMMPage from '../pages/GMMPage';

const AppShell: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/kmeans" component={KMeansPage} />
            <Route exact path="/dbscan" component={DBSCANPage} />
            <Route exact path="/agglomerative" component={AgglomerativePage} />
            <Route exact path="/meanshift" component={MeanShiftPage} />
            <Route exact path="/gmm" component={GMMPage} />
            <Route exact path="/">
              <Redirect to="/kmeans" />
            </Route>
          </IonRouterOutlet>
          
          <IonTabBar slot="top">
            <IonTabButton tab="kmeans" href="/kmeans">
              <IonIcon icon={analytics} />
              <IonLabel>K-Means</IonLabel>
            </IonTabButton>
            
            <IonTabButton tab="dbscan" href="/dbscan">
              <IonIcon icon={grid} />
              <IonLabel>DBSCAN</IonLabel>
            </IonTabButton>
            
            <IonTabButton tab="agglomerative" href="/agglomerative">
              <IonIcon icon={triangle} />
              <IonLabel>Agglomerative</IonLabel>
            </IonTabButton>
            
            <IonTabButton tab="meanshift" href="/meanshift">
              <IonIcon icon={resize} />
              <IonLabel>Mean Shift</IonLabel>
            </IonTabButton>
            
            <IonTabButton tab="gmm" href="/gmm">
              <IonIcon icon={ellipse} />
              <IonLabel>GMM</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
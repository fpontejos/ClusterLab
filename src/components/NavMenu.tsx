import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import {
  analytics,
  grid,
  triangle,
  resize,
  ellipse,
  bookOutline,
} from 'ionicons/icons';

import './NavMenu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  description: string;
}

const appPages: AppPage[] = [
  {
    title: 'K-Means',
    url: '/kmeans',
    iosIcon: analytics,
    mdIcon: analytics,
    description: 'Centroid-based clustering',
  },
  {
    title: 'DBSCAN',
    url: '/dbscan',
    iosIcon: grid,
    mdIcon: grid,
    description: 'Density-based clustering',
  },
  {
    title: 'Agglomerative',
    url: '/agglomerative',
    iosIcon: triangle,
    mdIcon: triangle,
    description: 'Hierarchical clustering',
  },
  {
    title: 'Mean Shift',
    url: '/meanshift',
    iosIcon: resize,
    mdIcon: resize,
    description: 'Mode-seeking algorithm',
  },
  {
    title: 'GMM',
    url: '/gmm',
    iosIcon: ellipse,
    mdIcon: ellipse,
    description: 'Gaussian mixture model',
  },
];

const NavMenu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="clustering-list">
          <IonListHeader>
            <IonIcon icon={bookOutline} slot="start" />
            Clustering Algorithms
          </IonListHeader>
          <IonNote>Interactive Learning</IonNote>
          
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>
                    <h2>{appPage.title}</h2>
                    <p>{appPage.description}</p>
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default NavMenu;
import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert
} from '@ionic/react';
import './cards/Cards.css';

interface AlgorithmPageLayoutProps {
  title: string;
  shortTitle: string;
  children: React.ReactNode;
  error: string | null;
  onErrorDismiss: () => void;
}

const AlgorithmPageLayout: React.FC<AlgorithmPageLayoutProps> = ({
  title,
  shortTitle,
  children,
  error,
  onErrorDismiss
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{shortTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="ion-padding">
          {children}
        </div>

        <IonAlert
          isOpen={!!error}
          onDidDismiss={onErrorDismiss}
          header="Error"
          message={error || ''}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default AlgorithmPageLayout;
import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonSpinner
} from '@ionic/react';
import type { Dataset } from '../../types';

interface DatasetInfoCardProps {
  dataset: Dataset | null;
  loading: boolean;
  statusContent?: React.ReactNode;
}

const DatasetInfoCard: React.FC<DatasetInfoCardProps> = ({
  dataset,
  loading,
  statusContent
}) => {
  if (loading) {
    return (
      <IonCard>
        <IonCardContent>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner />
            <p>Loading dataset...</p>
          </div>
        </IonCardContent>
      </IonCard>
    );
  }

  if (!dataset) {
    return null;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Dataset Information</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>
          <h3>{dataset.name}</h3>
          <p><strong>Size:</strong> {dataset.points.length} data points</p>
          {dataset.description && (
            <p><strong>Description:</strong> {dataset.description}</p>
          )}
          {statusContent}
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default DatasetInfoCard;
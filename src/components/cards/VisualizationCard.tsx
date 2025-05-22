import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner
} from '@ionic/react';
import ScatterPlot from './../ScatterPlot';

interface VisualizationCardProps {
  loading: boolean;
  points: [number, number][];
  clusters?: number[];
  centroids?: [number, number][];
  title: string;
  hasResults: boolean;
  height?: number;
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({
  loading,
  points,
  clusters,
  centroids,
  title,
  hasResults,
  height = 400
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {hasResults ? 'Clustering Results' : 'Data Visualization'}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <IonSpinner />
            <p>Loading clustering results...</p>
          </div>
        ) : (
          <ScatterPlot 
            points={points}
            clusters={clusters}
            centroids={centroids}
            title={title}
            height={height}
          />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default VisualizationCard;
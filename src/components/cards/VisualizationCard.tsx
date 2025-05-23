import React from 'react';
import { Card, Loader } from 'react-bulma-components';
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
    <Card>
      <Card.Header>
        <Card.Header.Title>
          {hasResults ? 'Clustering Results' : 'Data Visualization'}
        </Card.Header.Title>
      </Card.Header>
      <Card.Content>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader />
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
      </Card.Content>
    </Card>
  );
};

export default VisualizationCard;
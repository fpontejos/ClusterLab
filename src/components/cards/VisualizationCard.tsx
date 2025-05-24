import React from 'react';
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

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {hasResults ? 'Clustering Results' : 'Data Visualization'}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
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
        </div>
      </div>
    </div>
  );
};

export default VisualizationCard;
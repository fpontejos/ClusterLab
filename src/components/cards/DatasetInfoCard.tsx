import React from 'react';
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
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="skeleton-block">
            </div>
          </div>
        </div>
      </div>
      
    );
  }

  if (!dataset) {
    return null;
  }

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Dataset Information</p>
      </header>
      <div className="card-content">
        <div className="content">
          <h3>{dataset.name}</h3>
          <p><strong>Size:</strong> {dataset.points.length} data points</p>
          {dataset.description && (
            <p><strong>Description:</strong> {dataset.description}</p>
          )}
          {statusContent}
        </div>
      </div>
      </div>
  );
};

export default DatasetInfoCard;
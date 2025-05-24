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
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="skeleton-block">
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
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Dataset Information</p>
      </header>
      <div class="card-content">
        <div class="content">
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
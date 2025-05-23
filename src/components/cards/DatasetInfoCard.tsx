import React from 'react';
import { Card, Content, Loader } from 'react-bulma-components';
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
      <Card>
        <Card.Content>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Loader />
            <p>Loading dataset...</p>
          </div>
        </Card.Content>
      </Card>
    );
  }

  if (!dataset) {
    return null;
  }

  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>Dataset Information</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <Content>
          <h3>{dataset.name}</h3>
          <p><strong>Size:</strong> {dataset.points.length} data points</p>
          {dataset.description && (
            <p><strong>Description:</strong> {dataset.description}</p>
          )}
          {statusContent}
        </Content>
      </Card.Content>
    </Card>
  );
};

export default DatasetInfoCard;
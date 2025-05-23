import React from 'react';
import { Card, Content } from 'react-bulma-components';

interface AlgorithmInfoCardProps {
  algorithmName: string;
  description: string;
  features: string[];
  parameters?: { name: string; description: string }[];
  additionalInfo?: React.ReactNode;
}

const AlgorithmInfoCard: React.FC<AlgorithmInfoCardProps> = ({
  algorithmName,
  description,
  features,
  parameters,
  additionalInfo
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>{algorithmName}</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <Content>
          <p>{description}</p>
          
          <p><strong>Key Features:</strong></p>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          {parameters && parameters.length > 0 && (
            <>
              <p><strong>Parameters:</strong></p>
              <ul>
                {parameters.map((param, index) => (
                  <li key={index}>
                    <strong>{param.name}:</strong> {param.description}
                  </li>
                ))}
              </ul>
            </>
          )}

          {additionalInfo}
        </Content>
      </Card.Content>
    </Card>
  );
};

export default AlgorithmInfoCard;
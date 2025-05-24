import React from 'react';

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

    <div class="card">
  <header class="card-header">
    <p class="card-header-title">{algorithmName}</p>
  </header>
  <div class="card-content">
    <div class="content">
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
    </div>
  </div>
</div>



  );
};

export default AlgorithmInfoCard;
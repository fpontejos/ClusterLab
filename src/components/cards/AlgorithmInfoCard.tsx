import React from "react";

interface AlgorithmInfoCardProps {
  algorithmName: string;
  features: string[];
  parameters?: { name: string; description: string }[];
  additionalInfo?: React.ReactNode;
}

const AlgorithmInfoCard: React.FC<AlgorithmInfoCardProps> = ({
  features,
  parameters,
  additionalInfo,
}) => {
  return (
    <div className="column">

      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Algorithm Details</p>
        </header>
        <div className="card-content">
          <div className="content">
          <p><strong>Key Features:</strong></p>
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

            {parameters && parameters.length > 0 && (
              <>
                <p><strong>Hyperparameters:</strong></p>

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
      </div>
  );
};

export default AlgorithmInfoCard;

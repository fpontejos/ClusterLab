import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText
} from '@ionic/react';

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
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{algorithmName}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>
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
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default AlgorithmInfoCard;
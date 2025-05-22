import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { play } from 'ionicons/icons';

interface Parameter {
  key: string;
  label: string;
  value: any;
  options: any[];
  onChange: (value: any) => void;
  optionLabel?: (option: any) => string;
}

interface ParameterCardProps {
  availableDatasets: string[];
  selectedDataset: string;
  onDatasetChange: (dataset: string) => void;
  parameters: Parameter[];
  onRunClustering: () => void;
  isLoading: boolean;
  disabled: boolean;
  buttonText?: string;
}

const ParameterCard: React.FC<ParameterCardProps> = ({
  availableDatasets,
  selectedDataset,
  onDatasetChange,
  parameters,
  onRunClustering,
  isLoading,
  disabled,
  buttonText = 'Run Clustering'
}) => {
  const getColSize = () => {
    const totalParams = parameters.length + 1; // +1 for dataset
    if (totalParams <= 2) return { size: "12", sizeMd: "6" };
    if (totalParams <= 4) return { size: "12", sizeMd: "3" };
    return { size: "12", sizeMd: "2" };
  };

  const colProps = getColSize();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Configuration</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            {/* Dataset Selector */}
            <IonCol {...colProps}>
              <IonItem>
                <IonLabel label-placement="stacked">Dataset</IonLabel>
                <IonSelect
                 justify="space-between" 
                  value={selectedDataset}
                  onIonChange={(e) => onDatasetChange(e.detail.value)}
                  interface="popover"
                >
                  {availableDatasets.map((dataset) => (
                    <IonSelectOption key={`dataset-${dataset}`} value={dataset}>
                      {dataset}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>

            {/* Algorithm Parameters */}
            {parameters.map((param) => (
              <IonCol key={param.key} {...colProps}>
                <IonItem>
                  <IonLabel label-placement="stacked">{param.label}</IonLabel>
                  <IonSelect
                   justify="space-between" 
                    value={param.value}
                    onIonChange={(e) => param.onChange(e.detail.value)}
                    interface="popover"
                  >
                    {param.options.map((option) => (
                      <IonSelectOption key={`${param.key}-${option}`} value={option}>
                        {param.optionLabel ? param.optionLabel(option) : option}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonButton
          expand="block"
          onClick={onRunClustering}
          disabled={disabled || isLoading}
          style={{ marginTop: '16px' }}
        >
          {isLoading ? <IonSpinner name="crescent" /> : <IonIcon icon={play} />}
          {isLoading ? `${buttonText}...` : buttonText}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ParameterCard;
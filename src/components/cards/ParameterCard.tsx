import React from 'react';
import { 
  Card, 
  Columns, 
  Form, 
  Button, 
  Loader,
  Icon 
} from 'react-bulma-components';

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
  const getColumnSize = () => {
    const totalParams = parameters.length + 1;
    if (totalParams <= 2) return 6;
    if (totalParams <= 4) return 3;
    return 2;
  };

  const columnSize = getColumnSize();

  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>Configuration</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <Columns multiline>
          {/* Dataset Selector */}
          <Columns.Column size={columnSize}>
            <Form.Field>
              <Form.Label>Dataset</Form.Label>
              <Form.Control>
                <Form.Select
                  value={selectedDataset}
                  onChange={(e) => onDatasetChange(e.target.value)}
                >
                  {availableDatasets.map((dataset) => (
                    <option key={`dataset-${dataset}`} value={dataset}>
                      {dataset}
                    </option>
                  ))}
                </Form.Select>
              </Form.Control>
            </Form.Field>
          </Columns.Column>

          {/* Algorithm Parameters */}
          {parameters.map((param) => (
            <Columns.Column key={param.key} size={columnSize}>
              <Form.Field>
                <Form.Label>{param.label}</Form.Label>
                <Form.Control>
                  <Form.Select
                    value={param.value}
                    onChange={(e) => param.onChange(e.target.value)}
                  >
                    {param.options.map((option) => (
                      <option key={`${param.key}-${option}`} value={option}>
                        {param.optionLabel ? param.optionLabel(option) : option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Control>
              </Form.Field>
            </Columns.Column>
          ))}
        </Columns>

        <Button
          fullwidth
          color="primary"
          onClick={onRunClustering}
          disabled={disabled || isLoading}
          style={{ marginTop: '16px' }}
        >
          {isLoading ? (
            <>
              <Loader style={{ marginRight: '8px' }} />
              {`${buttonText}...`}
            </>
          ) : (
            <>
              <Icon>
                <span>▶</span>
              </Icon>
              {buttonText}
            </>
          )}
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ParameterCard;
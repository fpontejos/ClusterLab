import React from "react";

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
  buttonText = "Run Clustering",
}) => {
  const getColumnSize = () => {
    const totalParams = parameters.length + 1;
    if (totalParams <= 2) return 6;
    if (totalParams <= 4) return 3;
    return 2;
  };

  const columnSize = getColumnSize();

  return (
    <div>


      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Options</p>
        </header>
        <div class="card-content">
          <div class="content">
            

          <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Dataset</label>
        </div>
        <div class="field-body">
          <div class="field ">
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select
                  value={selectedDataset}
                  onChange={(e) => onDatasetChange(e.target.value)}
                >
                  {availableDatasets.map((dataset) => (
                    <option key={`dataset-${dataset}`} value={dataset}>
                      {dataset}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {parameters.map((param) => (
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">{param.label}</label>
          </div>
          <div class="field-body">
            <div class="field is-fullwidth">
              <div class="control">
                <div class="select is-fullwidth">
                  <select
                    value={param.value}
                    onChange={(e) => param.onChange(e.target.value)}
                  >
                    {param.options.map((option) => (
                      <option key={`${param.key}-${option}`} value={option}>
                        {param.optionLabel ? param.optionLabel(option) : option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}


          </div>
        </div>
        <footer class="card-footer">
        <div class="card-footer-item">
              <button
                onClick={onRunClustering}
                disabled={disabled || isLoading}
                class="button is-success is-card-footer-item is-fullwidth"
              >
                <span class="icon-text">
                  <span>{`${buttonText}`}</span>
                  <span class="icon">▶</span>
                </span>
                
              </button>
      </div>
        </footer>
      </div>


      
    </div>
  );
};

export default ParameterCard;

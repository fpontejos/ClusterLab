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
  return (
    <div className="column is-two-fifths">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Options</p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Dataset</label>
              </div>
              <div className="field-body">
                <div className="field ">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
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
              <div className="field is-horizontal" key={param.label}>
                <div className="field-label is-normal">
                  <label className="label">{param.label}</label>
                </div>
                <div className="field-body">
                  <div className="field is-fullwidth">
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={param.value}
                          onChange={(e) => param.onChange(e.target.value)}
                        >
                          {param.options.map((option) => (
                            <option
                              key={`${param.key}-${option}`}
                              value={option}
                            >
                              {param.optionLabel
                                ? param.optionLabel(option)
                                : option}
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
        <footer className="card-footer">
          <div className="card-footer-item">
            <button
              onClick={onRunClustering}
              disabled={disabled || isLoading}
              className="button is-success is-card-footer-item is-fullwidth"
            >
              <span className="icon-text">
                <span>{`${buttonText}`}</span>
                <span className="icon">▶</span>
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ParameterCard;

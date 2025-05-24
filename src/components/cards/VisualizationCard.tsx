import React from "react";
import ScatterPlot from "./../ScatterPlot";
import DatasetInfoCard from "./DatasetInfoCard";
import type { Dataset } from '../../types';

interface VisualizationCardProps {
  loading: boolean;
  dataset: Dataset | null;
  statusContent?: React.ReactNode;
  points: [number, number][];
  clusters?: number[];
  centroids?: [number, number][];
  title: string;
  hasResults: boolean;
  height?: number;
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({
  loading, 
  dataset, statusContent,
  points,
  clusters,
  centroids,
  title,
  hasResults,
  height = 400,
}) => {
  return (
    <div className="columns">
      <div className="column">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {hasResults ? "Clustering Results" : "Data Visualization"}
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              {loading ? (
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <div className="skeleton-block"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ScatterPlot
                  points={points}
                  clusters={clusters}
                  centroids={centroids}
                  title={title}
                  height={height}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="column is-two-fifths">
      <DatasetInfoCard
                  dataset={dataset}
                  loading={loading}
                  statusContent={statusContent}
                />
      </div>
    </div>
  );
};

export default VisualizationCard;

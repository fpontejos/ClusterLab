import React, { useState, useEffect } from "react";
import { loadDataset, getAvailableDatasets } from "../utils/dataLoader";
import type { Dataset } from "../types";
import AlgorithmPageLayout from "../components/AlgorithmPageLayout";
import ParameterCard from "../components/cards/ParameterCard";
import DatasetInfoCard from "../components/cards/DatasetInfoCard";
import VisualizationCard from "../components/cards/VisualizationCard";
import AlgorithmInfoCard from "../components/cards/AlgorithmInfoCard";

interface GMMResult {
  dataset: string;
  algorithm: string;
  params: { n_components: number; covariance_type: string };
  labels: number[];
  means: Array<{ x: number; y: number }>;
  probabilities: number[][];
  covariances: any[];
  log_likelihood: number;
  weights: number[];
}

const GMMPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>("blobs");
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nComponents, setNComponents] = useState<number>(3);
  const [covarianceType, setCovarianceType] = useState<string>("full");
  const [clusteringResult, setClusteringResult] = useState<GMMResult | null>(
    null
  );
  const [loadingClustering, setLoadingClustering] = useState<boolean>(false);

  const availableDatasets = getAvailableDatasets();

  // Parameter configuration
  const parameters = [
    {
      key: "components",
      label: "Components",
      value: nComponents,
      options: [2, 3, 4, 5, 6],
      onChange: setNComponents,
    },
    {
      key: "covariance",
      label: "Covariance",
      value: covarianceType,
      options: ["full", "tied", "diag", "spherical"],
      onChange: setCovarianceType,
    },
  ];

  // Load dataset when selection changes
  useEffect(() => {
    const loadData = async () => {
      if (!selectedDataset) return;

      setLoading(true);
      setError(null);
      setClusteringResult(null);

      try {
        const data = await loadDataset(selectedDataset);
        setDataset(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dataset");
        setDataset(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedDataset]);

  // Load clustering results
  const loadClusteringResult = async (
    datasetName: string,
    nComponents: number,
    covarianceType: string
  ) => {
    try {
      const filename = `${datasetName}_k${nComponents}_${covarianceType}.json`;
      const response = await fetch(`/clustering-results/gmm/${filename}`);

      if (!response.ok) {
        throw new Error(
          `No results found for ${datasetName} with k=${nComponents}, covariance=${covarianceType}`
        );
      }

      const result: GMMResult = await response.json();
      return result;
    } catch (err) {
      throw new Error(
        `Failed to load clustering results: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  const handleRunClustering = async () => {
    if (!dataset) return;

    setLoadingClustering(true);
    setError(null);

    try {
      const result = await loadClusteringResult(
        selectedDataset,
        nComponents,
        covarianceType
      );
      setClusteringResult(result);
      console.log(
        `Loaded GMM results: k=${nComponents}, covariance=${covarianceType}, log_likelihood=${result.log_likelihood.toFixed(
          2
        )}`
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load clustering results"
      );
      setClusteringResult(null);
    } finally {
      setLoadingClustering(false);
    }
  };

  // Clear clustering results when parameters change
  useEffect(() => {
    setClusteringResult(null);
  }, [nComponents, covarianceType, selectedDataset]);

  // Status content for DatasetInfoCard
  const statusContent = clusteringResult ? (
    <>
      <p>
        <strong>Status:</strong> Fit {nComponents} Gaussian components
      </p>
      <p>
        <strong>Covariance Type:</strong> {covarianceType}
      </p>
      <p>
        <strong>Log Likelihood:</strong>{" "}
        {clusteringResult.log_likelihood.toFixed(2)}
      </p>
    </>
  ) : null;

  // Algorithm info configuration
  const algorithmInfo = {
    algorithmName: "Gaussian Mixture Model",
    description:
      "GMM assumes data comes from a mixture of Gaussian distributions and uses the Expectation-Maximization algorithm to estimate parameters.",
    features: [
      "Probabilistic clustering with soft assignments",
      "Provides cluster membership probabilities",
      "Can model elliptical clusters",
      "Estimates cluster shapes via covariance matrices",
    ],
    parameters: [
      {
        name: "Full",
        description: "Each component has its own covariance matrix",
      },
      {
        name: "Tied",
        description: "All components share the same covariance matrix",
      },
      {
        name: "Diag",
        description: "Diagonal covariance matrices (axis-aligned ellipses)",
      },
      {
        name: "Spherical",
        description: "Spherical clusters (single variance parameter)",
      },
    ],
  };

  return (
    <AlgorithmPageLayout
        title={algorithmInfo.algorithmName}
        shortTitle=""
        error={error}
        onErrorDismiss={() => setError(null)}
      >
        <div class="columns">
          <div class="column">
            <ParameterCard
              availableDatasets={availableDatasets}
              selectedDataset={selectedDataset}
              onDatasetChange={setSelectedDataset}
              parameters={parameters}
              onRunClustering={handleRunClustering}
              isLoading={loadingClustering}
              disabled={loading}
              buttonText={algorithmInfo.algorithmName}
            />
          </div>

          <div class="column">
            <DatasetInfoCard
              dataset={dataset}
              loading={loading}
              statusContent={statusContent}
            />
          </div>
        </div>

        <div class="columns">
          <div class="column">
          {dataset && !loading && (
            <VisualizationCard
              loading={loadingClustering}
              points={dataset.points.map((p) => [p.x, p.y])}
              clusters={clusteringResult?.labels}
              centroids={clusteringResult?.means.map((m) => [m.x, m.y])}
              title={
                clusteringResult
                  ? `${dataset.name} - GMM (k=${nComponents}, ${covarianceType})`
                  : `${dataset.name} Dataset`
              }
              hasResults={!!clusteringResult}
            />
          )}
          </div>

          <div class="column">
            <AlgorithmInfoCard {...algorithmInfo} />
          </div>
        </div>
      </AlgorithmPageLayout>

  );
};

export default GMMPage;
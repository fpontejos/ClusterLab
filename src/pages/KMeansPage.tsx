import React, { useState, useEffect } from "react";
import { loadDataset, getAvailableDatasets } from "../utils/dataLoader";
import type { Dataset } from "../types";
import AlgorithmPageLayout from "../components/AlgorithmPageLayout";
import ParameterCard from "../components/cards/ParameterCard";
import DatasetInfoCard from "../components/cards/DatasetInfoCard";
import VisualizationCard from "../components/cards/VisualizationCard";
import AlgorithmInfoCard from "../components/cards/AlgorithmInfoCard";

interface KMeansResult {
  dataset: string;
  algorithm: string;
  params: { k: number };
  labels: number[];
  centroids: Array<{ x: number; y: number }>;
  inertia: number;
}

const KMeansPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>("blobs");
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [numClusters, setNumClusters] = useState<number>(3);
  const [clusteringResult, setClusteringResult] = useState<KMeansResult | null>(
    null
  );
  const [loadingClustering, setLoadingClustering] = useState<boolean>(false);

  const availableDatasets = getAvailableDatasets();

  // Parameter configuration for ParameterCard
  const parameters = [
    {
      key: "k",
      label: "Number of Clusters (k)",
      value: numClusters,
      options: [2, 3, 4, 5, 6, 7, 8],
      onChange: setNumClusters,
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
  const loadClusteringResult = async (datasetName: string, k: number) => {
    try {
      const response = await fetch(
        `/clustering-results/kmeans/${datasetName}_k${k}.json`
      );
      if (!response.ok) {
        throw new Error(`No results found for ${datasetName} with k=${k}`);
      }
      const result: KMeansResult = await response.json();
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
      const result = await loadClusteringResult(selectedDataset, numClusters);
      setClusteringResult(result);
      console.log(
        `Loaded K-means results: k=${numClusters}, inertia=${result.inertia.toFixed(
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
  }, [numClusters, selectedDataset]);

  // Status content for DatasetInfoCard
  const statusContent = clusteringResult ? (
    <>
      <p>
        <strong>Status:</strong> Clustered into {numClusters} groups
      </p>
      <p>
        <strong>Inertia:</strong> {clusteringResult.inertia.toFixed(2)}
      </p>
    </>
  ) : null;

  // Algorithm info configuration
  const algorithmInfo = {
    algorithmName: "K-Means Algorithm",
    description:
      "K-Means is a centroid-based algorithm that partitions data into k clusters. Each data point belongs to the cluster with the nearest centroid.",
    features: [
      "Requires specifying the number of clusters (k)",
      "Works well with spherical clusters",
      "Computationally efficient",
      "Sensitive to initial centroid placement",
    ],
    additionalInfo: clusteringResult ? (
      <p>
        <strong>Inertia:</strong> Measures within-cluster sum of squared
        distances. Lower values indicate tighter clusters.
      </p>
    ) : null,
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
              centroids={clusteringResult?.centroids.map((c) => [c.x, c.y])}
              title={
                clusteringResult
                  ? `${dataset.name} - K-Means (k=${numClusters})`
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

export default KMeansPage;
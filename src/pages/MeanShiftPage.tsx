import React, { useState, useEffect } from "react";
import { loadDataset, getAvailableDatasets } from "../utils/dataLoader";
import type { Dataset } from "../types";
import AlgorithmPageLayout from "../components/AlgorithmPageLayout";
import ParameterCard from "../components/cards/ParameterCard";
import VisualizationCard from "../components/cards/VisualizationCard";
import AlgorithmInfoCard from "../components/cards/AlgorithmInfoCard";

interface MeanShiftResult {
  dataset: string;
  algorithm: string;
  params: { bandwidth: number };
  labels: number[];
  cluster_centers: Array<{ x: number; y: number }>;
  n_clusters: number;
}

const MeanShiftPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>("blobs");
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bandwidth, setBandwidth] = useState<number>(1.0);
  const [clusteringResult, setClusteringResult] =
    useState<MeanShiftResult | null>(null);
  const [loadingClustering, setLoadingClustering] = useState<boolean>(false);

  const availableDatasets = getAvailableDatasets();

  // Parameter configuration
  const parameters = [
    {
      key: "bandwidth",
      label: "Bandwidth",
      value: bandwidth,
      options: [0.3, 0.5, 0.8, 1.0, 1.5, 2.0],
      onChange: setBandwidth,
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
    bandwidth: number
  ) => {
    try {
      // Handle integer bandwidths (1.0 -> "1", 2.0 -> "2")
      let bandwidthStr;
      if (bandwidth === Math.floor(bandwidth)) {
        bandwidthStr = Math.floor(bandwidth).toString();
      } else {
        bandwidthStr = bandwidth.toString().replace(".", "_");
      }

      const filename = `${datasetName}_bw${bandwidthStr}.json`;
      const response = await fetch(`/clustering-results/meanshift/${filename}`);

      if (!response.ok) {
        throw new Error(
          `No results found for ${datasetName} with bandwidth=${bandwidth}`
        );
      }

      const result: MeanShiftResult = await response.json();
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
      const result = await loadClusteringResult(selectedDataset, bandwidth);
      setClusteringResult(result);
      console.log(
        `Loaded Mean Shift results: bandwidth=${bandwidth}, clusters=${result.n_clusters}`
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
  }, [bandwidth, selectedDataset]);

  // Status content for DatasetInfoCard
  const statusContent = clusteringResult ? (
    <>
      <p>
        <strong>Status:</strong> Found {clusteringResult.n_clusters} clusters
      </p>
      <p>
        <strong>Bandwidth:</strong> {bandwidth}
      </p>
    </>
  ) : null;

  // Algorithm info configuration
  const algorithmInfo = {
    algorithmName: "Mean Shift Algorithm",
    description:
      "Mean Shift is a non-parametric clustering algorithm that seeks modes (dense regions) in the data by iteratively shifting points toward the highest density.",
    features: [
      "Automatically determines the number of clusters",
      "Can find clusters of arbitrary shape",
      "Mode-seeking algorithm based on kernel density estimation",
      "Robust to outliers",
    ],
    parameters: [
      {
        name: "Bandwidth",
        description:
          "Controls the size of the region used for density estimation. Smaller values create more clusters, larger values merge clusters.",
      },
    ],
  };

  return (
    <div className="algorithm-page">
      <AlgorithmPageLayout error={error} onErrorDismiss={() => setError(null)}>
        <section className="hero is-light mb-5">
          <div className="hero-body">
            <div className="container content">
              <p className="title">{algorithmInfo.algorithmName}</p>
              <p>{algorithmInfo.description}</p>

              <div className="columns">
                <AlgorithmInfoCard {...algorithmInfo} />

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
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            {dataset && !loading && (
              <VisualizationCard
                loading={loadingClustering}
                dataset={dataset}
                statusContent={statusContent}
                points={dataset.points.map((p) => [p.x, p.y])}
                clusters={clusteringResult?.labels}
                title={
                  clusteringResult
                    ? `${dataset.name} - Mean Shift (bandwidth=${bandwidth})`
                    : `${dataset.name} Dataset`
                }
                hasResults={!!clusteringResult}
              />
            )}
          </div>
        </section>
      </AlgorithmPageLayout>
    </div>
  );
};

export default MeanShiftPage;

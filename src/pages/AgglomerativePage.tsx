import React, { useState, useEffect } from "react";
import { loadDataset, getAvailableDatasets } from "../utils/dataLoader";
import type { Dataset } from "../types";
import AlgorithmPageLayout from "../components/AlgorithmPageLayout";
import ParameterCard from "../components/cards/ParameterCard";
import DatasetInfoCard from "../components/cards/DatasetInfoCard";
import VisualizationCard from "../components/cards/VisualizationCard";
import AlgorithmInfoCard from "../components/cards/AlgorithmInfoCard";


// const { Input, Field, Control, Label, Select } = Form;
interface AgglomerativeResult {
  dataset: string;
  algorithm: string;
  params: { n_clusters: number; linkage: string };
  labels: number[];
}

const AgglomerativePage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>("blobs");
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nClusters, setNClusters] = useState<number>(3);
  const [linkage, setLinkage] = useState<string>("ward");
  const [clusteringResult, setClusteringResult] =
    useState<AgglomerativeResult | null>(null);
  const [loadingClustering, setLoadingClustering] = useState<boolean>(false);

  const availableDatasets = getAvailableDatasets();
  const [subject, setSubject] = useState(""); // delete

  // Parameter configuration
  const parameters = [
    {
      key: "clusters",
      label: "Clusters",
      value: nClusters,
      options: [2, 3, 4, 5, 6],
      onChange: setNClusters,
    },
    {
      key: "linkage",
      label: "Linkage",
      value: linkage,
      options: ["ward", "complete", "average", "single"],
      onChange: setLinkage,
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
    nClusters: number,
    linkage: string
  ) => {
    try {
      const filename = `${datasetName}_k${nClusters}_${linkage}.json`;
      const response = await fetch(
        `/clustering-results/agglomerative/${filename}`
      );

      if (!response.ok) {
        throw new Error(
          `No results found for ${datasetName} with k=${nClusters}, linkage=${linkage}`
        );
      }

      const result: AgglomerativeResult = await response.json();
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
        nClusters,
        linkage
      );
      setClusteringResult(result);
      console.log(
        `Loaded Agglomerative results: k=${nClusters}, linkage=${linkage}`
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
  }, [nClusters, linkage, selectedDataset]);

  // Status content for DatasetInfoCard
  const statusContent = clusteringResult ? (
    <>
      <p>
        <strong>Status:</strong> Clustered into {nClusters} groups
      </p>
      <p>
        <strong>Linkage Method:</strong> {linkage}
      </p>
    </>
  ) : null;

  // Algorithm info configuration
  const algorithmInfo = {
    algorithmName: "Agglomerative Clustering",
    description:
      "Agglomerative clustering is a hierarchical clustering method that builds a tree of clusters by iteratively merging the closest pairs of clusters.",
    features: [
      "Bottom-up hierarchical approach",
      "No assumptions about cluster shape",
      "Deterministic results",
      "Can capture nested cluster structures",
    ],
    parameters: [
      { name: "Ward", description: "Minimizes within-cluster variance" },
      {
        name: "Complete",
        description: "Uses maximum distance between clusters",
      },
      {
        name: "Average",
        description: "Uses average distance between all points",
      },
      { name: "Single", description: "Uses minimum distance between clusters" },
    ],
  };

  return (
    <div className="algorithm-page">
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
                title={
                  clusteringResult
                    ? `${dataset.name} - Agglomerative (k=${nClusters}, ${linkage})`
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
    </div>
  );
};

export default AgglomerativePage;

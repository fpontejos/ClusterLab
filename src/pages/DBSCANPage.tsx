import React, { useState, useEffect } from "react";
import { loadDataset, getAvailableDatasets } from "../utils/dataLoader";
import type { Dataset } from "../types";
import AlgorithmPageLayout from "../components/AlgorithmPageLayout";
import ParameterCard from "../components/cards/ParameterCard";
import DatasetInfoCard from "../components/cards/DatasetInfoCard";
import VisualizationCard from "../components/cards/VisualizationCard";
import AlgorithmInfoCard from "../components/cards/AlgorithmInfoCard";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

interface DBSCANResult {
  dataset: string;
  algorithm: string;
  params: { eps: number; min_samples: number };
  labels: number[];
  noise_points: number;
}

const DBSCANPage: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>("blobs");
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [eps, setEps] = useState<number>(0.3);
  const [minSamples, setMinSamples] = useState<number>(5);
  const [clusteringResult, setClusteringResult] = useState<DBSCANResult | null>(
    null
  );
  const [loadingClustering, setLoadingClustering] = useState<boolean>(false);

  const availableDatasets = getAvailableDatasets();

  // Parameter configuration
  const parameters = [
    {
      key: "eps",
      label: "eps (ε)",
      value: eps,
      options: [0.1, 0.3, 0.5, 0.8, 1.0],
      onChange: setEps,
    },
    {
      key: "min_samples",
      label: "min_samples",
      value: minSamples,
      options: [3, 5, 8, 10],
      onChange: setMinSamples,
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
    eps: number,
    minSamples: number
  ) => {
    try {
      // Handle integer eps (1.0 -> "1", 0.3 -> "0_3")
      let epsStr;
      if (eps === Math.floor(eps)) {
        epsStr = Math.floor(eps).toString();
      } else {
        epsStr = eps.toString().replace(".", "_");
      }

      const filename = `${datasetName}_eps${epsStr}_min${minSamples}.json`;
      const response = await fetch(`/clustering-results/dbscan/${filename}`);

      if (!response.ok) {
        throw new Error(
          `No results found for ${datasetName} with eps=${eps}, min_samples=${minSamples}`
        );
      }

      const result: DBSCANResult = await response.json();
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
        eps,
        minSamples
      );
      setClusteringResult(result);

      const clusterCount = new Set(
        result.labels.filter((label) => label !== -1)
      ).size;
      console.log(
        `Loaded DBSCAN results: eps=${eps}, min_samples=${minSamples}, clusters=${clusterCount}, noise=${result.noise_points}`
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
  }, [eps, minSamples, selectedDataset]);

  const getClusterCount = (): number => {
    if (!clusteringResult) return 0;
    return new Set(clusteringResult.labels.filter((label) => label !== -1))
      .size;
  };

  // Status content for DatasetInfoCard
  const statusContent = clusteringResult ? (
    <>
      <p>
        <strong>Status:</strong> Found {getClusterCount()} clusters
      </p>
      <p>
        <strong>Noise Points:</strong> {clusteringResult.noise_points} (
        {(
          (clusteringResult.noise_points / (dataset?.points.length || 1)) *
          100
        ).toFixed(1)}
        %)
      </p>
    </>
  ) : null;

  // Algorithm info configuration
  const algorithmInfo = {
    algorithmName: "DBSCAN Algorithm",
    description:
      "DBSCAN (Density-Based Spatial Clustering of Applications with Noise) groups together points that are closely packed and marks outliers as noise.",
    features: [
      "Automatically determines the number of clusters",
      "Can find clusters of arbitrary shape",
      "Identifies outliers as noise points",
      "Robust to outliers",
    ],
    parameters: [
      {
        name: "eps (ε)",
        description:
          "Maximum distance between two samples for them to be considered neighbors",
      },
      {
        name: "min_samples",
        description:
          "Minimum number of samples in a neighborhood for a point to be core",
      },
    ],
  };

  return (
    <AlgorithmPageLayout
      title="DBSCAN Clustering"
      shortTitle="DBSCAN"
      error={error}
      onErrorDismiss={() => setError(null)}
    >
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <ParameterCard
              availableDatasets={availableDatasets}
              selectedDataset={selectedDataset}
              onDatasetChange={setSelectedDataset}
              parameters={parameters}
              onRunClustering={handleRunClustering}
              isLoading={loadingClustering}
              disabled={loading}
              buttonText="Run DBSCAN"
            />
          </IonCol>

          <IonCol size="4">
            <DatasetInfoCard
              dataset={dataset}
              loading={loading}
              statusContent={statusContent}
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="8">
            {dataset && !loading && (
              <VisualizationCard
                loading={loadingClustering}
                points={dataset.points.map((p) => [p.x, p.y])}
                clusters={clusteringResult?.labels}
                title={
                  clusteringResult
                    ? `${dataset.name} - DBSCAN (eps=${eps}, min_samples=${minSamples})`
                    : `${dataset.name} Dataset`
                }
                hasResults={!!clusteringResult}
              />
            )}
          </IonCol>

          <IonCol size="4">
            <AlgorithmInfoCard {...algorithmInfo} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </AlgorithmPageLayout>
  );
};

export default DBSCANPage;

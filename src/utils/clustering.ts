import { kmeans } from 'ml-kmeans';
import type { DataPoint, ClusteringResult } from '../types';

/**
 * Run K-Means clustering on dataset
 * @param data - Array of DataPoints
 * @param k - Number of clusters
 * @returns ClusteringResult with clusters, centroids, and labels
 */
export function runKMeans(data: DataPoint[], k: number): ClusteringResult {
  // Convert DataPoints to 2D array format expected by ml-kmeans
  const points = data.map(point => [point.x, point.y]);
  
  // Run K-means clustering
  const result = kmeans(points, k, {
    initialization: 'random',
    maxIterations: 100
  });
  
  // Get cluster assignments for each point
  const labels = result.clusters;
  
  // Get centroids
  const centroids = result.centroids.map(centroid => ({
    x: centroid[0],
    y: centroid[1]
  }));
  
  // Group points by cluster
  const clusters: DataPoint[][] = [];
  for (let i = 0; i < k; i++) {
    clusters[i] = [];
  }
  
  data.forEach((point, index) => {
    const clusterLabel = labels[index];
    clusters[clusterLabel].push({
      ...point,
      cluster: clusterLabel
    });
  });
  
  return {
    clusters,
    centroids,
    labels
  };
}
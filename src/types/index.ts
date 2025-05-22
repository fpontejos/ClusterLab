// Data types for clustering algorithms
interface DataPoint {
  x: number;
  y: number;
  label?: string;
  cluster?: number;
}
export type {DataPoint}; 

interface Dataset {
  name: string;
  points: DataPoint[];
  description?: string;
}

export type {Dataset}; 


interface ClusteringResult {
  clusters: DataPoint[][];
  centroids?: DataPoint[];
  labels: number[];
}

export type {ClusteringResult}; 

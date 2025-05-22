import type { DataPoint, Dataset } from '../types';

/**
 * Load a dataset from the public/datasets directory
 * @param name - Dataset filename (without .json extension)
 * @returns Promise resolving to Dataset object
 */
export async function loadDataset(name: string): Promise<Dataset> {
  try {
    const response = await fetch(`/datasets/${name}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load dataset: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate dataset structure
    if (!Array.isArray(data.points)) {
      throw new Error('Dataset must contain a "points" array');
    }
    
    // Validate each data point
    const points: DataPoint[] = data.points.map((point: any, index: number) => {
      if (typeof point.x !== 'number' || typeof point.y !== 'number') {
        throw new Error(`Invalid data point at index ${index}: x and y must be numbers`);
      }
      
      return {
        x: point.x,
        y: point.y,
        label: point.label || undefined,
        cluster: point.cluster || undefined
      };
    });
    
    return {
      name: data.name || name,
      points,
      description: data.description || undefined
    };
    
  } catch (error) {
    console.error(`Error loading dataset "${name}":`, error);
    throw error;
  }
}

/**
 * Get list of available datasets
 * This would typically come from an API or manifest file
 * For now, return a hardcoded list of known datasets
 */
export function getAvailableDatasets(): string[] {
  return [
    'circles',
    'blobs',
    'moons',
    'aniso'
  ];
}
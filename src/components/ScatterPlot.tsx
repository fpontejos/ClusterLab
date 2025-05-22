import React from 'react';
import Plot from 'react-plotly.js';

interface ScatterPlotProps {
  points: number[][];
  clusters?: number[];
  centroids?: number[][];
  width?: number | string;
  height?: number | string;
  title?: string;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  points,
  clusters,
  centroids,
  width = '100%',
  height = 400,
  title = 'Scatter Plot'
}) => {
  // Prepare data traces
  const traces: any[] = [];

  if (clusters && clusters.length === points.length) {
    // Group points by cluster
    const clusterGroups: { [key: number]: number[][] } = {};
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'];
    
    points.forEach((point, index) => {
      const cluster = clusters[index];
      if (!clusterGroups[cluster]) {
        clusterGroups[cluster] = [];
      }
      clusterGroups[cluster].push(point);
    });

    // Create trace for each cluster
    Object.entries(clusterGroups).forEach(([clusterLabel, clusterPoints], index) => {
      const isNoise = clusterLabel === '-1';
      traces.push({
        x: clusterPoints.map(p => p[0]),
        y: clusterPoints.map(p => p[1]),
        mode: 'markers',
        type: 'scatter',
        name: isNoise ? 'Noise' : `Cluster ${clusterLabel}`,
        marker: {
          color: isNoise ? '#666666' : colors[index % colors.length],
          size: isNoise ? 4 : 8,
          opacity: isNoise ? 0.5 : 0.7
        }
      });
    });
  } else {
    // Single trace for all points
    traces.push({
      x: points.map(p => p[0]),
      y: points.map(p => p[1]),
      mode: 'markers',
      type: 'scatter',
      name: 'Data Points',
      marker: {
        color: '#1f77b4',
        size: 8,
        opacity: 0.7
      }
    });
  }

  // Add centroids if provided
  if (centroids && centroids.length > 0) {
    traces.push({
      x: centroids.map(c => c[0]),
      y: centroids.map(c => c[1]),
      mode: 'markers',
      type: 'scatter',
      name: 'Centroids',
      marker: {
        color: '#ff0000',
        size: 15,
        symbol: 'x',
        line: { width: 3 }
      }
    });
  }

  const layout = {
    title: {
      text: title,
      font: { size: 16 }
    },
    xaxis: {
      title: { text: 'X' },
      showgrid: true,
      zeroline: true
    },
    yaxis: {
      title: { text: 'Y' },
      showgrid: true,
      zeroline: true
    },
    showlegend: traces.length > 1,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: 'var(--ion-color-dark)'
    }
  };

  const config = {
    responsive: true,
    displayModeBar: false,
    staticPlot: false
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={config}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: '300px'
      }}
    />
  );
};

export default ScatterPlot;
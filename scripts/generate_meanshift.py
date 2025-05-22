#!/usr/bin/env python3
"""
Generate pre-computed Mean Shift clustering results for all parameter combinations.
"""

import json
import os
from pathlib import Path

import numpy as np
from sklearn.cluster import MeanShift


def load_dataset(dataset_name):
    """Load dataset from JSON file."""
    dataset_path = Path(f"../public/datasets/{dataset_name}.json")
    with open(dataset_path, "r") as f:
        data = json.load(f)

    points = np.array([[p["x"], p["y"]] for p in data["points"]])
    return points, data


def run_meanshift_clustering(points, bandwidth):
    """Run Mean Shift clustering and return results."""
    meanshift = MeanShift(bandwidth=bandwidth)
    labels = meanshift.fit_predict(points)
    cluster_centers = meanshift.cluster_centers_

    # Convert cluster centers to list of dicts
    centers = [
        {"x": float(center[0]), "y": float(center[1])} for center in cluster_centers
    ]

    return labels.tolist(), centers


def generate_filename(dataset_name, bandwidth):
    """Generate standardized filename for results."""
    # Handle integer bandwidths (1.0 -> "1", 2.0 -> "2")
    if bandwidth == int(bandwidth):
        bandwidth_str = str(int(bandwidth))
    else:
        bandwidth_str = str(bandwidth).replace(".", "_")
    return f"{dataset_name}_bw{bandwidth_str}.json"


def main():
    # Parameters
    bandwidth_values = [0.3, 0.5, 0.8, 1.0, 1.5, 2.0]
    datasets = ["circles", "blobs", "moons", "aniso"]

    # Create output directory
    output_dir = Path("../public/clustering-results/meanshift")
    output_dir.mkdir(parents=True, exist_ok=True)

    total_combinations = len(datasets) * len(bandwidth_values)
    current = 0

    print(f"Generating Mean Shift results for {total_combinations} combinations...")

    for dataset_name in datasets:
        print(f"\nProcessing dataset: {dataset_name}")

        try:
            # Load dataset
            points, dataset_info = load_dataset(dataset_name)

            for bandwidth in bandwidth_values:
                current += 1
                print(f"  [{current}/{total_combinations}] bandwidth={bandwidth}")

                # Run Mean Shift clustering
                labels, cluster_centers = run_meanshift_clustering(points, bandwidth)

                # Prepare result
                result = {
                    "dataset": dataset_name,
                    "algorithm": "meanshift",
                    "params": {"bandwidth": bandwidth},
                    "labels": labels,
                    "cluster_centers": cluster_centers,
                    "n_clusters": len(cluster_centers),
                }

                # Save to file
                filename = generate_filename(dataset_name, bandwidth)
                output_path = output_dir / filename

                with open(output_path, "w") as f:
                    json.dump(result, f, indent=2)

        except Exception as e:
            print(f"Error processing {dataset_name}: {e}")
            continue

    print(f"\nCompleted! Generated {current} result files in {output_dir}")


if __name__ == "__main__":
    main()

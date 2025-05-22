#!/usr/bin/env python3
"""
Generate pre-computed DBSCAN clustering results for all parameter combinations.
"""

import json
import os
from itertools import product
from pathlib import Path

import numpy as np
from sklearn.cluster import DBSCAN


def load_dataset(dataset_name):
    """Load dataset from JSON file."""
    dataset_path = Path(f"../public/datasets/{dataset_name}.json")
    with open(dataset_path, "r") as f:
        data = json.load(f)

    points = np.array([[p["x"], p["y"]] for p in data["points"]])
    return points, data


def run_dbscan_clustering(points, eps, min_samples):
    """Run DBSCAN clustering and return results."""
    dbscan = DBSCAN(eps=eps, min_samples=min_samples)
    labels = dbscan.fit_predict(points)

    # Count noise points (label -1)
    noise_points = np.sum(labels == -1)

    return labels.tolist(), int(noise_points)


def generate_filename(dataset_name, eps, min_samples):
    """Generate standardized filename for results."""
    eps_str = str(eps).replace(".", "_")
    return f"{dataset_name}_eps{eps_str}_min{min_samples}.json"


def main():
    # Parameters
    eps_values = [0.1, 0.3, 0.5, 0.8, 1.0]
    min_samples_values = [3, 5, 8, 10]
    datasets = ["circles", "blobs", "moons", "aniso"]

    # Create output directory
    output_dir = Path("../public/clustering-results/dbscan")
    output_dir.mkdir(parents=True, exist_ok=True)

    total_combinations = len(datasets) * len(eps_values) * len(min_samples_values)
    current = 0

    print(f"Generating DBSCAN results for {total_combinations} combinations...")

    for dataset_name in datasets:
        print(f"\nProcessing dataset: {dataset_name}")

        try:
            # Load dataset
            points, dataset_info = load_dataset(dataset_name)

            for eps, min_samples in product(eps_values, min_samples_values):
                current += 1
                print(
                    f"  [{current}/{total_combinations}] eps={eps}, min_samples={min_samples}"
                )

                # Run DBSCAN
                labels, noise_points = run_dbscan_clustering(points, eps, min_samples)

                # Prepare result
                result = {
                    "dataset": dataset_name,
                    "algorithm": "dbscan",
                    "params": {"eps": eps, "min_samples": min_samples},
                    "labels": labels,
                    "noise_points": noise_points,
                }

                # Save to file
                filename = generate_filename(dataset_name, eps, min_samples)
                output_path = output_dir / filename

                with open(output_path, "w") as f:
                    json.dump(result, f, indent=2)

        except Exception as e:
            print(f"Error processing {dataset_name}: {e}")
            continue

    print(f"\nCompleted! Generated {current} result files in {output_dir}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Generate pre-computed Agglomerative clustering results for all parameter combinations.
"""

import json
import os
from itertools import product
from pathlib import Path

import numpy as np
from sklearn.cluster import AgglomerativeClustering


def load_dataset(dataset_name):
    """Load dataset from JSON file."""
    dataset_path = Path(f"../public/datasets/{dataset_name}.json")
    with open(dataset_path, "r") as f:
        data = json.load(f)

    points = np.array([[p["x"], p["y"]] for p in data["points"]])
    return points, data


def run_agglomerative_clustering(points, n_clusters, linkage):
    """Run Agglomerative clustering and return results."""
    clustering = AgglomerativeClustering(n_clusters=n_clusters, linkage=linkage)
    labels = clustering.fit_predict(points)
    return labels.tolist()


def generate_filename(dataset_name, n_clusters, linkage):
    """Generate standardized filename for results."""
    return f"{dataset_name}_k{n_clusters}_{linkage}.json"


def main():
    # Parameters
    n_clusters_values = [2, 3, 4, 5, 6]
    linkage_values = ["ward", "complete", "average", "single"]
    datasets = ["circles", "blobs", "moons", "aniso"]

    # Create output directory
    output_dir = Path("../public/clustering-results/agglomerative")
    output_dir.mkdir(parents=True, exist_ok=True)

    total_combinations = len(datasets) * len(n_clusters_values) * len(linkage_values)
    current = 0

    print(f"Generating Agglomerative results for {total_combinations} combinations...")

    for dataset_name in datasets:
        print(f"\nProcessing dataset: {dataset_name}")

        try:
            # Load dataset
            points, dataset_info = load_dataset(dataset_name)

            for n_clusters, linkage in product(n_clusters_values, linkage_values):
                current += 1
                print(
                    f"  [{current}/{total_combinations}] k={n_clusters}, linkage={linkage}"
                )

                # Run Agglomerative clustering
                labels = run_agglomerative_clustering(points, n_clusters, linkage)

                # Prepare result
                result = {
                    "dataset": dataset_name,
                    "algorithm": "agglomerative",
                    "params": {"n_clusters": n_clusters, "linkage": linkage},
                    "labels": labels,
                }

                # Save to file
                filename = generate_filename(dataset_name, n_clusters, linkage)
                output_path = output_dir / filename

                with open(output_path, "w") as f:
                    json.dump(result, f, indent=2)

        except Exception as e:
            print(f"Error processing {dataset_name}: {e}")
            continue

    print(f"\nCompleted! Generated {current} result files in {output_dir}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Generate K-means clustering results for all parameter combinations
"""

import json
import os

import numpy as np
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs, make_circles, make_moons


def load_dataset(name):
    """Load dataset from JSON file"""
    filename = f"../public/datasets/{name}.json"
    with open(filename, "r") as f:
        data = json.load(f)

    points = np.array([[p["x"], p["y"]] for p in data["points"]])
    return points, data


def run_kmeans_clustering(points, k):
    """Run K-means clustering and return results"""
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = kmeans.fit_predict(points)
    centroids = kmeans.cluster_centers_

    return {
        "labels": labels.tolist(),
        "centroids": [{"x": float(c[0]), "y": float(c[1])} for c in centroids],
        "inertia": float(kmeans.inertia_),
    }


def main():
    """Generate K-means results for all parameter combinations"""

    # Parameters
    datasets = ["circles", "blobs", "moons", "aniso", "random"]
    k_values = [2, 3, 4, 5, 6, 7, 8]

    # Create output directory
    output_dir = "../public/clustering-results/kmeans"
    os.makedirs(output_dir, exist_ok=True)

    total_combinations = 0

    for dataset_name in datasets:
        try:
            # Load dataset
            points, dataset_info = load_dataset(dataset_name)
            print(f"Processing {dataset_name} ({len(points)} points)...")

            for k in k_values:
                # Run K-means
                result = run_kmeans_clustering(points, k)

                # Create result object
                output = {
                    "dataset": dataset_name,
                    "algorithm": "kmeans",
                    "params": {"k": k},
                    "labels": result["labels"],
                    "centroids": result["centroids"],
                    "inertia": result["inertia"],
                }

                # Save to file
                filename = os.path.join(output_dir, f"{dataset_name}_k{k}.json")
                with open(filename, "w") as f:
                    json.dump(output, f, indent=2)

                total_combinations += 1
                print(f"  Generated k={k} -> {filename}")

        except Exception as e:
            print(f"Error processing {dataset_name}: {e}")

    print(
        f"\nGenerated {total_combinations} K-means clustering results in {output_dir}/"
    )


if __name__ == "__main__":
    main()

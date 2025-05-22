#!/usr/bin/env python3
"""
Generate pre-computed GMM clustering results for all parameter combinations.
"""

import json
import os
from itertools import product
from pathlib import Path

import numpy as np
from sklearn.mixture import GaussianMixture


def load_dataset(dataset_name):
    """Load dataset from JSON file."""
    dataset_path = Path(f"../public/datasets/{dataset_name}.json")
    with open(dataset_path, "r") as f:
        data = json.load(f)

    points = np.array([[p["x"], p["y"]] for p in data["points"]])
    return points, data


def run_gmm_clustering(points, n_components, covariance_type):
    """Run GMM clustering and return results."""
    gmm = GaussianMixture(
        n_components=n_components, covariance_type=covariance_type, random_state=42
    )
    labels = gmm.fit_predict(points)

    # Get cluster centers (means)
    means = [{"x": float(mean[0]), "y": float(mean[1])} for mean in gmm.means_]

    # Get probability scores for each point
    probabilities = gmm.predict_proba(points)

    # Calculate log likelihood
    log_likelihood = gmm.score(points)

    # Get covariances (simplified for 2D)
    covariances = []
    for i, cov in enumerate(gmm.covariances_):
        if covariance_type == "full":
            # Full covariance matrix
            covariances.append({"type": "full", "matrix": cov.tolist()})
        elif covariance_type == "diag":
            # Diagonal covariance
            covariances.append({"type": "diag", "diagonal": cov.tolist()})
        elif covariance_type == "tied":
            # Tied covariance (same for all components)
            if i == 0:  # Only include once since it's tied
                covariances.append({"type": "tied", "matrix": cov.tolist()})
        elif covariance_type == "spherical":
            # Spherical covariance (single value)
            covariances.append({"type": "spherical", "variance": float(cov)})

    return {
        "labels": labels.tolist(),
        "means": means,
        "probabilities": probabilities.tolist(),
        "covariances": covariances,
        "log_likelihood": float(log_likelihood),
        "weights": gmm.weights_.tolist(),
    }


def generate_filename(dataset_name, n_components, covariance_type):
    """Generate standardized filename for results."""
    return f"{dataset_name}_k{n_components}_{covariance_type}.json"


def main():
    # Parameters
    n_components_values = [2, 3, 4, 5, 6]
    covariance_types = ["full", "tied", "diag", "spherical"]
    datasets = ["circles", "blobs", "moons", "aniso"]

    # Create output directory
    output_dir = Path("../public/clustering-results/gmm")
    output_dir.mkdir(parents=True, exist_ok=True)

    total_combinations = (
        len(datasets) * len(n_components_values) * len(covariance_types)
    )
    current = 0

    print(f"Generating GMM results for {total_combinations} combinations...")

    for dataset_name in datasets:
        print(f"\nProcessing dataset: {dataset_name}")

        try:
            # Load dataset
            points, dataset_info = load_dataset(dataset_name)

            for n_components, covariance_type in product(
                n_components_values, covariance_types
            ):
                current += 1
                print(
                    f"  [{current}/{total_combinations}] k={n_components}, cov={covariance_type}"
                )

                # Run GMM clustering
                gmm_result = run_gmm_clustering(points, n_components, covariance_type)

                # Prepare result
                result = {
                    "dataset": dataset_name,
                    "algorithm": "gmm",
                    "params": {
                        "n_components": n_components,
                        "covariance_type": covariance_type,
                    },
                    **gmm_result,
                }

                # Save to file
                filename = generate_filename(
                    dataset_name, n_components, covariance_type
                )
                output_path = output_dir / filename

                with open(output_path, "w") as f:
                    json.dump(result, f, indent=2)

        except Exception as e:
            print(f"Error processing {dataset_name}: {e}")
            continue

    print(f"\nCompleted! Generated {current} result files in {output_dir}")


if __name__ == "__main__":
    main()

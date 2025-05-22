#!/usr/bin/env python3
"""
Generate clustering datasets for the interactive learning app
"""

import numpy as np
import json
import os
from sklearn.datasets import make_circles, make_blobs, make_moons
from sklearn.preprocessing import StandardScaler


def generate_circles(n_samples=500):
    """Generate two concentric circles"""
    X, y = make_circles(n_samples=n_samples, noise=0.1, factor=0.6, random_state=42)
    return {
        "name": "Two Circles",
        "description": "Concentric circles dataset for testing clustering algorithms",
        "points": [{"x": float(x[0]), "y": float(x[1])} for x in X],
    }


def generate_blobs(n_samples=500):
    """Generate well-separated Gaussian blobs"""
    X, y = make_blobs(
        n_samples=n_samples,
        centers=4,
        n_features=2,
        cluster_std=1.0,
        center_box=(-10.0, 10.0),
        random_state=42,
    )
    return {
        "name": "Gaussian Blobs",
        "description": "Well-separated Gaussian blobs ideal for K-means clustering",
        "points": [{"x": float(x[0]), "y": float(x[1])} for x in X],
    }


def generate_moons(n_samples=500):
    """Generate two interleaving crescents"""
    X, y = make_moons(n_samples=n_samples, noise=0.15, random_state=42)
    return {
        "name": "Two Moons",
        "description": "Interleaving crescent shapes challenging for centroid-based methods",
        "points": [{"x": float(x[0]), "y": float(x[1])} for x in X],
    }


def generate_aniso(n_samples=500):
    """Generate anisotropic (elongated) clusters"""
    # Create elongated clusters with different orientations
    np.random.seed(42)

    # Cluster 1: elongated horizontally
    cluster1 = np.random.multivariate_normal(
        [2, 2], [[4, 0], [0, 0.5]], size=n_samples // 3
    )

    # Cluster 2: elongated vertically
    cluster2 = np.random.multivariate_normal(
        [-2, -2], [[0.5, 0], [0, 4]], size=n_samples // 3
    )

    # Cluster 3: elongated diagonally
    cluster3 = np.random.multivariate_normal(
        [3, -3], [[2, 1.8], [1.8, 2]], size=n_samples // 3
    )

    X = np.vstack([cluster1, cluster2, cluster3])

    return {
        "name": "Anisotropic Blobs",
        "description": "Elongated clusters with different orientations",
        "points": [{"x": float(x[0]), "y": float(x[1])} for x in X],
    }


def generate_random(n_samples=500):
    """Generate single uniform random blob"""
    np.random.seed(42)
    X = np.random.multivariate_normal([0, 0], [[3, 0], [0, 3]], size=n_samples)

    return {
        "name": "Random Points",
        "description": "Single cluster of randomly distributed points",
        "points": [{"x": float(x[0]), "y": float(x[1])} for x in X],
    }


def main():
    """Generate all datasets and save to JSON files"""

    # Create output directory
    output_dir = "../public/datasets"
    os.makedirs(output_dir, exist_ok=True)

    # Generate datasets
    datasets = {
        "circles": generate_circles(),
        "blobs": generate_blobs(),
        "moons": generate_moons(),
        "aniso": generate_aniso(),
        "random": generate_random(),
    }

    # Save to JSON files
    for name, data in datasets.items():
        filename = os.path.join(output_dir, f"{name}.json")
        with open(filename, "w") as f:
            json.dump(data, f, indent=2)
        print(f"Generated {filename} with {len(data['points'])} points")

    print(f"\nGenerated {len(datasets)} datasets in {output_dir}/")


if __name__ == "__main__":
    main()

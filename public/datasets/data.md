# Sample Dataset Files

Create these JSON files in `/public/datasets/`:

## circles.json
```json
{
  "name": "Two Circles",
  "description": "Concentric circles dataset for testing clustering algorithms",
  "points": [
    {"x": 0.1, "y": 0.2}, {"x": -0.1, "y": 0.3}, {"x": 0.2, "y": -0.1},
    {"x": -0.2, "y": -0.1}, {"x": 0.3, "y": 0.1}, {"x": -0.3, "y": 0.2},
    {"x": 1.1, "y": 1.2}, {"x": 0.9, "y": 1.3}, {"x": 1.2, "y": 0.9},
    {"x": 0.8, "y": 0.9}, {"x": 1.3, "y": 1.1}, {"x": 0.7, "y": 1.1},
    {"x": -1.1, "y": -1.2}, {"x": -0.9, "y": -1.3}, {"x": -1.2, "y": -0.9},
    {"x": -0.8, "y": -0.9}, {"x": -1.3, "y": -1.1}, {"x": -0.7, "y": -1.1},
    {"x": 2.1, "y": 0.2}, {"x": 1.9, "y": 0.3}, {"x": 2.2, "y": -0.1},
    {"x": 1.8, "y": -0.1}, {"x": 2.3, "y": 0.1}, {"x": 1.7, "y": 0.2}
  ]
}
```

## blobs.json
```json
{
  "name": "Gaussian Blobs",
  "description": "Well-separated Gaussian blobs ideal for K-means clustering",
  "points": [
    {"x": 2, "y": 3}, {"x": 2.1, "y": 3.2}, {"x": 1.9, "y": 2.8}, {"x": 2.2, "y": 3.1},
    {"x": 5, "y": 6}, {"x": 5.1, "y": 6.2}, {"x": 4.9, "y": 5.8}, {"x": 5.2, "y": 6.1},
    {"x": 8, "y": 2}, {"x": 8.1, "y": 2.2}, {"x": 7.9, "y": 1.8}, {"x": 8.2, "y": 2.1},
    {"x": 1, "y": 8}, {"x": 1.1, "y": 8.2}, {"x": 0.9, "y": 7.8}, {"x": 1.2, "y": 8.1}
  ]
}
```

## moons.json
```json
{
  "name": "Two Moons",
  "description": "Interleaving crescent shapes challenging for centroid-based methods",
  "points": [
    {"x": 0, "y": 0.5}, {"x": 0.2, "y": 0.6}, {"x": 0.4, "y": 0.8}, {"x": 0.6, "y": 0.9},
    {"x": 0.8, "y": 0.8}, {"x": 1, "y": 0.6}, {"x": 1.2, "y": 0.3}, {"x": 1.4, "y": 0},
    {"x": 1.6, "y": -0.4}, {"x": 1.4, "y": -0.8}, {"x": 1.2, "y": -1.1}, {"x": 1, "y": -1.3},
    {"x": 0.8, "y": -1.4}, {"x": 0.6, "y": -1.3}, {"x": 0.4, "y": -1.1}, {"x": 0.2, "y": -0.8}
  ]
}
```

## aniso.json
```json
{
  "name": "Anisotropic Blobs",
  "description": "Elongated clusters with different orientations",
  "points": [
    {"x": 1, "y": 1}, {"x": 2, "y": 1.5}, {"x": 3, "y": 2}, {"x": 4, "y": 2.5},
    {"x": 5, "y": 3}, {"x": 6, "y": 3.5}, {"x": 7, "y": 4}, {"x": 8, "y": 4.5},
    {"x": 2, "y": 8}, {"x": 2.5, "y": 7}, {"x": 3, "y": 6}, {"x": 3.5, "y": 5},
    {"x": 4, "y": 4}, {"x": 4.5, "y": 3}, {"x": 5, "y": 2}, {"x": 5.5, "y": 1}
  ]
}
```
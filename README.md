# ClusterLab - Interactive Clustering Algorithms

Educational web application demonstrating clustering algorithms through interactive visualizations and pre-computed results.

## Features
- **5 Clustering Algorithms**: K-Means, DBSCAN, Agglomerative, Mean Shift, GMM
- **Interactive Visualizations**: Plotly.js scatter plots with cluster coloring
- **Pre-computed Results**: Fast loading with parameter exploration
- **Responsive Design**: Works on desktop and mobile
- **Educational Content**: Algorithm explanations and metrics

## Tech Stack
- React + TypeScript + Ionic React
- Vite build tool
- Plotly.js for visualizations
- Pre-computed clustering via Python/scikit-learn

## Quick Start

### Prerequisites
- Node.js 20+
- Yarn package manager

### Development Setup
```bash
git clone <repository-url>
cd clusterlab
yarn install
yarn dev
```

### Generate Data (First Time)
```bash
# In Jupyter notebook or Python environment
pip install scikit-learn numpy
python scripts/generate_datasets.py
python scripts/generate_kmeans.py
```

## Deployment

### Netlify (Recommended)
1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Build Settings**:
   - Build command: `yarn build`
   - Publish directory: `dist`
3. **Deploy**: Netlify auto-deploys from main branch

### Manual Netlify Deploy
```bash
yarn build
npx netlify-cli deploy --prod --dir=dist
```

### Environment Variables
None required - all data is static JSON files.

## Project Structure
```
clusterlab/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Algorithm pages
│   ├── utils/              # Data loading utilities
│   └── types/              # TypeScript definitions
├── public/
│   ├── datasets/           # Generated datasets
│   └── clustering-results/ # Pre-computed results
├── scripts/                # Python data generation
└── netlify.toml           # Deployment config
```

## Commands
| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn type-check` | Run TypeScript checking |

## Data Generation
Generate datasets and clustering results using Python scripts

## Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License
MIT License
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'

hydrateRoot(
    document,
    <App assets={window.assetManifest} Router={BrowserRouter} />
)
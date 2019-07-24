import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App.jsx'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl' // NEW

// Inform your Mapbox token (https://www.mapbox.com/account/)
mapboxgl.accessToken =
  'pk.eyJ1IjoibWMxMDBzIiwiYSI6ImNqb2E2ZTF3ODBxa3czd2xldHp1Z2FxbGYifQ.U4oatm5RsTXXHQLz5w66dQ' // NEW

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)

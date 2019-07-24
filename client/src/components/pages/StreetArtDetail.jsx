import React, { useState, useEffect, useRef } from 'react'
import api from '../../api'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

export default function StreetArtDetail(props) {
  const streetArtId = props.match.params.id

  const mapDomRef = useRef(null) // For Mapbox
  let map = useRef(null).current // For Mapbox
  let marker = useRef(null).current // For Mapbox

  // imgEl is a reference to the <img> in the DOM
  const imgEl = useRef(null)
  const [isFullScreen, setIsFullScreen] = useState(false)

  function handleImgClick() {
    if (isFullScreen) {
      document.exitFullscreen()
    } else {
      imgEl.current.requestFullscreen()
    }
    setIsFullScreen(!isFullScreen)
  }

  const [streetArt, setStreetArt] = useState(null)
  useEffect(() => {
    api.getStreetArt(streetArtId).then(data => {
      setStreetArt(data)
      let [lng, lat] = data.location.coordinates // For Mapbox
      initMap(lng, lat) // For Mapbox
    })
  }, [])

  function initMap(lng, lat) {
    // Embed the map where "mapDomRef" is defined in the render
    map = new mapboxgl.Map({
      container: mapDomRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10,
    })

    // Add zoom control on the top right corner
    map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map with the coordinates ([lng, lat])
    marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(map)
  }

  return (
    <div>
      <h1>Street Art Detail</h1>
      {streetArt && (
        <div>
          <img
            ref={imgEl}
            src={streetArt.pictureUrl}
            alt=""
            onClick={handleImgClick}
          />
          <hr />
          Longitude = {streetArt.location.coordinates[0]} <br />
          Latitude = {streetArt.location.coordinates[1]} <br />
          <hr />
          <div ref={mapDomRef} style={{ height: 400 }} /> {/* NEW */}
        </div>
      )}
    </div>
  )
}

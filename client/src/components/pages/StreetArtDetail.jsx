import React, { useState, useEffect, useRef } from 'react'
import api from '../../api'

export default function StreetArtDetail(props) {
  const streetArtId = props.match.params.id

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
    })
  }, [])

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
        </div>
      )}
    </div>
  )
}

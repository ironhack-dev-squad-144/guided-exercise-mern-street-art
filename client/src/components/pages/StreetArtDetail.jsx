import React, { useState, useEffect } from 'react'
import api from '../../api'

export default function StreetArtDetail(props) {
  const streetArtId = props.match.params.id

  const [streetArt, setStreetArt] = useState(null)
  useEffect(() => {
    api.getStreetArt(streetArtId).then(streetArt => {
      setStreetArt(streetArt)
    })
  }, [])

  return (
    <div>
      <h1>Street Art Detail</h1>
      {streetArt && (
        <div>
          <img src={streetArt.pictureUrl} alt="" />
          <hr />
          Longitude = {streetArt.location.coordinates[0]} <br />
          Latitude = {streetArt.location.coordinates[1]} <br />
        </div>
      )}
    </div>
  )
}

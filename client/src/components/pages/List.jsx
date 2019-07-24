import React, { useState, useEffect } from 'react'
import { Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function List() {
  const [streetArts, setStreetArts] = useState([])
  useEffect(() => {
    api.getStreetArts().then(streetArts => {
      setStreetArts(streetArts)
    })
  }, [])

  function getLocations(streetArt) {
    return (
      streetArt.location.coordinates[1] +
      ',' +
      streetArt.location.coordinates[0]
    )
  }
  function getLinkDirection(streetArt) {
    return `https://www.google.com/maps/dir//${getLocations(
      streetArt
    )}/@${getLocations(streetArt)},15z`
  }

  return (
    <div>
      <h1>List of Street Arts</h1>
      <Table className="mt-4" size="sm" hover>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Google Maps Direction</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {streetArts.map(streetArt => (
            <tr key={streetArt._id}>
              <td className="align-middle">
                <img
                  className="thumbnail-img"
                  src={streetArt.pictureUrl}
                  alt=""
                />
              </td>
              <td className="align-middle">
                <a target="_blank" href={getLinkDirection(streetArt)}>
                  {getLocations(streetArt)}
                </a>
              </td>
              <td className="align-middle">
                <Button
                  color="danger"
                  outline
                  tag={Link}
                  to={'/street-art-detail/' + streetArt._id}
                >
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

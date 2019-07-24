import React from 'react'
import { useForm } from '../../hooks'
import { Button, Col, Container, Input, Label, Row } from 'reactstrap'
import api from '../../api'

export default function NewStreetArt(props) {
  const { formValues, setFormValues, getInputProps } = useForm()

  function getCurrentCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('The current coords are', position.coords)
        setFormValues({
          ...formValues,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const uploadData = new FormData()
    uploadData.append('lng', formValues.lng)
    uploadData.append('lat', formValues.lat)
    uploadData.append('picture', formValues.picture)

    api.addStreetArt(uploadData).then(streetArt => {
      console.log(streetArt)
      // Redirect the user to '/street-art-detail/' + streetArt._id
      props.history.push('/street-art-detail/' + streetArt._id)
    })
  }

  return (
    <div>
      <h1>New Street Art</h1>
      <Button
        className="my-4"
        color="danger"
        block
        outline
        onClick={getCurrentCoordinates}
      >
        Get Current Coordinates
      </Button>
      <form onSubmit={handleSubmit}>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Coordinates</Label>
          </Col>
          <Col>
            <Input
              type="number"
              placeholder="Longitude"
              {...getInputProps('lng')}
            />
          </Col>
          <Col>
            <Input
              type="number"
              placeholder="Latitude"
              {...getInputProps('lat')}
            />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Picture</Label>
          </Col>
          <Col>
            <Input type="file" {...getInputProps('picture')} value={null} />
          </Col>
        </Row>

        <Button className="my-4" color="danger" block>
          Add Street Art
        </Button>
      </form>

      <pre>{JSON.stringify(formValues)}</pre>
    </div>
  )
}

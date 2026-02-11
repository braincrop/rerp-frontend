'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, Input, Row, Col, Alert } from 'reactstrap'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { allDevices, GetAllDevices } from '@/redux/slice/devicesSlice/DevicesSlice'

const Page = () => {
  const dispatch = useDispatch()
  const [selectedDevice, setSelectedDevice] = useState('')
  const { devices } = useSelector(allDevices)

  useEffect(() => {
    dispatch(GetAllDevices())
  }, [])

  console.log('devices', devices)
  console.log('selectedDevice', selectedDevice)
  return (
    <div className="container py-4">
      <Card className="p-3">
        <h5 className="mb-3">Select Devices</h5>
        <Input
          type="select"
          className="mb-4"
          value={selectedDevice}
          onChange={(e) => {
            const id = e.target.value
            const selected = devices.find((d) => String(d.id) === String(id))
            setSelectedDevice(selected)
          }}>
          <option value="">Select Device</option>
          {devices
            ?.filter((d) => d.isActive)
            .map((device) => (
              <option key={device.id} value={device.id}>
                {device.deviceName} ({device.ip})
              </option>
            ))}
        </Input>

        <Row className="g-3">
          <Col md="6">
            <Card className="text-center p-4 h-100 shadow-sm cursor-pointer" style={{ cursor: 'pointer' }}>
              <Icon icon="solar:gallery-linear" width="40" className="mb-2 text-success d-block mx-auto" />
              <h6 className="fw-bold">Update Splash</h6>
              <p className="text-muted mb-0">Refresh the device splash screen</p>
            </Card>
          </Col>
          <Col md="6">
            <Card className="text-center p-4 h-100 shadow-sm cursor-pointer" style={{ cursor: 'pointer' }}>
              <Icon icon="solar:box-linear" width="40" className="mb-2 text-success d-block mx-auto" />
              <h6 className="fw-bold">Update Product</h6>
              <p className="text-muted mb-0">Update vending product info</p>
            </Card>
          </Col>
          <Col md="6">
            <Card className="text-center p-4 h-100 shadow-sm cursor-pointer" style={{ cursor: 'pointer' }}>
              <Icon icon="ion:language-sharp" width="40" className="mb-2 text-success d-block mx-auto" />
              <h6 className="fw-bold">Update Languages</h6>
              <p className="text-muted mb-0">Sync Languages to Vending Machines</p>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Page

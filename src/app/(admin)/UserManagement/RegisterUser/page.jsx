'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'

const Page = () => {
  const [modalType, setModalType] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteid, setDeleteid] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  role: '',
})

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
}

  const openModal = (type, id = null) => {
    setModalType(type)
    setSelectedCategoryId(id)
    if (type === 'edit' && id !== null) {
    //   const selectedCategory = category.find((cat) => cat.dcid === id)
    //   setCategoryInput(selectedCategory?.name || '')
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
      })
    }
    setModalOpen(true)
  }
 const opendeleteModal = (index) => {
    setDeleteid(index)
    setDeleteModal(true)
  }
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Users</h2>
        <Button color="primary" onClick={() => openModal('create')}>
          <Icon icon="mdi:plus" width="16" height="16" className="me-2" />
          Create New
        </Button>
      </div>
      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>q2H7d@example.com</td>
            <td>123-456-7890</td>
            <td>Admin</td>
            <td className="text-center">
              <Button color="warning" size="sm" className="me-2 text-white" onClick={() => openModal('edit', 1)}>
                <Icon icon="mdi:pencil" width="16" />
              </Button>
              <Button color="danger" size="sm" onClick={() => opendeleteModal(1)}>
                <Icon icon="mdi:delete" width="16" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>{modalType === 'create' ? 'Create User' : 'Edit User'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Role</Label>
            <Input type="select" name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="operator">Operator</option>
              <option value="viewer">Viewer</option>
            </Input>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button color="primary">
            {/* {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />} */}
            {modalType === 'create' ? 'Create' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} centered>
        <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>Delete User</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this user?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="danger">Delete</Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default Page

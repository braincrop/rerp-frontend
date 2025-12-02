'use client'
import React, { useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import { Icon } from '@iconify/react'
const Page = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('') ;
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [categoryInput, setCategoryInput] = useState('')
  const [categories, setCategories] = useState([
    'Breakfast',
    'Combos',
    'Desserts',
    'Drinks',
    'Heat and Eat',
    'Salads and Bowls',
    'Sandwiches and Wraps',
    'Snacks and Proteins',
    'Diet Meal',
    'Electronics',
    'Other',
  ])

  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) setCategoryInput(categories[index])
    else setCategoryInput('')
    setModalOpen(true)
  }

  // Handlers for CRUD - currently local state
  const saveCategory = () => {
    if (!categoryInput.trim()) return

    if (modalType === 'create') {
      setCategories([...categories, categoryInput.trim()])
      // Future: dispatch Redux action for API create
    } else if (modalType === 'edit' && selectedIndex !== null) {
      const updated = [...categories]
      updated[selectedIndex] = categoryInput.trim()
      setCategories(updated)
      // Future: dispatch Redux action for API update
    }
    setModalOpen(false)
  }

  const deleteCategory = (index) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updated = categories.filter((_, i) => i !== index)
      setCategories(updated)
      // Future: dispatch Redux action for API delete
    }
  }
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Categories</h2>
        <Button color="primary" onClick={() => openModal('create')}>
          <Icon icon="mdi:plus" width="16" height="16" className="me-2" />
          Create New
        </Button>
      </div>

      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cat}</td>
                <td className="text-center">
                  <Button color="warning" size="sm" className="me-2 text-white" onClick={() => openModal('edit', index)}>
                    <Icon icon="mdi:pencil" width="16" height="16" />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => deleteCategory(index)}>
                    <Icon icon="mdi:delete" width="16" height="16" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted py-4">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>{modalType === 'create' ? 'Create New Category' : 'Edit Category'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Category Name</Label>
            <Input type="text" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={saveCategory}>
            {modalType === 'create' ? 'Create' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default Page

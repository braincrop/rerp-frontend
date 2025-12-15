'use client'
import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label,Spinner } from 'reactstrap'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { allCategories, GetAllCategory, PostCategory } from '@/redux/slice/categories/CategorySlice'

const Page = () => {
  const dispatch = useDispatch()
  const { category, loading } = useSelector(allCategories)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [categoryInput, setCategoryInput] = useState('')

  useEffect(() => {
    dispatch(GetAllCategory())
  }, [])

  console.log('category', category)
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) setCategoryInput(categories[index])
    else setCategoryInput('')
    setModalOpen(true)
  }

  const saveCategory = () => {
    if (!categoryInput.trim()) return
    if (modalType === 'create') {
      console.log('categoryInput', categoryInput)
      const category = {
        Name: categoryInput,
      }
      dispatch(PostCategory(category))
    } else if (modalType === 'edit' && selectedIndex !== null) {
      
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
          {loading ? (
            <td colSpan="3" className="text-center py-4">
              <Spinner size="sm" /> Loading...
            </td>
          ) : category?.length > 0 ? (
            category.map((cat, index) => (
              <tr key={index}>
                <td>{cat.dcid}</td>
                <td>{cat.name}</td>
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

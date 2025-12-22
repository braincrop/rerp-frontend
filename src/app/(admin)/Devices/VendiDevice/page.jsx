'use client'
import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Spinner } from 'reactstrap'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { allCategories, DeleteCategoryData, GetAllCategory, PostCategory, UpdatedCategory } from '@/redux/slice/categories/CategorySlice'

const Page = () => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [deleteid, setDeleteid] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [categoryInput, setCategoryInput] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

//   useEffect(() => {
//     dispatch(GetAllCategory())
//   }, [])

  const openModal = (type, id = null) => {
  setModalType(type)
  setSelectedCategoryId(id)
  if (type === 'edit' && id !== null) {
    const selectedCategory = category.find((cat) => cat.dcid === id)
    setCategoryInput(selectedCategory?.name || '')
  } else {
    setCategoryInput('')
  }
  setModalOpen(true)
}

const saveCategory = () => {
  if (!categoryInput.trim()) return
  if (modalType === 'create') {
    dispatch(
      PostCategory({
        Name: categoryInput,
      })
    )
  }
  if (modalType === 'edit' && selectedCategoryId !== null) {
    let data = {
      dcid: selectedCategoryId,
      name: categoryInput
    }
    dispatch(
      UpdatedCategory(data)
    )
  }
  setModalOpen(false)
}


  const opendeleteModal = (index) => {
    setDeleteid(index)
    setDeleteModal(true)
  }
  const deleteCategory = () => {
    dispatch(DeleteCategoryData(deleteid))
    setDeleteModal(false)
  }
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Devices</h2>
        <Button color="primary" onClick={() => openModal('create')}>
          <Icon icon="mdi:plus" width="16" height="16" className="me-2" />
          Create New
        </Button>
      </div>

      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>IP</th>
            <th>Device Name</th>
            <th>Splash Sreen</th>
            <th>Is Connected</th>
            <th>Created ON</th>
            <th>Last Updated</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        {/* <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                <Spinner size="sm" /> Loading...
              </td>
            </tr>
          ) : category?.length > 0 ? (
            category.map((cat) => (
              <tr key={cat.dcid}>
                <td>{cat.dcid}</td>
                <td>{cat.name}</td>
                <td className="text-center">
                  <Button color="warning" size="sm" className="me-2 text-white" onClick={() => openModal('edit', cat.dcid)}>
                    <Icon icon="mdi:pencil" width="16" />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => opendeleteModal(cat.dcid)}>
                    <Icon icon="mdi:delete" width="16" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted py-4">
                No Device found
              </td>
            </tr>
          )}
        </tbody> */}
      </Table>
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

      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} centered>
        <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>Delete Device</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this Device?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="danger" onClick={deleteCategory}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default Page

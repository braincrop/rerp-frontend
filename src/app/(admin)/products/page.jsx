'use client'
import React, { useState, useMemo } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'

const initialProducts = [
  { id: 1, name: 'Perrier Drinking Water', category: 'Drinks', base_price: '10.00', status: 'Active' },
  { id: 2, name: 'Natalies Strawberry Lemonade', category: 'Drinks', base_price: '3.00', status: 'synced' },
  { id: 3, name: 'Curry Chicken Salad Whole Weat Wrap', category: 'Heat and Eat', base_price: '8.50', status: 'Active' },
  { id: 4, name: 'Hummus & Pita Chips', category: 'Snacks and Proteins', base_price: '5.00', status: 'Active' },
]

const Page = () => {
  // STATES
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [productInput, setProductInput] = useState({
    name: '',
    category: '',
    base_price: '',
    status: 'Active',
  })
  const [deleteModal, setDeleteModal] = useState(false)
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)

    if (type === 'edit' && index !== null) {
      setProductInput(products[index])
    } else {
      setProductInput({ name: '', category: '', base_price: '', status: 'Active' })
    }

    setModalOpen(true)
  }
  const saveProduct = () => {
    if (!productInput.name.trim()) return

    if (modalType === 'create') {
      setProducts([...products, { ...productInput, id: Date.now() }])
    } else if (modalType === 'edit' && selectedIndex !== null) {
      const updated = [...products]
      updated[selectedIndex] = productInput
      setProducts(updated)
    }

    setModalOpen(false)
  }
  const openDeleteModal = (index) => {
    setSelectedIndex(index)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    const updated = products.filter((_, i) => i !== selectedIndex)
    setProducts(updated)
    setDeleteModal(false)
  }
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, products])

  const paginated = filteredProducts.slice(0, itemsPerPage)

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md="2">
          <Input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col md="2">
          <Input type="select" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Input>
        </Col>
        <Col md="8" className="text-end">
          <Button color="primary" onClick={() => openModal('create')}>
            <Icon icon="mdi:plus" width={18} className="me-2" />
            Create New
          </Button>
        </Col>
      </Row>
      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Category</th>
            <th>Base price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.length > 0 ? (
            paginated.map((prod, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.base_price}</td>
                <td>{prod.status}</td>

                <td className="text-center">
                  <Button color="warning" size="sm" className="me-2 text-white" onClick={() => openModal('edit', index)}>
                    <Icon icon="mdi:pencil" width={16} />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => openDeleteModal(index)}>
                    <Icon icon="mdi:delete" width={16} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No Product Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>{modalType === 'create' ? 'Create Product' : 'Edit Product'}</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>Product Name</Label>
            <Input type="text" value={productInput.name} onChange={(e) => setProductInput({ ...productInput, name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Input type="text" value={productInput.category} onChange={(e) => setProductInput({ ...productInput, category: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>Base Price</Label>
            <Input type="number" value={productInput.base_price} onChange={(e) => setProductInput({ ...productInput, base_price: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Input type="select" value={productInput.status} onChange={(e) => setProductInput({ ...productInput, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="synced">Synced</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={saveProduct}>
            {modalType === 'create' ? 'Create' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} centered>
        <ModalHeader>Delete Product</ModalHeader>
        <ModalBody>Are you sure you want to delete this product?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default Page

'use client'
import React, { useState, useMemo } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'

const initialProducts = [
  {
    id: 1,
    category: 'Drinks',
    branch: 'Main Branch',
    product: 'Perrier Drinking Water',
    vendorNo: 'VEND-1023',
    content: '500ml Bottle',
    taxCategory: 'Standard',
    status: 'Active',
  },
  {
    id: 2,
    category: 'Drinks',
    branch: 'City Center',
    product: 'Natalies Strawberry Lemonade',
    vendorNo: 'VEND-2034',
    content: '330ml Bottle',
    taxCategory: 'Reduced',
    status: 'Synced',
  },
  {
    id: 3,
    category: 'Heat and Eat',
    branch: 'Main Branch',
    product: 'Curry Chicken Salad Wrap',
    vendorNo: 'VEND-3345',
    content: '1 Wrap',
    taxCategory: 'Standard',
    status: 'Active',
  },
  {
    id: 4,
    category: 'Snacks',
    branch: 'Airport Branch',
    product: 'Hummus & Pita Chips',
    vendorNo: 'VEND-5566',
    content: '150g Pack',
    taxCategory: 'Reduced',
    status: 'Active',
  },
  {
    id: 5,
    category: 'Bakery',
    branch: 'Downtown',
    product: 'Chocolate Croissant',
    vendorNo: 'VEND-9988',
    content: '1 Pc',
    taxCategory: 'Standard',
    status: 'Inactive',
  },
  {
    id: 6,
    category: 'Frozen Food',
    branch: 'Main Branch',
    product: 'Frozen Pizza Pepperoni',
    vendorNo: 'VEND-4321',
    content: 'Medium Size',
    taxCategory: 'Standard',
    status: 'Active',
  },
  {
    id: 7,
    category: 'Desserts',
    branch: 'City Center',
    product: 'Cheesecake Slice',
    vendorNo: 'VEND-1212',
    content: '1 Slice',
    taxCategory: 'Reduced',
    status: 'Synced',
  },
  {
    id: 8,
    category: 'Snacks',
    branch: 'Downtown',
    product: 'Protein Chips BBQ',
    vendorNo: 'VEND-7654',
    content: '100g Pack',
    taxCategory: 'Standard',
    status: 'Active',
  },
  {
    id: 9,
    category: 'Beverages',
    branch: 'Airport Branch',
    product: 'Iced Coffee Vanilla',
    vendorNo: 'VEND-5432',
    content: '250ml Cup',
    taxCategory: 'Reduced',
    status: 'Inactive',
  },
  {
    id: 10,
    category: 'Heat and Eat',
    branch: 'City Center',
    product: 'Chicken Alfredo Pasta',
    vendorNo: 'VEND-7777',
    content: '1 Serving',
    taxCategory: 'Standard',
    status: 'Active',
  },
]

const Page = () => {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [productInput, setProductInput] = useState({
    category: '',
    branch: '',
    product: '',
    vendorNo: '',
    content: '',
    taxCategory: '',
    status: 'Active',
  })
  const [deleteModal, setDeleteModal] = useState(false)
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) {
      setProductInput(products[index])
    } else {
      setProductInput({
        category: '',
        branch: '',
        product: '',
        vendorNo: '',
        content: '',
        taxCategory: '',
        status: 'Active',
      })
    }

    setModalOpen(true)
  }
  const saveProduct = () => {
    if (!productInput.product.trim()) return
    if (modalType === 'create') {
      setProducts([...products, { ...productInput, id: Date.now() }])
    }
    if (modalType === 'edit' && selectedIndex !== null) {
      const updated = [...products]
      updated[selectedIndex] = { ...productInput }
      setProducts(updated)
    }
    setModalOpen(false)
  }
  const openDeleteModal = (index) => {
    setSelectedIndex(index)
    setDeleteModal(true)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const confirmDelete = () => {
    const updated = products.filter((_, i) => i !== selectedIndex)
    setProducts(updated)
    setDeleteModal(false)
  }
  const filteredProducts = useMemo(() => {
    return products?.filter((p) => p.product.toLowerCase().includes(search.toLowerCase()))
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
            <th>Category</th>
            <th>Branch</th>
            <th>Product</th>
            <th>Vendor No</th>
            <th>Content</th>
            <th>Tax Category</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.length > 0 ? (
            paginated.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.category}</td>
                <td>{prod.branch}</td>
                <td>{prod.product}</td>
                <td>{prod.vendorNo}</td>
                <td>{prod.content}</td>
                <td>{prod.taxCategory}</td>
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
              <td colSpan="9" className="text-center text-muted py-4">
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
            <Input type="text" value={productInput.product} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Category</Label>
            <Input type="text" value={productInput.category} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Branch</Label>
            <Input type="text" value={productInput.branch} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Vendor No</Label>
            <Input type="text" value={productInput.vendorNo} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Content</Label>
            <Input type="text" value={productInput.content} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Tax Category</Label>
            <Input type="text" value={productInput.taxCategory} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <Input type="select" value={productInput.status} onChange={handleInputChange}>
              <option value="Active">Active</option>
              <option value="Synced">Synced</option>
              <option value="Inactive">Inactive</option>
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

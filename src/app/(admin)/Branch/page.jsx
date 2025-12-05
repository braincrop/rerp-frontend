'use client'
import React, { useState, useMemo } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, 
  Input, FormGroup, Label, Row, Col } from 'reactstrap';
import { Icon } from '@iconify/react'

const initialProducts = [
  {
    id: 1,
    name: 'IB 10 - The One at University City',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'public',
    mobileOrdering: 'true',
  },
  {
    id: 2,
    name: 'IB 11 - Alluvion Las Olas',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'private',
    mobileOrdering: 'false',
  },
  {
    id: 3,
    name: 'IB 16 - Memorial Healthcare System Corporate Office',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'private',
    mobileOrdering: 'false',
  },
  {
    id: 4,
    name: 'IB 17 - UM School of Law',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'public',
    mobileOrdering: 'true',
  },
  {
    id: 5,
    name: 'IB 15 - UHealth at Plantation',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'public',
    mobileOrdering: 'true',
  },
  {
    id: 6,
    name: 'IB 23 - Baptist Hospital',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'public',
    mobileOrdering: 'true',
  },
  {
    id: 7,
    name: 'IB 30 - UM Stanford Residential Hall',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'private',
    mobileOrdering: 'true',
  },
  {
    id: 8,
    name: 'IB 31 - Broward Health Coral Springs',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'private',
    mobileOrdering: 'true',
  },
  {
    id: 9,
    name: 'IB 35 - UM School of Architecture',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'private',
    mobileOrdering: 'true',
  },
  {
    id: 10,
    name: 'IB 33 - Memorial Regional Hospital South',
    revenueCenter: 'Vending Machine',
    ui: 'Vendron',
    accessibility: 'private',
    mobileOrdering: 'true',
  },
]

const Page = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productInput, setProductInput] = useState({
    name: '',
    revenueCenter: '',
    ui: '',
    accessibility: '',
    mobileOrdering: '',
  })
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) {
      setProductInput(products[index])
    } else {
      setProductInput({
        name: '',
        revenueCenter: '',
        ui: '',
        accessibility: '',
        mobileOrdering: '',
      })
    }
    setModalOpen(true)
  }

  const saveProduct = () => {
    if (!productInput.name.trim()) return
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

  // Confirm Delete
  const confirmDelete = () => {
    const updated = products.filter((_, i) => i !== selectedIndex)
    setProducts(updated)
    setDeleteModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductInput((prev) => ({ ...prev, [name]: value }))
  }
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, products])
  const paginated = filteredProducts.slice(0, itemsPerPage)

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md="2">
          <Input type="text" placeholder="Search branch..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
            <th>Name</th>
            <th>Revenue Center</th>
            <th>UI</th>
            <th>Accessibility</th>
            <th>Mobile Ordering</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? (
            paginated.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.revenueCenter}</td>
                <td>{prod.ui}</td>
                <td>{prod.accessibility}</td>
                <td>{prod.mobileOrdering}</td>
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
              <td colSpan="7" className="text-center text-muted py-4">
                No Branch Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal isOpen={modalOpen} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>{modalType === 'create' ? 'Create Branch' : 'Edit Branch'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Name</Label>
            <Input name="name" value={productInput.name} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Revenue Center</Label>
            <Input name="revenueCenter" value={productInput.revenueCenter} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>UI</Label>
            <Input name="ui" value={productInput.ui} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Accessibility</Label>
            <Input name="accessibility" value={productInput.accessibility} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Mobile Ordering</Label>
            <Input name="mobileOrdering" value={productInput.mobileOrdering} onChange={handleInputChange} />
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
      <Modal isOpen={deleteModal} centered>
        <ModalHeader>Delete Branch</ModalHeader>
        <ModalBody>Are you sure you want to delete this Branch?</ModalBody>

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

export default Page;

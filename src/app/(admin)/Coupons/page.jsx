'use client'
import React, { useState, useMemo } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'

const initialProducts = [
  {
    id: 1,
    code: 'EYW198',
    amount: "5.00",
    maxdiscount: "10.00",
    minamount: "1.00",
    used: 'false',
    expiredate: '2023-12-31',
  },
  {
    id: 2,
    code: 'KDP442',
    amount: "8.00",
    maxdiscount: "15.00",
    minamount: "3.00",
    used: 'true',
    expiredate: '2024-01-15',
  },
  {
    id: 3,
    code: 'QWL553',
    amount: "12.00",
    maxdiscount: "20.00",
    minamount: "5.00",
    used: 'false',
    expiredate: '2024-02-10',
  },
  {
    id: 4,
    code: 'ZMX821',
    amount: "7.00",
    maxdiscount: "14.00",
    minamount: "2.00",
    used: 'false',
    expiredate: '2024-03-01',
  },
  {
    id: 5,
    code: 'PLR199',
    amount: "10.00",
    maxdiscount: "18.00",
    minamount: "4.00",
    used: 'true',
    expiredate: '2024-04-12',
  },
  {
    id: 6,
    code: 'HQT662',
    amount: "15.00",
    maxdiscount: "25.00",
    minamount: "6.00",
    used: 'false',
    expiredate: '2024-05-20',
  },
  {
    id: 7,
    code: 'MDX744',
    amount: "9.00",
    maxdiscount: "16.00",
    minamount: "3.50",
    used: 'false',
    expiredate: '2024-06-30',
  },
  {
    id: 8,
    code: 'BRP900',
    amount: "6.50",
    maxdiscount: "12.00",
    minamount: "2.50",
    used: 'true',
    expiredate: '2024-07-18',
  },
  {
    id: 9,
    code: 'VFW310',
    amount: "4.00",
    maxdiscount: "9.00",
    minamount: "1.50",
    used: 'false',
    expiredate: '2024-08-05',
  },
  {
    id: 10,
    code: 'TXA555',
    amount: "20.00",
    maxdiscount: "30.00",
    minamount: "10.00",
    used: 'false',
    expiredate: '2024-09-25',
  },
];


const Page = () => {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleted,setDeleted] = useState('');
  const [used,setUsed] = useState('');
  const [productInput, setProductInput] = useState({
    code: '',
    amount: '',
    maxdiscount: '',
    minamount: '',
    used: '',
    expiredate: '',
  })
  const [deleteModal, setDeleteModal] = useState(false)
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) {
      setProductInput(products[index])
    } else {
      setProductInput({
        code: '',
        amount: '',
        maxdiscount: '',
        minamount: '',
        used: '',
        expiredate: '',
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
    return products?.filter((p) => p.amount.toLowerCase().includes(search.toLowerCase()))
  }, [search, products])

  const paginated = filteredProducts.slice(0, itemsPerPage)

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md="2">
          <Input type="text" placeholder="Amount$..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col md="2">
            <Input type="select" value={deleted} onChange={(e) => setDeleted(e.target.value)}>
            <option value='' disabled>--IsDeleted--</option>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </Input>
        </Col>
         <Col md="2">
            <Input type="select" value={used} onChange={(e) => setUsed(e.target.value)}>
            <option value='' disabled>--IsUsed--</option>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </Input>
        </Col>
        <Col md="2">
          <Input type="select" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Input>
        </Col>
        <Col md="4" className="text-end">
          <Button color="primary" onClick={() => openModal('create')} className='me-1'>
            <Icon icon="mdi:plus" width={18} className="me-1" />
            Add Coupon
          </Button>
          <Button color="primary" onClick={() => openModal('create')}>
            <Icon icon="mdi:plus" width={18} className="me-1" />
            Multiple Coupon
          </Button>
        </Col>
      </Row>
      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Amount</th>
            <th>Max Discount</th>
            <th>Min Amount</th>
            <th>used</th>
            <th>Expire Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.length > 0 ? (
            paginated.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.code}</td>
                <td>{prod.amount}</td>
                <td>{prod.maxdiscount}</td>
                <td>{prod.minamount}</td>
                <td>{prod.used}</td>
                <td>{prod.expiredate}</td>
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
        <ModalHeader>Delete Coupon</ModalHeader>
        <ModalBody>Are you sure you want to delete this Coupon?</ModalBody>
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

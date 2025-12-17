'use client'
import React, { useState, useMemo } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'

const initialProducts = [
  {
    id: 1,
    branch: "IB 39 - Starwood Capital Group",
    eeid: "001795",
    name: "Alcide, Edley",
    email: "Ealcide@LnrPartners.com",
    workphone: "+13056955541",
    employed: "true",
  },
  {
    id: 2,
    branch: "IB 0 - Test Machine",
    eeid: "001234",
    name: "Khan, Ahmed",
    email: "m.ahmed@braincrop.net",
    workphone: "+17864714000",
    employed: "false",
  },
  {
    id: 3,
    branch: "IB 21 - GreenStone Finance",
    eeid: "002156",
    name: "Smith, John",
    email: "john.smith@greenstone.com",
    workphone: "+14051234567",
    employed: "true",
  },
  {
    id: 4,
    branch: "IB 12 - NovaTech Solutions",
    eeid: "003478",
    name: "Brown, Alice",
    email: "alice.brown@novatech.com",
    workphone: "+18134566789",
    employed: "true",
  },
  {
    id: 5,
    branch: "IB 89 - SilverLake Advisors",
    eeid: "004789",
    name: "Lee, Michael",
    email: "michael.lee@silverlake.com",
    workphone: "+15025557788",
    employed: "false",
  },
  {
    id: 6,
    branch: "IB 44 - Alpha Holdings",
    eeid: "005321",
    name: "Garcia, Maria",
    email: "maria.garcia@alpha.com",
    workphone: "+12068990011",
    employed: "true",
  },
  {
    id: 7,
    branch: "IB 17 - Global Equity Corp",
    eeid: "006432",
    name: "Wilson, David",
    email: "david.wilson@gecorp.com",
    workphone: "+16034567899",
    employed: "true",
  },
  {
    id: 8,
    branch: "IB 5 - Horizon Investments",
    eeid: "007543",
    name: "Taylor, Emma",
    email: "emma.taylor@horizon.com",
    workphone: "+17045556677",
    employed: "false",
  },
  {
    id: 9,
    branch: "IB 33 - BluePeak Partners",
    eeid: "008654",
    name: "Johnson, Robert",
    email: "robert.j@bluepeak.com",
    workphone: "+19056667788",
    employed: "true",
  },
  {
    id: 10,
    branch: "IB 61 - Apex Dynamics",
    eeid: "009765",
    name: "Martinez, Sofia",
    email: "sofia.m@apexdynamics.com",
    workphone: "+13046665544",
    employed: "false",
  },
];


const Page = () => {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [productInput, setProductInput] = useState({
    branch: '',
    eeid: '',
    name: '',
    email: '',
    workphone: '',
    employed: '',
  })
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) {
      setProductInput(products[index])
    } else {
      setProductInput({
        branch: '',
        eeid: '',
        name: '',
        email: '',
        workphone: '',
        employed: '',
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
          <Button color="primary" onClick={() => openModal('create')} className='me-1'>
            <Icon icon="mdi:file-upload-outline" width={18}  className='me-2'/>
            Upload File
          </Button>
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
            <th>Branch</th>
            <th>EEID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Workphone</th>
            <th>Employed</th>   
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? (
            paginated.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.branch}</td>
                <td>{prod.eeid}</td>
                <td>{prod.name}</td>
                <td>{prod.email}</td>
                <td>{prod.workphone}</td>
                <td>{prod.employed}</td>
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
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal isOpen={modalOpen} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>{modalType === 'create' ? 'Create Branch' : 'Edit Branch'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Branch</Label>
            <Input name="branch" value={productInput.branch} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>EE ID</Label>
            <Input name="eeid" value={productInput.eeid} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Name</Label>
            <Input name="name" value={productInput.name} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" value={productInput.email} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Work Phone</Label>
            <Input name="workphone" value={productInput.workphone} onChange={handleInputChange} />
          </FormGroup>
           <FormGroup>
            <Label>Employed</Label>
            <Input name="employed" value={productInput.employed} onChange={handleInputChange} />
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
        <ModalHeader>Delete Employee</ModalHeader>
        <ModalBody>Are you sure you want to delete this Employee?</ModalBody>
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

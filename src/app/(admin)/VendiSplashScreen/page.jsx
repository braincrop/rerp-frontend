'use client'
import React, { useState, useMemo } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'

const initialProducts = [
  {
    id: 1,
    name: 'Promotion Offer',
    path: 'https://rerp.braincrop.net/videos/promotion.mp4',
    createdon: '7/17/2023 2:45:25 AM',
    starttime: '7/16/2023 10:00:00 AM',
    endtime: '7/16/2023 10:00:00 AM',
    memo: '',
    isDeleted: 'false',
  },
  {
    id: 2,
    name: 'Winter Sale Launch',
    path: 'https://rerp.braincrop.net/videos/wintersale.mp4',
    createdon: '8/05/2023 11:12:10 AM',
    starttime: '8/10/2023 9:00:00 AM',
    endtime: '8/20/2023 9:00:00 PM',
    memo: 'Winter discount ad',
    isDeleted: 'false',
  },
  {
    id: 3,
    name: 'New Product Intro',
    path: 'https://rerp.braincrop.net/videos/product_intro.mp4',
    createdon: '9/12/2023 4:30:48 PM',
    starttime: '9/15/2023 8:00:00 AM',
    endtime: '9/25/2023 8:00:00 AM',
    memo: '',
    isDeleted: 'false',
  },
  {
    id: 4,
    name: 'Holiday Greetings',
    path: 'https://rerp.braincrop.net/videos/holiday_greetings.mp4',
    createdon: '12/01/2023 6:25:05 PM',
    starttime: '12/15/2023 6:00:00 PM',
    endtime: '12/31/2023 11:59:59 PM',
    memo: 'Seasonal Event',
    isDeleted: 'true',
  },
  {
    id: 5,
    name: 'Flash Deal Weekend',
    path: 'https://rerp.braincrop.net/videos/flashdeal.mp4',
    createdon: '3/04/2024 1:14:59 PM',
    starttime: '3/05/2024 12:00:00 PM',
    endtime: '3/07/2024 12:00:00 PM',
    memo: '',
    isDeleted: 'false',
  },
  {
    id: 6,
    name: 'Training Session Recording',
    path: 'https://rerp.braincrop.net/videos/training.mp4',
    createdon: '5/18/2024 9:55:40 AM',
    starttime: '5/20/2024 10:00:00 AM',
    endtime: '5/20/2024 12:00:00 PM',
    memo: 'Internal Staff Training',
    isDeleted: 'false',
  },
  {
    id: 7,
    name: 'Special Event Coverage',
    path: 'https://rerp.braincrop.net/videos/event.mp4',
    createdon: '6/02/2024 8:47:13 PM',
    starttime: '6/03/2024 9:00:00 AM',
    endtime: '6/03/2024 5:00:00 PM',
    memo: '',
    isDeleted: 'false',
  },
  {
    id: 8,
    name: 'Press Release Video',
    path: 'https://rerp.braincrop.net/videos/press_release.mp4',
    createdon: '4/22/2024 7:30:23 AM',
    starttime: '4/22/2024 08:00:00 AM',
    endtime: '4/25/2024 08:00:00 PM',
    memo: 'Media announcement',
    isDeleted: 'true',
  },
  {
    id: 9,
    name: 'Client Testimonial',
    path: 'https://rerp.braincrop.net/videos/testimonial.mp4',
    createdon: '2/10/2024 2:20:57 PM',
    starttime: '2/12/2024 10:00:00 AM',
    endtime: '2/20/2024 09:00:00 PM',
    memo: '',
    isDeleted: 'false',
  },
  {
    id: 10,
    name: 'Annual Review Highlights',
    path: 'https://rerp.braincrop.net/videos/review_highlights.mp4',
    createdon: '1/25/2024 5:17:41 PM',
    starttime: '1/30/2024 09:00:00 AM',
    endtime: '2/02/2024 06:00:00 PM',
    memo: 'Yearly company achievements',
    isDeleted: 'false',
  },
]

const Page = () => {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [productInput, setProductInput] = useState({
    name: '',
    path: '',
    starttime: '',
    endtime: '',
  })
  const openModal = (type, index = null) => {
    setModalType(type)
    setSelectedIndex(index)
    if (type === 'edit' && index !== null) {
      setProductInput(products[index])
    } else {
      setProductInput({
        name: '',
        path: '',
        starttime: '',
        endtime: '',
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
    const { name, value, files } = e.target

    setProductInput((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, products])
  const paginated = filteredProducts.slice(0, itemsPerPage)

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md="2">
          <Input type="text" placeholder="Search Screen..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
            <th>Path</th>
            <th>CreatedOn</th>
            <th>StartTime</th>
            <th>EndTime</th>
            {/* <th>Memo</th> */}
            <th>Is Deleted</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.length > 0 ? (
            paginated.map((prod, index) => (
              <tr key={prod.id}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.path}</td>
                <td>{prod.createdon}</td>
                <td>{prod.starttime.trim()}</td>
                <td>{prod.endtime.trim()}</td>
                {/* <td>{prod.memo}</td> */}
                <td>{prod.isDeleted}</td>

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
                No Splash Screen
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
            <Input type="text" name="name" value={productInput.name} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>File</Label>
            <Input type="file" name="file" onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>Start Time</Label>
            <Input type="datetime-local" name="starttime" value={productInput.starttime} onChange={handleInputChange} />
          </FormGroup>

          <FormGroup>
            <Label>End Time</Label>
            <Input type="datetime-local" name="endtime" value={productInput.endtime} onChange={handleInputChange} />
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
        <ModalHeader>Delete Splash Screen</ModalHeader>
        <ModalBody>Are you sure you want to delete this Splash Screen?</ModalBody>

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

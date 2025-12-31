'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import CreateProduct from '../../../components/CreateProduct/createproduct'
import { allProducts, DeleteProductData, GetAllProduct } from '@/redux/slice/Products/productSlice'

const Page = () => {
  const { product, loading } = useSelector(allProducts)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalType, setModalType] = useState('create')

  useEffect(() => {
    dispatch(GetAllProduct())
  }, [])
  const openDeleteModal = (index) => {
    setSelectedIndex(index)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    setDeleteModal(false)
    dispatch(DeleteProductData(selectedIndex))
  }
  const openModal = (type, product = null) => {
    console.log('edit-data', product)
    setModalType(type)
    setSelectedProduct(product)
    setShow(true)
  }
  const handleToggleShow = () => {
    if (modalType === 'edit' || show) {
      setShow(false)
      setSelectedProduct(null)
      setModalType('')
    } else {
      setShow(true)
      setModalType('create')
    }
  }
  const filteredProducts = useMemo(() => {
    return product.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, product])
  const paginated = filteredProducts.slice(0, itemsPerPage)

  return (
    <Container className="mt-5">
      <Row className="mb-4 align-items-center">
        {!show && (
          <Col xs="12" md="6" className="mb-2 mb-md-0">
            <div className="d-flex flex-column flex-sm-row gap-2">
              <Input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <Input type="select" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </Input>
            </div>
          </Col>
        )}

        <Col xs="12" md={show ? '12' : '6'}>
          <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-end gap-2">
            <Button color="primary" onClick={handleToggleShow}>
              <Icon icon="mdi:plus" width={18} className="me-1" />
              {modalType === 'edit' || show ? 'View List' : 'Add Product'}
            </Button>
          </div>
        </Col>
      </Row>

      {show ? (
        <CreateProduct setShow={setShow} selectedProduct={selectedProduct} modalType={modalType} />
      ) : (
        <Table bordered hover responsive className="shadow-sm rounded">
          <thead className="table-light align-middle">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Memo</th>
              <th>Ingredients</th>
              <th>Shelf Life</th>
              <th>Base Price</th>
              <th>Sell Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="12" className="text-center py-4">
                  <Spinner size="sm" className="me-2" />
                  Loading products...
                </td>
              </tr>
            ) : paginated?.length > 0 ? (
              paginated.map((prod, index) => (
                <tr key={prod.dpid}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {prod.imagePath && (
                        <img
                          src={prod.imagePath}
                          alt={prod.name}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            marginRight: 10,
                            borderRadius: 6,
                          }}
                        />
                      )}
                      <div>
                        <div className="fw-bold">{prod.name}</div>
                        <small className="text-muted">{prod.productDescription}</small>
                      </div>
                    </div>
                  </td>
                  <td>{prod.memo || '-'}</td>
                  <td>{prod.ingredients || '-'}</td>
                  <td>{prod.shelfLife || '-'}</td>
                  <td>{prod.basePrice}</td>
                  <td>{prod.sellPrice}</td>
                  <td className="text-center">
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                      <Button color="warning" size="sm" className="text-white w-md-auto" onClick={() => openModal('edit', prod)}>
                        <Icon icon="mdi:pencil" width={16} />
                      </Button>
                      <Button color="danger" size="sm" className="text-white w-md-auto" onClick={() => openDeleteModal(prod.dpid)}>
                        <Icon icon="mdi:delete" width={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-muted py-4">
                  No Product Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

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

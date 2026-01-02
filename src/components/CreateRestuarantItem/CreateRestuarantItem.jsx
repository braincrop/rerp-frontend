import React, { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap'
import Select from 'react-select'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { allBranch, GetAllBranch } from '@/redux/slice/Branch/branchSlice'
import { allCategories, GetSingleCategory } from '@/redux/slice/categories/CategorySlice'
import { allProducts, GetSingleProduct } from '@/redux/slice/Products/productSlice';

const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#22282e',
    borderColor: '#3a4551',
    color: '#fff',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#22282e',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#333' : '#22282e',
    color: '#fff',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#333',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#fff',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff',
  }),
}

const CreateRestuarantItem = () => {
  const dispatch = useDispatch()
  const { branch } = useSelector(allBranch)
  const { singleCat } = useSelector(allCategories)
  const { singleProduct, loading } = useSelector(allProducts)
  const [branchId, setBranchId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    barcode: '',
    buyPrice: '',
    sellPrice: '',
  })
  useEffect(() => {
    dispatch(GetAllBranch())
  }, [])

  const productOptions = [].concat(singleProduct || []).map((p) => ({
    value: p.dpid,
    label: p.name,
  }))

  const handleCreateProduct = async () => {
    const payload = {
      name: newProduct.name,
      barcode: newProduct.barcode,
      buyPrice: Number(newProduct.buyPrice),
      sellPrice: Number(newProduct.sellPrice),
      itemSubCategoryIds: [categoryId],
    }
    const res = await dispatch(PostRestuarantItemData(payload)).unwrap()
    await dispatch(GetProductsByCategory(categoryId))
    setSelectedProducts((prev) => [...prev, { value: res.data.restaurantItemID, label: res.data.name }])
    setShowCreateModal(false)
    setNewProduct({ name: '', barcode: '', buyPrice: '', sellPrice: '' })
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="bg-primary text-white">
          <h5 className="mb-0">
            <Icon icon="mdi:food" className="me-2" />
            Create Restaurant Item
          </h5>
        </CardHeader>
        <CardBody>
          <Row className="g-3">
            <Col md={4}>
              <FormGroup>
                <Label>Branch</Label>
                <Input
                  type="select"
                  value={branchId}
                  onChange={(e) => {
                    setBranchId(e.target.value)
                    setCategoryId('')
                    setSelectedProducts([])
                    dispatch(GetSingleCategory(e.target.value))
                  }}>
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {branch?.map((b) => (
                    <option key={b.branchId} value={b.branchId}>
                      {b.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Category</Label>
                <Input
                  type="select"
                  value={categoryId}
                  disabled={!branchId}
                  onChange={(e) => {
                    setCategoryId(e.target.value)
                    dispatch(GetSingleProduct(e.target.value))
                  }}>
                  <option value="" disabled>
                    Select Category
                  </option>
                  {[].concat(singleCat || []).map((cat) => (
                    <option key={cat.dcid} value={cat.dcid}>
                      {cat.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Products</Label>
                <Select
                  isMulti
                  isSearchable
                  options={productOptions}
                  value={selectedProducts}
                  isLoading={loading}
                  onChange={setSelectedProducts}
                  onInputChange={setSearchText}
                  placeholder="Search or select products..."
                  noOptionsMessage={() => (
                    <div className="text-center p-2">
                      <p className="mb-2">No product found</p>
                      <Button size="sm" color="primary" onClick={() => setShowCreateModal(true)}>
                        <Icon icon="mdi:plus" className="me-1" />
                        Create New
                      </Button>
                    </div>
                  )}
                  styles={customSelectStyles}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={showCreateModal} centered>
        <ModalHeader toggle={() => setShowCreateModal(false)}>Create New Product</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Product Name</Label>
            <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label>Barcode</Label>
            <Input value={newProduct.barcode} onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })} />
          </FormGroup>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Buy Price</Label>
                <Input type="number" value={newProduct.buyPrice} onChange={(e) => setNewProduct({ ...newProduct, buyPrice: e.target.value })} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Sell Price</Label>
                <Input type="number" value={newProduct.sellPrice} onChange={(e) => setNewProduct({ ...newProduct, sellPrice: e.target.value })} />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleCreateProduct}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default CreateRestuarantItem

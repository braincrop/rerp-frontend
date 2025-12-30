import { PostProduct, UpdatedProduct } from '@/redux/slice/Products/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postImage } from '@/api/ImagesApi/imageHelperApi'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import Notify from '../../components/Notify'

const CreateProduct = ({ setShow, selectedProduct, modalType }) => {
  const dispatch = useDispatch()
  const [productInput, setProductInput] = useState({
    name: '',
    memo: '',
    imagePath: '',
    imagePathNf: '',
    productDescription: '',
    ingredients: '',
    productContains: '',
    shelfLife: '',
    basePrice: '',
    sellPrice: '',
    barcode: '',
    taxApplied: '',
    categoryIds: '',
  })

  useEffect(() => {
  if (modalType === 'edit' && selectedProduct) {
    setProductInput({
      name: selectedProduct.name ?? '',
      memo: selectedProduct.memo ?? '',
      imagePath: selectedProduct.imagePath ?? '',
      imagePathNf: selectedProduct.imagePathNf ?? '',
      productDescription: selectedProduct.productDescription ?? '',
      ingredients: selectedProduct.ingredients ?? '',
      productContains: selectedProduct.productContains ?? '',
      shelfLife: selectedProduct.shelfLife ?? '',
      basePrice: selectedProduct.basePrice ?? '',
      sellPrice: selectedProduct.sellPrice ?? '',
      barcode: selectedProduct.barcode ?? '',
      taxApplied: selectedProduct.taxApplied ?? '',
      categoryIds: selectedProduct.categoryIds
        ? selectedProduct.categoryIds.join(',')
        : '',
    })
  }
}, [selectedProduct, modalType])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductInput({ ...productInput, [name]: value })
  }
  const uploadImage = async (file, fieldName) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await postImage(formData)
      setProductInput((prev) => ({
        ...prev,
        [fieldName]: res?.url,
      }))
    } catch (err) {
      console.error(err)
    }
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target
    if (files?.length) {
      uploadImage(files[0], name)
    }
  }
  const validateForm = () => {
    if (!productInput.name?.trim()) {
      Notify('error', 'Product name is required')
      return false
    }
    if (!productInput.memo?.trim()) {
      Notify('error', 'Memo is required')
      return false
    }
    if (!productInput?.imagePath) {
      Notify('error', 'Product image is required')
      return false
    }
    if (!productInput?.imagePathNf) {
      Notify('error', 'Product NF image is required')
      return false
    }
    if (!productInput.ingredients?.trim()) {
      Notify('error', 'Ingredients are required')
      return false
    }
    if (!productInput.productContains?.trim()) {
      Notify('error', 'Product contains is required')
      return false
    }
    if (!productInput.shelfLife?.trim()) {
      Notify('error', 'Shelf life is required')
      return false
    }
    if (!productInput?.basePrice) {
      Notify('error', 'Base price is required')
      return false
    }
    if (!productInput.sellPrice) {
      Notify('error', 'Sell price is required')
      return false
    }
    if (!productInput.barcode?.trim()) {
      Notify('error', 'Barcode is required')
      return false
    }
    if (!productInput.taxApplied) {
      Notify('error', 'Tax is required')
      return false
    }

    if (!productInput.categoryIds?.trim()) {
      Notify('error', 'Category IDs are required')
      return false
    }

    if (!productInput.productDescription?.trim()) {
      Notify('error', 'Description is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const payload = {
      ...productInput,
      basePrice: Number(productInput.basePrice),
      sellPrice: Number(productInput.sellPrice),
      taxApplied: Number(productInput.taxApplied),
      categoryIds: productInput.categoryIds.split(',').map((id) => Number(id.trim())),
    }
    try {
    if (modalType === 'create') {
      const resultAction = await dispatch(PostProduct(payload))
      if (PostProduct.fulfilled.match(resultAction)) {
        setShow(false)
      } else {
        Notify('error', resultAction.payload || 'Failed to create product')
      }
    } else if (modalType === 'edit') {
      const updatedData = { ...payload }
      const productId = selectedProduct.dpid
      const data = {
        dpid: productId,
        updatedData: updatedData,
      }
      const resultAction = await dispatch(UpdatedProduct(data))
      if (UpdatedProduct.fulfilled.match(resultAction)) {
        setShow(false)
      } else {
        Notify('error', resultAction.payload || 'Failed to update product')
      }
    }
  } catch (error) {
    console.error('Product operation failed:', error)
    Notify('error', 'Something went wrong')
  }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md={3}>
          <FormGroup>
            <Label>Product Name</Label>
            <Input name="name" value={productInput.name} onChange={handleChange} required />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Memo</Label>
            <Input name="memo" value={productInput.memo} onChange={handleChange} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Product Image</Label>
            <Input type="file" name="imagePath" onChange={handleImageChange} />
            {productInput.imagePath && <img src={productInput.imagePath} alt="product" width={60} className="mt-1 rounded" />}
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Product Nf Image</Label>
            <Input type="file" name="imagePathNf" onChange={handleImageChange} />
            {productInput.imagePathNf && <img src={productInput.imagePathNf} alt="product-nf" width={60} className="mt-1 rounded" />}
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Ingredients</Label>
            <Input name="ingredients" value={productInput.ingredients} onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Product Contains</Label>
            <Input name="productContains" value={productInput.productContains} onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Category IDs</Label>
            <Input name="categoryIds" value={productInput.categoryIds} onChange={handleChange} placeholder="1,2,3" />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Shelf Life</Label>
            <Input name="shelfLife" value={productInput.shelfLife} onChange={handleChange} placeholder="12 months" />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Base Price</Label>
            <Input type="number" name="basePrice" value={productInput.basePrice} onChange={handleChange} required />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Sell Price</Label>
            <Input type="number" name="sellPrice" value={productInput.sellPrice} onChange={handleChange} required />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Barcode</Label>
            <Input name="barcode" value={productInput.barcode} onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Tax Applied (%)</Label>
            <Input type="number" name="taxApplied" value={productInput.taxApplied} onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Product Description</Label>
            <Input type="textarea" name="productDescription" value={productInput.productDescription} onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={12} className="text-end">
          <Button color="primary" type="submit">
            {modalType === 'create' ? 'Create Product' : 'Update Product'}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateProduct

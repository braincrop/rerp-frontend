import { allProducts, GetSingleProduct, PostProduct, UpdatedProduct } from '@/redux/slice/Products/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { postImage } from '@/api/ImagesApi/imageHelperApi'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import Notify from '../../components/Notify'
import { allCategories, GetAllCategory } from '@/redux/slice/categories/CategorySlice'

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
const CreateProduct = ({ setShow, selectedProduct, modalType }) => {
  const dispatch = useDispatch()
  const { singleProduct } = useSelector(allProducts)
  const { category } = useSelector(allCategories)
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
    sku: '',
    taxApplied: '',
    categoryIds: [],
  })

  useEffect(() => {
    if (modalType === 'edit') {
      dispatch(GetSingleProduct(selectedProduct?.dpid))
    }
  }, [])

  useEffect(() => {
    if (modalType === 'edit' && singleProduct) {
      setProductInput({
        name: singleProduct.name ?? '',
        memo: singleProduct.memo ?? '',
        imagePath: singleProduct.imagePath ?? '',
        imagePathNf: singleProduct.imagePathNf ?? '',
        productDescription: singleProduct.productDescription ?? '',
        ingredients: singleProduct.ingredients ?? '',
        productContains: singleProduct.productContains ?? '',
        shelfLife: singleProduct.shelfLife ?? '',
        basePrice: singleProduct.basePrice ?? '',
        sellPrice: singleProduct.sellPrice ?? '',
        sku: singleProduct.sku ?? '',
        taxApplied: singleProduct.taxApplied ?? '',
        categoryIds: Array.isArray(singleProduct.categoryIds)
          ? singleProduct.categoryIds.map(Number)
          : typeof singleProduct.categoryIds === 'string'
            ? singleProduct.categoryIds.split(',').map(Number)
            : [],
      })
    }
  }, [singleProduct, modalType])

  useEffect(() => {
    dispatch(GetAllCategory())
  }, [])

  const categoryOptions = category?.map((cat) => ({
    value: cat.dcid,
    label: cat.name,
  }))

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
        [fieldName]: res?.data.url,
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
    if (!productInput.categoryIds) {
      Notify('error', 'Category IDs are required')
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
        const payload = {
          ...productInput,
          basePrice: Number(productInput.basePrice),
          sellPrice: Number(productInput.sellPrice),
          taxApplied: Number(productInput.taxApplied),
        }
        const updatedData = {
          name: payload.name,
          memo: payload.memo,
          basePrice: payload.basePrice,
          sellPrice: payload.sellPrice,
          sku: payload.sku,
          shelfLife: payload.shelfLife,
          ingredients: payload.ingredients,
          productContains: payload.productContains,
          productDescription: payload.productDescription,
          imagePath: payload.imagePath,
          imagePathNf: payload.imagePathNf,
          taxApplied: payload.taxApplied,
          categoryIds: payload.categoryIds.map((id) => Number(id)),
        }
        const data = {
          dpid: selectedProduct.dpid,
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
            <Label>
              Product Name <span style={{ color: '#e57373' }}>*</span>
            </Label>
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
            <Label>
              Category IDs <span style={{ color: '#e57373' }}>*</span>
            </Label>
            <Select
              isMulti
              options={categoryOptions}
              value={categoryOptions.filter((option) => productInput.categoryIds.includes(option.value))}
              onChange={(selectedOptions) => setProductInput({ ...productInput, categoryIds: selectedOptions.map((option) => option.value) })}
              styles={customSelectStyles}
              placeholder="Select categories..."
            />
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
            <Input type="number" name="basePrice" value={productInput.basePrice} onChange={handleChange} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Sell Price</Label>
            <Input type="number" name="sellPrice" value={productInput.sellPrice} onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>sku</Label>
            <Input name="sku" value={productInput.sku} onChange={handleChange} />
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

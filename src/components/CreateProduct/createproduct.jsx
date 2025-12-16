import React, { useState } from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const CreateProduct = () => {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setProductInput({ ...productInput, [name]: files[0] })
    } else {
      setProductInput({ ...productInput, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...productInput,
      basePrice: Number(productInput.basePrice),
      sellPrice: Number(productInput.sellPrice),
      taxApplied: Number(productInput.taxApplied),
      categoryIds: productInput.categoryIds
        .split(',')
        .map((id) => Number(id.trim())),
    }
    console.log('Final Payload:', payload)
    // 🔥 Make your API call here
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
            <Label>Image (Food)</Label>
            <Input type="file" name="imagePath" onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label>Image (Non-Food)</Label>
            <Input type="file" name="imagePathNf" onChange={handleChange} />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label>Product Description</Label>
            <Input type="textarea" name="productDescription" value={productInput.productDescription} onChange={handleChange} />
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

        <Col md={2}>
          <FormGroup>
            <Label>Shelf Life</Label>
            <Input name="shelfLife" value={productInput.shelfLife} onChange={handleChange} placeholder="12 months" />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <Label>Base Price</Label>
            <Input type="number" name="basePrice" value={productInput.basePrice} onChange={handleChange} required />
          </FormGroup>
        </Col>

        <Col md={2}>
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

        <Col md={12}>
          <FormGroup>
            <Label>Category IDs (comma separated)</Label>
            <Input name="categoryIds" value={productInput.categoryIds} onChange={handleChange} placeholder="1,2,3" />
          </FormGroup>
        </Col>

        <Col md={12} className="text-end">
          <Button color="primary" type="submit">
            Save Product
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateProduct

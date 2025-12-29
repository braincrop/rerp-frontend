'use client'
import { allRestuarantItem, GetRestuarantItem, PostRestuarantItemData } from '@/redux/slice/RestuarantItem/RestuarantItemSlice'
import { useEffect, useState } from 'react'
import { Container, Spinner, FormGroup } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Input, Label, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap'
import { postImage } from '@/api/ImagesApi/imageHelperApi'
import { allProducts, GetAllProduct } from '@/redux/slice/Products/productSlice'
import Notify from '../Notify'

const ItemCategoryView = ({ data, onBack }) => {
  const dispatch = useDispatch()
  const {product} = useSelector(allProducts);
  const { restuarantItem, loading } = useSelector(allRestuarantItem)
  const [modalType, setModalType] = useState('create')
  const [itemInput, setItemInput] = useState({
    barcode: '',
    name: '',
    buyPrice: 0,
    sellPrice: 0,
    distinctProductId: 0,
    imagePath: '',
    itemSubCategoryIds: [data?.itemSubCategoryID],
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (data.itemSubCategoryID) {
      dispatch(GetRestuarantItem(data.itemSubCategoryID))
    }
    dispatch(GetAllProduct())
  }, [])
  console.log('input-data', [data?.itemSubCategoryID])

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setItemInput((prev) => ({
    ...prev,
    [name]: name === 'distinctProductId' ? Number(value) : value,
  }));
};
  const openModal = (type, item = null) => {
    setModalType(type)
    if (type === 'edit' && item) {
      setItemInput({
        barcode: item.barcode || '',
        name: item.name || '',
        buyPrice: item.buyPrice || 0,
        sellprice: item.sellPrice || 0,
        distinctProductId: item.distinctProductId || 0,
        imagePath: item.imagePath || '',
        itemSubCategoryIds: item.itemSubCategoryID || data?.itemSubCategoryID,
      })
    } else {
      setItemInput({
        barcode: '',
        name: '',
        buyPrice: 0,
        sellPrice: 0,
        distinctProductId: 0,
        imagePath: '',
        itemSubCategoryIds: data?.itemSubCategoryID,
      })
    }
    setModalOpen(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await postImage(formData)
      setItemInput((prev) => ({ ...prev, imagePath: res?.url }))
    } catch (error) {
      console.error(error)
      Notify('error', 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }
  const saveItem = async () => {
    if (!itemInput.name.trim()) return Notify('error', 'Item name is required')
    try {
       const payload = {
      ...itemInput,
      buyPrice: Number(itemInput.buyPrice),
      sellPrice: Number(itemInput.sellPrice),
      itemSubCategoryIds: Array.isArray(itemInput.itemSubCategoryIds)
        ? itemInput.itemSubCategoryIds.map(Number)
        : [Number(itemInput.itemSubCategoryIds)]
    }
      const result = await dispatch(PostRestuarantItemData(payload)).unwrap()
      if (PostRestuarantItemData.fulfilled.match(result)){
        setModalOpen(false)
      }
    } catch (error) {
      console.error(error)
      Notify('error', 'Failed to create item')
    }
  }

  console.log('restuarantItem', restuarantItem)

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Restuarant Item</h2>
        <div>
          <Button color="primary" onClick={() => openModal('create')} className="me-1">
            <Icon icon="mdi:plus" width="16" height="16" className="me-1" />
            Create New
          </Button>
          <Button color="primary" onClick={() => onBack()}>
            <Icon icon="mdi:arrow-left" width="16" height="16" className="me-1" />
            Back to Category
          </Button>
        </div>
      </div>
      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Barcode</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Is Perishable</th>
            <th>Is In Catalog</th>
            <th>Tax Category ID</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center py-4">
                <Spinner size="sm" className="me-2" /> Loading items...
              </td>
            </tr>
          ) : restuarantItem?.length > 0 ? (
            restuarantItem.map((item, index) => (
              <tr key={item.restaurantItemID}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.barcode}</td>
                <td>{item.buyPrice}</td>
                <td>{item.sellPrice}</td>
                <td>{item.isPerishable ? 'Yes' : 'No'}</td>
                <td>{item.isInCatalog ? 'Yes' : 'No'}</td>
                <td>{item.taxCategoryId ?? '-'}</td>
                <td>{item.imagePath ? <img src={item.imagePath} alt={item.name} width={50} height={50} className="rounded" /> : '-'}</td>
                <td>
                  <Button color="warning" size="sm" className="me-2 text-white" onClick={() => openModal('edit', item)}>
                    <Icon icon="mdi:pencil" width="16" />
                  </Button>
                  <Button color="danger" size="sm">
                    <Icon icon="mdi:delete" width="16" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-muted py-4">
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal isOpen={modalOpen} centered>
        <ModalHeader toggle={() => setModalOpen(false)}>{modalType === 'create' ? 'Create Item' : 'Edit Item'}</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Barcode</Label>
            <Input name="barcode" value={itemInput.barcode} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Name</Label>
            <Input name="name" value={itemInput.name} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Buy Price</Label>
            <Input name="buyPrice" type="number" value={itemInput.buyPrice} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Sell Price</Label>
            <Input name="sellPrice" type="number" value={itemInput.sellPrice} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Distinct Product</Label>
            <Input type="select" name="distinctProductId" value={itemInput.distinctProductId} onChange={handleInputChange}>
              <option value="" disabled>
                Select Product
              </option>
              {product?.map((product) => (
                <option key={product.dpid} value={product.dpid}>
                  {product.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Image</Label>
            <Input type="file" onChange={handleImageUpload} />
            {uploading && <Spinner size="sm" className="ms-2" />}
            {itemInput.imagePath && <img src={itemInput.imagePath} alt="item" width={60} className="mt-2" />}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={saveItem}>
             {modalType === 'create' ? 'Create' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default ItemCategoryView

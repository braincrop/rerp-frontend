'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'
import { allBranch, GetAllBranch } from '@/redux/slice/Branch/branchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { allItemCategory, GetItemCategory } from '@/redux/slice/ItemCategory/ItemCategorySlice'
import { Spinner } from 'react-bootstrap'
import ItemCategoryView from '../../../components/ItemCategoryView/ItemCategoryView'

const Page = () => {
  const dispatch = useDispatch()
  const { itemCat, loading } = useSelector(allItemCategory)
  const { branch } = useSelector(allBranch)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const itemSubCategories = itemCat || []
  const [branches, setBranch] = useState(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    dispatch(GetAllBranch())
  }, [])

  const getBranches = (id) => {
    setBranch(id)
    if (id) {
      dispatch(
        GetItemCategory({
          BranchId: id,
        }),
      )
    }
  }
  const handleView = (item) => {
    setSelectedCategory(item)
    setIsViewMode(true)
  }

  return (
    <Container className="mt-5">
      {!isViewMode ? (
        <Row className="mb-4">
          <Col md="2">
            <Input type="select" value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </Input>
          </Col>
          <Col md="2">
            <Input type="select" placeholder="Select branch..." value={branches} onChange={(e) => getBranches(Number(e.target.value))}>
              <option selected disabled value={''}>
                Select branch...
              </option>
              {branch?.map((branch) => (
                <option key={branch.branchId} value={branch.branchId}>
                  {branch.name}
                </option>
              ))}
            </Input>
          </Col>
          {/* <Col md="8" className="text-end">
            <Button color="primary">
              <Icon icon="mdi:plus" width={18} className="me-2" />
              Create New
            </Button>
          </Col> */}
        </Row>
      ) : (
        ''
      )}
      {!isViewMode ? (
        <Table bordered hover responsive className="shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Category ID</th>
              <th>Sub Category ID</th>
              <th>Comments</th>
              <th>Image</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!branches ? (
              <tr>
                <td colSpan="7" className="text-center text-warning py-4">
                  ⚠️ Please select a branch first
                </td>
              </tr>
            ) : loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  <Spinner size="sm" className="me-2" />
                  Loading categories...
                </td>
              </tr>
            ) : itemSubCategories?.length > 0 ? (
              itemSubCategories.map((item, index) => (
                <tr key={item.itemSubCategoryID}>
                  <td>{index + 1}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.itemCategoryId}</td>
                  <td>{item.itemSubCategoryID}</td>
                  <td>{item.comments ?? '-'}</td>
                  <td>{item.imagePath ? <img src={item.imagePath} width={40} className="rounded" /> : '-'}</td>
                  <td className="text-center">
                    <Button color="info" size="sm" onClick={() => handleView(item)}>
                      <Icon icon="mdi:eye" width={16} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No Item Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <ItemCategoryView data={selectedCategory} onBack={() => setIsViewMode(false)} />
      )}
    </Container>
  )
}

export default Page

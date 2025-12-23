'use client'
import React, { useState, useMemo, useEffect } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col } from 'reactstrap'
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { allBranch, DeleteBranchData, GetAllBranch, PostBranchData, UpdatedBranch } from '@/redux/slice/Branch/branchSlice'
import { Spinner } from 'react-bootstrap'

const Page = () => {
  const { branch, loading } = useSelector(allBranch)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [BranchInput, setBranchInput] = useState({
    name: '',
    memo: '',
    companyId: '',
    outletAddress: '',
  })

  useEffect(() => {
    dispatch(GetAllBranch())
  }, [])


  const openModal = (type, branch = null) => {
    setModalType(type)
    if (type === 'edit' && branch) {
      setBranchInput({
        name: branch.name || '',
        memo: branch.memo || '',
        companyId: branch.companyId || '',
        outletAddress: branch.outletAddress || '',
        branchId: branch.branchId,
      })
    } else {
      setBranchInput({
        name: '',
        memo: '',
        companyId: '',
        outletAddress: '',
      })
    }
    setModalOpen(true)
  }

  const saveProduct = async () => {
  if (!BranchInput.name?.trim()) {
    Notify('error', 'Branch name is required')
    return
  }
  try {
    let resultAction
    if (modalType === 'create') {
      resultAction = await dispatch(
        PostBranchData({
          name: BranchInput.name,
          memo: BranchInput.memo,
          outletAddress: BranchInput.outletAddress,
        })
      )
      if (PostBranchData.fulfilled.match(resultAction)) {
        setModalOpen(false)
      } else {
        Notify('error', resultAction.payload || 'Failed to create branch')
      }
    }
    if (modalType === 'edit') {
      resultAction = await dispatch(
        UpdatedBranch({
          branchId: BranchInput.branchId,
          updatedData: {
            name: BranchInput.name,
            memo: BranchInput.memo,
            outletAddress: BranchInput.outletAddress,
          },
        })
      )
      if (UpdatedBranch.fulfilled.match(resultAction)) {
        setModalOpen(false)
      } else {
        Notify('error', resultAction.payload || 'Failed to update branch')
      }
    }
  } catch (error) {
    console.error(error)
    Notify('error', 'Something went wrong')
  }
}
  const openDeleteModal = (index) => {
    setSelectedIndex(index)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    dispatch(DeleteBranchData(selectedIndex))
    setDeleteModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBranchInput((prev) => ({ ...prev, [name]: value }))
  }
  const filteredProducts = useMemo(() => {
    return branch.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, branch])
  const paginated = filteredProducts.slice(0, itemsPerPage)

  console.log('branch', branch)
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
          <Button color="primary" onClick={() => openModal('create')}>
            <Icon icon="mdi:plus" width={18} className="me-2" />
            Create New
          </Button>
        </Col>
      </Row>
      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light align-middle">
          <tr>
            <th>#</th>
            <th>Branch Name</th>
            <th>Address</th>
            <th>Memo</th>
            <th>Mobile Ordering</th>
            <th>Revenue Center</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <Spinner size="sm" className="me-2" />
                Loading branches...
              </td>
            </tr>
          ) : branch?.length > 0 ? (
            branch.map((branch, index) => (
              <tr key={branch.branchId}>
                <td>{index + 1}</td>
                <td>{branch.name}</td>
                <td>{branch.outletAddress || '-'}</td>
                <td>{branch.memo || '-'}</td>
                <td>{branch.mobileOrdering === null ? '-' : branch.mobileOrdering ? 'Yes' : 'No'}</td>
                <td>{branch.revenueCenterId || '-'}</td>
                <td className="text-center">
                  <Button color="warning" size="sm" className="me-2 text-white" onClick={() => openModal('edit', branch)}>
                    <Icon icon="mdi:pencil" width={16} />
                  </Button>
                  <Button color="danger" size="sm" onClick={() => openDeleteModal(branch.branchId)}>
                    <Icon icon="mdi:delete" width={16} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                No Branch Found
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
            <Input name="name" value={BranchInput?.name || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>Memo</Label>
            <Input name="memo" value={BranchInput?.memo || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>CompanyId</Label>
            <Input name="companyId" type="number" value={BranchInput?.companyId || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>OutletAddress</Label>
            <Input name="outletAddress" value={BranchInput?.outletAddress || ''} onChange={handleInputChange} />
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
        <ModalHeader>Delete Branch</ModalHeader>
        <ModalBody>Are you sure you want to delete this Branch?</ModalBody>
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

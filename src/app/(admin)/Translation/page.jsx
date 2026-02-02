'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Icon } from '@iconify/react'
import CreateLanguage from '../../../components/CreateLanguage/createLanguage';

const Page = () => {
  const dispatch = useDispatch()
  const [view, setView] = useState('list')
  const [mode, setMode] = useState('create')
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [tokenEmail, setTokenEmail] = useState(null)

  useEffect(() => {
    // dispatch(AllUser())
  }, [])


  const openCreate = () => {
    setMode('create')
    setSelectedUser(null)
    setView('form')
  }
  const backToList = () => {
    setView('list')
    setSelectedUser(null)
  }
  const openEdit = (user) => {
    setMode('edit')
    setSelectedUser(user)
    setView('form')
  }

  const openDelete = (id) => {
    setDeleteId(id)
    setDeleteModal(true)
  }

  const confirmDelete = async () => {
    // await dispatch(DeleteUserInfo(deleteId)).unwrap()
    setDeleteModal(false)
  }

  return (
    <Container className="mt-5">
      {view === 'list' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Translation</h2>
            <Button color="primary" onClick={openCreate}>
              Add New
            </Button>
          </div>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Language</th>
                <th>Last Modified</th>
                <th>File Path</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <Spinner size="sm" className="me-2" />
                    Loading Users...
                  </td>
                </tr>
              ) : users?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                filteredUsers?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.userName || '-'}</td>
                    <td>{user.email || '-'}</td>
                    <td>{user.phoneNumber || '-'}</td>
                    <td>{user.role[0] || '-'}</td>
                    <td>
                      <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                        <Button size="sm" color="warning" className="me-1 w-sm-auto" onClick={() => openEdit(user)}>
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button size="sm" color="danger" className="me-1 w-sm-auto" onClick={() => openDelete(user.id)}>
                          <Icon icon="mdi:delete" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody> */}
          </Table>
        </>
      )}
      {view === 'form' && <CreateLanguage mode={mode} initialData={selectedUser} onBack={backToList} />}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)} centered>
        <ModalHeader>Delete User</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button color="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default Page

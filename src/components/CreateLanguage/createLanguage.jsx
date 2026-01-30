'use client'

import React, { useEffect, useState } from 'react'
import { Button, Input, FormGroup, Label, Card, CardBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import Notify from '@/components/Notify'
import { PostUser, UpdatedUserInfo, AllUserManagement } from '@/redux/slice/UserManegement/UserManagementSlice'
import { Icon } from '@iconify/react/dist/iconify.js'

const CreateLanguage = ({ mode, initialData, onBack }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    lang: '',
    name: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
  
    if (mode === 'create') {
    //   await dispatch(PostUser(formData)).unwrap()
    } else {
    //   await dispatch(
    //     UpdatedUserInfo({
    //       id: formData.id,
    //       updatedData: formData,
    //     }),
    //   ).unwrap()
    }
    onBack()
  }

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{mode === 'create' ? 'Create lang' : 'Edit lang'}</h4>
        <Button color="secondary" onClick={onBack}>
          View List
        </Button>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <FormGroup>
            <Label>
              Lang <span style={{ color: '#e57373' }}>*</span>
            </Label>
            <Input name="lang" value={formData.lang} onChange={handleChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup>
            <Label>
              Name <span style={{ color: '#e57373' }}>*</span>
            </Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormGroup>
        </div>
       
      </div>
      <div className="d-flex gap-2">
        <Button color="secondary" onClick={onBack}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          {/* {loading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'} */}
          Create
        </Button>
      </div>
    </div>
  )
}

export default CreateLanguage;

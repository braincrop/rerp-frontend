'use client';
import React, { useEffect, useState } from 'react'
import { Button, Input, FormGroup, Label, Card, CardBody, Table } from 'reactstrap';
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Notify from '@/components/Notify'
import { allTranslation, GetAllTranslation, PostTranslation } from '@/redux/slice/Translation/TranslationSlice'

const CreateLanguage = ({ mode, initialData, onBack }) => {
  const dispatch = useDispatch()
  const { allTranslationBase,loading } = useSelector(allTranslation)
  const [formData, setFormData] = useState({
    lang: '',
    name: '',
    isAll: {
    branchName: "string",
    selected: true
    },
    sections: [],
  })

  useEffect(() => {
    dispatch(GetAllTranslation())
  }, [])

  useEffect(() => {
    if (allTranslationBase && allTranslationBase.sections) {
      setFormData((prev) => ({
        ...prev,
        sections: JSON.parse(JSON.stringify(allTranslationBase.sections)),
      }))
    }
  }, [allTranslationBase])

  const handleTranslationChange = (sIdx, kIdx, value) => {
    const newSections = [...formData.sections]
    newSections[sIdx].keys[kIdx].translatedValue = value
    setFormData({ ...formData, sections: newSections })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
   if(!formData.lang) return Notify('error', 'Language Code is required')
   if(!formData.name) return Notify('error', 'Language Name is required')
    if (mode === 'create') {
        await dispatch(PostTranslation(formData)).unwrap()
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
  console.log('formData', formData)
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{mode === 'create' ? 'Create Language' : 'Edit Language'}</h4>
        <Button color="secondary" onClick={onBack}>
          View List
        </Button>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <FormGroup>
            <Label>
              Language Code <span style={{ color: '#e57373' }}>*</span>
            </Label>
            <Input name="lang"  placeholder="e.g  fr,ar,is" value={formData.lang} onChange={handleChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup>
            <Label>
              Lnaguage Name <span style={{ color: '#e57373' }}>*</span>
            </Label>
            <Input name="name" value={formData.name} placeholder="e.g france, Arabic, Iceland" onChange={handleChange} />
          </FormGroup>
        </div>
      </div>
      <div className="row mb-3">
        {formData.sections && formData.sections.length > 0 ? (
          formData.sections.map((section, sIdx) => (
            <div key={sIdx} className="mb-4">
              <h5 className="text-muted mb-2" style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                {section.name}
              </h5>
              <Table bordered hover responsive size="sm">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '30%' }}>KEY</th>
                    <th style={{ width: '35%' }}>ENGLISH (BASE)</th>
                    <th style={{ width: '35%' }}>TRANSLATION ()</th>
                  </tr>
                </thead>
                <tbody>
                  {section.keys &&
                    section.keys.map((item, kIdx) => (
                      <tr key={`${sIdx}-${kIdx}`}>
                        <td className="align-middle text-secondary">{item.key}</td>
                        <td className="align-middle">{item.defaultValue}</td>
                        <td>
                          <Input
                            type="text"
                            value={item.translatedValue || ''}
                            onChange={(e) => handleTranslationChange(sIdx, kIdx, e.target.value)}
                            placeholder="Enter translation"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center">
              <Spinner size="sm" className="me-2" />
            <h5>Loading translations...</h5>
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <Button color="secondary" onClick={onBack}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          {loading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
        
        </Button>
      </div>
    </div>
  )
}

export default CreateLanguage

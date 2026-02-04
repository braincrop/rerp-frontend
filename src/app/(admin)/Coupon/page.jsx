'use client'
import React from 'react'
import { Button, Table, Badge, Container } from 'reactstrap'
import { Icon } from '@iconify/react'

const dummyCoupons = [
  {
    code: 'NEW10',
    amount: '10%',
    maxDiscount: 500,
    minAmount: 2000,
    used: 12,
    expiryDate: '2026-03-31',
  },
  {
    code: 'FLAT200',
    amount: '200 PKR',
    maxDiscount: 200,
    minAmount: 1500,
    used: 5,
    expiryDate: '2026-02-28',
  },
  {
    code: 'WELCOME50',
    amount: '50%',
    maxDiscount: 1000,
    minAmount: 3000,
    used: 25,
    expiryDate: '2026-04-15',
  },
]

const Page = () => {
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Coupons</h2>
        <Button color="primary">
          <Icon icon="mdi:plus" width="18" height="18" />
          Add Coupon
        </Button>
      </div>
      <Table bordered hover responsive className="shadow-sm rounded">
        <thead className="table-light">
          <tr>
            <th>Code</th>
            <th>Amount</th>
            <th>Max Discount</th>
            <th>Min Amount</th>
            <th>Used</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyCoupons.map((coupon, idx) => (
            <tr key={idx}>
              <td>
                <Badge color="secondary">{coupon.code}</Badge>
              </td>
              <td>{coupon.amount}</td>
              <td>{coupon.maxDiscount}</td>
              <td>{coupon.minAmount}</td>
              <td>{coupon.used}</td>
              <td>{coupon.expiryDate}</td>
              <td className="d-flex gap-2">
                <Button size="sm" color="info">
                  <Icon icon="mdi:eye" />
                </Button>
                <Button size="sm" color="warning">
                  <Icon icon="mdi:pencil" />
                </Button>
                <Button size="sm" color="danger">
                  <Icon icon="mdi:delete" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Page

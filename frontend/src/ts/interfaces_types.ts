export const Categories = ['Rent', 'Water', 'Electricity', 'Cooperative']

export type Category = (typeof Categories)[number]
export interface User {
  name: string
  email: string
  _id: string
}
export type Invoice = {
  category: Category
  apartment: string
  amount: number
  name: string
  date: Date
  paidByMe: boolean
  paidByTenant: boolean
  _id: string
}

export type Apartment = {
  name: string
  _id: string
  owner: string
  description: string
  tenant: string
  invoices: Invoice[]
}

export interface BillData {
  id: number
  customer_id: number
  usage: number
  amount: number
  status: string
  month: number
  year: number
  owner_token: string
  createdAt: string
  updatedAt: string
  customer?: {
    id: number
    name: string
    customer_number: string
    service?: {
      id: number
      name: string
      price: number
    }
  }
}
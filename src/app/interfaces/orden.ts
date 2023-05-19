import { ProductOrder } from "./productOrder";

export interface Order {
  id: number,
  userId: string,
  client: string,
  products: ProductOrder[],
  total: number,
  status: string,
  dataEntry: Date,
  timer: number
}
import { axiosInstance } from "../axios";
import type { Order, OrderForm } from "./entity";

export async function getOrders(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('orders') as { data: { list: Order[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}

export async function getOrder(id: any): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`order/${id}`) as { data: Order }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}
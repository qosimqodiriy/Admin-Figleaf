import type { OrderForm } from './entity'

export * from './api'
export type { Order, OrderForm } from './entity'

export function reset(obj: OrderForm) {
  obj.id = null,
  obj.phone = '',
  obj.name = '',
  obj.email = '',
  obj.message = '',
  obj.products = []
}
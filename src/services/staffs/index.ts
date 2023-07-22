import type { Form } from './entity'

export * from './api'
export type { Staff, Form } from './entity'
export * from '../common'

export function reset(obj: Form) {
  obj.id = null,
  obj.name = '',
  obj.phone = '',
  obj.password = '',
  obj.role = {
   foods: false,
   categories: false,
   couriers: false,
   orders: false,
   users: false,
   branches: false,
   social: false,
   about: false,
   news: false,
   code: false,
  },
  obj.token = ''
}

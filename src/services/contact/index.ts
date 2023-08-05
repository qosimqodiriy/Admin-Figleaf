import type { ContactForm } from './entity'

export * from './api'
export type { Contact, ContactForm } from './entity'

export function reset(obj: ContactForm) {
  obj.phone = '',
  obj.phone2 = '',
  obj.email = '',
  obj.address = {
    uz: '',
    ru: '',
    eng: '',
  },
  obj.lat = 0,
  obj.long = 0
}
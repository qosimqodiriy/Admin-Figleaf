import type { TypeForm } from './entity'

export * from './api'
export type { Type, TypeForm } from './entity'

export function reset(obj: TypeForm) {
  obj.id = null,
  obj.category = {
    id: 0,
    image: '',
    name: {
      uz: '',
      ru: '',
      eng: '',
    },
    type: [],
  },
  obj.name = {
    uz: '',
    ru: '',
    eng: '',
  },
  obj.priority = null
}
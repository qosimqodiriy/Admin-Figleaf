import type { CategoryForm } from './entity'

export * from './api'
export type { Category, CategoryForm } from './entity'

export function reset(obj: CategoryForm) {
  obj.id = 0,
  obj.image = '',
  obj.name = {
    uz: '',
    ru: '',
    eng: '',
  },
  obj.type = []
}
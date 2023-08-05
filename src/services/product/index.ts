import type { ProductForm } from './entity'

export * from './api'
export type { Product, ProductForm, ColourForm } from './entity'

export function reset(obj: ProductForm) {
  obj.id = null,
  obj.name = {
    uz: '',
    ru: '',
    eng: '',
  },
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
  obj.type = {
    id: 0,
    category: {
      id: 0,
      image: '',
      name: {
        uz: '',
        ru: '',
        eng: '',
      },
      type: [],
    },
    name: {
      uz: '',
      ru: '',
      eng: '',
    },
    priority: 0,
  },
  obj.details = {
    code: '',
    material: '',
    structure: '',
  },
  obj.sizes = [],
  obj.suggests = [],
  obj.colors = [],
  obj.count = 0,
  obj.image = '',
  obj.price = 0
}
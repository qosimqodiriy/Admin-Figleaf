import type { BannerForm } from './entity'

export * from './api'
export type { Banner, BannerForm } from './entity'

export function reset(obj: BannerForm) {
  obj.id = null,
  obj.image = '',
  obj.priority = null,
  obj.name = {
    uz: '',
    ru: '',
    eng: '',
  }
}
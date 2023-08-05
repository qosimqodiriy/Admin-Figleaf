import type { SocialForm } from './entity'

export * from './api'
export type { Social, SocialForm } from './entity'

export function reset(obj: SocialForm) {
  obj.id = null,
  obj.url = '',
  obj.icon = ''
}
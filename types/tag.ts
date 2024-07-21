import type { Sys } from '@/types/sys'

export interface Tag {
  _id: string
  _sys: Sys
  name: string
  slug: string
}

import type { ID } from '~/types/ID'
import type { Media } from '~/types/Media'

export type Step = {
  id: ID
  image: Media
  number: number
  label: string
  description: string
}

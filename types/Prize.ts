import type { ID } from '~/types/ID'
import type { Media } from '~/types/Media'

export type Prize = {
  id: ID
  label: string
  image: Media
  isPrize: boolean
}

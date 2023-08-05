import type { Type } from "../type"
import type { Lang } from "../types"

export interface Category {
   id: number,
   image: string,
   name: Lang,
   type: Type[],
}

export interface CategoryForm {
   id: number,
   image: string | null,
   name: Lang,
   type: Type[],
}
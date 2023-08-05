import type { Category } from "../category/entity";
import type { Lang } from "../types"

export interface Type {
   id: number,
   category: Category,
   name: Lang,
   priority: number,
}

export interface TypeForm {
   id: number | null,
   category: Category,
   name: Lang,
   priority: number | null,
}


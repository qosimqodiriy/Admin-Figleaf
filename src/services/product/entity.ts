import type { Type } from "../type";
import type { Lang } from "../types";
import type { Category } from "../category";

export interface Product {
   id: number,
   name: Lang,
   category: Category,
   type: Type,
   details: {
      code: string,
      material: string,
      structure: string,
   },
   sizes: Size[],
   suggests: [],
   colors: Colour[],
   count: number,
   image: string,
   price: number,
}

export interface ProductForm {
   id: number | null,
   name: Lang,
   category: Category,
   type: Type,
   details: {
      code: string | null,
      material: string | null,
      structure: string | null,
   },
   sizes: Size[],
   suggests: [] | null,
   colors: Colour[],
   count: number | null,
   image: string | null,
   price: number | null,
}



export interface Size {
   id?: number,
   name?: string,
   product: Product
}

export interface Colour {
   id?: number,
   hex?: string,
   name: Lang,
   image?: string,
}

export interface ColourForm {
   hex: string | null,
   name: Lang,
   image: string | null,
   product: {
      id: number | null,
   }
}
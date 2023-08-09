import type { Product } from "../product";

export interface Order {
   id: number,
   createAt: string,
   phone: string,
   name: string,
   email: string,
   message: string,
   products: Product[],
}

export interface OrderForm {
   id: number | null,
   createAt: string | null,
   phone: string,
   name: string | null,
   email: string | null,
   message: string | null,
   products: Product[],
}


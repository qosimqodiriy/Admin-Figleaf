import type { Lang } from "../types"

export interface Contact {
   phone: string,
   phone2: string,
   email: string,
   address: Lang,
   lat: number,
   long: number,
}

export interface ContactForm {
   phone: string | null,
   phone2: string | null,
   email: string | null,
   address: Lang,
   lat: number | null,
   long: number | null,
}


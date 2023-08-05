import type { Lang } from "../types";

export interface Banner {
   id: number,
   name: Lang,
   image: string,
   priority: number,
}

export interface BannerForm {
   id: number | null,
   name: Lang,
   image: string | null,
   priority: number | null,
}


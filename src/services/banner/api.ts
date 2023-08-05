import { axiosInstance } from "../axios";
import type { Banner, BannerForm } from "./entity";

export async function getBanners(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('banners') as { data: { list: Banner[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function postPutBanner(formInfo: BannerForm) {
  try {
    const response = await axiosInstance({
      url: 'banner',
      method: formInfo.id === null ? 'POST' : 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

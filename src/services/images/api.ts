import { axiosInstance } from "../axios";
import type { Image, ImageForm } from "./entity";

export async function getImages(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('image') as { data: Image }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function putImage(formInfo: ImageForm) {
  try {
    const response = await axiosInstance({
      url: 'image',
      method: 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

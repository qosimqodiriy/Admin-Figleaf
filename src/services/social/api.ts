import { axiosInstance } from "../axios";
import type { Social, Form } from "./entity";

export async function getSocials(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`admin/about/socials`) as { data: { list: Social[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}

export async function postSocial(formInfo: Form) {
  try {
    const response = await axiosInstance({
      url: 'admin/about/social',
      method: formInfo.id === null ? 'POST' : 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

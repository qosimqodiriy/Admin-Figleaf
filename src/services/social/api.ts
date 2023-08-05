import { axiosInstance } from "../axios";
import type { Social, SocialForm } from "./entity";

export async function getSocials(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('socials') as { data: { list: Social[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function postPutSocial(formInfo: SocialForm) {
  try {
    const response = await axiosInstance({
      url: 'social',
      method: formInfo.id === null ? 'POST' : 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

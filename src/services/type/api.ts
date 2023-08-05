import { axiosInstance } from "../axios";
import type { Type, TypeForm } from "./entity";

export async function getTypes(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('type') as { data: { list: Type[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function postPutType(formInfo: TypeForm) {
  try {
    const response = await axiosInstance({
      url: 'type',
      method: formInfo.id === null ? 'POST' : 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

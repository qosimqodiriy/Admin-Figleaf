import { axiosInstance } from "../axios";
import type { Password, PasswordForm } from "./entity";

export async function getPassword(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('admins') as { data: Password }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function putPassword(formInfo: PasswordForm) {
  try {
    const response = await axiosInstance({
      url: 'admin/password',
      method: 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

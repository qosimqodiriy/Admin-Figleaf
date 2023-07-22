import { axiosInstance } from "../axios";
import type { Staff, Form } from "./entity";

export async function getStaffs(search = '', offset = 0): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`admin/managers`, {
      params: {
        size: 6,
        offset: offset,
        search: search
      }
    }) as {data: { list: Staff[], count: number }}
    return [null, response.data]
  }
  catch(error) {
    return [error, null]
  }
}


export async function postPutStaff(formInfo: Form) {
  try {
    const response = await axiosInstance({
      url: 'admin/manager',
      method: formInfo.id === null ? 'POST': 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}

export async function postPutThisStaff(formInfo: Form) {
  try {
    const response = await axiosInstance({
      url: 'manager/password',
      method: 'PUT',
      data: formInfo
      // data: {
        // phone: formInfo.phone,
        // password: formInfo.password,
      // }
    })
    return [null, response]
  }
  catch(error) {
    return [error, null]
  }
}

import { axiosInstance, axiosInstanceColls } from "./axios";

export async function uploadPhoto(img: any): Promise<[any, any]> {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: 'admin/image',
      data: img
    })
    return [null, response]
  } catch(error) {
    return [error, null]
  }
}

export async function deleteItem(obj: {id: number}, url: string): Promise<[any, any]> {
  try {
    const response = await axiosInstance({
      method: 'delete',
      url: url,
      data: obj
    })
    return [null, response]
  } catch(error) {
    return [error, null]
  }
}

export async function handleAuth( username: string, password: string ): Promise<[any, any]> {
  try {
    const response = await axiosInstance({
      method: 'post',
      url: 'admin/auth',
      data: {
        "username": username,
        "password": password
      }
    })
    return [null, response.data]
  }

  catch (error) {
    return [error, null]
  }
}

export async function handleAuthColls() {
  try {
    const response = await axiosInstanceColls({
      method: 'post',
      url: 'auth.json',
      data: {
        "auth_key": 'WWYwdXFpaVU1Q1BCZFVmTnkxb1lLWG5LNVBqVlhxd3c',
        "new": true
      }
    })
    return [null, response.data]
  }

  catch (error) {
    return [error, null]
  }
}

export async function getSelections_API(offset = 0, url: string, search = ''): Promise<any> {
  try {
      const response = await axiosInstance.get(url, {
          params: {
            size: 10,
            offset: offset,
            search: search
          }
      })
      return [null, response]
  } catch (error) {
      return [error, null]
  }
}
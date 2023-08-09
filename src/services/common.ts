import { axiosInstance } from "./axios";

export async function uploadPhoto(img: any): Promise<[any, any]> {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: 'upload/image',
      data: img
    })
    return [null, response]
  } catch(error) {
    return [error, null]
  }
}


export async function uploadVideo(obj: {}): Promise<[any, any]> {
  try {
    const response = await axiosInstance({
      method: 'POST',
      url: 'upload/video',
      data: obj
    })
    return [null, response]
  } catch (error) {
    return [error, null]
  }
}


export async function deleteItem(obj: {id: number}, url: string): Promise<[any, any]> {
  try {
    const response = await axiosInstance({
      method: 'DELETE',
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
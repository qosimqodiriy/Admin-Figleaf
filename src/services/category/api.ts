import { axiosInstance } from "../axios";
import type { Category, CategoryForm } from "./entity";

export async function getCategories(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('categories') as { data: { list: Category[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function postPutCategory(formInfo: CategoryForm) {
  try {
    const response = await axiosInstance({
      url: 'category',
      method: formInfo.id === null ? 'POST' : 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

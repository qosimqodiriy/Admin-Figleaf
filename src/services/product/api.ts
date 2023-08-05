import { axiosInstance } from "../axios";
import type { Product, ProductForm } from "./entity";

export async function getProducts(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('products') as { data: { list: Product[] } }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function getProduct(id: any): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get(`product/${id}`) as { data: Product }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}



export async function postPutProduct(formInfo: ProductForm) {
  try {
    const response = await axiosInstance({
      url: 'product',
      method: formInfo.id === null ? 'POST' : 'PUT',
      data: {
        id: formInfo.id,
        name: formInfo.name,
        category: {
          id: formInfo.category.id
        },
        type: {
          id: formInfo.type.id
        },
        details: {
          code: formInfo.details.code,
          material: formInfo.details.material,
          structure: formInfo.details.structure,
        },
        count: formInfo.count,
        image: formInfo.image,
        price: formInfo.price
      }
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}


export async function postSize(formInfo: any) {
  try {
    const response = await axiosInstance({
      url: 'size',
      method: 'POST',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

export async function postColor(formInfo: any) {
  try {
    const response = await axiosInstance({
      url: 'color',
      method: 'POST',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}
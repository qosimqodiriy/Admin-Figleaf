import { axiosInstance } from "../axios";
import type { Contact, ContactForm } from "./entity";

export async function getContact(): Promise<[any, any]> {
  try {
    const response = await axiosInstance.get('contact') as { data: Contact }
    return [null, response.data]
  }
  catch (error) {
    return [error, null]
  }
}


export async function putContact(formInfo: ContactForm) {
  try {
    const response = await axiosInstance({
      url: 'contact',
      method: 'PUT',
      data: formInfo
    })
    return [null, response]
  }
  catch (error) {
    return [error, null]
  }
}

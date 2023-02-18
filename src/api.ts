import { waitForTimeout } from './utils'

const url = import.meta.env.VITE_API_URL
const headers = {
  'Content-Type': 'application/json',
}

type JsonNode = string | number | boolean | null | JsonNode[] | _JsonDict

type _JsonDict = { [key: string]: JsonNode }

type JsonDict<T = object> = _JsonDict & T

// export const createEntity = async (
//   kind: 'contact' | 'company' | 'lead',
//   kind: string,
//   name: string
// ): Promise<JsonDict<{ id: number; name: string }>> => {
//   const res = await fetch(`${url}/${kind}s`, {
//     method: 'POST',
//     headers,
//     body: JSON.stringify({ name }),
//   })
//
//   const js = await res.json()
//
//   if (res.status >= 200 && res.status < 300) {
//     return js
//   }
//
//   console.log(js)
//   throw new Error('createEntity failed')
// }

let counter = 1
export const createEntity = async (
  _kind: string,
  name: string
): Promise<JsonDict<{ id: number; name: string }>> => {
  await waitForTimeout(Math.random() * 1000)

  return {
    id: counter++,
    name,
  }
}

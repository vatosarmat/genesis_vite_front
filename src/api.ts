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

export type EntityKind = 'contact' | 'lead' | 'company'

export type Entity = {
  id: number
  kind: EntityKind
  name: string
  created_at: number
}

let counter = 1
const initialDate = Date.now()
export const createEntity = async (
  kind: EntityKind,
  name: string
): Promise<JsonDict<Entity>> => {
  await waitForTimeout(Math.random() * 1000)

  const random = Math.random()
  if (random > 0.8) {
    throw new Error('Server is broken!')
  }
  if (random > 0.6) {
    throw new Error('You are not allowed!')
  }

  return {
    id: counter++,
    kind,
    name,
    created_at: Date.now() - initialDate,
  }
}

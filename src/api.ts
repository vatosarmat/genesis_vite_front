const url = import.meta.env.VITE_API_URL
const headers = {
  'Content-Type': 'application/json',
}

type JsonNode = string | number | boolean | null | JsonNode[] | _JsonDict

type _JsonDict = { [key: string]: JsonNode }

type JsonDict<T = object> = _JsonDict & T

const initialDate = Date.now()

export const createEntity = async (
  kind: EntityKind,
  name: string
): Promise<JsonDict<Entity>> => {
  const plural = {
    company: 'companies',
    lead: 'leads',
    contact: 'contacts',
  }
  const res = await fetch(`${url}/${plural[kind]}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name }),
  })

  const respBody = await res.json()

  if (res.status >= 200 && res.status < 300) {
    return {
      id: respBody.id,
      kind,
      name: respBody.name,
      created_at: parseInt(respBody.created_at) * 1000 - initialDate,
    }
  }

  throw new Error(`${res.status}: ${respBody.message}`)
}

export type EntityKind = 'contact' | 'lead' | 'company'

export type Entity = {
  id: number
  kind: EntityKind
  name: string
  created_at: number
}

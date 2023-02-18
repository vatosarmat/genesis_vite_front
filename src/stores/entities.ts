import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { createEntity, Entity, EntityKind } from '../api'
export type { Entity, EntityKind } from '../api'

export const useEntitiesStore = defineStore('entities', () => {
  const data = {
    contact: ref<Record<number, Entity>>([]),
    company: ref<Record<number, Entity>>([]),
    lead: ref<Record<number, Entity>>([]),
  }

  const isLoading = ref(false)
  const errorMessage = ref('')

  async function apiCreateEntity(kind: EntityKind, name: string) {
    //@ts-expect-error
    this.$patch(state => {
      state.isLoading = true
      state.errorMessage = ''
    })
    return createEntity(kind, name)
      .then(entity => {
        //@ts-expect-error
        this.$patch(state => {
          state.isLoading = false
          data[kind].value[entity.id] = entity
        })
        return true
      })
      .catch((err: Error) => {
        //@ts-expect-error
        this.$patch(state => {
          state.isLoading = false
          state.errorMessage = err.message
        })
        return false
      })
  }

  const isEmpty = computed(
    () =>
      Object.keys({ ...data.contact.value, ...data.lead.value, ...data.company.value })
        .length === 0
  )

  const entitiesTable = computed(() =>
    Object.values(data.contact.value)
      .concat(Object.values(data.lead.value))
      .concat(Object.values(data.company.value))
      .sort((a, b) =>
        a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
      )
  )

  return { errorMessage, isLoading, entitiesTable, isEmpty, apiCreateEntity }
})

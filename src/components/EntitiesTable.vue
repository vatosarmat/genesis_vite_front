<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in ['id', 'kind', 'name', 'created_at'] as const" :key="header">
          {{ props.headerLabels[header] ?? header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in entitiesStore.entitiesTable" :key="row.kind + row.id">
        <td>
          {{ row.id }}
        </td>
        <td>
          {{ props.entityKindLabels[row.kind] ?? row.kind }}
        </td>
        <td>
          {{ row.name }}
        </td>
        <td>
          {{ Math.trunc(row.created_at / 1000) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useEntitiesStore, Entity, EntityKind } from '../stores/entities'

const props = withDefaults(
  defineProps<{
    headerLabels?: Partial<Record<keyof Entity, string>>
    entityKindLabels?: Partial<Record<EntityKind, string>>
  }>(),
  {
    headerLabels: () => ({}),
    entityKindLabels: () => ({}),
  }
)

const entitiesStore = useEntitiesStore()
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
}

td {
  padding: var(--l-padding);
  border: 1px solid var(--c-grey);
}
</style>

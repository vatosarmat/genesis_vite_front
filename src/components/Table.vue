<template>
  <table>
    <thead>
      <tr>
        <th v-for="(th, idx) in head" :key="idx">
          {{ th }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in rows" :key="idx">
        <td v-for="(col, idx) in row" :key="idx">
          {{ col }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const { head, rows } = defineProps<{
  head: string[]
  rows: string[][]
}>()
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

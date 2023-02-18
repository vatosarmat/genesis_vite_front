<template>
  <div class="form-row">
    <Dropdown :items="entityKindOptions" v-model="entityKind" class="dropdown" />
    <input
      class="name-input"
      placeholder="Имя"
      v-model.trim="entityName"
      :disabled="isLoading"
    />
    <div class="button-box">
      <Button
        :disabled="entityKind.value === 'none'"
        @click="onButtonClick"
        :isLoading="isLoading"
        >Создать</Button
      >
    </div>
  </div>
  <Table
    v-if="tableRows.length > 0"
    :head="['id', 'kind', 'name']"
    :rows="tableRowsDesc"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

import Button from './components/Button.vue'
import Dropdown, { Item } from './components/Dropdown.vue'
import Table from './components/Table.vue'

import { createEntity } from './api'

const entityKindOptions = [
  { value: 'none', label: 'Не выбрано' },
  { value: 'lead', label: 'Сделка' },
  { value: 'contact', label: 'Контакт' },
  { value: 'company', label: 'Компания' },
]

const entityKind = ref<Item>(entityKindOptions[0])
const entityName = ref('')
const isLoading = ref(false)
const tableRows = reactive<string[][]>([])

const tableRowsDesc = computed(() => [...tableRows].reverse())

/* console.log(entityKind)
console.log(entityName)
console.log(tableRows)
console.log(tableRowsDesc)
//@ts-expect-error
window.K = entityKind
//@ts-expect-error
window.N = entityName
//@ts-expect-error
window.R = tableRows
//@ts-expect-error
window.D = tableRowsDesc
*/
const onButtonClick = () => {
  const prom = createEntity(entityKind.value.value, entityName.value)
  isLoading.value = true
  prom.then(({ id, name }) => {
    entityName.value = ''
    tableRows.push([id.toString(), entityKind.value.label, name])
    isLoading.value = false
  })
}
</script>

<style scoped lang="scss">
.form-row {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 16px;

  .name-input {
    min-width: var(--l-width);
    height: var(--l-height);
    border: 1px solid var(--c-grey);
    border-radius: var(--l-border-radius);
    padding: var(--l-padding);

    flex-grow: 1;
  }

  .dropdown {
    flex-grow: 1;
  }

  .button-box {
    flex-basis: 15%;
    text-align: right;
  }
}
</style>

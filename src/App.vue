<template>
  <div class="form-row">
    <Dropdown :items="entityKindOptions" v-model="entityKind" class="dropdown" />
    <input
      class="name-input"
      placeholder="Имя"
      v-model.trim="entityName"
      :disabled="entitiesStore.isLoading"
    />
    <div class="button-box">
      <Button
        :disabled="entityKind.value === 'none'"
        @click="onButtonClick"
        :isLoading="entitiesStore.isLoading"
        >Создать</Button
      >
    </div>
  </div>
  <p class="error" v-if="entitiesStore.errorMessage">
    {{ 'Error: ' + entitiesStore.errorMessage }}
  </p>
  <EntitiesTable
    v-if="!entitiesStore.isEmpty"
    :headerLabels="{ kind: 'Сущность', name: 'Имя', created_at: 'Секунда создания' }"
    :entityKindLabels="{ lead: 'Сделка', contact: 'Контакт', company: 'Компания' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from './components/Button.vue'
import Dropdown, { Item } from './components/Dropdown.vue'
import EntitiesTable from './components/EntitiesTable.vue'

import { useEntitiesStore, EntityKind } from './stores/entities'

const entitiesStore = useEntitiesStore()

const entityKindOptions = [
  { value: 'none', label: 'Не выбрано' },
  { value: 'lead', label: 'Сделка' },
  { value: 'contact', label: 'Контакт' },
  { value: 'company', label: 'Компания' },
]

const entityKind = ref<Item>(entityKindOptions[0])
const entityName = ref('')

const onButtonClick = () => {
  entitiesStore
    .apiCreateEntity(entityKind.value.value as EntityKind, entityName.value)
    .then(success => {
      if (success) {
        entityName.value = ''
      }
    })
}
</script>

<style scoped lang="scss">
.error {
  color: red;
  font-size: 2rem;
  font-family: serif;
  font-style: italic;
  text-decoration: underline;
  font-weight: 700;
}

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

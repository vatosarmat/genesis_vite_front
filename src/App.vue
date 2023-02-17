<script setup lang="ts">
import Button from './components/Button.vue'
import Dropdown from './components/Dropdown.vue'
import Table from './components/Table.vue'
</script>

<template>
  <div class="foo">
    <Button>Create</Button>
    <Button isLoading>Create</Button>
  </div>
  <div class="foo">
    <Dropdown prefix="Selected: " :items="['Nothing', 'lorem', 'ipsum', 'amet']" />
  </div>
  <div class="foo">
    <Table
      :head="['id', 'kind', 'name']"
      :rows="[
        ['1', 'Contact', 'Vasya'],
        ['2', 'Company', 'Apple'],
        ['3', 'Lead', 'Buy bread in grocery'],
      ]"
    />
  </div>
</template>

<style scoped>
.foo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 26px;
  margin: auto;
  margin-bottom: 120px;
}
</style>

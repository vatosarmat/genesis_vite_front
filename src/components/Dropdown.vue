<template>
  <div class="dropdown" v-click-outside="clickOutside">
    <button class="toggler" :class="{ 'is-open': isOpen }" @click="isOpen = !isOpen">
      <span>{{ props.prefix + itemLabel(props.modelValue) }}</span>
      <AngleDown />
    </button>
    <ul class="list" v-if="isOpen">
      <li
        v-for="(item, idx) in props.items"
        :key="idx"
        @click="onItemClick(item)"
        class="list-item"
        :class="{ selected: itemValue(props.modelValue) === itemValue(item) }"
      >
        <Check />
        <span>{{ itemLabel(item) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AngleDown from './icons/AngleDown.vue'
import Check from './icons/Check.vue'
export type Item = { value: string; label: string }
const props = withDefaults(
  defineProps<{
    prefix?: string
    items: Item[] | string[]
    modelValue: Item | string
  }>(),
  {
    prefix: '',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item | string): void
}>()

const isOpen = ref(false)

const itemLabel = (item: string | Item) => {
  return typeof item === 'string' ? item : item.label
}
const itemValue = (item: string | Item) => {
  return typeof item === 'string' ? item : item.value
}

const onItemClick = (item: Item | string) => {
  emit('update:modelValue', item)
}

const clickOutside = () => {
  isOpen.value = false
}
</script>

<style scoped lang="scss">
$icon_size: calc(var(--l-height) / 3);

.dropdown {
  cursor: pointer;
  position: relative;
}

.toggler {
  /*if got stretched by flexbox*/
  width: 100%;
  /*if not*/
  min-width: var(--l-width);
  padding: var(--l-padding);
  height: var(--l-height);
  border: 1px solid var(--c-grey);
  border-radius: var(--l-border-radius);

  outline-color: var(--c-primary);
  background-color: var(--c-light);
  color: var(--c-dark);
  text-align: left;

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: var(--c-grey-d4);
    width: $icon_size;
    height: $icon_size;
  }

  &.is-open {
    border-radius: var(--l-border-radius) var(--l-border-radius) 0 0;
  }
}

.list {
  position: absolute;
  z-index: 100;
  width: 100%;
  border: 1px solid var(--c-grey);
  border-radius: 0 0 var(--l-border-radius) var(--l-border-radius);

  background-color: var(--c-light);
}

.list-item {
  min-width: var(--l-width);
  width: 100%;
  padding: var(--l-padding);
  height: var(--l-height);

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--c-grey-l1);
  }

  svg {
    color: var(--c-grey-d4);
    width: $icon_size;
    height: $icon_size;
    margin-right: var(--l-padding);

    visibility: hidden;
  }
  &.selected {
    svg {
      visibility: visible;
    }
  }
}
</style>

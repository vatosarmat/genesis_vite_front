<template>
  <div class="dropdown" v-click-outside="clickOutside">
    <button
      ref="togglerRef"
      class="toggler"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
    >
      <span>{{ prefix + selected }}</span>
      <AngleDown />
    </button>
    <ul class="list" v-if="isOpen">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        @click="selected = item"
        class="list-item"
        :class="{ selected: selected === item }"
      >
        <Check />
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AngleDown from './icons/AngleDown.vue'
import Check from './icons/Check.vue'
const { prefix, items } = defineProps<{
  prefix: string
  items: string[]
}>()

let isOpen = ref(false)
const selected = ref<string>(items[0])

const clickOutside = () => {
  isOpen.value = false
}
</script>

<style scoped lang="scss">
$icon_size: calc(var(--l-height) / 3);
$width: 240px;

.dropdown {
  cursor: pointer;
}

.toggler {
  min-width: 240px;
  padding: var(--l-padding);

  height: var(--l-height);
  border: 1px solid var(--c-grey);
  border-radius: var(--l-border-radius);
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
  min-width: 240px;
  position: absolute;
  z-index: 100;
  border: 1px solid var(--c-grey);
  border-radius: 0 0 var(--l-border-radius) var(--l-border-radius);
  background-color: var(--c-light);
}

.list-item {
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

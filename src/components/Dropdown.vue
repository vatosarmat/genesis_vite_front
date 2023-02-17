<template>
  <div v-click-outside="clickOutside">
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
$padding: 0.6em;
$width: 240px;
$height: 48px;
$font_size: 1.2rem;
$icon_size: calc($height / 3);
$border_radius: 4px;

.toggler {
  font-size: $font_size;
  padding: $padding;

  min-width: $width;
  height: $height;
  border: 1px solid var(--c-grey);
  border-radius: $border_radius;
  background-color: var(--c-light);
  color: var(--c-dark);
  cursor: pointer;
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
    border-radius: $border_radius $border_radius 0 0;
  }
}

.list {
  position: absolute;
  z-index: 100;
  border: 1px solid var(--c-grey);
  border-radius: 0 0 $border_radius $border_radius;
  min-width: $width;
}

.list-item {
  font-size: $font_size;
  padding: $padding;

  cursor: pointer;
  height: $height;

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--c-grey-l1);
  }

  svg {
    color: var(--c-grey-d4);
    width: $icon_size;
    height: $icon_size;
    margin-right: $padding;

    visibility: hidden;
  }
  &.selected {
    svg {
      visibility: visible;
    }
  }
}
</style>

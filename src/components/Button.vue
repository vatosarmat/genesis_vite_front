<template>
  <button :disabled="isLoading" :class="{ loading: isLoading }">
    <span v-if="isLoading" class="loader"></span>
    <slot v-else>Button</slot>
  </button>
</template>

<script setup lang="ts">
const { isLoading } = defineProps<{ isLoading?: boolean }>()
</script>

<style scoped lang="scss">
$height: 48px;
$border_radius: 4px;
$font_size: 1.2rem;
$padding: 0.6em;

button {
  font-size: $font_size;
  font-weight: 600;

  height: $height;
  min-width: $height;
  border-radius: $border_radius;
  border: 1px solid var(--c-grey);
  cursor: pointer;
  padding: $padding;
  background-color: var(--c-light);
  color: var(--c-dark);

  &:hover {
    color: var(--c-primary);
    border-color: var(--c-primary);
  }

  &:active,
  &.loading {
    color: var(--c-light);
    background-color: var(--c-primary);
  }

  &.loading {
    cursor: not-allowed;
    padding: 0;
    width: $height;
  }
}

.loader {
  width: 60%;
  height: 60%;
  border: 3px solid var(--c-light);
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <button
    :disabled="props.disabled || props.isLoading"
    :class="{ loading: props.isLoading }"
  >
    <span v-if="props.isLoading" class="loader"></span>
    <slot v-else>Button</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ isLoading?: boolean; disabled?: boolean }>()
</script>

<style scoped lang="scss">
button {
  font-size: 1.2rem;
  font-weight: 600;

  height: var(--l-height);
  min-width: var(--l-height);
  border-radius: var(--l-border-radius);
  border: 1px solid var(--c-grey);
  cursor: pointer;
  padding: var(--l-padding);

  color: var(--c-light);
  background-color: var(--c-primary);

  &:enabled:hover {
    opacity: 0.6;
  }

  &.loading {
    padding: 0;
    width: var(--l-height);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:not(.loading):disabled {
    color: var(--c-dark);
    background-color: var(--c-light);
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

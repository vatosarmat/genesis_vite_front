<template>
  <button :disabled="props.isLoading" :class="{ loading: props.isLoading }">
    <span v-if="props.isLoading" class="loader"></span>
    <slot v-else>Button</slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ isLoading?: boolean }>()
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
  background-color: var(--c-light);
  color: var(--c-dark);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:enabled:hover {
    color: var(--c-primary);
    border-color: var(--c-primary);
  }

  &:enabled:active,
  &.loading {
    color: var(--c-light);
    background-color: var(--c-primary);
  }

  &.loading {
    cursor: not-allowed;
    padding: 0;
    width: var(--l-height);
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

<script setup lang="ts">
const { isLoading } = defineProps<{ isLoading?: boolean }>()
</script>

<template>
  <button :disabled="isLoading" :class="{ loading: isLoading }">
    <span v-if="isLoading" class="loader"></span>
    <slot v-else>Button</slot>
  </button>
</template>

<style scoped lang="scss">
$height: 48px;

$font: #2f353f;
$primary: rgb(76, 139, 247);
$gray: rgba(0, 0, 0, 0.15);
$white: #fff;

button {
  font-size: 1em;
  font-weight: 600;

  height: $height;
  min-width: $height;
  color: $font;
  border-radius: 4px;
  border: 1px solid $gray;
  background-color: $white;
  cursor: pointer;
  padding: 0.6em;

  &:hover {
    color: $primary;
    border-color: $primary;
  }

  &:active,
  &.loading {
    color: #fff;
    background-color: $primary;
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
  border: 3px solid $white;
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

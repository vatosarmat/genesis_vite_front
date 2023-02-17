<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Button from './components/Button.vue'
import Dropdown from './components/Dropdown.vue'
</script>

<template>
  <div class="foo">
    <Button>Create</Button>
    <Button isLoading>Create</Button>
  </div>
  <div class="foo">
    <Dropdown prefix="Selected: " :items="['Nothing', 'lorem', 'ipsum', 'amet']" />
  </div>
  <HelloWorld msg="Vite + Vue" />
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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

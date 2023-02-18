import { createApp, Directive } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

const clickOutside: Directive<
  HTMLElement & {
    clickOutsideEvent: (evt: MouseEvent) => void
  },
  () => void
> = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event: MouseEvent) => {
      //check that el is neither click target nor contains it
      const target = event.target as HTMLElement
      if (!(el == target || el.contains(target))) {
        //if so, call value callback
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: el => {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}

const pinia = createPinia()
createApp(App).directive('click-outside', clickOutside).use(pinia).mount('#app')

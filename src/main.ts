import { createApp, Directive } from 'vue'
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

createApp(App).directive('click-outside', clickOutside).mount('#app')

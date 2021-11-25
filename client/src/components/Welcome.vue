<template>
  <div class="p-component">
    <h1>Welcome</h1>

    <p>
      {{ text }}
    </p>
    <WordGraph />
  </div>
</template>

<script>
import WordGraph from './WordGraph.vue'
export default {
  components: { WordGraph },
  props: {
    text: {
      type: String,
      default: 'Doatask, a learning tool'
    }
  }
}
</script>

<template>
  <div class="p-component">
    <h1>Welcome</h1>

    <p>
      {{ text }}
    </p>
    <div id="word-svg"></div>
  </div>
</template>

<script>
import { init } from './wordGraph.js'
export default {
  props: {
    text: {
      type: String,
      default: 'Doatask, a learning tool'
    }
  },
  mounted() {
        init(null, 1)
  }
}
</script>

<style>
.in {
    fill: lightgreen;
    background: lightgreen;
}

.out {
    fill: lightcoral;
    background: lightcoral;
}

.wtooltip {
    position: absolute;
    text-align: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 18px;
    min-width: 40px;
    min-height: 20px;
    padding: 2px;
    border-width: 1px;
    border-color: black;
    pointer-events: none;
    box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.8);
}
</style>
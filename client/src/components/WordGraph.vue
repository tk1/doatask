<template>
  <div class="p-component">
    <h2>Word graph</h2>
    <div id="word-svg" />
  </div>
</template>

<script>
import { init } from './wordGraph.js'
export default {
  props: {
    regexp: {
      type: String,
      default: 'a(a+b)*b'
    },
    maxLength: {
      type: Number,
      default: 4
    }
  },
  watch: {
    regexp: function () {
      init(this.regexp, this.maxLength)
    },
    maxLength: function () {
      init(this.regexp, this.maxLength)
    }
  },
  mounted () {
    init(this.regexp, this.maxLength)
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
    border-width: 2px;
    border-color: black;
    pointer-events: none;
    box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.8);
    /* z-index must be large to be on top of the dialog */
    z-index: 10000;
}
</style>

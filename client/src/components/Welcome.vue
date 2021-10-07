<template>
  <div>
    <h1>Welcome</h1>

    <p>
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Doatask, a learning tool'
    }
  }
}
</script>

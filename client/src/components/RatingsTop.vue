<template>
  <h3>Top {{ count }}</h3>
  <ol>
    <li
      v-for="rating in ratings"
      :key="rating.id"
    >
      {{ username(rating.ownerid) }}: {{ Math.round(rating.value) }}
    </li>
  </ol>
</template>

<script>
import { getTop } from '../services/RatingService.js'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  props: {
    count: {
      type: Number,
      default: 10
    },
    domainId: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const ratings = ref([])

    async function getTopRatings () {
      ratings.value = await getTop(props.count, props.domainId)
    }

    function username (id) {
      if (store.state.user.id === id) {
        return 'You'
      } else {
        return `User ${id}`
      }
    }

    return {
      ratings,
      username,
      getTopRatings
    }
  },
  watch: {
    domainId: 'getTopRatings'
  },
  mounted () {
    this.getTopRatings()
  }
}

</script>

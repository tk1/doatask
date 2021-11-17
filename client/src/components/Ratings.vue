<template>
  <div class="p-component">
    <h1>Ratings</h1>
    <b>Choose domain</b>
    <DomainSelect
      v-model="selectedDomain"
    />
    <RatingsTop
      :domainId="selectedDomain.id"
    />
    <Chart
      type="line"
      :data="ratingData"
    />
  </div>
</template>

<script>
import { getAllForUser } from '../services/RatingService.js'
import RatingsTop from './RatingsTop.vue'
import DomainSelect from './DomainSelect.vue'

export default {
  components: {
    DomainSelect,
    RatingsTop
  },
  data () {
    return {
      ratings: [],
      selectedDomain: {
        id: -1,
        description: ''
      }
    }
  },
  computed: {
    ratingData () {
      const labels = this.ratingsForDomain.map(v => v.createdAt)
      const data = this.ratingsForDomain.map(v => v.value)
      return {
        labels,
        datasets: [
          {
            label: this.selectedDomain.description,
            data,
            fill: false,
            borderColor: '#42A5F5'
          }
        ]
      }
    },
    ratingsForDomain () {
      return this.ratings.filter(v => v.domain.id === this.selectedDomain.id)
    }
  },
  async created () {
    await this.getRatings()
  },
  methods: {
    async getRatings () {
      this.ratings = await getAllForUser(this.$store.state.user.id)
    }
  }
}
</script>

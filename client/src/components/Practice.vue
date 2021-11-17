<template>
  <div class="p-component">
    <h1>Practise tasks</h1>
    <Button @click="getNextTask">
      Next Task
    </Button>
    <div class="p-field-checkbox">
      <Checkbox
        id="rated"
        v-model="rated"
        :binary="true"
      />
      <label for="rated">practice rated</label>
    </div>
    <DomainSelect
      v-model="selectedDomain"
    />
    <h5>Range: {{ range }} Your rating: {{ ratingForDomain }}</h5>
    <div class="p-field">
      <Slider
        v-model="range"
        :range="true"
        :step="20"
        :min="ratingForDomain-400"
        :max="ratingForDomain+400"
      />
    </div>

    <p>
      {{ tasks.length }} tasks available
    </p>
    <TaskSolve
      v-if="taskId"
      :taskId="taskId"
      :rated="rated"
    />
  </div>
</template>

<script>
import TaskSolve from './TaskSolve.vue'
import DomainSelect from './DomainSelect.vue'
import { getLatestForUser } from '../services/RatingService.js'

import { ref } from 'vue'

export default {
  components: {
    TaskSolve,
    DomainSelect
  },
  setup () {
    const rated = ref(true)
    const taskIndex = ref(0)
    const range = ref([20, 80])
    const ratings = ref([])
    const selectedDomain = ref({
      id: -1,
      description: ''
    })

    return {
      rated,
      taskIndex,
      range,
      ratings,
      selectedDomain
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
        .filter(v => v.domain.id === this.selectedDomain.id)
        .filter(v => v.public)
        .filter(v => this.ratingInRange(v.rating))
    },
    taskId () {
      if (this.taskIndex >= 0 && this.taskIndex < this.tasks.length) {
        return this.tasks[this.taskIndex].id
      } else {
        return null
      }
    },
    ratingForDomain () {
      const rating = this.ratings.find(v => v.domain.id === this.selectedDomain.id)
      if (rating) {
        return Math.round(rating.value)
      } else {
        return 1500
      }
    }
  },
  watch: {
    selectedDomain (val) {
      this.init()
    }
  },
  async created () {
    await this.getRatings()
    this.init()
  },
  methods: {
    getNextTask () {
      this.taskIndex++
      if (this.taskIndex >= this.tasks.length) {
        this.taskIndex = 0
      }
    },
    async getRatings () {
      this.ratings = await getLatestForUser(this.$store.state.user.id)
    },
    init () {
      this.taskIndex = 0
      this.range = [this.ratingForDomain - 200, this.ratingForDomain + 200]
    },
    ratingInRange (value) {
      if (!value) {
        value = 1500
      }
      return value >= this.range[0] && value <= this.range[1]
    }
  }
}
</script>

<template>
  <Button @click="showCreateDialog">
    Create comment
  </Button>
  <Dialog
    v-model:visible="createDialogVisible"
    :style="{width: '900px'}"
    header="Create comment"
    :modal="true"
    :maximizable="true"
    class="p-fluid"
  >
    <CommentEdit v-model="comment" />
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideCreateDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="save"
      />
    </template>
  </Dialog>
  <h3>Comments for {{ taskId }}</h3>
  <template
    v-for="c in comments"
    :key="c.id"
  >
    <div class="p-d-flex p-flex-wrap">
      <Rating
        class="p-m-4"
        :modelValue="c.stars"
        :readonly="true"
        :cancel="false"
      />
      <Button
        v-if="c.owner.id === userId"
        icon="pi pi-trash"
        class="p-m-4 p-button-rounded p-button-warning"
        @click="deleteComment(c)"
      />
      <p class="p-m-4">
        {{ c.content }}
      </p>
    </div>
  </template>
</template>

<script>
import CommentEdit from './CommentEdit.vue'
import { save, remove, getAllForTask } from '../services/CommentService.js'

export default {
  components: {
    CommentEdit
  },
  props: {
    taskId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      createDialogVisible: false,
      comment: {
        content: '',
        stars: 1
      },
      comments: []
    }
  },
  computed: {
    userId () {
      return this.$store.state.user.id
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      this.comments = await getAllForTask(this.taskId)
    },
    showCreateDialog () {
      this.createDialogVisible = true
    },
    hideCreateDialog () {
      this.createDialogVisible = false
    },
    async save () {
      this.comment.owner = this.$store.state.user.id
      this.comment.task = this.taskId
      await save(this.comment)
      this.hideCreateDialog()
      this.getComments()
    },
    async deleteComment (comment) {
      await remove(comment)
      this.getComments()
    }
  }
}
</script>

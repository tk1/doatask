import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './components/Welcome.vue'
import Tasks from './components/Tasks.vue'
import Login from './components/Login.vue'
import Assignments from './components/Assignments.vue'
import AssignmentTasks from './components/AssignmentTasks.vue'
import AssignmentSolve from './components/AssignmentSolve.vue'
import TaskSolve from './components/TaskSolve.vue'
import Admin from './components/Admin.vue'
import Ratings from './components/Ratings.vue'
import Practice from './components/Practice.vue'

import { canUserAccess } from './auth/access.js'
import store from './store/store'

const router = createRouter({
  routes: [{
    path: '/',
    component: Welcome
  },
  {
    path: '/tasks',
    component: Tasks
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/assignments',
    component: Assignments
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/assignmenttasks',
    component: AssignmentTasks
  },
  {
    path: '/assignmenttasks/:assignmentId',
    component: AssignmentTasks
  },
  {
    path: '/practice',
    component: Practice
  },
  {
    path: '/assignmentsolve',
    component: AssignmentSolve
  },
  {
    path: '/assignmentsolve/:assignmentId',
    component: AssignmentSolve,
    children: [
      {
        path: '',
        component: Welcome,
        props: { text: 'Choose a task from the menu or click "Next".' }
      },
      {
        path: 'task/:taskId',
        component: TaskSolve,
        props: true
      }
    ]
  }
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach((to, from) => {
  if (to.query.zen) {
    store.commit('setZenmode', Boolean(to.query.zen))
  } else {
    store.commit('setZenmode', false)
  }

  if (to.query.ltik) {
    let toUrl
    if (to.query.assignmentsolve) {
      // custom parameter in moodle e.g. assignmentsolve=9
      toUrl = `/assignmentsolve/${to.query.assignmentsolve}`
    } else {
      toUrl = '/'
    }
    store.dispatch('login', {
      ltik: to.query.ltik,
      course: {
        id: to.query.contextId,
        label: to.query.contextLabel,
        title: to.query.contextTitle
      },
      toUrl
    })
  }
  const canAccess = canUserAccess(to)
  if (!canAccess) {
    return '/'
  }
  return true
})

export default router

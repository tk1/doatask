function readJSON (store, file, handleData) {
  const reader = new window.FileReader()
  reader.onload = function (event) {
    const data = JSON.parse(event.target.result)
    handleData(store, data)
  }
  reader.readAsText(file)
}

async function insertTasks (store, data) {
  if (!data.tasks) {
    return
  }
  // map imported id's to newly assigned id's
  const taskIds = new Map()
  for (const task of data.tasks) {
    let domain = store.state.domains.all.find(v => v.name === task.domain.name)
    if (domain === undefined) {
      domain = await store.dispatch('domains/save', {
        name: task.domain.name,
        description: task.domain.description
      })
    }
    const savedTask = await store.dispatch('saveTask', {
      title: task.title,
      description: task.description,
      content: task.content,
      tags: task.tags,
      plugin: task.plugin,
      details: task.details,
      domain: domain.id,
      public: false
    })
    taskIds.set(task.id, savedTask.id)
  }
  return taskIds
}

async function insertAssignments (store, data) {
  if (!data.tasks || !data.assignments) {
    return
  }
  const taskIds = await insertTasks(store, data)
  data.assignments.forEach(async v => {
    const savedAssignment = await store.dispatch('assignments/save', {
      title: v.title,
      description: v.description,
      dueDate: v.dueDate,
      public: false
    })
    // use id's of newly created items
    const assignmentTasks = v.assignmentTasks.map(at => ({
      ...at, assignmentId: savedAssignment.id, taskId: taskIds.get(at.taskId)
    }))
    assignmentTasks.forEach(at => {
      store.dispatch('assignments/addTask', at)
    })
  })
}

export async function importTasks (store, file) {
  readJSON(store, file, insertTasks)
}

export async function importAssignments (store, file) {
  readJSON(store, file, insertAssignments)
}

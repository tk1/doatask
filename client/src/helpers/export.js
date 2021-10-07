export function exportAssignments (store, assignments) {
  const tasksIds = assignments.map(a => a.assignmentTasks.map(at => at.taskId)).flat()
  const tasks = store.state.tasks.filter(t => tasksIds.includes(t.id))
  const data = {
    assignments,
    tasks
  }
  exportData(data, 'assignments')
}

export function exportTasks (tasks) {
  exportData({ tasks }, 'tasks')
}

function exportData (data, baseFilename) {
  const json = JSON.stringify(data)
  const blob = new window.Blob([json], {
    type: 'application/json;charset=utf-8;'
  })
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
  const link = document.createElement('a')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.setAttribute('href', URL.createObjectURL(blob))
  link.setAttribute('download', `${baseFilename}.json`)
  link.click()
  document.body.removeChild(link)
}

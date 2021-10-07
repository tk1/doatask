import store from '../store/store.js'

export function canUserAccess (to) {
  const path = to.path

  if (path === '/') {
    return true
  }

  if (import.meta.env.DEV) {
    if (path === '/admin') {
      return true
    }
  }

  const user = store.state.user

  if (path === '/login' && !user.ltik) {
    return true
  }

  if (user.id < 0) {
    return false
  }

  if (path === '/ratings') {
    return true
  }

  if (user.role === 'student') {
    if (path.startsWith('/assignmentsolve') || path === '/practice') {
      return true
    } else {
      return false
    }
  }
  if (path === '/admin' && user.role !== 'admin') {
    return false
  }
  return true
}

import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'student-task-manager:tasks'
const NOTIF_TIMEOUT = 3200

let uid = 0
function nextId() {
  uid += 1
  return `${Date.now()}-${uid}`
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (e) {
    console.error('Failed to load tasks from localStorage:', e)
    return []
  }
}

// Shared, module-level state so every component using this composable
// sees the same reactive task list (simple singleton store pattern).
const tasks = ref(loadTasks())
const searchQuery = ref('')
const notifications = ref([])

watch(
  tasks,
  (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    } catch (e) {
      console.error('Failed to save tasks to localStorage:', e)
      pushNotification('Could not save changes — storage may be full.', 'error')
    }
  },
  { deep: true }
)

function pushNotification(message, type = 'success') {
  const id = nextId()
  notifications.value.push({ id, message, type })
  setTimeout(() => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }, NOTIF_TIMEOUT)
}

function dismissNotification(id) {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}

function createTask(payload) {
  const task = {
    id: nextId(),
    title: payload.title.trim(),
    description: (payload.description || '').trim(),
    subject: payload.subject.trim(),
    dueDate: payload.dueDate,
    status: payload.status || 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  tasks.value.unshift(task)
  pushNotification(`Task "${task.title}" created.`, 'success')
  return task
}

function updateTask(id, payload) {
  const idx = tasks.value.findIndex((t) => t.id === id)
  if (idx === -1) {
    pushNotification('Task not found — it may have been deleted.', 'error')
    return false
  }
  const updated = {
    ...tasks.value[idx],
    title: payload.title.trim(),
    description: (payload.description || '').trim(),
    subject: payload.subject.trim(),
    dueDate: payload.dueDate,
    status: payload.status,
    updatedAt: new Date().toISOString(),
  }
  tasks.value.splice(idx, 1, updated)
  pushNotification(`Task "${updated.title}" updated.`, 'success')
  return true
}

function deleteTask(id) {
  const idx = tasks.value.findIndex((t) => t.id === id)
  if (idx === -1) return false
  const [removed] = tasks.value.splice(idx, 1)
  pushNotification(`Task "${removed.title}" deleted.`, 'info')
  return true
}

function setStatus(id, status) {
  const idx = tasks.value.findIndex((t) => t.id === id)
  if (idx === -1) return
  tasks.value[idx].status = status
  tasks.value[idx].updatedAt = new Date().toISOString()
  pushNotification(`"${tasks.value[idx].title}" marked as ${status}.`, 'success')
}

const filteredTasks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return tasks.value
  return tasks.value.filter((t) => {
    return (
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    )
  })
})

const taskCounts = computed(() => {
  const counts = { total: tasks.value.length, Pending: 0, 'In Progress': 0, Completed: 0 }
  for (const t of tasks.value) {
    if (counts[t.status] !== undefined) counts[t.status] += 1
  }
  return counts
})

export function useTasks() {
  return {
    tasks,
    filteredTasks,
    taskCounts,
    searchQuery,
    notifications,
    pushNotification,
    dismissNotification,
    createTask,
    updateTask,
    deleteTask,
    setStatus,
  }
}

import { ref, watch, computed } from 'vue'

const STORAGE_KEY = 'student-task-manager:tasks'

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('Failed to read tasks from localStorage:', err)
    return []
  }
}

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Module-level state so every component that calls useTasks() shares
// the same reactive list and stays in sync (simple singleton store).
const tasks = ref(loadTasks())

watch(
  tasks,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch (err) {
      console.error('Failed to save tasks to localStorage:', err)
    }
  },
  { deep: true }
)

export function useTasks() {
  const taskCount = computed(() => tasks.value.length)
  const pendingCount = computed(() => tasks.value.filter((t) => t.status === 'Pending').length)
  const inProgressCount = computed(() => tasks.value.filter((t) => t.status === 'In Progress').length)
  const completedCount = computed(() => tasks.value.filter((t) => t.status === 'Completed').length)

  function addTask(payload) {
    const now = new Date().toISOString()
    const task = {
      id: generateId(),
      title: payload.title.trim(),
      description: (payload.description || '').trim(),
      subject: payload.subject.trim(),
      dueDate: payload.dueDate,
      status: payload.status || 'Pending',
      createdAt: now,
      updatedAt: now,
    }
    tasks.value = [task, ...tasks.value]
    return task
  }

  function updateTask(id, updates) {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index === -1) return false

    const current = tasks.value[index]
    const next = { ...current, ...updates, updatedAt: new Date().toISOString() }
    if (typeof next.title === 'string') next.title = next.title.trim()
    if (typeof next.subject === 'string') next.subject = next.subject.trim()
    if (typeof next.description === 'string') next.description = next.description.trim()

    const copy = tasks.value.slice()
    copy[index] = next
    tasks.value = copy
    return true
  }

  function deleteTask(id) {
    const exists = tasks.value.some((t) => t.id === id)
    if (!exists) return false
    tasks.value = tasks.value.filter((t) => t.id !== id)
    return true
  }

  function getTaskById(id) {
    return tasks.value.find((t) => t.id === id) || null
  }

  return {
    tasks,
    taskCount,
    pendingCount,
    inProgressCount,
    completedCount,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  }
}

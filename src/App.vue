<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppAlert from './components/AppAlert.vue'
import TaskForm from './components/TaskForm.vue'
import TaskStats from './components/TaskStats.vue'
import SearchBar from './components/SearchBar.vue'
import TaskList from './components/TaskList.vue'
import { useTasks } from './composables/useTasks.js'

const { tasks, taskCount, pendingCount, inProgressCount, completedCount, addTask, updateTask, deleteTask } =
  useTasks()

const searchQuery = ref('')
const statusFilter = ref('All')
const editingTask = ref(null)
const feedback = ref({ message: '', type: 'success' })
let feedbackTimer = null

function showFeedback(message, type = 'success') {
  feedback.value = { message, type }
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => {
    feedback.value = { message: '', type }
  }, 3500)
}

function dismissFeedback() {
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedback.value = { ...feedback.value, message: '' }
}

onBeforeUnmount(() => {
  if (feedbackTimer) clearTimeout(feedbackTimer)
})

const filteredTasks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return tasks.value.filter((task) => {
    const matchesStatus = statusFilter.value === 'All' || task.status === statusFilter.value
    if (!matchesStatus) return false
    if (!query) return true
    return (
      task.title.toLowerCase().includes(query) ||
      task.subject.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    )
  })
})

function handleSubmit(formData) {
  if (editingTask.value) {
    updateTask(editingTask.value.id, formData)
    showFeedback('Task updated successfully.', 'success')
    editingTask.value = null
  } else {
    addTask(formData)
    showFeedback('Task added successfully.', 'success')
  }
}

function handleEdit(task) {
  editingTask.value = task
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleCancelEdit() {
  editingTask.value = null
}

function handleDelete(task) {
  const confirmed = window.confirm(`Delete "${task.title}"? This can't be undone.`)
  if (!confirmed) return
  deleteTask(task.id)
  if (editingTask.value?.id === task.id) editingTask.value = null
  showFeedback('Task deleted.', 'error')
}

function handleStatusChange(id, status) {
  updateTask(id, { status })
  showFeedback('Status updated.', 'success')
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader :pending-count="pendingCount" />

    <main class="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <AppAlert :message="feedback.message" :type="feedback.type" @dismiss="dismissFeedback" />

      <TaskForm :editing-task="editingTask" @submit="handleSubmit" @cancel="handleCancelEdit" />

      <TaskStats :total="taskCount" :pending="pendingCount" :in-progress="inProgressCount" :completed="completedCount" />

      <section class="space-y-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-base font-semibold text-foreground">Your tasks</h2>
          <span class="text-sm text-muted-foreground">
            Showing {{ filteredTasks.length }} of {{ taskCount }} task{{ taskCount === 1 ? '' : 's' }}
          </span>
        </div>

        <SearchBar v-model="searchQuery" v-model:status-filter="statusFilter" />

        <TaskList
          :tasks="filteredTasks"
          :has-any-tasks="taskCount > 0"
          @edit="handleEdit"
          @delete="handleDelete"
          @status-change="handleStatusChange"
        />
      </section>
    </main>

    <AppFooter />
  </div>
</template>

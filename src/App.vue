<script setup>
import { ref } from 'vue'
import { useTasks } from './composables/useTasks.js'

import AppHeader from './components/AppHeader.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import AppFooter from './components/AppFooter.vue'
import NotificationList from './components/NotificationList.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'

const {
  filteredTasks,
  taskCounts,
  searchQuery,
  notifications,
  dismissNotification,
  createTask,
  updateTask,
  deleteTask,
  setStatus,
} = useTasks()

// --- Edit modal state ---
const editingTask = ref(null)

function openEdit(task) {
  editingTask.value = task
}
function closeEdit() {
  editingTask.value = null
}
function handleEditSubmit(payload) {
  if (editingTask.value) {
    updateTask(editingTask.value.id, payload)
  }
  closeEdit()
}

// --- Create ---
function handleCreateSubmit(payload) {
  createTask(payload)
}

// --- Delete confirmation state ---
const pendingDelete = ref(null)

function requestDelete(task) {
  pendingDelete.value = task
}
function cancelDelete() {
  pendingDelete.value = null
}
function confirmDelete() {
  if (pendingDelete.value) {
    deleteTask(pendingDelete.value.id)
  }
  pendingDelete.value = null
}

function handleStatusChange(task, status) {
  setStatus(task.id, status)
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader :counts="taskCounts" />

    <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <TaskForm :task="null" :is-modal="false" @submit="handleCreateSubmit" />

      <TaskList
        :tasks="filteredTasks"
        :total-count="taskCounts.total"
        :search-query="searchQuery"
        @update:search-query="(v) => (searchQuery = v)"
        @edit="openEdit"
        @delete="requestDelete"
        @status-change="handleStatusChange"
      />
    </main>

    <AppFooter />

    <!-- Edit modal -->
    <TaskForm
      v-if="editingTask"
      :task="editingTask"
      :is-modal="true"
      @submit="handleEditSubmit"
      @cancel="closeEdit"
    />

    <!-- Delete confirmation -->
    <ConfirmDialog
      v-if="pendingDelete"
      title="Delete this task?"
      :message="`\u201c${pendingDelete.title}\u201d will be permanently removed. This can't be undone.`"
      confirm-label="Delete"
      cancel-label="Cancel"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <NotificationList :notifications="notifications" @dismiss="dismissNotification" />
  </div>
</template>

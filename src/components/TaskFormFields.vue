<script setup>
defineProps({
  form: { type: Object, required: true },
  errors: { type: Object, required: true },
  statusOptions: { type: Array, required: true },
})
defineEmits(['field-blur'])
</script>

<template>
  <div class="space-y-4">
    <div>
      <label for="task-title" class="block text-sm font-medium text-slate-700 mb-1.5">Title <span class="text-rose-500">*</span></label>
      <input
        id="task-title"
        v-model="form.title"
        type="text"
        maxlength="80"
        placeholder="e.g. Finish algebra worksheet"
        class="w-full h-11 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
        :class="errors.title ? 'border-rose-400 focus:ring-rose-400/40' : 'border-slate-200 focus:border-indigo-400'"
        :aria-invalid="!!errors.title"
        aria-describedby="task-title-error"
        @blur="$emit('field-blur', 'title')"
      />
      <p v-if="errors.title" id="task-title-error" class="mt-1.5 text-xs text-rose-500">{{ errors.title }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="task-subject" class="block text-sm font-medium text-slate-700 mb-1.5">Subject <span class="text-rose-500">*</span></label>
        <input
          id="task-subject"
          v-model="form.subject"
          type="text"
          placeholder="e.g. Mathematics"
          class="w-full h-11 px-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
          :class="errors.subject ? 'border-rose-400 focus:ring-rose-400/40' : 'border-slate-200 focus:border-indigo-400'"
          :aria-invalid="!!errors.subject"
          aria-describedby="task-subject-error"
          @blur="$emit('field-blur', 'subject')"
        />
        <p v-if="errors.subject" id="task-subject-error" class="mt-1.5 text-xs text-rose-500">{{ errors.subject }}</p>
      </div>

      <div>
        <label for="task-due" class="block text-sm font-medium text-slate-700 mb-1.5">Due Date <span class="text-rose-500">*</span></label>
        <input
          id="task-due"
          v-model="form.dueDate"
          type="date"
          class="w-full h-11 px-3.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
          :class="errors.dueDate ? 'border-rose-400 focus:ring-rose-400/40' : 'border-slate-200 focus:border-indigo-400'"
          :aria-invalid="!!errors.dueDate"
          aria-describedby="task-due-error"
          @blur="$emit('field-blur', 'dueDate')"
        />
        <p v-if="errors.dueDate" id="task-due-error" class="mt-1.5 text-xs text-rose-500">{{ errors.dueDate }}</p>
      </div>
    </div>

    <div>
      <label for="task-status" class="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
      <select
        id="task-status"
        v-model="form.status"
        class="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition"
      >
        <option v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>

    <div>
      <label for="task-desc" class="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
      <textarea
        id="task-desc"
        v-model="form.description"
        rows="3"
        maxlength="500"
        placeholder="Optional notes about this task..."
        class="w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
        :class="errors.description ? 'border-rose-400 focus:ring-rose-400/40' : 'border-slate-200 focus:border-indigo-400'"
        @blur="$emit('field-blur', 'description')"
      ></textarea>
      <div class="flex items-center justify-between mt-1.5">
        <p v-if="errors.description" class="text-xs text-rose-500">{{ errors.description }}</p>
        <p v-else></p>
        <p class="text-xs text-slate-400">{{ form.description.length }}/500</p>
      </div>
    </div>
  </div>
</template>

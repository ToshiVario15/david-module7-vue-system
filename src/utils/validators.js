// Central validation logic for the Task entity.
// Returns an object keyed by field name -> error message (empty object = valid).

export function validateTask(task) {
  const errors = {}

  if (!task.title || !task.title.trim()) {
    errors.title = 'Title is required.'
  } else if (task.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.'
  } else if (task.title.trim().length > 80) {
    errors.title = 'Title must be under 80 characters.'
  }

  if (task.description && task.description.length > 500) {
    errors.description = 'Description must be under 500 characters.'
  }

  if (!task.subject || !task.subject.trim()) {
    errors.subject = 'Subject is required.'
  }

  if (!task.dueDate) {
    errors.dueDate = 'Due date is required.'
  }

  if (!task.status) {
    errors.status = 'Status is required.'
  }

  return errors
}

export function isValid(errors) {
  return Object.keys(errors).length === 0
}

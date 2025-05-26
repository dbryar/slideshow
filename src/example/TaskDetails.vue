<template>
  <div class="task-details">
    <h2>🔍 Task Details</h2>
    <div class="field">
      <label>ID:</label>
      <span>{{ task.id }}</span>
    </div>
    <div class="field">
      <label>Name:</label>
      <input v-model="editableTask.name" type="text" />
    </div>
    <div>
      <label>Notes: 📝</label>
      <textarea v-model="editableTask.notes"></textarea>
    </div>
    <div class="status-section">
      <div>
        <label>Status: </label>
        <span :class="{ completed: editableTask.completed }">
          {{ editableTask.completed ? "✅ Completed" : "⏳ Pending" }}
        </span>
      </div>
      <div class="mark-completed">
        <button @click="completeTask" :disabled="editableTask.completed">Mark as Completed</button>
      </div>
    </div>
    <div>
      <label>Date Completed: </label>
      <span>{{ editableTask.dateCompleted || "N/A" }}</span>
    </div>
    <div class="actions">
      <button @click="saveChanges" class="save-button">Save</button>
      <button @click="$emit('close')" class="close-button">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { Task } from "./models/task"

export default defineComponent({
  name: "TaskDetails",
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  emits: ["update-task", "close"],
  setup(props, { emit }) {
    const editableTask = ref({ ...props.task })

    watch(
      () => props.task,
      (newTask) => {
        editableTask.value = { ...newTask }
      }
    )

    const completeTask = () => {
      editableTask.value.completed = true
      editableTask.value.dateCompleted = new Date().toLocaleString()
      emit("update-task", { ...editableTask.value })
    }

    const saveChanges = () => {
      emit("update-task", { ...editableTask.value })
    }

    return { editableTask, completeTask, saveChanges }
  },
})
</script>

<style scoped>
.task-details {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.field {
  margin-bottom: 15px;
}
label {
  font-weight: bold;
  color: #555;
}
textarea,
input {
  display: block;
  width: 100%;
  margin: 5px 0 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.save-button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-button:hover {
  background-color: #218838;
}
.close-button {
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.close-button:hover {
  background-color: #c82333;
}
button {
  margin-right: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
button:hover {
  background-color: #0056b3;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.status-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.mark-completed {
  text-align: center;
}
.completed {
  color: green;
  font-weight: bold;
}
</style>

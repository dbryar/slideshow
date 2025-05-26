<template>
  <div class="task-details">
    <h2>🔍 Task Details</h2>
    <div>
      <label>🆔 ID:</label>
      <span>{{ task.id }}</span>
    </div>
    <div>
      <label>📌 Name:</label>
      <input v-model="editableTask.name" type="text" />
    </div>
    <div>
      <label>📝 Notes:</label>
      <textarea v-model="editableTask.notes"></textarea>
    </div>
    <div>
      <label>Status:</label>
      <span :class="{ completed: editableTask.completed }">
        {{ editableTask.completed ? "✅ Completed" : "⏳ Pending" }}
      </span>
      <button @click="completeTask" :disabled="editableTask.completed">Mark as Completed</button>
    </div>
    <div>
      <label>📅 Date Completed:</label>
      <span>{{ editableTask.dateCompleted || "N/A" }}</span>
    </div>
    <button @click="saveChanges">💾 Save Changes</button>
    <button @click="$emit('close')">❌ Close</button>
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
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
label {
  font-weight: bold;
}
textarea,
input {
  display: block;
  width: 100%;
  margin: 5px 0 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.completed {
  color: green;
  font-weight: bold;
}
</style>

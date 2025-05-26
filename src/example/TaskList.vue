<template>
  <div class="task-list">
    <div class="header">
      <div class="subtitle">
        <h2>Task List</h2>
      </div>
      <div class="task-form">
        <form @submit.prevent="submitTask">
          <input v-model="newTaskName" type="text" placeholder="Enter task name" required />
          <button type="submit">➕ Add Task</button>
        </form>
      </div>
    </div>
    <ul class="task-table">
      <li v-for="task in tasks" :key="task.id" @click="$emit('open-task', task.id)" class="task-item">
        <span class="column icon">🆔</span>
        <span class="column">{{ task.id }}</span>
        <span class="column icon">📌</span>
        <span class="column">{{ task.name }}</span>
        <span class="column status" :class="{ completed: task.completed }">
          {{ task.completed ? "✅ Completed" : "⏳ Pending" }}
        </span>
        <span class="column icon">📅</span>
        <span class="column">{{ task.dateCompleted || "N/A" }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { Task } from "./models/task"

export default defineComponent({
  name: "TaskList",
  props: {
    tasks: {
      type: Array as () => Task[],
      required: true,
    },
  },
  emits: ["add-task", "open-task"],
  setup(_, { emit }) {
    const newTaskName = ref("")

    const submitTask = () => {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName.value,
        completed: false,
        dateCompleted: null,
        notes: "",
      }
      emit("add-task", newTask)
      newTaskName.value = ""
    }

    return { newTaskName, submitTask }
  },
})
</script>

<style scoped>
.task-list {
  margin-top: 20px;
  color: #333;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subtitle {
  flex: 0;
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a90e2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  padding-left: 3rem;
}
.task-form {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 3rem;
}
.task-form {
  display: flex;
  gap: 10px;
}
.task-table {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  transition: background-color 0.3s;
}
.task-item:hover {
  background-color: #f0f8ff;
}
.column {
  flex: 1;
  text-align: left;
  font-size: 1.2rem;
}
.icon {
  flex: 0;
  width: 20px;
  text-align: center;
}
.status.completed {
  color: green;
  font-weight: bold;
}
input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  margin-left: 1.5rem;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>

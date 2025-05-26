<template>
  <div class="task-list">
    <h2>📋 Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id" @click="$emit('open-task', task.id)" class="task-item">
        <span>🆔 {{ task.id }}</span> | <span>📌 {{ task.name }}</span> |
        <span :class="{ completed: task.completed }">
          {{ task.completed ? "✅ Completed" : "⏳ Pending" }}
        </span>
        |
        <span>📅 {{ task.dateCompleted || "N/A" }}</span>
      </li>
    </ul>
    <form @submit.prevent="submitTask">
      <input v-model="newTaskName" type="text" placeholder="Enter task name" required />
      <button type="submit">➕ Add Task</button>
    </form>
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
}
.task-item {
  cursor: pointer;
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  transition: background-color 0.3s;
}
.task-item:hover {
  background-color: #f0f8ff;
}
.completed {
  color: green;
  font-weight: bold;
}
form {
  margin-top: 10px;
}
input {
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
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
</style>

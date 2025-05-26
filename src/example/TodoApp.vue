<template>
  <div class="todo-app">
    <h1>📝 Todo App</h1>
    <task-list :tasks="tasks" @open-task="openTask" @add-task="addTask" />
    <task-details v-if="selectedTask" :task="selectedTask" @update-task="updateTask" @close="closeTask" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import TaskList from "./TaskList.vue"
import TaskDetails from "./TaskDetails.vue"
import { Task } from "./models/task"

export default defineComponent({
  name: "TodoApp",
  components: { TaskList, TaskDetails },
  setup() {
    const tasks = ref<Task[]>([])
    const selectedTask = ref<Task | null>(null)

    const addTask = (task: Task) => {
      tasks.value.push(task)
    }

    const openTask = (taskId: number) => {
      selectedTask.value = tasks.value.find((task) => task.id === taskId) || null
    }

    const updateTask = (updatedTask: Task) => {
      const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) tasks.value[index] = updatedTask
    }

    const closeTask = () => {
      selectedTask.value = null
    }

    return { tasks, selectedTask, addTask, openTask, updateTask, closeTask }
  },
})
</script>

<style scoped>
.todo-app {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

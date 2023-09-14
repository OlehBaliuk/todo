<template>
  <div class="todo-list">
    <UserData />

    <span class="todo-list__title">ToDo</span>

    <div class="todo-list__select-container">
      <v-select
        v-model="selectedStatus"
        :options="statusOptions"
        class="todo-list__select"
        placeholder="Status"
      />

      <v-select
        v-model="selectedUserId"
        :options="userIds"
        class="todo-list__select"
        placeholder="User ID"
      />
    </div>

    <input
      v-model="searchText"
      class="todo-list__search-input"
      placeholder="Search..."
      type="text"
    />

    <div class="todo-list__todos-container">
      <div v-for="todo in filteredTodos" :key="todo.id" class="todo-list__todo">
        <span class="todo-list__todo-title">{{ todo.title }}</span>
        <input v-if="todo.completed" type="checkbox" name="check" checked />
        <input v-else type="checkbox" name="check" />
        <label for="check" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HttpService from '@/service/HttpService'
import apiRoutes from '@/constants/apiRoutes'
import { ToDo } from '@/interfaces/ToDo'
import UserData from '@/components/UserData.vue'

@Component({
  components: {
    UserData
  }
})
export default class ToDoList extends Vue {
  async mounted() {
    const { data } = await HttpService.get(apiRoutes.todos)
    this.todos = data
    console.log(this.todos)
  }

  todos = []
  selectedStatus = ''
  selectedUserId = ''
  searchText = ''

  get statusOptions() {
    return ['All', 'Completed', 'Uncompleted']
  }

  get userIds() {
    return ['All', ...new Set(this.todos.map((todo: ToDo) => todo.userId))]
  }

  get filteredTodos() {
    return this.todos.filter((todo: ToDo) => {
      let statusFilter
      let userFilter

      if (this.selectedStatus === 'All' || !this.selectedStatus) {
        statusFilter = true
      } else if (this.selectedStatus === 'Completed') {
        statusFilter = todo.completed === true
      } else if (this.selectedStatus === 'Uncompleted') {
        statusFilter = todo.completed === false
      }

      if (this.selectedUserId === 'All' || !this.selectedUserId) {
        userFilter = true
      } else {
        userFilter = todo.userId === Number(this.selectedUserId)
      }

      const searchFilter = todo.title
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      return statusFilter && userFilter && searchFilter
    })
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
  margin-top: 20px;

  &__title {
    font-size: 24px;
    font-weight: 500;
  }

  &__todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding: 7px;
    border-radius: 5px;
    background: #c3c3c3;
    text-align: left;
    margin-bottom: 5px;
  }

  &__select-container {
    --vs-dropdown-option--active-bg: #c3c3c3;
    --vs-search-input-placeholder-color: rgba(128, 128, 128, 0.8);
    --vs-font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }

  &__select {
    width: 200px;
  }

  &__search-input {
    height: 32px;
    width: 100%;
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    padding: 0 10px;
    margin-bottom: 10px;
  }
}
</style>

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
        <div class="todo-list__status-container">
          <input v-if="todo.completed" type="checkbox" name="check" checked />
          <input v-else type="checkbox" name="check" />
          <label for="check" />

          <img
            v-if="isFavoriteToDo(todo.id)"
            class="todo-list__icon"
            src="../assets/fullStar.png"
            alt="star"
            @click="removeFromFavoriteToDo(todo.id)"
          />
          <img
            v-else
            class="todo-list__icon"
            src="../assets/star.png"
            alt="star"
            @click="addToFavoriteToDo(todo.id)"
          />
        </div>
      </div>
    </div>

    <button class="todo-list__button" @click="onOpenCreateModal()">
      Create ToDo
    </button>

    <CreateTodo
      :activeModal="activeModal"
      :isFetch="isFetch"
      @close-modal="onCloseCreateModal"
      @create-todo="onCreateToDo"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HttpService from '@/service/HttpService'
import apiRoutes from '@/constants/apiRoutes'
import { ToDo } from '@/interfaces/ToDo'
import UserData from '@/components/UserData.vue'
import CreateTodo from '@/components/CreateTodo.vue'

@Component({
  components: {
    UserData,
    CreateTodo
  }
})
export default class ToDoList extends Vue {
  async mounted() {
    this.getFavoriteToDoId()
    const { data } = await HttpService.get(apiRoutes.todos)
    this.todos = data
  }

  todos: ToDo[] = []
  selectedStatus = ''
  selectedUserId = ''
  searchText = ''
  activeModal = false
  isFetch = false
  favoriteToDoId: string | null = ''

  get statusOptions() {
    return ['All', 'Completed', 'Uncompleted', 'Favorites']
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
      } else if (this.selectedStatus === 'Favorites') {
        statusFilter = JSON.parse(this.favoriteToDoId || '[]').find(
          (id) => id === todo.id
        )
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

  isFavoriteToDo(id) {
    return (
      JSON.parse(this.favoriteToDoId || '[]') &&
      JSON.parse(this.favoriteToDoId || '[]').find((todoId) => todoId === id)
    )
  }

  getFavoriteToDoId() {
    this.favoriteToDoId = localStorage.getItem('favoriteToDo')
  }

  removeFromFavoriteToDo(id) {
    const toDosId = JSON.parse(this.favoriteToDoId || '[]')
    const filteredId = toDosId.filter((todoId) => todoId !== id)
    localStorage.setItem('favoriteToDo', JSON.stringify(filteredId))
    this.getFavoriteToDoId()
  }

  addToFavoriteToDo(id) {
    const favoriteIds = JSON.parse(this.favoriteToDoId || '[]')
    favoriteIds.push(id)
    localStorage.setItem('favoriteToDo', JSON.stringify(favoriteIds))
    this.getFavoriteToDoId()
  }

  onOpenCreateModal() {
    this.activeModal = true
  }

  onCloseCreateModal() {
    this.activeModal = false
  }

  async onCreateToDo(todo) {
    this.isFetch = true
    const { data } = await HttpService.post(apiRoutes.todos, todo)
    this.activeModal = false
    this.isFetch = false
    this.todos.push(data)
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
    border: 1px solid #c3c3c3;
    border-radius: 3px;
    margin-bottom: 10px;
  }

  &__button {
    position: fixed;
    font-size: 16px;
    padding: 10px;
    right: 50px;
    bottom: 50px;
    width: 100px;
    height: 100px;
    border: none;
  }

  &__status-container {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  &__icon {
    width: 18px;
    cursor: pointer;
  }

  @media (max-width: 590px) {
    &__select-container {
      flex-direction: column;
    }

    &__select {
      width: 100%;
    }

    &__select:first-child {
      margin-bottom: 10px;
    }

    &__button {
      width: 70px;
      height: 70px;
    }
  }
}
</style>

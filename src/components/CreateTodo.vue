<template>
  <Modal :active="activeModal">
    <div class="create-todo__container">
      <span class="create-todo__title">Create ToDo</span>
      <form class="create-todo__form" @submit.prevent="submit">
        <div class="create-todo__input-container">
          <input v-model="userId" type="text" placeholder="User ID" />
          <input v-model="title" type="text" placeholder="Title" />
        </div>
        <button
          :disabled="isFetch || !formValid"
          type="submit"
          class="create-todo__button"
        >
          Save
        </button>
        <button type="button" class="create-todo__button" @click="onCloseModal">
          Close
        </button>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Modal from './Modal.vue'

@Component({
  components: {
    Modal
  }
})
export default class CreateTodo extends Vue {
  @Prop({ type: Boolean, default: false })
  activeModal

  @Prop({ type: Boolean, default: false })
  isFetch

  userId = ''
  title = ''

  get formValid() {
    return Boolean(this.userId) && Boolean(this.title)
  }

  onCloseModal() {
    this.$emit('close-modal')
    this.resetForm()
  }

  submit() {
    this.$emit('create-todo', { userId: this.userId, title: this.title })

    if (!this.isFetch) {
      this.resetForm()
    }
  }

  resetForm() {
    this.userId = ''
    this.title = ''
  }
}
</script>

<style lang="scss" scoped>
.create-todo {
  &__container {
    width: 450px;
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
  }

  &__form {
    margin-top: 20px;
  }

  &__input-container {
    display: flex;
    flex-direction: column;

    input {
      height: 32px;
      border: 1px solid #c3c3c3;
      margin-bottom: 10px;
    }
  }

  &__button {
    margin: 7px;
    padding: 6px;
    border-radius: 5px;
    min-width: 70px;
  }
}
</style>

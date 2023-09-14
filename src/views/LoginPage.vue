<template>
  <div class="login-page">
    <div class="login-page__title">
      <span>Login</span>
    </div>
    <form class="login-page__form" @submit.prevent="submit">
      <input
        v-model="userName"
        pattern="[A-Za-z]+"
        class="login-page__username-input"
        placeholder="Username"
        type="text"
        @input="validateInput"
      />
      <input
        v-model="phoneNumber"
        class="login-page__phone-number-input"
        placeholder="Phone number"
        type="password"
      />
      <button
        :disabled="!formValid"
        class="login-page__submit-button"
        type="submit"
      >
        Login
      </button>
      <span v-if="isError" class="login-page__error-message">login error</span>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HttpService from '@/service/HttpService'
import apiRoutes from '@/constants/apiRoutes'
import routes from '@/constants/routes'
import { User } from '@/interfaces/User'

@Component
export default class LoginPage extends Vue {
  async mounted() {
    const { data } = await HttpService.get(apiRoutes.users)
    this.users = data
  }

  isError = false
  userName = ''
  phoneNumber = ''
  users = []

  get formValid() {
    return Boolean(this.userName) && Boolean(this.phoneNumber)
  }

  validateInput() {
    this.userName = this.userName.replace(/[^A-Za-z]/g, '')
  }

  submit() {
    this.users.map((user: User) => {
      if (user.username === this.userName && user.phone === this.phoneNumber) {
        this.$store.commit('SET_USER', user)
        this.$router.push(routes.todo)
      } else {
        this.isError = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  margin-top: 150px;
  background: #c3c3c3;
  border-radius: 5px;
  color: #e4f3ec;

  &__title {
    padding: 15px 0;
    background: #a5a5a5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 17px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25px;
    position: relative;
  }

  &__username-input,
  &__phone-number-input {
    border: none;
    border-radius: 5px;
    padding: 10px;
  }

  &__username-input {
    margin-bottom: 20px;
  }

  &__phone-number-input {
    margin-bottom: 25px;
  }

  &__submit-button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background: #519945;
    color: inherit;

    &:disabled {
      opacity: 0.5;
    }
  }

  &__error-message {
    color: red;
    position: absolute;
    bottom: 3px;
  }
}
</style>

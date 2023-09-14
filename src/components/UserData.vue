<template>
  <div>
    <span class="user-data__title">User</span>
    <div class="user-data__container">
      <div
        v-for="(value, key) in templateUserData"
        :key="key"
        class="user-data__row"
      >
        <span class="user-data__key">{{ key }}</span>
        <span class="user-data__value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UserData extends Vue {
  get userData() {
    return this.$store.state.user
  }

  get templateUserData() {
    return { Name: this.userData.name, Email: this.userData.email }
  }
}
</script>

<style lang="scss" scoped>
.user-data {
  &__title {
    font-size: 24px;
    font-weight: 500;
  }

  &__container {
    margin: 20px 0;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  &__key {
    font-weight: 500;
  }
}
</style>

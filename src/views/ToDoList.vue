<template>
  <div class="todo-list">todo-list</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HttpService from '@/service/HttpService'
import apiRoutes from '@/constants/apiRoutes'
import routes from '@/constants/routes'

@Component
export default class ToDoList extends Vue {}
</script>

<style lang="scss"></style>

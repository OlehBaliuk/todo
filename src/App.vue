<template>
  <div id="app">
    <header class="header">ToDo List</header>

    <main class="main">
      <div class="main__container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.header {
  background: black;
  font-size: 25px;
  padding: 10px;
  color: rgb(228, 243, 236);
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    width: 450px;
  }

  @media (max-width: 590px) {
    &__container {
      width: 300px;
    }
  }
}
</style>

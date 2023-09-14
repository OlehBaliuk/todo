<template>
  <div id="app">
    <header class="header">ToDo List</header>
    <main class="main">
      <router-view />
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
}
</style>

<template>
  <div :class="[active ? 'modal active' : 'modal']">
    <div
      :class="[active ? 'modal__content active' : 'modal__content']"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
  @Prop({ type: Boolean, default: false })
  active
}
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: 0.5s;
  z-index: 9999;
}

.modal.active {
  opacity: 1;
  pointer-events: all;
}

.modal__content {
  padding: 30px;
  border-radius: 10px;
  background-color: white;
  width: 500px;
  min-height: 150px;
  transform: scale(0.5);
  transition: 0.4s all;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.modal__content.active {
  transform: scale(1);
}

.button {
  margin-top: 50px;
}

@media (max-width: 590px) {
  .modal__content {
    width: 300px;
  }
}
</style>

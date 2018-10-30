<template>
  <div class="loading">
    <ul class="dots">
      <li class="dot0 dot" />
      <li class="dot1 dot" />
      <li class="dot2 dot" />
    </ul>
  </div>
</template>

<style scoped>
@keyframes show {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.dots {
  display: flex;
}
.dot {
  opacity: 0;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  margin-right: 12px;
}
.dot0 {
  background: #f39700;
  box-shadow: 0 0 6px #f39700;
  animation: show 1s ease infinite;
}
.dot1 {
  animation: show 1s 1s ease infinite;
  background: #e60012;
  box-shadow: 0 0 6px #e60012;
}
.dot2 {
  background: #00a7db;
  box-shadow: 0 0 6px #00a7db;
  animation: show 1s 2s ease infinite;
}
</style>

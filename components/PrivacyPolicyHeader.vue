<template>
<header class="header">
  <img src="~/assets/icons/arrow-left.svg" class="forwardToTop" @click="$router.push('/')" alt="top">
  <div class="inner">
    <p class="appName">NearStation</p>
  </div>
</header>
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  background: #0087C5;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  padding: 14px 24px;
  color: #fff;
  display: flex;
  align-items: center;
}
.inner {
  display: flex;
  justify-content: center;
  width: 100%;
}
.appName {
  font-size: 1.2rem;
}
.forwardToTop {
  width: 24px;
  height: auto;
  cursor: pointer;
}
</style>

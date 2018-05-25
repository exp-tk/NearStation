<template>
  <div class="page">
    <PrivacyPolicyHeader />
    <main class="error">
      <diiv class="circle">
        <p>E</p>
      </diiv>
      <div v-if="error.statusCode === 404">
      <h1 class="title">{{error.statusCode}}</h1>
      <h2 class="description">ページが見つかりません</h2>
      </div>
      <div v-else>
        <h1 class="title">{{error.statusCode}}</h1>
        <h2 class="description">エラーが発生しました</h2>
      </div>
    </main>
  </div>
</template>

<script>
import PrivacyPolicyHeader from '~/components/PrivacyPolicyHeader';
export default {
    props: ['error'],
    components: {
      PrivacyPolicyHeader
    }
}
</script>

<style scoped>
.error {
  height: calc(100vh - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
}
.circle {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 32px;
  border: 24px solid #e60012;
  background: #fff;
}
</style>

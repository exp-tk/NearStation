<template>
  <div class="share">
    <img src="/static/icon/twitter.svg" alt="twitter" @click="share()" class="share-twitter">
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import UploadService from '../services/UploadService';

export default {
  name: 'button-share',
  methods: {
    share() {
      if (this.station.station_name === undefined) {
        return;
      }
      this.disablePanelAnimation();
      const win = window.open('', '_blank');
      win.document.body.innerHTML = '<p>キャプチャ中です...</p>';
      // キャプチャし画像化
      this.$nextTick(() => {
        html2canvas(document.querySelector('.wrapper')).then((canvas) => {
          canvas.toBlob((blob) => {
            const svc = new UploadService();
            svc.upload(blob)
              .subscribe((url) => {
                const msg = `私は今、${this.station.station_name}駅付近にいます。 ${url} https://near.tinykitten.me/ %23KittenNearStation&via=tinykitten8`;
                const popupUrl = `http://twitter.com/intent/tweet?text=${msg}`;
                win.location.href = popupUrl;
                this.enablePanelAnimation();
              }, () => {
                win.close();
                /* eslint-disable no-alert */
                alert('シェアに失敗しました。');
                this.enablePanelAnimation();
              });
          });
        });
      });
    },
    // アニメーション切らないとスクショ撮るの失敗するっぽい
    enablePanelAnimation() {
      this.$store.commit('setAnimationDisabled', false);
    },
    disablePanelAnimation() {
      this.$store.commit('setAnimationDisabled', true);
    },
  },
  computed: {
    station() {
      return this.$store.getters.station();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .share-twitter {
        padding: 32px;
        display: block;
        color: #fff;
        width: 84px;
        height: 84px;
        font-size: 1.5rem;
        margin: 0 auto;
        filter: drop-shadow(0 0 8px rgba(0, 0, 0, .25));
        border: none;
        cursor: pointer;
        outline: none;
        margin-top: 20vh;
    }
</style>

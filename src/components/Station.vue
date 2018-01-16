<template>
  <div class="panel-wrapper">
      <div class="wrapper" v-if="station.station_name">
        <ul class="lines">
          <line-panel v-for="line in station.lines" :color="line.line_color_c" :key="line[0]"></line-panel>
        </ul>
        <div :class="animationClass">
          <h1 class="stationName">{{station.station_name}}</h1>
          <h2 class="stationAddr">{{station.add}}</h2>
          <span class="gap">{{station.gap}}m</span>
        </div>
      </div>
    <div class="wrapper" v-if="!station.station_name">
        <ul class="lines">
            <line-panel color="f39700"></line-panel>
            <line-panel color="e60012"></line-panel>
            <line-panel color="9caeb7"></line-panel>
            <line-panel color="00a7db"></line-panel>
            <line-panel color="009944"></line-panel>
        </ul>
        <div class="panel">
          <h1 class="stationName label">読み込み中</h1>
          <h2 class="loading-notice label">
            ブラウザの位置情報追跡を許可してください。
          </h2>
        </div>
    </div>
  </div>
</template>

<script>
import LinePanel from './Line';
import state from '../state';

export default {
  name: 'panel-station',
  props: {
    station: { type: Object, required: true },
  },
  components: {
    LinePanel,
  },
  data() {
    return {
      state: state.state,
    };
  },
  computed: {
    animationClass() {
      if (this.state.animationDisabled) {
        return 'panel';
      }
      return 'panel slide';
    },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes slide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.panel-wrapper {
  height: 100%;
}

.wrapper {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: flex-start;
    width: 100vw;
    height: calc(35vh + 8px);
    overflow: hidden;
    margin-top: 32px;
    .lines {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 35vh;
    }
    .panel {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column; 
        position: absolute;
        width: 85vw;
        height: 35vh;
        background: white;
        box-shadow: 0 0 8px rgba(0, 0, 0, .25);
        text-align: center;
        .label {
            width: 80%;
        }
        .stationName {
            line-height: 2.25rem;
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        .gap {
            line-height: 2rem;
        }
    }

    .slide {
      animation: slide 1s ease forwards;
    }
}

.loading-lines {
    animation-duration: 3s;
}

.loading-notice {
    line-height: 1.5rem;
}


.share {
    margin-top: 40%;
    width: 100vw;
    
    .share-twitter {
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
        transition: .5s;
        &:hover {
            filter: drop-shadow(0 0 12px rgba(0, 0, 0, .5));
        }
    }
}

.hidden {
    display: none;
}
</style>

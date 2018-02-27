import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    position: null,
    prevStation: null,
    station: {},
    stationGap: 0,
    animationDisabled: false,
    socket: null,
    connected: false,
  },
  mutations: {
    setPosition(state, payload) {
      state.position = payload;
    },
    setPrevStation(state, payload) {
      state.prevStation = payload;
    },
    setStation(state, payload) {
      state.station = payload;
    },
    setAnimationDisabled(state, payload) {
      state.animationDisabled = payload;
    },
    setStationGap(state, payload) {
      state.stationGap = payload;
    },
    setSocket(state, payload) {
      state.socket = payload;
    },
    setConnected(state, payload) {
      state.connected = payload;
    },
  },
  getters: {
    position: state => () => state.position,
    prevStation: state => () => state.prevStation,
    station: state => () => state.station,
    stationGap: state => () => state.stationGap,
    animationDisabled: state => () => state.animationDisabled,
    socket: state => () => state.socket,
    connected: state => () => state.connected,
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';

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
  actions: {
    CONNECT_WS: ({ commit }) => {
      this.endpoint = config.WSEndpoint;
      const socket = new WebSocket(this.endpoint);
      commit('setSocket', socket);
    },
    SEND_WS: ({ getters }, payload) => {
      const pos = JSON.stringify({
        lat: payload.lat,
        lon: payload.lon,
      });
      getters.socket().send(pos);
    },
    LISTEN_STATION: ({ getters, commit }) => {
      getters.socket().addEventListener('message', (event) => {
        if (event.data !== undefined) {
          const station = JSON.parse(event.data);
          commit('setPrevStation', station);
          commit('setStationGap', station.gap);

          const prevStation = getters.prevStation;

          if (prevStation.station_name !== station.station_name) {
            commit('setAnimationDisabled', true);
            setTimeout(() => {
              commit('setAnimationDisabled', false);
              commit('setStation', station);
            }, 1);
          }
        }
      });
    },
    WATCH_POSITION: ({ commit, dispatch }) => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((p) => {
          const position = {
            lat: p.coords.latitude,
            lon: p.coords.longitude,
          };
          commit('setPosition', position);
          dispatch('SEND_WS', position);
        }, () => {
          // error
        }, {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
        });
      }
    },
  },
});

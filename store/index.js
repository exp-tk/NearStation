import Vuex from 'vuex';

const WS_ENDPOINT = 'wss://sapi.tinykitten.me/ws';

const createStore = () =>
  new Vuex.Store({
    state: {
      position: null,
      prevStation: null,
      station: {},
      socket: null,
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
      setSocket(state, payload) {
        state.socket = payload;
      },
    },
    getters: {
      position: state => () => state.position,
      prevStation: state => () => state.prevStation,
      station: state => () => state.station,
      socket: state => () => state.socket,
    },
    actions: {
      CONNECT_WS: ({ commit }) => {
        const socket = new WebSocket(WS_ENDPOINT);
        commit('setSocket', socket);
      },
      SEND_WS: ({ getters, commit }, payload) => {
        const pos = JSON.stringify({
          lat: payload.lat,
          lon: payload.lon,
        });
        if (getters.socket().readyState === WebSocket.OPEN) {
          getters.socket().send(pos);
        }
        if (getters.socket().readyState === WebSocket.CLOSED) {
          commit('CONNECT_WS');
        }
      },
      LISTEN_STATION: ({ getters, commit }) => {
        getters.socket().addEventListener('message', event => {
          if (event.data !== undefined) {
            const station = JSON.parse(event.data);
            commit('setPrevStation', station);

            const prevStation = getters.prevStation();

            if (
              prevStation === null ||
              prevStation.station_name !== getters.station().station_name
            ) {
              commit('setStation', station);
            }
          }
        });
      },
      WATCH_POSITION: ({ commit, dispatch }) => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            p => {
              const position = {
                lat: p.coords.latitude,
                lon: p.coords.longitude,
              };
              commit('setPosition', position);
              dispatch('SEND_WS', position);
            },
            () => {
              // error
            },
            {
              enableHighAccuracy: false,
              timeout: 1000,
              maximumAge: 0,
            }
          );
        }
      },
    },
  });

export default createStore;

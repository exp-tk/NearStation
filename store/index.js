export const state = () => ({
  station: null,
  error: null,
  socket: null,
  socketOpened: false,
  coords: null,
});
export const getters = {
  station: state => state.station,
  socket: state => state.socket,
  coords: state => state.coords,
};
export const mutations = {
  setStation: (state, payload) => (state.station = payload),
  setError: (state, payload) => (state.error = payload),
  setSocket: (state, payload) => (state.socket = payload),
  setSocketOpened: (state, payload) => (state.socketOpened = payload),
  setCoords: (state, payload) => (state.coords = payload),
};
export const actions = {
  connectWebSocket({ commit, getters }) {
    const socket = new WebSocket(`${process.env.BASE_WS_URL}/ws`);
    socket.onerror = err => commit('setError', err);
    commit('setSocket', socket);
    socket.addEventListener('open', () => {
      commit('setSocketOpened', true);
      const { lat, lon } = getters.coords;
      if (getters.coords) {
        socket.send(JSON.stringify({ lat, lon }));
      }
    });
    socket.addEventListener('message', event => {
      commit('setStation', JSON.parse(event.data));
    });
  },
  sendCoords({ getters, commit }, { lat, lon }) {
    const socket = getters.socket;
    commit('setCoords', { lat, lon });
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ lat, lon }));
    }
  },
};

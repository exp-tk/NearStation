const state = {
  state: {
    animationDisabled: false,
  },
  disableAnimation() {
    this.state.animationDisabled = true;
  },
  enableAnimation() {
    this.state.animationDisabled = false;
  },
};
export default state;

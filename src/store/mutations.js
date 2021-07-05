import state from './state';

// mutations 类似于 method
let mutations = {
    openShow() {
        state.loadShow = !state.loadShow
    },
    activeDistance(state,centerScroll){
        state.activeDistance = centerScroll
    }
}
export default mutations
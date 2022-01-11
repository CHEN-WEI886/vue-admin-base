import state from './state';

// mutations 类似于 method
let mutations = {
    openShow() {
        state.loadShow = true
    },
    closeShow() {
        state.loadShow = false
    },
    activeDistance(state,centerScroll){
        state.activeDistance = centerScroll
    }
}
export default mutations
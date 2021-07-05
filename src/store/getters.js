import state from './state';

// getters 类似于 computed
let getters = {
    getshow(){
        return state.loadShow
    }
}
export default getters
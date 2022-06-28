import {createStore} from "vuex";
import {Patient, Case} from './js/patient.js'

const store = createStore({
    state: {
        isLogin: false,
        userData: {
            user_name:'lxl',
            password:'123'
        }
    },

    getters: {
        isLogin: state => state.isLogin,
    },

    mutations: {
        loginStatus(state, payload) {
            state.isLogin = payload.isLogin
        },
        updateUserData(state,payload){
            state.userData = payload.userData
        }
    },
    actions: {
        loginStatus({commit}, payload) {
            commit('loginStatus', payload)
        },
        updateUserData({commit},payload){
            commit('updateUserData',payload)
        }

    }
})

export default store
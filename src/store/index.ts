import Vue from 'vue';
import Vuex from 'vuex';
import { GameState } from '@/models';

Vue.use(Vuex);

export default new Vuex.Store<GameState>({
  state: {
    score: 0,
    instance: 0
  },
  mutations: {
    reset(state) {
      console.log('initiate instance reset');
      state.score = 0;
      state.instance = new Date().getTime();
    },
    addScore(state) {
      state.score += 1;
    }
  },
  actions: {},
  modules: {},
});

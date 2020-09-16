import Vue from 'vue';
import Vuex from 'vuex';
import { GameState, LevelData, Topic } from '@/models';

Vue.use(Vuex);

const topics: Topic[] = [
  {
    id: 'animals',
    name: 'Animals',
    icon: 'octopus',
    level: 0,
    played: 0,
    words: ['crab', 'dolphin', 'starfish', 'fish', 'jellyfish', 'octopus'],
  },
  {
    id: 'foods',
    name: 'Foods',
    icon: 'cake',
    level: 0,
    played: 0,
    words: ['cake', 'cheese', 'cookie', 'cupcake', 'donut', 'sunflower'],
  },
  {
    id: 'fruit',
    name: 'Fruits',
    icon: 'orange',
    level: 0,
    played: 0,
    words: [
      'apple',
      'lemon',
      'cherry',
      'orange',
      'pineapple',
      'strawberry',
      'watermelon',
      'banana',
      'carrot',
    ],
  },
];

function generateLevelData(topic: Topic): LevelData {
  const cardCountMap = [4, 6, 8, 12, 16, 24];
  const count =
  topic.level >= cardCountMap.length
      ? cardCountMap[cardCountMap.length - 1]
      : cardCountMap[topic.level];
  // generate grid
  const mid = Math.floor(Math.sqrt(count));
  const remain = Math.floor(count / mid);

  // generate words
  const orderedWords = [...topic.words].sort(() => Math.random() - Math.random());
  const cards = [];
  for (let index = 0; index < count / 2; index++) {
    cards.push(orderedWords[index], orderedWords[index]);
  }
  const data: LevelData = {
    topicId: topic.id,
    level: topic.level,
    rows: mid > remain ? remain : mid,
    cols: mid > remain ? mid : remain,
    cards,
  };
  return data;
}

export default new Vuex.Store<GameState>({
  state: {
    score: 0,
    instance: 0,
    topics,
    level: null,
  },
  getters: {
    topics(state) {
      return state.topics;
    },
    level(state) {
      return state.level;
    }
  },
  mutations: {
    reset(state) {
      console.log('initiate instance reset');
      state.score = 0;
      state.instance = new Date().getTime();
    },
    addScore(state) {
      state.score += 1;
    },
    setLevel(state, payload) {
      state.level = payload;
    }
  },
  actions: {
    start(context, payload) {
      const { id } = payload;
      const topic = context.state.topics.find(t => t.id === id);
      if (!topic) {
        throw new Error(`Topic #${id} not found`);
      }
      const data = generateLevelData(topic);
      context.commit('setLevel', data);
      return data;
    },
    replay(context, payload) {
      if (!context.state.level) {
        throw new Error('Can not Replay before player have finished a level');
      }
      const topicId = context.state.level.topicId;
      context.dispatch('start', { id: topicId });
    },
    save(context, payload) {
      //
    },
  },
  modules: {},
});

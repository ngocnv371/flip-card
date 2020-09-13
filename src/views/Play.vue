<template>
  <div class="play d-flex" style="height: 100%">
    <v-btn fab color="primary" fixed top left @click="$emit('back')">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="horizontal d-flex flex">
      <v-spacer></v-spacer>
      <div class="grid-outer-container d-flex flex-column">
        <v-spacer></v-spacer>
        <div class="d-flex" v-for="row of 2" :key="`row-${row}`">
          <div class="d-flex pa-1" v-for="col of 3" :key="`col-${col}`">
            <FlipCard
              :card="cards[(row - 1) * 3 + col - 1].name"
              :up="cards[(row - 1) * 3 + col - 1].up"
              :size="config.card.size"
              @flip="flip((row - 1) * 3 + col - 1)"
            />
          </div>
        </div>
        <v-spacer></v-spacer>
      </div>
      <v-spacer></v-spacer>
    </div>
    <VictoryModal v-model="victory" @end="$emit('end')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FlipCard from '../components/FlipCard.vue';
import VictoryModal from '../components/VictoryModal.vue';
import { Mutation, State } from 'vuex-class';
import { GameState } from '@/models';

@Component({
  name: 'Play',
  components: {
    VictoryModal,
    FlipCard,
  },
})
export default class Play extends Vue {
  @State((state: GameState) => state.score)
  public score!: number;

  @State((state: GameState) => state.instance)
  public instance!: number;

  @Mutation('addScore')
  public addScore!: () => void;

  private lastFlipIndex = -1;
  private upCount = 0;

  public cards = [
    { name: 'banana', up: false },
    { name: 'banana', up: false },
    { name: 'apple', up: false },
    { name: 'apple', up: false },
    { name: 'watermelon', up: false },
    { name: 'watermelon', up: false },
  ];

  public configXs = {
    card: { size: 100 },
  };
  public configSm = {
    card: { size: 130 },
  };
  public configMd = {
    card: { size: 200 },
  };
  public config = this.configMd;

  private scramble() {
    this.cards = this.cards.sort(() => Math.random() - Math.random());
    for (const card of this.cards) {
      card.up = false;
    }
  }

  private resetGame() {
    this.scramble();
    this.upCount = 0;
    this.lastFlipIndex = -1;
  }

  public mounted() {
    this.resetGame();
    this.resolveConfig();
  }

  private resolveConfig() {
    if (this.$vuetify.breakpoint.xsOnly) {
      this.config = this.configXs;
    } else if (this.$vuetify.breakpoint.smOnly) {
      this.config = this.configSm;
    } else if (this.$vuetify.breakpoint.mdAndUp) {
      this.config = this.configMd;
    }
  }

  @Watch('instance', { immediate: true })
  public onInstanceChanged(newValue: number, oldValue: number) {
    if (newValue === oldValue) {
      return;
    }
    console.log('game instance changed', this.instance);
    this.resetGame();
  }

  public get victory() {
    return this.upCount && this.upCount === this.cards.length;
  }

  public flip(index: number) {
    if (index === this.lastFlipIndex) {
      return;
    }
    if (this.cards[index].up) {
      return;
    }
    if (this.cards[this.lastFlipIndex]) {
      if (this.cards[this.lastFlipIndex].name === this.cards[index].name) {
        this.cards[index].up = true;
        this.lastFlipIndex = -1;
        console.log('score!');
        this.addScore();
        this.upCount += 2;
        return;
      } else {
        this.cards[this.lastFlipIndex].up = false;
        this.cards[index].up = true;
      }
    } else {
      this.cards[index].up = true;
    }
    this.lastFlipIndex = index;
  }
}
</script>

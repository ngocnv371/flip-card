<template>
  <div class="play d-flex" style="height: 100%">
    <v-btn
      fab
      color="primary"
      fixed
      top
      left
      :width="config.back.size"
      :height="config.back.size"
      @click="$emit('back')"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div class="horizontal d-flex flex">
      <v-spacer></v-spacer>
      <div class="grid-outer-container d-flex flex-column">
        <v-spacer></v-spacer>
        <div class="d-flex" v-for="row of rows" :key="`row-${row}`">
          <div class="d-flex pa-1" v-for="col of cols" :key="`col-${col}`">
            <FlipCard
              :card="cards[(row - 1) * cols + col - 1].name"
              :up="cards[(row - 1) * cols + col - 1].up"
              :size="config.card[level]"
              @flip="flip((row - 1) * cols + col - 1)"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
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

  @Prop({ required: true })
  public level!: number;

  private lastFlipIndex = -1;
  private count = 0;
  private upCount = 0;
  public rows = 1;
  public cols = 1;
  public countMap = [4, 6, 8, 12, 16, 24];

  public cards: { name: string; up: boolean }[] = [];

  public configXs = {
    back: { size: 40 },
    card: { 0: 120, 1: 120, 2: 120, 3: 90, 4: 70, 5: 70 },
  };
  public configSm = {
    back: { size: 50 },
    card: { 0: 140, 1: 140, 2: 140, 3: 100, 4: 80, 5: 80 },
  };
  public configMd = {
    back: { size: 80 },
    card: { 0: 260, 1: 260, 2: 220, 3: 200, 4: 160, 5: 160 },
  };
  public config = this.configMd;
  private yay: HTMLAudioElement | null = null;

  private scramble() {
    this.cards = this.cards.sort(() => Math.random() - Math.random());
    for (const card of this.cards) {
      card.up = false;
    }
  }

  private generateGrid() {
    const count = this.countMap[this.level];
    this.count = count;
    const mid = Math.floor(Math.sqrt(count));
    const remain = Math.floor(count / mid);
    if (mid > remain) {
      this.rows = remain;
      this.cols = mid;
    } else {
      this.rows = mid;
      this.cols = remain;
    }
  }

  private generateCards() {
    const names = [
      'apple',
      'banana',
      'cake',
      'carrot',
      'cheese',
      'cherry',
      'cookie',
      'crab',
      'cupcake',
      'dolphin',
      'donut',
      'fish',
      'jellyfish',
      'lemon',
      'octopus',
      'orange',
      'pineapple',
      'starfish',
      'strawberry',
      'sunflower',
      'watermelon',
    ].sort(() => Math.random() - Math.random());
    this.cards = [];
    this.generateGrid();
    for (let index = 0; index < this.count / 2; index++) {
      this.cards.push({
        name: names[index],
        up: false,
      });
      this.cards.push({
        name: names[index],
        up: false,
      });
    }
  }

  private resetGame() {
    this.generateCards();
    this.scramble();
    this.upCount = 0;
    this.lastFlipIndex = -1;
  }

  public created() {
    this.resetGame();
  }

  public mounted() {
    this.resolveConfig();
    this.yay = new Audio(require(`../assets/sounds/yay.mp3`));
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
        if (this.yay) {
          this.yay.play();
        }
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

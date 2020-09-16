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
        <div class="d-flex" v-for="row of data.rows" :key="`row-${row}`">
          <div class="d-flex pa-1" v-for="col of data.cols" :key="`col-${col}`">
            <FlipCard
              :card="cards[(row - 1) * data.cols + col - 1].name"
              :up="cards[(row - 1) * data.cols + col - 1].up"
              :size="config.card[data.level]"
              :key="`card-${cards[(row - 1) * data.cols + col - 1].name}`"
              @flip="flip((row - 1) * data.cols + col - 1)"
            />
          </div>
        </div>
        <v-spacer></v-spacer>
      </div>
      <v-spacer></v-spacer>
    </div>
    <VictoryModal v-model="victory" @end="$emit('end')" @play="replay" />
  </div>
</template>

<script lang="ts">
import { LevelData } from '@/models';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import FlipCard from '../components/FlipCard.vue';
import VictoryModal from '../components/VictoryModal.vue';

@Component({
  name: 'Play',
  components: {
    VictoryModal,
    FlipCard,
  },
})
export default class Play extends Vue {
  @Getter('level')
  public data!: LevelData;

  @Action('replay')
  public replayGame!: () => void;

  private lastFlipIndex = -1;
  private count = 0;

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

  private resetGame() {
    this.cards = this.data.cards.map(c => ({ name: c, up: false }));
    this.count = 0;
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
    return this.count && this.count === this.data.cards.length;
  }

  public replay() {
    this.replayGame();
    this.resetGame();
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
        if (this.yay) {
          this.yay.play();
        }
        this.count += 2;
        this.$emit('score');
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

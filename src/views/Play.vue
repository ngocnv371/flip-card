<template>
  <div class="play">
    <div class="horizontal d-flex">
      <v-spacer></v-spacer>
      <div class="grid-outer-container">
        <div class="d-flex my-4" v-for="row of 2" :key="`row-${row}`">
          <div class="d-flex ma-2" v-for="col of 3" :key="`col-${col}`">
            <FlipCard
              :letter="cards[(row - 1) * 3 + col - 1].letter"
              :up="cards[(row - 1) * 3 + col - 1].up"
              @flip="flip((row - 1) * 3 + col - 1)"
            />
          </div>
        </div>
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
    { letter: 'a', up: false },
    { letter: 'a', up: false },
    { letter: 'b', up: false },
    { letter: 'b', up: false },
    { letter: 'c', up: false },
    { letter: 'c', up: false },
  ];

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
    if (this.cards[this.lastFlipIndex]) {
      if (this.cards[index].up) {
        return;
      }
      if (this.cards[this.lastFlipIndex].letter === this.cards[index].letter) {
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

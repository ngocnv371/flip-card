<template>
  <div class="home d-flex" style="height: 100%">
    <div class="d-flex flex text-center">
      <v-spacer></v-spacer>
      <div class="d-flex flex-column">
        <v-spacer></v-spacer>
        <div class="d-flex align-center flex-column">
          <div class="flex">
            <v-btn
              icon
              width="200"
              height="200"
              color="primary"
              class="animate__animated animate__tada animate__infinite"
              @click="$emit('play')"
            >
              <v-icon size="200">mdi-play</v-icon>
            </v-btn>
          </div>
          <div class="d-flex flex">
            <v-btn
              icon
              color="primary"
              x-large
              class="animate__animated animate__fadeIn animate__slower"
            >
              <v-icon>mdi-music</v-icon>
            </v-btn>

            <v-btn
              icon
              color="primary"
              x-large
              class="animate__animated animate__fadeIn animate__slower"
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              color="primary"
              x-large
              class="animate__animated animate__fadeIn animate__slower"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>
          </div>
        </div>
        <v-spacer></v-spacer>
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

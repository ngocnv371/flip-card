<template>
  <CardGrid />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CardGrid from '../components/CardGrid.vue';

@Component({
  name: 'Link',
  components: {
    CardGrid,
  },
})
export default class Link extends Vue {}
</script>

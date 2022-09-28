import Vue from 'vue';

export const JovianMultiplier = Vue.component('JovianMultiplier', {
  props: {
    amount: {
      type: Number,
    },
  },
  methods: {},
  template: `
    <div class="player-jovian-multiplier" style="font-size:13px">{{ amount }}</div>
  `,
});

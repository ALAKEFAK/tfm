import Vue from 'vue';
import {Card} from './../card/Card';
import {CardName} from './../../CardName';

export const HelpStandardProjects = Vue.component('help-standard-projects', {
  components: {
    Card,
  },
  methods: {
    getBasicStandardProjects: () => [
      CardName.SELL_PATENTS_STANDARD_PROJECT,
      CardName.POWER_PLANT_STANDARD_PROJECT,
      CardName.ASTEROID_STANDARD_PROJECT,
      CardName.AQUIFER_STANDARD_PROJECT,
      CardName.GREENERY_STANDARD_PROJECT,
      CardName.CITY_STANDARD_PROJECT,
    ],
    getExpansionStandardProjects: () => [
      CardName.AIR_SCRAPPING_STANDARD_PROJECT,
      CardName.BUILD_COLONY_STANDARD_PROJECT,
      CardName.BUFFER_GAS_STANDARD_PROJECT,
    ],
    getFanMadeStandardProjects: () => [
      CardName.MOON_COLONY_STANDARD_PROJECT,
      CardName.MOON_MINE_STANDARD_PROJECT,
      CardName.MOON_ROAD_STANDARD_PROJECT,
    ],
    getRebalancedStandardProjects: () => [
      CardName.BUILD_COLONY_STANDARD_PROJECT_REBALANCED,
    ],
  },
  template: `
    <div class="help-standard-projects-container">

      <h2 v-i18n>Standard Projects</h2>
      <div class="cardbox" v-for="card in getBasicStandardProjects()">
        <Card :card="{'name': card}" />
      </div>

      <h2 v-i18n>Standard Projects from Expansions and Solo Mode</h2>
      <div class="cardbox" v-for="card in getExpansionStandardProjects()">
        <Card :card="{'name': card}" />
      </div>

      <h2 v-i18n>Standard Projects from Moon Expansion</h2>
      <div class="cardbox" v-for="card in getFanMadeStandardProjects()">
        <Card :card="{'name': card}" />
      </div>

      <h2 v-i18n>Rebalanced Standard Project</h2>
      <div class="cardbox" v-for="card in getRebalancedStandardProjects()">
        <Card :card="{'name': card}" />
      </div>

    </div>
    `,
});

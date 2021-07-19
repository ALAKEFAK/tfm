<template>
        <CardRenderItemComponent v-if="isItem(componentData)" :item="componentData"/>
        <CardRenderSymbolComponent v-else-if="isSymbol(componentData)" :item="componentData" />
        <CardProductionBoxComponent v-else-if="isProduction(componentData)" :rows="componentData.rows" />
        <CardRenderEffectBoxComponent v-else-if="isEffect(componentData)" :effectData="componentData" />
        <CardRenderTileComponent v-else-if="isTile(componentData)" :item="componentData" />
        <CardDescription v-else-if="isDescription()" :item="componentData" />
        <CardRenderCorpBoxComponent v-else-if="isCorpBox(componentData)" :rows="componentData.rows" :label="corpBoxLabel()" />
        <div v-else>n/a</div>
</template>

<script lang="ts">

import Vue from 'vue';
import {CardRenderItem} from '../../cards/render/CardRenderItem';
import {isIDescription} from '../../cards/render/ICardRenderDescription';
import {CardRenderSymbol} from '../../cards/render/CardRenderSymbol';
import {CardRenderProductionBox} from '../../cards/render/CardRenderer';
import {CardRenderTile} from '../../cards/render/CardRenderer';
import CardRenderItemComponent from './CardRenderItemComponent.vue';
import CardProductionBoxComponent from './CardProductionBoxComponent.vue';
import CardRenderEffectBoxComponent from './CardRenderEffectBoxComponent.vue';
import CardRenderCorpBoxComponent from './CardRenderCorpBoxComponent.vue';
import {CardRenderTileComponent} from './CardRenderTileComponent';
import CardDescription from './CardDescription.vue';
import {CardRenderSymbolComponent} from './CardRenderSymbolComponent';
import {CardRenderEffect, CardRenderCorpBoxEffect, CardRenderCorpBoxAction} from '../../cards/render/CardRenderer';

export default Vue.extend({
  name: 'CardRowComponent',
  props: {
    componentData: {
      type: Object as () => CardRenderItem | CardRenderProductionBox | CardRenderSymbol | CardRenderEffect | CardRenderTile | CardRenderCorpBoxEffect | CardRenderCorpBoxAction,
      required: true,
    },
  },
  components: {
    CardRenderSymbolComponent,
    CardRenderItemComponent,
    CardProductionBoxComponent,
    CardRenderEffectBoxComponent,
    CardRenderCorpBoxComponent,
    CardRenderTileComponent,
    CardDescription,
  },
  methods: {
    isItem: function(a: unknown): a is CardRenderItem {
      return a instanceof CardRenderItem;
    },
    isSymbol: function(a: unknown): a is CardRenderSymbol {
      return a instanceof CardRenderSymbol;
    },
    isProduction: function(a: unknown): a is CardRenderProductionBox {
      return a instanceof CardRenderProductionBox;
    },
    isEffect: function(a: unknown): a is CardRenderEffect {
      return a instanceof CardRenderEffect;
    },
    isDescription: function(): boolean {
      return typeof this.componentData === 'string' || this.componentData instanceof String || isIDescription(this.componentData);
    },
    isTile: function(a: unknown): a is CardRenderTile {
      return a instanceof CardRenderTile;
    },
    isCorpBox: function(a: unknown): a is CardRenderCorpBoxAction {
      return a instanceof CardRenderCorpBoxAction;
    },
    corpBoxLabel: function(): string {
      if (this.componentData instanceof CardRenderCorpBoxEffect) {
        return 'effect';
      } else if (this.componentData instanceof CardRenderCorpBoxAction) {
        return 'action';
      }
      return 'n/a';
    },

  },
});

</script>


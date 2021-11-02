import Vue from 'vue';
import {PlayerInfo} from './PlayerInfo';
import {OverviewSettings} from './OverviewSettings';
import {OtherPlayer} from '../OtherPlayer';
import {PlayerModel} from '../../models/PlayerModel';
import {ActionLabel} from './ActionLabel';
import {Phase} from '../../Phase';
import {SpectatorModel} from '../../models/SpectatorModel';

const SHOW_NEXT_LABEL_MIN = 2;

export const getCurrentPlayerIndex = (
  player: PlayerModel,
  players: Array<PlayerModel>,
): number => {
  let currentPlayerIndex: number = 0;
  players.forEach((p: PlayerModel, index: number) => {
    if (p.color === player.color) {
      currentPlayerIndex = index;
    }
  });
  return currentPlayerIndex;
};

export const SpectatorOverview = Vue.component('spectator-overview', {
  props: {
    player: {
      type: Object as () => SpectatorModel,
    },
  },
  components: {
    'player-info': PlayerInfo,
    'overview-settings': OverviewSettings,
    'other-player': OtherPlayer,
  },
  data: function() {
    return {};
  },
  methods: {
    hasPlayers: function(): boolean {
      return this.player.players.length > 0;
    },
    getPlayerOnFocus: function(): PlayerModel {
      return this.player.players.filter(
        (p: PlayerModel) => p.color === this.player.color,
      )[0];
    },
    getIsFirstForGen: function(player: PlayerModel): boolean {
      return getCurrentPlayerIndex(player, this.player.players) === 0;
    },
    getPlayersInOrder: function(): Array<PlayerModel> {
      return this.player.players;
    },
    getActionLabel(player: PlayerModel): string {
      if (this.player.game.phase === Phase.DRAFTING) {
        if (player.needsToDraft) {
          return ActionLabel.DRAFTING;
        } else {
          return ActionLabel.NONE;
        }
      } else if (this.player.game.phase === Phase.RESEARCH) {
        if (player.needsToResearch) {
          return ActionLabel.RESEARCHING;
        } else {
          return ActionLabel.NONE;
        }
      }
      if (this.player.game.passedPlayers.includes(player.color)) {
        return ActionLabel.PASSED;
      }
      if (player.isActive) return ActionLabel.ACTIVE;
      const notPassedPlayers = this.player.players.filter(
        (p: PlayerModel) => !this.player.game.passedPlayers.includes(p.color),
      );

      const currentPlayerIndex: number = getCurrentPlayerIndex(
        player,
        notPassedPlayers,
      );
      const prevPlayerIndex =
                currentPlayerIndex === 0 ?
                  notPassedPlayers.length - 1 :
                  currentPlayerIndex - 1;
      const isNext = notPassedPlayers[prevPlayerIndex].isActive;

      if (isNext && this.player.players.length > SHOW_NEXT_LABEL_MIN) {
        return ActionLabel.NEXT;
      }

      return ActionLabel.NONE;
    },
  },
  template: `
        <div class="players-overview" v-if="hasPlayers()">
            <player-info v-for="(p, index) in getPlayersInOrder()" :activePlayer="player" :player="p"  :key="p.id" :firstForGen="getIsFirstForGen(p)" :actionLabel="getActionLabel(p)" :playerIndex="index"/>
        </div>
    `,
});

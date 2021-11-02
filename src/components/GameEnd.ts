import Vue from 'vue';
import {PlayerModel, PublicPlayerModel} from '../models/PlayerModel';
import {Board} from './Board';
import {LogPanel} from './LogPanel';
import {Button} from '../components/common/Button';
import {playerColorClass} from '../utils/utils';
import {Timer} from '../Timer';
import {ScoreChart} from '../components/ScoreChart';
import {GameSetupDetail} from '../components/GameSetupDetail';

import * as htmlToImage from 'html-to-image';

import * as constants from '../constants';
import {GlobalParamChart} from './GlobalParamChart';

export const GameEnd = Vue.component('game-end', {
  props: {
    player: {
      type: Object as () => PlayerModel,
    },
  },
  data: function() {
    return {
      constants,
    };
  },
  components: {
    'board': Board,
    'log-panel': LogPanel,
    'Button': Button,
    'score-chart': ScoreChart,
    'global-param-chart': GlobalParamChart,
    'game-setup-detail': GameSetupDetail,
  },
  methods: {
    getEndGamePlayerRowColorClass: function(color: string): string {
      return playerColorClass(color.toLowerCase(), 'bg_transparent');
    },
    getTimer: function(p: PublicPlayerModel): string {
      return Timer.toString(p.timer);
    },
    getSortedPlayers: function() {
      const useTimer = this.player.game.gameOptions.showTimers;
      this.player.players.sort(function(a:PublicPlayerModel, b:PublicPlayerModel) {
        if (a.victoryPointsBreakdown.total < b.victoryPointsBreakdown.total) return -1;
        if (a.victoryPointsBreakdown.total > b.victoryPointsBreakdown.total) return 1;
        if (a.megaCredits < b.megaCredits) return -1;
        if (a.megaCredits > b.megaCredits) return 1;
        if (useTimer) {
          if (a.timer.sumElapsed > b.timer.sumElapsed) return -1;
          if (a.timer.sumElapsed < b.timer.sumElapsed) return 1;
        }
        return 0;
      });
      return this.player.players.reverse();
    },
    getWinners: function() {
      const sortedPlayers = this.getSortedPlayers();
      const firstWinner = sortedPlayers[0];
      const winners: PublicPlayerModel[] = [firstWinner];
      for (let i = 1; i < sortedPlayers.length; i++) {
        if (sortedPlayers[i].victoryPointsBreakdown.total === firstWinner.victoryPointsBreakdown.total &&
                    sortedPlayers[i].megaCredits === firstWinner.megaCredits) {
          winners.push(sortedPlayers[i]);
        }
      }
      return winners;
    },
    isWinner: function(playerid: string): boolean {
      if (this.isSoloGame()) {
        return this.player.game.isSoloModeWin;
      } else {
        const winnerIDs = this.getWinners().map((player) => player.id);
        return winnerIDs.includes(playerid);
      }
    },
    getFleetsCountRange: function(player: PublicPlayerModel): Array<number> {
      const fleetsRange: Array<number> = [];
      for (let i = 0; i < player.fleetSize - player.tradesThisGeneration; i++) {
        fleetsRange.push(i);
      }
      return fleetsRange;
    },
    isSoloGame: function(): boolean {
      return this.player.players.length === 1;
    },
    captureElement: function(elementID: string): void {
      const tableElement = document.getElementById(elementID);

      if (tableElement !== null) {
        const dateFormat = require('dateformat');
        const now = new Date();
        const date = dateFormat(now, 'isoDateTime');

        htmlToImage.toJpeg(tableElement, {quality: 0.95, width: 1500}).then(function(dataUrl) {
          const link = document.createElement('a');
          link.download = 'Rebalanced-mars_GameResult-' + date + '.jpeg';
          link.href = dataUrl;
          link.click();
        });
      }
    },
  },
  template: `
        <div id="game-end" class="game_end_cont">
            <h1>{{ constants.APP_NAME }} - Game finished!</h1>
            <div class="game_end">
                <div v-if="isSoloGame()">
                    <div v-if="player.game.isSoloModeWin">
                        <div class="game_end_success">
                            <h2 v-i18n>You win!</h2>
                            <div class="game_end_solo_img">
                                <img src="/assets/solo_win.png" />
                            </div>
                            <div class="game_end_notice" v-i18n>
                                But it isn't the reason to stop making Mars better.
                            </div>
                            <ul class="game_end_list">
                                <li v-i18n>Try to win with expansions enabled</li>
                                <li v-i18n>Try to win before the last generation comes</li>
                                <li><span v-i18n>Can you get</span> {{ player.victoryPointsBreakdown.total + 10 }}<span v-i18n>+ Victory Points?</span></li>
                            </ul>
                        </div>
                    </div>
                    <div v-else>
                        <div class="game_end_fail">
                            <h2 v-i18n>Sorry, you lose.</h2>
                            <div class="game_end_notice" v-i18n>
                                Next time you will get more luck!<br>
                                Also, take into account these small hints to win:
                            </div>
                            <ul class="game_end_list" v-i18n>
                                <li>Concentrate more on Global parameters, not on Victory Points</li>
                                <li>Don't be greedy on cards selection</li>
                                <li>Try to increase Heat production, not Megacredits</li>
                                <li>Try to start with Beginner corporation</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="game_end_go_home">
                    <a href="/" v-i18n>
                        <Button size="big" type="back" />
                        Go to main page
                    </a>
                </div>


                <div v-if="!isSoloGame() || player.game.isSoloModeWin" class="game-end-winer-announcement">
                    <span v-for="p in getWinners()"><span :class="'end-game-player ' + getEndGamePlayerRowColorClass(p.color)">{{ p.name }}</span></span> won!
                </div>

                <Button title="📷-Save game result as image" size="tiny" class="save-image-button" :onClick="_=>captureElement('game-result')"/>

                <div class="game_end_victory_points" id="game-result">
                    <h2 v-i18n>Victory points breakdown after<span> {{player.game.generation}} </span>generations</h2>

                    <game-setup-detail :gameOptions="player.game.gameOptions" :playerNumber="player.players.length" :lastSoloGeneration="player.game.lastSoloGeneration" :inlineDisplay="true"></game-setup-detail>

                    <table class="table game_end_table">
                        <thead>
                            <tr v-i18n>
                                <th><div class="card-delegate"></div></th>
                                <th><div class="tr"></div></th>
                                <th><div class="m-and-a" title="Milestones points">M</div></th>
                                <th><div class="m-and-a" title="Awards points">A</div></th>
                                <th><div class="table-forest-tile"></div></th>
                                <th><div class="table-city-tile"></div></th>
                                <th v-if="player.game.moon !== undefined"><div class="table-moon-road-tile"></div></th>
                                <th v-if="player.game.moon !== undefined"><div class="table-moon-colony-tile"></div></th>
                                <th v-if="player.game.moon !== undefined"><div class="table-moon-mine-tile"></div></th>
                                <th><div class="vp">VP</div></th>
                                <th v-if="player.game.gameOptions.escapeVelocityMode" class="clock-icon tooltip tooltip-top" data-tooltip="Escape velocity penalty">&#x23F3;</th>
                                <th class="game-end-total"><div class="game-end-total-column">Total</div></th>
                                <th><div class="mc-icon"></div></th>
                                <th v-if="player.game.gameOptions.showTimers" class="clock-icon">&#x1F551;</th>
                                <th><div class="table-red-arrow tooltip tooltip-top" data-tooltip="Actions taken this game"></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="p in getSortedPlayers()" :class="getEndGamePlayerRowColorClass(p.color)">
                                <td>
                                  <a :href="'/player?id='+p.id+'&noredirect'">{{ p.name }}</a>
                                  <span v-if="isWinner(p.id)">&nbsp;&#128081;</span>
                                  <div class="column-corporation">{{ p.corporationCard === undefined ? "" : p.corporationCard.name }}</div>
                                </td>
                                <td>{{ p.victoryPointsBreakdown.terraformRating }}</td>
                                <td>{{ p.victoryPointsBreakdown.milestones }}</td>
                                <td>{{ p.victoryPointsBreakdown.awards }}</td>
                                <td>{{ p.victoryPointsBreakdown.greenery }}</td>
                                <td>{{ p.victoryPointsBreakdown.city }}</td>
                                <td v-if="player.game.moon !== undefined">{{ p.victoryPointsBreakdown.moonRoads }}</td>
                                <td v-if="player.game.moon !== undefined">{{ p.victoryPointsBreakdown.moonColonies }}</td>
                                <td v-if="player.game.moon !== undefined">{{ p.victoryPointsBreakdown.moonMines }}</td>
                                <td>{{ p.victoryPointsBreakdown.victoryPoints }}</td>
                                <td v-if="player.game.gameOptions.escapeVelocityMode">{{ p.victoryPointsBreakdown.escapeVelocity }}</td>
                                <td class="game-end-total">{{ p.victoryPointsBreakdown.total }}</td>
                                <td class="game-end-mc">
                                  <div>{{ p.megaCredits }}</div>
                                </td>
                                <td v-if="player.game.gameOptions.showTimers" >
                                  <div class="game-end-timer">{{ getTimer(p) }}</div>
                                </td>
                                <td>
                                  <div class="game-end-timer">{{ p.actionsTakenThisGame }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <h2 v-i18n>Victory points details</h2>

                    <score-chart :players="player.players" :generation="player.game.generation" :animation="true"></score-chart>
                    <global-param-chart :game="player.game" :animation="true">
                    </global-param-chart>
                    
                    <div class="game-end-flexrow">
                        <div v-for="p in getSortedPlayers()" class="game-end-column">
                            <div class="game-end-winer-scorebreak-player-title">
                                <div :class="'game-end-player ' + getEndGamePlayerRowColorClass(p.color)"><a :href="'/player?id='+p.id+'&noredirect'">{{p.name}}</a></div>
                            </div>
                            <div v-for="v in p.victoryPointsBreakdown.detailsCards">
                              <div class="game-end-column-row">
                                <div class="game-end-column-vp">{{v.victoryPoint}}</div>
                                <div class="game-end-column-text">{{v.cardName}}</div>
                              </div>
                            </div>
                            <div class="game-end-column-row">
                              <div class="game-end-column-vp">&nbsp;</div>
                              <div class="game-end-column-text">&nbsp;</div>
                            </div>
                            <div v-for="v in p.victoryPointsBreakdown.detailsMilestones">
                              <div class="game-end-column-row">
                                <div class="game-end-column-vp">{{v.split(':', 2)[1]}}</div>
                                <div class="game-end-column-text">{{v.split(':', 2)[0]}}</div>
                              </div>
                            </div>
                            <div v-for="v in p.victoryPointsBreakdown.detailsAwards">
                              <div class="game-end-column-row">
                                <div class="game-end-column-vp">{{v.split(':', 2)[1]}}</div>
                                <div class="game-end-column-text">{{v.split(':', 2)[0]}}</div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="game-end-flexrow">
                <div class="game_end_block--board game-end-column">
                    <h2 v-i18n>Final situation on the board</h2>
                    <board
                        :spaces="player.game.spaces"
                        :venusNextExtension="player.game.gameOptions.venusNextExtension"
                        :venusScaleLevel="player.game.venusScaleLevel"
                        :aresExtension="player.game.gameOptions.aresExtension"
                        :boardName ="player.game.gameOptions.boardName"
                        :oceans_count="player.game.oceans"
                        :oxygen_level="player.game.oxygenLevel"
                        :temperature="player.game.temperature"></board>
                </div>
                <div class="game_end_block--log game-end-column">
                  <log-panel :color="player.color" :generation="player.game.generation" :id="player.game.spectatorId" :lastSoloGeneration="player.game.lastSoloGeneration" :players="player.players"></log-panel>
                </div>

                <div v-if="player.game.colonies.length > 0" class="player_home_block" ref="colonies" id="shortkey-colonies">
                  <dynamic-title title="Colonies" :color="player.color"/>
                  <div class="colonies-fleets-cont" v-if="player.corporationCard">
                      <div class="colonies-player-fleets" v-for="colonyPlayer in player.players">
                          <div :class="'colonies-fleet colonies-fleet-'+ colonyPlayer.color" v-for="idx in getFleetsCountRange(colonyPlayer)"></div>
                      </div>
                  </div>
                  <div class="player_home_colony_cont">
                      <div class="player_home_colony" v-for="colony in player.game.colonies" :key="colony.name">
                          <colony :colony="colony"></colony>
                      </div>
                  </div>
                </div>

              </div>
            </div>
        </div>
    `,
});


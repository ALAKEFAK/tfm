import Vue from 'vue';
import {Color} from '../../Color';
import {BoardName, BoardRandomOption} from '../../boards/BoardName';
import {CardName} from '../../CardName';
import {CorporationsFilter} from './CorporationsFilter';
import {translateTextWithParams} from '../../directives/i18n';
import {IGameData} from '../../database/IDatabase';
import {ColoniesFilter} from './ColoniesFilter';
import {ColonyName} from '../../colonies/ColonyName';
import {CardsFilter} from './CardsFilter';
import {Button} from '../common/Button';
import {playerColorClass} from '../../utils/utils';
import {RandomMAOptionType} from '../../RandomMAOptionType';
import {GameId} from '../../Game';
import {AgendaStyle} from '../../turmoil/PoliticalAgendas';
import {ShuffleTileOptionType} from '../../boards/ShuffleTileOptionType';
import {PreferencesManager} from './../PreferencesManager';

import * as constants from '../../constants';
import {$t} from '../../directives/i18n';

export interface CreateGameModel {
    constants: typeof constants;
    allOfficialExpansions: boolean;
    firstIndex: number;
    playersCount: number;
    players: Array<NewPlayerModel>;
    corporateEra: boolean;
    prelude: boolean;
    draftVariant: boolean;
    initialDraft: boolean;
    randomMA: RandomMAOptionType;
    randomFirstPlayer: boolean;
    showOtherPlayersVP: boolean;
    beginnerOption: boolean;
    venusNext: boolean;
    colonies: boolean;
    turmoil: boolean;
    customCorporationsList: Array<CardName>;
    customColoniesList: Array<ColonyName>;
    cardsBlackList: Array<CardName>;
    showCorporationList: boolean;
    showColoniesList: boolean;
    showCardsBlackList: boolean;
    isSoloModePage: boolean;
    board: BoardName | BoardRandomOption;
    boards: Array<BoardName | BoardRandomOption>;
    seed: number;
    solarPhaseOption: boolean;
    shuffleTileOption: ShuffleTileOptionType;
    promoCardsOption: boolean;
    communityCardsOption: boolean;
    aresExtension: boolean;
    politicalAgendasExtension: AgendaStyle;
    moonExpansion: boolean;
    undoOption: boolean;
    showTimers: boolean;
    fastModeOption: boolean;
    removeNegativeGlobalEventsOption: boolean;
    includeVenusMA: boolean;
    startingCorporations: number;
    soloTR: boolean;
    clonedGameData: IGameData | undefined;
    cloneGameData: Array<IGameData>;
    requiresVenusTrackCompletion: boolean;
    requiresMoonTrackCompletion: boolean;
    seededGame: boolean;
    requiresPassword: boolean;
    trajectoryExtension: boolean;
    escapeVelocityMode: boolean;
    escapeVelocityThreshold: number;
    escapeVelocityPeriod: number;
    escapeVelocityPenalty: number;
    rebalancedExtension: boolean;
    showAllGlobalEvents: boolean;
}

export interface NewPlayerModel {
    index: number;
    name: string;
    color: Color;
    beginner: boolean;
    handicap: number;
    first: boolean;
}

const defaultGameSetting: CreateGameModel = {
  constants,
  firstIndex: 1,
  playersCount: 1,
  players: [
    {index: 1, name: '', color: Color.RED, beginner: false, handicap: 0, first: false},
    {index: 2, name: '', color: Color.GREEN, beginner: false, handicap: 0, first: false},
    {index: 3, name: '', color: Color.YELLOW, beginner: false, handicap: 0, first: false},
    {index: 4, name: '', color: Color.BLUE, beginner: false, handicap: 0, first: false},
    {index: 5, name: '', color: Color.BLACK, beginner: false, handicap: 0, first: false},
    {index: 6, name: '', color: Color.PURPLE, beginner: false, handicap: 0, first: false},
    {index: 7, name: '', color: Color.ORANGE, beginner: false, handicap: 0, first: false},
    {index: 8, name: '', color: Color.PINK, beginner: false, handicap: 0, first: false},
  ],
  corporateEra: true,
  prelude: false,
  draftVariant: true,
  initialDraft: false,
  randomMA: RandomMAOptionType.NONE,
  randomFirstPlayer: true,
  showOtherPlayersVP: false,
  beginnerOption: false,
  venusNext: false,
  colonies: false,
  showColoniesList: false,
  showCorporationList: false,
  showCardsBlackList: false,
  turmoil: false,
  customCorporationsList: [],
  customColoniesList: [],
  cardsBlackList: [],
  isSoloModePage: false,
  board: BoardName.ORIGINAL,
  boards: [
    BoardName.ORIGINAL,
    BoardName.HELLAS,
    BoardName.ELYSIUM,
    BoardRandomOption.RANDOM_OFFICIAL,
    BoardName.AMAZONIS,
    BoardName.ARABIA_TERRA,
    BoardName.VASTITAS_BOREALIS,
    BoardName.TERRA_CIMMERIA,
    BoardRandomOption.RANDOM_ALL,
  ],
  seed: Math.random(),
  seededGame: false,
  solarPhaseOption: false,
  shuffleTileOption: ShuffleTileOptionType.NONE,
  promoCardsOption: false,
  communityCardsOption: false,
  aresExtension: false,
  politicalAgendasExtension: AgendaStyle.STANDARD,
  moonExpansion: false,
  undoOption: false,
  showTimers: true,
  fastModeOption: false,
  removeNegativeGlobalEventsOption: false,
  includeVenusMA: true,
  startingCorporations: 2,
  soloTR: false,
  clonedGameData: undefined,
  cloneGameData: [],
  allOfficialExpansions: false,
  requiresVenusTrackCompletion: false,
  requiresMoonTrackCompletion: false,
  requiresPassword: true,
  trajectoryExtension: false,
  escapeVelocityMode: false,
  escapeVelocityThreshold: 30,
  escapeVelocityPeriod: 1,
  escapeVelocityPenalty: 1,
  rebalancedExtension: true,
  showAllGlobalEvents: false,
};

export const CreateGameForm = Vue.component('create-game-form', {
  data: function(): CreateGameModel {
    return defaultGameSetting;
  },
  components: {
    'corporations-filter': CorporationsFilter,
    'colonies-filter': ColoniesFilter,
    'cards-filter': CardsFilter,
    'Button': Button,
  },
  mounted: function() {
    if (window.location.pathname === '/solo') {
      this.isSoloModePage = true;
    }

    const saveSettings = PreferencesManager.load('create_game_setting', '');

    if (saveSettings !== '') {
      const component = this.$data;
      const refs = this.$refs;
      const results = JSON.parse(saveSettings);

      const players = results['players'];
      component.playersCount = players.length;
      component.showCorporationList = results['customCorporationsList'].length > 0;
      component.showColoniesList = results['customColoniesList'].length > 0;
      component.showCardsBlackList = results['cardsBlackList'].length > 0;

      for (const k in results) {
        if (['customCorporationsList', 'customColoniesList', 'cardsBlackList', 'players'].includes(k)) continue;
        (component as any)[k] = results[k];
      }

      Vue.nextTick(() => {
        if (component.showColoniesList) {
          (refs.coloniesFilter as any).updateColoniesByNames(results['customColoniesList']);
        }

        if (component.showCorporationList) {
          (refs.corporationsFilter as any).selectedCorporations = results['customCorporationsList'];
        }

        if (component.showCardsBlackList) {
          (refs.cardsFilter as any).selectedCardNames = results['cardsBlackList'];
        }

        if ( ! component.seededGame) {
          component.seed = Math.random();
        }
      });
    }

    const onSucces = (response: any) => {
      this.$data.cloneGameData = response;
    };

    fetch('/api/clonablegames')
      .then((response) => response.json())
      .then(onSucces)
      .catch((_) => alert('Unexpected server response'));
  },
  methods: {
    downloadCurrentSettings: function() {
      const serializedData = this.serializeSettings();

      if (serializedData) {
        const a = document.createElement('a');
        const blob = new Blob([serializedData], {'type': 'application/json'});
        a.href = window.URL.createObjectURL(blob);
        a.download = 'tm_settings.json';
        a.click();
      }
    },
    handleSettingsUpload: function() {
      const refs = this.$refs;
      const file = (refs.file as any).files[0];
      const reader = new FileReader();
      const component = this.$data;

      reader.addEventListener('load', function() {
        const readerResults = reader.result;
        if (typeof(readerResults) === 'string') {
          const results = JSON.parse(readerResults);
          const players = results['players'];
          component.playersCount = players.length;
          component.showCorporationList = results['customCorporationsList'].length > 0;
          component.showColoniesList = results['customColoniesList'].length > 0;
          component.showCardsBlackList = results['cardsBlackList'].length > 0;

          for (const k in results) {
            if (['customCorporationsList', 'customColoniesList', 'cardsBlackList', 'players'].includes(k)) continue;
            (component as any)[k] = results[k];
          }

          for (let i = 0; i < players.length; i++) {
            component.players[i] = players[i];
          }

          Vue.nextTick(() => {
            if (component.showColoniesList) {
              (refs.coloniesFilter as any).updateColoniesByNames(results['customColoniesList']);
            }

            if (component.showCorporationList) {
              (refs.corporationsFilter as any).selectedCorporations = results['customCorporationsList'];
            }

            if (component.showCardsBlackList) {
              (refs.cardsFilter as any).selectedCardNames = results['cardsBlackList'];
            }

            if ( ! component.seededGame) {
              component.seed = Math.random();
            }
          });
        }
      }, false);
      if (file) {
        if (/\.json$/i.test(file.name)) {
          reader.readAsText(file);
        }
      }
    },
    resetGameSettings: function() {
      PreferencesManager.save('create_game_setting', '');
      window.location.reload();
    },
    getPlayerNamePlaceholder: function(player: NewPlayerModel): string {
      return translateTextWithParams(
        'Player ${0} name',
        [String(player.index)],
      );
    },
    updateCustomCorporationsList: function(newCustomCorporationsList: Array<CardName>) {
      const component = (this as any) as CreateGameModel;
      component.customCorporationsList = newCustomCorporationsList;
    },
    updateCardsBlackList: function(newCardsBlackList: Array<CardName>) {
      const component = (this as any) as CreateGameModel;
      component.cardsBlackList = newCardsBlackList;
    },
    updateCustomColoniesList: function(newCustomColoniesList: Array<ColonyName>) {
      const component = (this as any) as CreateGameModel;
      component.customColoniesList = newCustomColoniesList;
    },
    getPlayers: function(): Array<NewPlayerModel> {
      const component = (this as any) as CreateGameModel;
      return component.players.slice(0, component.playersCount);
    },
    getShuffleTileOptionType: function(type: 'none' | 'limited' | 'fullrandom'): ShuffleTileOptionType {
      if (type === 'limited') {
        return ShuffleTileOptionType.LIMITED_RANDOM;
      } else if (type === 'fullrandom') {
        return ShuffleTileOptionType.FULL_RANDOM;
      } else {
        return ShuffleTileOptionType.NONE;
      }
    },
    isShuffleTileEnabled: function(): Boolean {
      return this.shuffleTileOption !== ShuffleTileOptionType.NONE;
    },
    shuffleTileToggle: function() {
      const component = (this as any) as CreateGameModel;
      if (component.shuffleTileOption === ShuffleTileOptionType.NONE) {
        component.shuffleTileOption = ShuffleTileOptionType.LIMITED_RANDOM;
        this.shuffleTileOption = ShuffleTileOptionType.LIMITED_RANDOM;
      } else {
        component.shuffleTileOption = ShuffleTileOptionType.NONE;
        this.shuffleTileOption = ShuffleTileOptionType.NONE;
      }
    },
    isRandomMAEnabled: function(): Boolean {
      return this.randomMA !== RandomMAOptionType.NONE;
    },
    randomMAToggle: function() {
      const component = (this as any) as CreateGameModel;
      if (component.randomMA === RandomMAOptionType.NONE) {
        component.randomMA = RandomMAOptionType.LIMITED;
        this.randomMA = RandomMAOptionType.LIMITED;
      } else {
        component.randomMA = RandomMAOptionType.NONE;
        this.randomMA = RandomMAOptionType.NONE;
      }
    },
    trajectoryToggle: function() {
      const component = (this as any) as CreateGameModel;
      if (component.randomMA === RandomMAOptionType.NONE && this.trajectoryExtension === true) {
        component.randomMA = RandomMAOptionType.LIMITED;
        this.randomMA = RandomMAOptionType.LIMITED;
      }
    },
    getRandomMaOptionType: function(type: 'limited' | 'full'): RandomMAOptionType {
      if (type === 'limited') {
        return RandomMAOptionType.LIMITED;
      } else if (type === 'full') {
        return RandomMAOptionType.UNLIMITED;
      } else {
        return RandomMAOptionType.NONE;
      }
    },
    isPoliticalAgendasExtensionEnabled: function(): Boolean {
      return this.politicalAgendasExtension !== AgendaStyle.STANDARD;
    },
    politicalAgendasExtensionToggle: function() {
      if (this.politicalAgendasExtension === AgendaStyle.STANDARD) {
        this.politicalAgendasExtension = AgendaStyle.RANDOM;
      } else {
        this.politicalAgendasExtension = AgendaStyle.STANDARD;
      }
    },
    getPoliticalAgendasExtensionAgendaStyle: function(type: 'random' | 'chairman'): AgendaStyle {
      if (type === 'random') {
        return AgendaStyle.RANDOM;
      } else if (type === 'chairman') {
        return AgendaStyle.CHAIRMAN;
      } else {
        console.warn('AgendaStyle not found');
        return AgendaStyle.STANDARD;
      }
    },
    isBeginnerToggleEnabled: function(): Boolean {
      return !(this.initialDraft || this.prelude || this.venusNext || this.colonies || this.turmoil);
    },
    selectAll: function() {
      this.corporateEra = this.$data.allOfficialExpansions;
      this.prelude = this.$data.allOfficialExpansions;
      this.venusNext = this.$data.allOfficialExpansions;
      this.colonies = this.$data.allOfficialExpansions;
      this.turmoil = this.$data.allOfficialExpansions;
      this.promoCardsOption = this.$data.allOfficialExpansions;
      this.solarPhaseOption = this.$data.allOfficialExpansions;
    },
    toggleVenusNext: function() {
      this.solarPhaseOption = this.$data.venusNext;
    },
    deselectPoliticalAgendasWhenDeselectingTurmoil: function() {
      if (this.$data.turmoil === false) {
        this.politicalAgendasExtension = AgendaStyle.STANDARD;
      }
    },
    deselectVenusCompletion: function() {
      if (this.$data.venusNext === false) {
        this.requiresVenusTrackCompletion = false;
      }
    },
    deselectMoonCompletion: function() {
      if (this.$data.moonExpansion === false) {
        this.requiresMoonTrackCompletion = false;
      }
    },
    getBoardColorClass: function(boardName: string): string {
      if (boardName === BoardName.ORIGINAL) {
        return 'create-game-board-hexagon create-game-tharsis';
      } else if (boardName === BoardName.HELLAS) {
        return 'create-game-board-hexagon create-game-hellas';
      } else if (boardName === BoardName.ELYSIUM) {
        return 'create-game-board-hexagon create-game-elysium';
      } else if (boardName === BoardName.AMAZONIS) {
        return 'create-game-board-hexagon create-game-amazonis';
      } else if (boardName === BoardName.ARABIA_TERRA) {
        return 'create-game-board-hexagon create-game-arabia_terra';
      } else if (boardName === BoardName.VASTITAS_BOREALIS) {
        return 'create-game-board-hexagon create-game-vastitas_borealis';
      } else if (boardName === BoardName.TERRA_CIMMERIA) {
        return 'create-game-board-hexagon create-game-terra_cimmeria';
      } else {
        return 'create-game-board-hexagon create-game-random';
      }
    },
    getPlayerCubeColorClass: function(color: string): string {
      return playerColorClass(color.toLowerCase(), 'bg');
    },
    getPlayerContainerColorClass: function(color: string): string {
      return playerColorClass(color.toLowerCase(), 'bg_transparent');
    },
    serializeSettings: function() {
      const component = (this as any) as CreateGameModel;

      let players = component.players.slice(0, component.playersCount);

      if (component.randomFirstPlayer) {
        // Shuffle players array to assign each player a random seat around the table
        players = players.map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
        component.firstIndex = Math.floor(component.seed * component.playersCount) + 1;
      }

      // Auto assign an available color if there are duplicates
      const uniqueColors = players.map((player) => player.color).filter((v, i, a) => a.indexOf(v) === i);
      if (uniqueColors.length !== players.length) {
        const allColors = [Color.BLUE, Color.RED, Color.YELLOW, Color.GREEN, Color.BLACK, Color.PURPLE, Color.ORANGE, Color.PINK];
        players.forEach((player) => {
          if (allColors.includes(player.color)) {
            allColors.splice(allColors.indexOf(player.color), 1);
          } else {
            player.color = allColors.shift() as Color;
          }
        });
      }

      // Set player name automatically if not entered
      const isSoloMode = component.playersCount === 1;

      component.players.forEach((player) => {
        if (player.name === '') {
          if (isSoloMode) {
            player.name = 'You';
          } else {
            const defaultPlayerName = player.color.charAt(0).toUpperCase() + player.color.slice(1);
            player.name = defaultPlayerName;
          }
        }
      });

      players.map((player: any) => {
        player.first = (component.firstIndex === player.index);
        return player;
      });

      const corporateEra = component.corporateEra;
      const prelude = component.prelude;
      const draftVariant = component.draftVariant;
      const initialDraft = component.initialDraft;
      const randomMA = component.randomMA;
      const showOtherPlayersVP = component.showOtherPlayersVP;
      const venusNext = component.venusNext;
      const colonies = component.colonies;
      const turmoil = component.turmoil;
      const solarPhaseOption = this.solarPhaseOption;
      const shuffleTileOption = this.shuffleTileOption;
      const customCorporationsList = component.customCorporationsList;
      const customColoniesList = component.customColoniesList;
      const cardsBlackList = component.cardsBlackList;
      const board = component.board;
      const seed = component.seed;
      const promoCardsOption = component.promoCardsOption;
      const communityCardsOption = component.communityCardsOption;
      const aresExtension = component.aresExtension;
      const politicalAgendasExtension = this.politicalAgendasExtension;
      const moonExpansion = component.moonExpansion;
      const undoOption = component.undoOption;
      const showTimers = component.showTimers;
      const fastModeOption = component.fastModeOption;
      const removeNegativeGlobalEventsOption = this.removeNegativeGlobalEventsOption;
      const includeVenusMA = component.includeVenusMA;
      const startingCorporations = component.startingCorporations;
      const soloTR = component.soloTR;
      const beginnerOption = component.beginnerOption;
      const randomFirstPlayer = component.randomFirstPlayer;
      const requiresVenusTrackCompletion = component.requiresVenusTrackCompletion;
      const requiresMoonTrackCompletion = component.requiresMoonTrackCompletion;
      const requiresPassword = component.requiresPassword;
      const trajectoryExtension = component.trajectoryExtension;
      const escapeVelocityMode = component.escapeVelocityMode;
      const escapeVelocityThreshold = component.escapeVelocityMode ? component.escapeVelocityThreshold : undefined;
      const escapeVelocityPeriod = component.escapeVelocityMode ? component.escapeVelocityPeriod : undefined;
      const escapeVelocityPenalty = component.escapeVelocityMode ? component.escapeVelocityPenalty : undefined;
      const rebalancedExtension = component.rebalancedExtension;
      const showAllGlobalEvents = this.showAllGlobalEvents;
      let clonedGamedId: undefined | GameId = undefined;

      // Check custom colony count
      if (customColoniesList.length > 0) {
        const playersCount = players.length;
        let neededColoniesCount = playersCount + 2;
        if (playersCount === 1) {
          neededColoniesCount = 4;
        } else if (playersCount === 2) {
          neededColoniesCount = 5;
        }

        if (customColoniesList.length < neededColoniesCount) {
          window.alert(translateTextWithParams('Must select at least ${0} colonies', [neededColoniesCount.toString()]));
          return;
        }
      }

      // Check custom corp count
      if (customCorporationsList.length > 0) {
        const neededCorpsCount = players.length * startingCorporations;

        if (customCorporationsList.length < neededCorpsCount) {
          window.alert(translateTextWithParams('Must select at least ${0} corporations', [neededCorpsCount.toString()]));
          return;
        }
      }

      // Clone game checks
      if (component.clonedGameData !== undefined && component.seededGame) {
        clonedGamedId = component.clonedGameData.gameId;
        if (component.clonedGameData.playerCount !== players.length) {
          window.alert($t('Player count mismatch'));
          this.$data.playersCount = component.clonedGameData.playerCount;
          return;
        }
      } else if (!component.seededGame) {
        clonedGamedId = undefined;
      }

      const dataToSend = JSON.stringify({
        players,
        corporateEra,
        prelude,
        draftVariant,
        showOtherPlayersVP,
        venusNext,
        colonies,
        turmoil,
        customCorporationsList,
        customColoniesList,
        cardsBlackList,
        board,
        seed,
        solarPhaseOption,
        promoCardsOption,
        communityCardsOption,
        aresExtension: aresExtension,
        politicalAgendasExtension: politicalAgendasExtension,
        moonExpansion: moonExpansion,
        undoOption,
        showTimers,
        fastModeOption,
        removeNegativeGlobalEventsOption,
        includeVenusMA,
        startingCorporations,
        soloTR,
        clonedGamedId,
        initialDraft,
        randomMA,
        shuffleTileOption,
        beginnerOption,
        randomFirstPlayer,
        requiresVenusTrackCompletion,
        requiresMoonTrackCompletion,
        requiresPassword,
        trajectoryExtension,
        escapeVelocityMode,
        escapeVelocityThreshold,
        escapeVelocityPeriod,
        escapeVelocityPenalty,
        rebalancedExtension,
        showAllGlobalEvents,
      }, undefined, 4);
      return dataToSend;
    },
    createGame: function() {
      const dataToSend = this.serializeSettings();

      if (dataToSend === undefined) return;

      PreferencesManager.save('create_game_setting', dataToSend);

      const onSucces = (response: any) => {
        if (response.players.length === 1) {
          window.location.href = '/player?id=' + response.players[0].id;
          return;
        } else {
          window.history.replaceState(response, `${constants.APP_NAME} - Game`, '/game?id=' + response.id);
          (this as any).$root.$data.game = response;
          (this as any).$root.$data.screen = 'game-home';
        }
      };

      fetch('/game', {'method': 'PUT', 'body': dataToSend, 'headers': {'Content-Type': 'application/json'}})
        .then((response) => response.json())
        .then(onSucces)
        .catch((_) => alert('Unexpected server response'));
    },
  },

  template: `
        <div id="create-game">
            <h1><span v-i18n>{{ constants.APP_NAME }}</span> — <span v-i18n>Create New Game</span></h1>
            <div class="create-game-discord-invite">
              Anonymized game stats (corp, preludes, scores, and expansions) are recorded at the end of each game for improving the rebalanced mode. 
            </div>
            <div class="create-game-discord-invite">
              (<span v-i18n>Looking for people to play with</span>? <a href="https://discord.gg/mxCCb8rd7C" class="tooltip" target="_blank">🌱<u v-i18n>Join us on Rebalanced Discord</u>🌱</a>.)
            </div>

            <div class="create-game-form create-game-panel create-game--block">

                <div class="create-game-options">

                    <div class="create-game-solo-player form-group" v-if="isSoloModePage" v-for="newPlayer in getPlayers()">
                        <div>
                            <input class="form-input form-inline create-game-player-name" placeholder="Your name" v-model="newPlayer.name" />
                        </div>
                        <div class="create-game-colors-wrapper">
                            <label class="form-label form-inline create-game-color-label" v-i18n>Color:</label>
                            <span class="create-game-colors-cont">
                            <label class="form-radio form-inline create-game-color" v-for="color in ['Red', 'Green', 'Yellow', 'Blue', 'Black', 'Purple', 'Orange', 'Pink']">
                                <input type="radio" :value="color.toLowerCase()" :name="'playerColor' + newPlayer.index" v-model="newPlayer.color">
                                <i class="form-icon"></i> <div :class="'board-cube board-cube--'+color.toLowerCase()"></div>
                            </label>
                            </span>
                        </div>
                        <div>
                            <label class="form-switch form-inline">
                                <input type="checkbox" v-model="newPlayer.beginner">
                                <i class="form-icon"></i> <span v-i18n>Beginner?</span>
                            </label>
                        </div>
                    </div>

                    <div class="create-game-page-container">
                        <div class="create-game-page-column" v-if="! isSoloModePage">
                            <h4 v-i18n>№ of Players</h4>
                                <template v-for="pCount in [1,2,3,4,5,6]">
                                    <input type="radio" :value="pCount" name="playersCount" v-model="playersCount" :id="pCount+'-radio'">
                                    <label :for="pCount+'-radio'">
                                        <span v-html="pCount === 1 ? 'Solo' : pCount"></span>
                                    </label>
                                </template>
                        </div>

                        <div class="create-game-page-column">
                            <h4 v-i18n>Expansions</h4>

                            <input type="checkbox" name="allOfficialExpansions" id="allOfficialExpansions-checkbox" v-model="allOfficialExpansions" v-on:change="selectAll()">
                            <label for="allOfficialExpansions-checkbox">
                                <span v-i18n>All</span>
                            </label>

                            <input type="checkbox" name="corporateEra" id="corporateEra-checkbox" v-model="corporateEra">
                            <label for="corporateEra-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-CE"></div>
                                <span v-i18n>Corporate Era</span>
                            </label>

                            <input type="checkbox" name="prelude" id="prelude-checkbox" v-model="prelude">
                            <label for="prelude-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-prelude"></div>
                                <span v-i18n>Prelude</span>
                            </label>

                            <input type="checkbox" name="venusNext" id="venusNext-checkbox" v-model="venusNext" v-on:change="toggleVenusNext()">
                            <label for="venusNext-checkbox" class="expansion-button">
                            <div class="create-game-expansion-icon expansion-icon-venus"></div>
                                <span v-i18n>Venus Next</span>
                            </label>

                            <input type="checkbox" name="colonies" id="colonies-checkbox" v-model="colonies">
                            <label for="colonies-checkbox" class="expansion-button">
                            <div class="create-game-expansion-icon expansion-icon-colony"></div>
                                <span v-i18n>Colonies</span>
                            </label>

                            <input type="checkbox" name="turmoil" id="turmoil-checkbox" v-model="turmoil" v-on:change="deselectPoliticalAgendasWhenDeselectingTurmoil()">
                            <label for="turmoil-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-turmoil"></div>
                                <span v-i18n>Turmoil</span>
                            </label>

                            <input type="checkbox" name="promo" id="promo-checkbox" v-model="promoCardsOption">
                            <label for="promo-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-promo"></div>
                                <span v-i18n>Promos</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#promo-cards" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <div class="create-game-subsection-label" v-i18n>Fan-made</div>

                            <input type="checkbox" name="rebalanced" id="rebalancedExtension-checkbox" v-model="rebalancedExtension">
                            <label for="rebalancedExtension-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-rebalanced"></div>
                                <span v-i18n>Rebalanced</span>&nbsp;<a href="https://rebalanced-mars.notion.site/Rebalanced-Mars-36bdaa3aa2ce4beaac29f3c3adfd6df4" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <template v-if="playersCount > 1">
                            <input type="checkbox" name="trajectory" id="trajectoryExtension-checkbox" v-model="trajectoryExtension" v-on:change="trajectoryToggle()">
                            <label for="trajectoryExtension-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-trajectory"></div>
                                <span v-i18n>Trajectory</span>&nbsp;<a href="https://rebalanced-mars.notion.site/Trajectory-Expansion-f0b2b21018324d76acf5726780f0854f" class="tooltip" target="_blank">&#9432;</a>
                            </label>
                            </template>

                            <input type="checkbox" name="community" id="communityCards-checkbox" v-model="communityCardsOption">
                            <label for="communityCards-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-community"></div>
                                <span v-i18n>Community</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#community" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <input type="checkbox" name="ares" id="ares-checkbox" v-model="aresExtension">
                            <label for="ares-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-ares"></div>
                                <span v-i18n>Ares</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Ares" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <input type="checkbox" name="themoon" id="themoon-checkbox" v-model="moonExpansion">
                            <label for="themoon-checkbox" class="expansion-button">
                                <div class="create-game-expansion-icon expansion-icon-themoon"></div>
                                <span v-i18n>The Moon</span>&nbsp;<span style="font-size: small;">(&beta;)</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/The-Moon" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <template v-if="moonExpansion">
                              <input type="checkbox" v-model="requiresMoonTrackCompletion" id="requiresMoonTrackCompletion-checkbox">
                              <label for="requiresMoonTrackCompletion-checkbox">
                                  <span v-i18n>Mandatory Moon Terraforming</span>
                              </label>
                            </template>

                            <template v-if="turmoil">
                                <input type="checkbox" name="politicalAgendas" id="politicalAgendas-checkbox" v-on:change="politicalAgendasExtensionToggle()">
                                <label for="politicalAgendas-checkbox" class="expansion-button">
                                    <div class="create-game-expansion-icon expansion-icon-agendas"></div>
                                    <span v-i18n>Agendas</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#political-agendas" class="tooltip" target="_blank">&#9432;</a>
                                </label>

                                <div class="create-game-page-column-row" v-if="isPoliticalAgendasExtensionEnabled()">
                                    <div>
                                    <input type="radio" name="agendaStyle" v-model="politicalAgendasExtension" :value="getPoliticalAgendasExtensionAgendaStyle('random')" id="randomAgendaStyle-radio">
                                    <label class="label-agendaStyle agendaStyle-random" for="randomAgendaStyle-radio">
                                        <span class="agendas-text" v-i18n>{{ getPoliticalAgendasExtensionAgendaStyle('random') }}</span>
                                    </label>
                                    </div>

                                    <div>
                                    <input type="radio" name="agendaStyle" v-model="politicalAgendasExtension" :value="getPoliticalAgendasExtensionAgendaStyle('chairman')" id="chairmanAgendaStyle-radio">
                                    <label class="label-agendaStyle agendaStyle-chairman" for="chairmanAgendaStyle-radio">
                                        <span class="agendas-text" v-i18n>{{ getPoliticalAgendasExtensionAgendaStyle('chairman') }}</span>
                                    </label>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div class="create-game-page-column">
                            <h4 v-i18n>Board</h4>

                            <template v-for="boardName in boards.slice(0,4)">
                                <input type="radio" :value="boardName" name="board" v-model="board" :id="boardName+'-checkbox'">
                                <label :for="boardName+'-checkbox'" class="expansion-button">
                                    <span :class="getBoardColorClass(boardName)">&#x2B22;</span><span class="capitalized" v-i18n>{{ boardName }}</span>
                                </label>
                            </template>

                            <div class="create-game-subsection-label" v-i18n>Fan-made &nbsp;<a href="https://rebalanced-mars.notion.site/Fan-made-boards-62cd7de7fb0e48c6afff6966612af6dd" class="tooltip" target="_blank">&#9432;</a></div>

                            <template v-for="boardName in boards.slice(4,9)">
                                <input type="radio" :value="boardName" name="board" v-model="board" :id="boardName+'-checkbox'">
                                <label :for="boardName+'-checkbox'" class="expansion-button">
                                    <span :class="getBoardColorClass(boardName)">&#x2B22;</span><span class="capitalized" v-i18n>{{ boardName }}</span>
                                </label>
                            </template>

                            <div class="create-game-subsection-label" v-i18n>Randomize tiles</div>

                            <input type="radio" :value="getShuffleTileOptionType('none')" name="randomTileOption" v-model="shuffleTileOption" id="shuffleTile-none-radio">
                            <label for="shuffleTile-none-radio">
                              <span v-i18n>{{ getShuffleTileOptionType('none') }}</span>
                            </label>

                            <input type="radio" :value="getShuffleTileOptionType('limited')" name="randomTileOption" v-model="shuffleTileOption" id="shuffleTile-limited-radio">
                            <label for="shuffleTile-limited-radio">
                              <span v-i18n>{{ getShuffleTileOptionType('limited') }}</span>
                            </label>

                            <input type="radio" :value="getShuffleTileOptionType('fullrandom')" name="randomTileOption" v-model="shuffleTileOption" id="shuffleTile-fullrandom-radio">
                            <label for="shuffleTile-fullrandom-radio">
                              <span v-i18n>{{ getShuffleTileOptionType('fullrandom') }}</span>
                            </label>
                        </div>

                        <div class="create-game-page-column">
                            <h4 v-i18n>Options</h4>

                            <label for="startingCorps-checkbox" class="startingCorps-checkbox">
                                <span>
                                    <template v-for="n in 3">
                                        <input type="radio" :value="n+1" v-model="startingCorporations" :id="n+'-checkbox'">
                                        <label :for="n+'-checkbox'" class="corporation-count">
                                            <span>{{ n + 1 }}</span>
                                        </label>
                                    </template>
                                </span>
                                <span v-i18n>Corporations</span>
                            </label>

                            <input type="checkbox" v-model="solarPhaseOption" id="WGT-checkbox">
                            <label for="WGT-checkbox">
                                <span v-i18n>World Gov Terraforming</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#solar-phase" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <template v-if="playersCount === 1">
                            <input type="checkbox" v-model="soloTR" id="soloTR-checkbox">
                            <label for="soloTR-checkbox">
                                <span v-i18n>63 TR solo mode</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#tr-solo-mode" class="tooltip" target="_blank">&#9432;</a>
                            </label>
                            </template>

                            <input type="checkbox" v-model="undoOption" id="undo-checkbox">
                            <label for="undo-checkbox">
                                <span v-i18n>Allow undo</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#allow-undo" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <input type="checkbox" v-model="seededGame" id="seeded-checkbox">
                            <label for="seeded-checkbox">
                                <span v-i18n>Set Predefined Game</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#set-predefined-game" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <div v-if="seededGame">
                                <select name="clonedGamedId" v-model="clonedGameData">
                                    <option v-for="game in cloneGameData" :value="game" :key="game.gameId">
                                        {{ game.gameId }} - {{ game.playerCount }} player(s)
                                    </option>
                                </select>
                            </div>

                            <template v-if="turmoil">
                            <div class="create-game-subsection-label" v-i18n>Turmoil</div>

                                <input type="checkbox" v-model="showAllGlobalEvents" id="showAllGlobalEvents-checkbox">
                                <label for="showAllGlobalEvents-checkbox">
                                    <span v-i18n>Show future Global Events</span>&nbsp;<a href="https://rebalanced-mars.notion.site/Exit-poll-617bd776b51c4ff2bb7b9f0624014262" class="tooltip" target="_blank">&#9432;</a>
                                </label>

                                <input type="checkbox" v-model="removeNegativeGlobalEventsOption" id="removeNegativeEvent-checkbox">
                                <label for="removeNegativeEvent-checkbox">
                                    <span v-i18n>Remove negative Global Events</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#remove-negative-global-events" class="tooltip" target="_blank">&#9432;</a>
                                </label>
                            </template>

                            <div class="create-game-subsection-label" v-i18n>Time</div>

                            <input type="checkbox" v-model="showTimers" id="timer-checkbox">
                            <label for="timer-checkbox">
                                <span v-i18n>Show timers</span>
                            </label>

                            <input type="checkbox" v-model="fastModeOption" id="fastMode-checkbox">
                            <label for="fastMode-checkbox" v-if="playersCount > 1">
                               <span v-i18n>Fast mode</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#fast-mode" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <input type="checkbox" v-model="escapeVelocityMode" id="escapevelocity-checkbox">
                            <label for="escapevelocity-checkbox">
                                <div class="create-game-expansion-icon expansion-icon-escape-velocity"></div>
                                <span v-i18n>Escape Velocity</span>&nbsp;<a href="https://rebalanced-mars.notion.site/Escape-Velocity-4bcee00076354133a2aa4b8ea23f41b1" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <label for="escapeThreshold-checkbox" v-show="escapeVelocityMode">
                              <span v-i18n>After&nbsp;</span>
                              <input type="number" class="create-game-corporations-count" value="30" step="5" min="0" :max="180" v-model="escapeVelocityThreshold" id="escapeThreshold-checkbox">
                              <span v-i18n>&nbsp;min</span>
                            </label>

                            <label for="escapePeriod-checkbox" v-show="escapeVelocityMode">
                              <span v-i18n>Reduce&nbsp;</span>
                              <input type="number" class="create-game-corporations-count" value="1" min="1" :max="10" v-model="escapeVelocityPenalty" id="escapePeriod-checkbox">
                              <span v-i18n>&nbsp;VP every&nbsp;</span>
                              <input type="number" class="create-game-corporations-count" value="1" min="1" :max="10" v-model="escapeVelocityPeriod" id="escapePeriod-checkbox">
                              <span v-i18n>&nbsp;min</span>
                            </label>

                            <input type="checkbox" v-model="showCorporationList" id="customCorps-checkbox">
                            <label for="customCorps-checkbox">
                                <span v-i18n>Custom Corporation list</span>
                            </label>

                            <input type="checkbox" v-model="showCardsBlackList" id="blackList-checkbox">
                            <label for="blackList-checkbox">
                                <span v-i18n>Exclude some cards</span>
                            </label>

                            <template v-if="colonies">
                                <input type="checkbox" v-model="showColoniesList" id="customColonies-checkbox">
                                <label for="customColonies-checkbox">
                                    <span v-i18n>Custom Colonies list</span>
                                </label>
                            </template>

                        </div>


                        <div class="create-game-page-column" v-if="playersCount > 1">
                            <h4 v-i18n>Multiplayer Options</h4>

                            <div class="create-game-subsection-label" v-i18n>
                              Drafting options
                            </div>

                            <div class="create-game-page-column-row">
                                <div>
                                <input type="checkbox" name="draftVariant" v-model="draftVariant" id="draft-checkbox">
                                <label for="draft-checkbox">
                                    <span v-i18n>Draft variant</span>
                                </label>
                                </div>

                                <div>
                                <input type="checkbox" name="initialDraft" v-model="initialDraft" id="initialDraft-checkbox">
                                <label for="initialDraft-checkbox">
                                    <span v-i18n>Initial Draft variant</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#initial-draft" class="tooltip" target="_blank">&#9432;</a>
                                </label>
                                </div>
                            </div>

                            <div class="create-game-subsection-label" v-i18n>
                              Randomize Milestones/Awards&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#random-milestones-and-awards" class="tooltip" target="_blank">&#9432;</a>
                            </div>

                            <div class="create-game-page-column-row">
                              <div>
                                <input type="radio" v-model="randomMA" :value="getRandomMaOptionType('none')" name="randomMAOption" id="randomMA-none-radio">
                                <label for="randomMA-none-radio">
                                  <span v-i18n> Off </span>
                                </label>
                              </div>

                              <div>
                                <input type="radio" v-model="randomMA" :value="getRandomMaOptionType('limited')" name="randomMAOption" id="randomMA-limited-radio">
                                <label for="randomMA-limited-radio">
                                  <span v-i18n> Limited Synergy </span>
                                </label>
                              </div>

                              <div>
                                <input type="radio" v-model="randomMA" :value="getRandomMaOptionType('full')" name="randomMAOption" id="randomMA-full-radio">
                                <label for="randomMA-full-radio">
                                  <span v-i18n> Full random </span>
                                </label>
                              </div>
                            </div>

                            <div class="create-game-subsection-label" v-i18n>
                            </div>

                            <input type="checkbox" v-model="randomFirstPlayer" id="randomFirstPlayer-checkbox">
                            <label for="randomFirstPlayer-checkbox">
                                <span v-i18n>Random first player</span>
                            </label>

                            <template v-if="venusNext">
                                <input type="checkbox" v-model="includeVenusMA" id="venusMA-checkbox">
                                <label for="venusMA-checkbox">
                                    <span v-i18n>Venus Milestone/Award</span>
                                </label>
                                <input type="checkbox" v-model="requiresVenusTrackCompletion" id="requiresVenusTrackCompletion-checkbox">
                                <label for="requiresVenusTrackCompletion-checkbox">
                                    <span v-i18n>Mandatory Venus Terraforming</span> &nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#venus-terraforming" class="tooltip" target="_blank">&#9432;</a>
                                </label>
                            </template>

                            <input type="checkbox" name="showOtherPlayersVP" v-model="showOtherPlayersVP" id="realTimeVP-checkbox">
                            <label for="realTimeVP-checkbox">
                                <span v-i18n>Show real-time VP</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#show-real-time-vp" class="tooltip" target="_blank">&#9432;</a>
                            </label>

                            <input type="checkbox" v-model="beginnerOption" id="beginnerOption-checkbox">
                            <label for="beginnerOption-checkbox">
                                <span v-i18n>Beginner Options</span>
                            </label>

                            <div class="create-game-subsection-label" v-i18n>Security</div>

                            <input type="checkbox" v-model="requiresPassword" id="requirePassword-checkbox">
                            <label for="requirePassword-checkbox">
                                <span v-i18n>Require password</span>
                            </label>
                        </div>

                        <div class="create-game-players-cont" v-if="playersCount > 1">
                            <div class="container">
                                <div class="columns">
                                    <template v-for="newPlayer in getPlayers()">
                                    <div :class="'form-group col6 create-game-player '+getPlayerContainerColorClass(newPlayer.color)">
                                        <div>
                                            <input class="form-input form-inline create-game-player-name" :placeholder="getPlayerNamePlaceholder(newPlayer)" v-model="newPlayer.name" />
                                        </div>
                                        <div class="create-game-page-color-row">
                                            <template v-for="color in ['Red', 'Green', 'Yellow', 'Blue', 'Black', 'Purple', 'Orange', 'Pink']">
                                                <input type="radio" :value="color.toLowerCase()" :name="'playerColor' + newPlayer.index" v-model="newPlayer.color" :id="'radioBox' + color + newPlayer.index">
                                                <label :for="'radioBox' + color + newPlayer.index">
                                                    <div :class="'create-game-colorbox '+getPlayerCubeColorClass(color)"></div>
                                                </label>
                                            </template>
                                        </div>
                                        <div>
                                            <template v-if="beginnerOption">
                                                <label v-if="isBeginnerToggleEnabled()" class="form-switch form-inline create-game-beginner-option-label">
                                                    <input type="checkbox" v-model="newPlayer.beginner">
                                                    <i class="form-icon"></i> <span v-i18n>Beginner?</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#beginner-corporation" class="tooltip" target="_blank">&#9432;</a>
                                                </label>

                                                <label class="form-label">
                                                    <input type="number" class="form-input form-inline player-handicap" value="0" min="-10" :max="10" v-model.number="newPlayer.handicap" />
                                                    <i class="form-icon"></i><span v-i18n>TR Boost</span>&nbsp;<a href="https://github.com/bafolts/terraforming-mars/wiki/Variants#tr-boost" class="tooltip" target="_blank">&#9432;</a>
                                                </label>
                                            </template>

                                            <label class="form-radio form-inline" v-if="!randomFirstPlayer">
                                                <input type="radio" name="firstIndex" :value="newPlayer.index" v-model="firstIndex">
                                                <i class="form-icon"></i> <span v-i18n>Goes First?</span>
                                            </label>
                                        </div>
                                    </div>
                                    </template>
                                </div>
                            </div>
                        </div>

                        <div class="create-game-action">
                            <Button title="Create game" size="big" :onClick="createGame"/>

                            <br><br>

                            <label>
                                <div class="btn btn-sm">
                                  Upload Game Settings JSON
                                </div>
                                <input style="display: none" type="file" id="settings-file" ref="file" v-on:change="handleSettingsUpload()"/>
                            </label>

                            <label>
                                <div v-on:click="downloadCurrentSettings()" class="btn btn-sm">
                                  Download Current Game Settings
                                </div>
                            </label>


                            <label>
                                <div v-on:click="resetGameSettings()" class="btn btn-sm">
                                  Reset Game Settings to Default
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            <div class="create-game--block" v-if="showCorporationList">
              <corporations-filter
                  ref="corporationsFilter"
                  v-on:corporation-list-changed="updateCustomCorporationsList"
                  v-bind:corporateEra="corporateEra"
                  v-bind:prelude="prelude"
                  v-bind:venusNext="venusNext"
                  v-bind:colonies="colonies"
                  v-bind:turmoil="turmoil"
                  v-bind:promoCardsOption="promoCardsOption"
                  v-bind:communityCardsOption="communityCardsOption"
                  v-bind:moonExpansion="moonExpansion"
                  v-bind:rebalancedExtension="rebalancedExtension"
              ></corporations-filter>
            </div>

            <div class="create-game--block" v-if="showColoniesList">
              <colonies-filter
                  ref="coloniesFilter"
                  v-on:colonies-list-changed="updateCustomColoniesList"
                  v-bind:venusNext="venusNext"
                  v-bind:turmoil="turmoil"
                  v-bind:communityCardsOption="communityCardsOption"
                  v-bind:rebalancedExtension="rebalancedExtension"
              ></colonies-filter>
            </div>

            <div class="create-game--block" v-if="showCardsBlackList">
              <cards-filter
                  ref="cardsFilter"
                  v-on:cards-list-changed="updateCardsBlackList"
              ></cards-filter>
            </div>
        </div>
    `,
});

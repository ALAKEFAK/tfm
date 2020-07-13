
import Vue from "vue";
import { CardModel } from "../models/CardModel";
import { getCardContent, getCorporationCardByName, getProjectCardByName } from "./CardUtils";
import { sendPlayerInput } from "./ApiClient";


export const Card = Vue.component("card", {
    props: [
        "card",
        "resources",
        "player",
        "allow_to_play",
        "is_self_replicating_robot_target"
    ],
    data: function() {
        return {
            showHowToPayDialog: false
        }
    },
    methods: {
        onCardPlay(out: any) {
            const wf = this.player.waitingFor;
            if ( ! wf) return;

            var playCardIdx = -1;
            for (var idx = 0; idx <= wf.options.length; idx++) {
                if (wf.options[idx].title === "Play project card") {
                    playCardIdx = idx;
                    break;
                }
            }
            if (playCardIdx < 0) return;
            const playCardData = [[playCardIdx.toString(), ...out[0]]]
            sendPlayerInput(this.$root, this.player.id, playCardData)
        },
        getPlayCardInput: function () {
            if (this.player === undefined) return false;

            if ( ! this.allow_to_play) return false;
            
            const wf = this.player.waitingFor;
            if ( ! wf || wf.title != "Take action for action phase, select one available action.") return false;

            var playCardOption = wf.options.filter((option: any) => option.title === "Play project card");

            if (playCardOption.length < 1) return false;
            playCardOption = playCardOption[0];
            return playCardOption
        },
        isCardAllowedToPlay: function (): boolean {
            const playCardOption = this.getPlayCardInput();

            if ( ! playCardOption) return false;

            const availableCards: Array<CardModel> = playCardOption.cards.map((icard: CardModel) => icard.name);

            return availableCards.includes(this.card.name)
        },
        getCardContent: function() {
            return getCardContent(this.card.name);
        },
        getCard: function () {
            return getProjectCardByName(this.card.name) || getCorporationCardByName(this.card.name);
        },
        getCardCssClass: function (card: CardModel): string {
            var cssClass = "filterDiv card-" + card.name.toLowerCase().replace(/ /g, "-");
            const wasActivated = (this.player !== undefined
                                    && this.player.actionsThisGeneration !== undefined
                                    && this.player.actionsThisGeneration.indexOf(this.card.name) !== -1
                                ) ? true : false;
            if (wasActivated) {
                cssClass += " cards-action-was-used"
            }
            if (this.is_self_replicating_robot_target) {
                cssClass += " card-self-replicating-robot-target"
            }
            return cssClass;
        }
    },
    template: `
    <div :class="getCardCssClass(card)">
        <i class="card-self-replicating-robot-target-icon" v-if="is_self_replicating_robot_target"></i>
        <div class="card-play-cont" v-if="isCardAllowedToPlay()">
            <button class="btn btn-success card-play-button" v-if=" ! showHowToPayDialog" v-on:click="showHowToPayDialog=true">Play!</button>
            <div v-if="showHowToPayDialog" class="card-show-how-to-pay-dialog">
                <button class="btn btn-lg btn-error close-btn" v-on:click="showHowToPayDialog=false"><i class="icon icon-cross"></i></button>
                <select-how-to-pay-for-card 
                    :player="player"
                    :playerinput="getPlayCardInput()"
                    :onsave="onCardPlay"
                    :showsave="true"
                    :showtitle="false"
                    :force_card="card"
                ></select-how-to-pay-for-card>
            </div>

        </div>
        <div class="card_resources_counter" v-if="card.resources">RES:<span class="card_resources_counter--number"> {{ card.resources }}</span></div>
        <div class="card-content-wrapper" v-i18n v-html=this.getCardContent()></div>
    </div>
    `
});

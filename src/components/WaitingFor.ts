
import Vue from "vue";

import { AndOptions } from "./AndOptions";
import { OrOptions } from "./OrOptions";
import { PlayerInputFactory } from "./PlayerInputFactory";
import { SelectAmount } from "./SelectAmount";
import { SelectCard } from "./SelectCard";
import { SelectHowToPay } from "./SelectHowToPay";
import { SelectHowToPayForCard } from "./SelectHowToPayForCard";
import { SelectOption } from "./SelectOption";
import { SelectPlayer } from "./SelectPlayer";
import { SelectSpace } from "./SelectSpace";
import { $t } from "../directives/i18n";
import { SelectPartyPlayer } from "./SelectPartyPlayer";
import { sendPlayerInput } from "./ApiClient";

var ui_update_timeout_id: number | undefined = undefined;

export const WaitingFor = Vue.component("waiting-for", {
    props: ["player", "players", "waitingfor"],
    data: function () {
        return {}
    },
    components: {
        "and-options": AndOptions,
        "or-options": OrOptions,
        "select-amount": SelectAmount,
        "select-card": SelectCard,
        "select-option": SelectOption,
        "select-how-to-pay": SelectHowToPay,
        "select-how-to-pay-for-card": SelectHowToPayForCard,
        "select-player": SelectPlayer,
        "select-space": SelectSpace,
        "select-party-player": SelectPartyPlayer
    },
    methods: {
        waitForUpdate: function () {
            const vueApp = this;
            clearTimeout(ui_update_timeout_id);
            const askForUpdate = () => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "/api/waitingfor" + window.location.search + "&prev-game-age=" + this.player.gameAge.toString());
                xhr.onerror = function () {
                    alert("Error getting waitingfor data");
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const result = xhr.response;
                        if (result["result"] === "GO") {
                            (vueApp as any).$root.updatePlayer();

                            if (Notification.permission !== 'granted') {
                                Notification.requestPermission();
                            }
                            if (Notification.permission === "granted") {
                                new Notification('Terraforming Mars Online', {
                                    icon: "/favicon.ico",
                                    body: "It's your turn!",
                                });
                            }

                            // We don't need to wait anymore - it's our turn
                            return;
                        } else if (result["result"] === "REFRESH") {
                            // Something changed, let's refresh UI
                            (vueApp as any).$root.updatePlayer();
                            return;
                        }
                        (vueApp as any).waitForUpdate();
                    } else {
                        alert("Unexpected server response");
                    }
                }
                xhr.responseType = "json";
                xhr.send();
            }
            ui_update_timeout_id = (setTimeout(askForUpdate, 5000) as any);
        }
    },
    render: function (createElement) {
        if (this.waitingfor === undefined) {
            (this as any).waitForUpdate();
            return createElement("div", $t("Not your turn to take any actions"));
        }
        const input = new PlayerInputFactory().getPlayerInput(
            createElement, 
            this.players, 
            this.player, 
            this.waitingfor, (out: Array<Array<string>>) => {sendPlayerInput(this.$root, this.player.id, out)}, 
            true, 
            true
        );

        return createElement("div", {"class": "wf-root"}, [input])
    }
});


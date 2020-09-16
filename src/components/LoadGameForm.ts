
import Vue from "vue";

export const LoadGameForm = Vue.component("load-game-form", {
    data: function () {
        return {
            gameId: '',
            nbrSavesToDelete: 0
        }
    },
    methods: {
        loadGame: function () {
            const gameId = this.$data.gameId;
            const nbrSavesToDelete = this.$data.nbrSavesToDelete;
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "/load_game");
            xhr.onerror = function () {
                alert("Error loading game");
            }
            xhr.onload = () => {
                if (xhr.status === 200) {
                    if (xhr.response.players.length === 1) {
                        window.location.href = "/player?id=" + xhr.response.players[0].id;
                        return;
                    } else {
                        window.history.replaceState(xhr.response, "Teraforming Mars - Game", "/game?id=" + xhr.response.id);
                        this.$root.$data.game = xhr.response;
                        this.$root.$data.screen = "game-home";
                    }
                } else {
                    alert("Unexpected server response");
                }
            };
            xhr.responseType = "json";
            xhr.send(JSON.stringify({
                game_id: gameId,
                nbrSavesToDelete: nbrSavesToDelete
            }));
        }
    },
    template: `
        <div id="load-game">
            <h1><span v-i18n>Terraforming Mars</span> — <span v-i18n>Load Game</span></h1>

            <div class="load-game-form load-game--block">
                <div class="container load-game-options">
                    <div >
                        <label for="gameId">Game Id to reload:</label><br/>
                        <input class="form-input form-inline load-game-id" :placeholder="'Game Id'" v-model="gameId" /><br/>
                        <label for="nbrSavesToDelete">Number of saves to delete before loading:</label><br/>
                        <input class="form-input form-inline load-game-id" :value="0" v-model="nbrSavesToDelete" /><br/>
                        <button class="btn btn-lg btn-success" v-on:click="loadGame" v-i18n>Load Game</button> 
                    </div>
                </div>
            </div>
        </div>
    `
});


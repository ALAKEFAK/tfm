
export const sendPlayerInput = function (rootVueComponent: any, player_id: string, playerInputData: Array<Array<string>>) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/player/input?id=" + player_id);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status === 200) {
            const root = (rootVueComponent as any);
            root.screen = "empty";
            root.player = xhr.response;
            root.playerkey++;
            root.screen = "player-home";
            if (root.player.phase == "end" && window.location.pathname !== "/the-end") {
                (window as any).location = (window as any).location;
            }

        } else if (xhr.status === 400 && xhr.responseType === 'json') {
            const element: HTMLElement | null = document.getElementById("dialog-default");
            const message: HTMLElement | null = document.getElementById("dialog-default-message");
            if (message !== null && element !== null && (element as HTMLDialogElement).showModal !== undefined) {
                message.innerHTML = xhr.response.message;
                (element as HTMLDialogElement).showModal();
            } else {
                alert(xhr.response.message);
            }
        } else {
            alert("Error sending input");
        }
    }
    xhr.send(JSON.stringify(playerInputData));
}
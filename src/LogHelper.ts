import {CardName} from './CardName';
import {Game} from './Game';
import {Player} from './Player';
import {ICard} from './cards/ICard';
import {ISpace} from './boards/ISpace';
import {TileType} from './TileType';
import {Colony} from './colonies/Colony';
import {LogType} from './deferredActions/DrawCards';
import {SpaceBonus} from './SpaceBonus';
import {IGlobalEvent} from './turmoil/globalEvents/IGlobalEvent';

export class LogHelper {
  static logAddResource(player: Player, card: ICard, qty: number = 1): void {
    let resourceType = 'resource(s)';

    if (card.resourceType) {
      resourceType = card.resourceType.toLowerCase() + '(s)';
    }

    player.game.log('${0} added ${1} ${2} to ${3}', (b) =>
      b.player(player).number(qty).string(resourceType).card(card));
  }

  static logRemoveResource(player: Player, card: ICard, qty: number = 1, effect: string): void {
    let resourceType = 'resource(s)';

    if (card.resourceType) {
      resourceType = card.resourceType.toLowerCase() + '(s)';
    }

    player.game.log('${0} removed ${1} ${2} from ${3} to ${4}', (b) =>
      b.player(player).number(qty).string(resourceType).card(card).string(effect));
  }

  static logTilePlacement(player: Player, space: ISpace, tileType: TileType) {
    this.logBoardTileAction(player, space, TileType.toString(tileType) + ' tile');
  }

  static logBoardTileAction(player: Player, space: ISpace, description: string, action: string = 'placed') {
    // Skip off-grid tiles
    if (space.x === -1 && space.y === -1) return;
    // Skip solo play random tiles
    if (player.name === 'neutral') return;

    const offset: number = Math.abs(space.y - 4);
    const row: number = space.y + 1;
    const position: number = space.x - offset + 1;

    player.game.log('${0} ${1} ${2} on row ${3} position ${4}', (b) =>
      b.player(player).string(action).string(description).number(row).number(position));
  }

  static logColonyTrackIncrease(player: Player, colony: Colony, steps: number = 1) {
    player.game.log('${0} increased ${1} colony track ${2} step(s)', (b) =>
      b.player(player).colony(colony).number(steps));
  }

  static logTRIncrease(player: Player, steps: number) {
    player.game.log('${0} gained ${1} TR', (b) => b.player(player).number(steps));
  }

  static logGlobalEventTRDecrease(player: Player, steps: number = 1) {
    player.game.log('${0}\'s TR decreased ${1} step(s) due to global event', (b) => b.player(player).number(steps));
  }

  static logTemperatureIncrease(player: Player, steps: number) {
    player.game.log('${0} increased temperature ${1} step(s)', (b) => b.player(player).number(steps));
  }

  static logVenusIncrease(player: Player, steps: number) {
    player.game.log('${0} increased Venus scale ${1} step(s)', (b) => b.player(player).number(steps));
  }

  static logTargetedTurmoilDecrease(player: Player, param: string) {
    switch (param) {
    case 'Ocean':
      player.game.log('${0} removed an ocean', (b) => b.player(player));
      break;
    case 'Oxygen':
      player.game.log('${0} decreased oxygen level', (b) => b.player(player));
      break;
    case 'Temperature':
      player.game.log('${0} decreased temperature', (b) => b.player(player));
      break;
    case 'Venus':
      player.game.log('${0} decreased Venus scale', (b) => b.player(player));
      break;
    }
  }

  static logDiscardedCards(game: Game, cards: Array<ICard> | Array<CardName>) {
    game.log('${0} card(s) were discarded', (b) => {
      b.rawString(cards.length.toString());
      for (const card of cards) {
        if (typeof card === 'string') {
          b.cardName(card);
        } else {
          b.card(card);
        }
      }
    });
  }

  static logDrawnCards(player: Player, cards: Array<ICard> | Array<CardName>, privateMessage: boolean = false, logType: LogType = LogType.DREW) {
    // If |this.count| equals 3, for instance, this generates "${0} drew ${1}, ${2} and ${3}"
    let message = '${0} ' + logType + ' ';
    let i = 0;
    if (cards.length === 0) {
      message += 'no cards';
    } else {
      for (let length = cards.length; i < length; i++) {
        if (i > 0) {
          if (i < length - 1) {
            message += ', ';
          } else {
            message += ' and ';
          }
        }
        message += '${' + (i + 1) + '}';
      }
    }

    const options = privateMessage ? {reservedFor: player} : {};

    player.game.log(message, (b) => {
      b.player(player);
      for (const card of cards) {
        if (typeof card === 'string') {
          b.cardName(card);
        } else {
          b.card(card);
        }
      }
    }, options);
  }

  static logDraftedCards(player: Player, draftedCards: Array<ICard> | Array<CardName>, passedCards: Array<ICard> | Array<CardName>, target: string) {
    // If |this.count| equals 3, for instance, this generates "${0} drew ${1}, ${2} and ${3}"
    let message = '${0} drafted';

    let i = 0;
    let offset = 1;

    if (draftedCards.length === 0) {
      message += ' no cards';
    } else {
      for (let length = draftedCards.length; i < length; i++) {
        message += ' ${' + (i + offset) + '}';
      }
    }

    message += ' passing ';

    i = 0;
    offset += draftedCards.length;

    if (passedCards.length === 0) {
      message += 'no cards';
    } else {
      for (let length = passedCards.length; i < length; i++) {
        if (i > 0) {
          if (i < length - 1) {
            message += ', ';
          } else {
            message += ' and ';
          }
        }
        message += '${' + (i + offset) + '}';
      }
    }
    // Add target for passing card to
    if (target !== undefined) {
      message += ' to ${' + (i + offset) + '}';
    }

    player.game.log(message, (b) => {
      // Active player
      b.player(player);
      // Card drafted
      for (const card of draftedCards) {
        if (typeof card === 'string') {
          b.cardName(card);
        } else {
          b.card(card);
        }
      }
      // Card passed
      for (const card of passedCards) {
        if (typeof card === 'string') {
          b.cardName(card);
        } else {
          b.card(card);
        }
      }
      // Target
      b.string(target);
    }, {reservedFor: player});
  }

  static logPlayerOrder(game: Game, players: Player[]) {
    let message = 'Player order: ';
    for (let i = 0; i < players.length; i++) {
      if (i > 0) {
        message += ', ';
      }
      message += players[i].name;
    }
    game.log(message);
  }

  static logMsAs(game: Game) {
    let messageMs = 'Milestones: ';
    for (let i = 0; i < game.milestones.length; i++) {
      if (i > 0) {
        messageMs += ', ';
      }
      messageMs += game.milestones[i].name;
    }
    let messageAs = 'Awards: ';
    for (let i = 0; i < game.awards.length; i++) {
      if (i > 0) {
        messageAs += ', ';
      }
      messageAs += game.awards[i].name;
    }
    game.log(messageMs);
    game.log(messageAs);
  }

  static logColonies(game: Game) {
    let message = 'Colonies: ';
    for (let i = 0; i < game.colonies.length; i++) {
      if (i > 0) {
        message += ', ';
      }
      message += game.colonies[i].name;
    }
    game.log(message);
  }

  static logKnownEvents(game: Game, FutureEventsShown: number) {
    game.log('EventQueue: ');
    game.log('Cu: ' + LogHelper.createEventMessage(game.turmoil?.currentGlobalEvent));
    game.log('Co: ' + LogHelper.createEventMessage(game.turmoil?.comingGlobalEvent));
    game.log('D: ' + LogHelper.createEventMessage(game.turmoil?.distantGlobalEvent));

    for (let j = 1; j <= FutureEventsShown; j++) {
      const event = game.turmoil?.globalEventDealer.globalEventsDeck[game.turmoil?.globalEventDealer.globalEventsDeck.length - j];
      game.log('D+' + j + ': ' + LogHelper.createEventMessage(event));
    }
  }

  static logBoard(game: Game) {
    game.log('Board');
    for (let i = 0; i < game.board.spaces.length; i++) {
      if (game.board.spaces[i].spaceType === 'colony') continue;
      if (game.board.spaces[i].bonus.length > 0) {
        game.log(`Id: ${game.board.spaces[i].id}, Type: ${game.board.spaces[i].spaceType}, Bonus: ${game.board.spaces[i].bonus.map((key) => SpaceBonus[key]).toString()}`);
      } else {
        game.log(`Id: ${game.board.spaces[i].id}, Type: ${game.board.spaces[i].spaceType}`);
      }
    }
  }

  static logFinalScore(game: Game, player: Player) {
    const vpb = player.getVictoryPoints();
    game.log(`Player: ${player.name}, \
                        TR: ${vpb.terraformRating}, \
                        MS: ${vpb.milestones}, \
                        AW: ${vpb.awards}, \
                        Greenery: ${vpb.greenery}, \
                        City: ${vpb.city}, \
                        VP: ${vpb.victoryPoints}, \
                        EV: ${vpb.escapeVelocity}, \
                        Total: ${vpb.total}, \
                        MC: ${player.megaCredits}, \
                        Time: ${player.timer.getElapsedTimeInMinute()}, \
                        Actions: ${player.actionsTakenThisGame}`);
  }

  private static createEventMessage(event: IGlobalEvent | undefined): string {
    if (typeof (event) !== 'undefined' && event !== null) {
      let message = event.name + ', Desc: ' + event.description;
      message += ', ' + event.revealedDelegate;
      message += ' / ' + event.currentDelegate;
      return message;
    } else {
      return 'None';
    }
  }
}

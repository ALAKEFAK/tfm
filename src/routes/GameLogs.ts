import * as http from 'http';

import {IContext} from './IHandler';
import {LogMessage} from '../LogMessage';
import {LogMessageType} from '../LogMessageType';
import {Phase} from '../Phase';

export class GameLogs {
  private getLogsForGeneration(messages: Array<LogMessage>, generation: number): Array<LogMessage> {
    let foundStart = generation === 1;
    const newMessages: Array<LogMessage> = [];
    for (const message of messages) {
      if (message.type === LogMessageType.NEW_GENERATION) {
        const value = Number(message.data[0]?.value);
        if (value === generation) {
          foundStart = true;
        } else if (value === generation + 1) {
          break;
        }
      }
      if (foundStart === true) {
        newMessages.push(message);
      }
    }
    return newMessages;
  }

  public handle(req: http.IncomingMessage, res: http.ServerResponse, ctx: IContext): void {
    const playerId = ctx.url.searchParams.get('id');
    if (playerId === null) {
      ctx.route.badRequest(req, res, 'must provide player id as the id parameter');
      return;
    }

    const generation = ctx.url.searchParams.get('generation');

    ctx.gameLoader.getByPlayerId(playerId, (game) => {
      if (game === undefined) {
        ctx.route.notFound(req, res, 'game not found');
        return;
      }
      let logs: Array<LogMessage> | undefined;

      const messagesForPlayer = ((message: LogMessage) => message.playerId === undefined || message.playerId === playerId);

      // for most recent generation pull last 50 log messages unless the game has ended
      if (generation === null || (Number(generation) === game.generation && game.phase !== Phase.END)) {
        // If it is during research phase and player has not researched yet
        // filter out the last few messages
        if (game.phase === Phase.RESEARCH && game.researchedPlayers.has(playerId) === false) {
          const numPlayersDoneWithResearch = game.researchedPlayers.size ?? 0;
          if (numPlayersDoneWithResearch === 0 || game.generation === 1) {
            logs = game.gameLog.filter(messagesForPlayer).slice(-50);
          } else {
            logs = game.gameLog.filter(messagesForPlayer).slice(-50, -numPlayersDoneWithResearch);
          }
        } else {
          logs = game.gameLog.filter(messagesForPlayer).slice(-50);
        }
      // if generation = 0 and id = spectator and the game is ended, pull all log, no filter
      } else if (playerId === game.spectatorId && game.phase === Phase.END && Number(generation) === 0) {
        logs = game.gameLog;
      // if specified generation, then pull just for that generation
      } else if (playerId === game.spectatorId && game.phase === Phase.END) {
        logs = this.getLogsForGeneration(game.gameLog, Number(generation));
      } else { // pull all logs for generation
        logs = this.getLogsForGeneration(game.gameLog, Number(generation)).filter(messagesForPlayer);
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(logs));
    });
  }
}

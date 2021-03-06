import {Database} from '../../src/database/Database';
import {IDatabase} from '../../src/database/IDatabase';

// don't save to database during tests
Database.getInstance = function() {
  return {
    cleanSaves: () => {},
    deleteGameNbrSaves: () => {},
    getClonableGames: () => {},
    getGame: () => {},
    getGameId: () => {},
    getGameVersion: () => {},
    getGames: () => {},
    initialize: () => Promise.resolve(),
    restoreGame: () => {},
    loadCloneableGame: () => {},
    saveGameResults: () => {},
    saveGame: () => {},
    purgeUnfinishedGames: () => {},
  } as IDatabase;
};


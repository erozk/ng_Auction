enum _logtype {
  Db = 'Db',
  File = 'File',
  Console = 'Console'
}

export const environment = {
  production: true,
  apiEndpoint: 'http://127.0.0.1:5000',
  logType: _logtype.Console 
};

export enum pageList {
  Home = 'Home',
  Watchlist = 'Watchlist',
  LostAuctions = 'LostAuctions',
  WonAuctions = 'WonAuctions'
}


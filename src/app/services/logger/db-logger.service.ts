import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DbLoggerService {

  private _log : LoggerService;
  constructor(log: LoggerService) { 
    this._log = log;
  }
  
  Save(component: string, param: string, log: string): void {
    throw new Error('Method not implemented.');
  }
  Get(component: string, user: string): void {
    throw new Error('Method not implemented.');
  }
}

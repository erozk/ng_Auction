import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements LoggerService {

  constructor() { }

  Save(component: string, param: string, log: string): void {
    throw new Error('Method not implemented.');
  }
  Get(component: string, user: string): void {
    throw new Error('Method not implemented.');
  }
  
}

import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class FileLoggerService implements LoggerService {
  
  public Save(component: string, param: string, log: string): void {
    throw new Error('Method not implemented.');
  }
  public Get(component: string, user: string): void {
    throw new Error('Method not implemented.');
  }


}

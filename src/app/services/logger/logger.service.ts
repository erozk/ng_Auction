import { Injectable } from '@angular/core';
import { forwardRef } from "@angular/core";
import { ConsoleLoggerService } from './console-logger.service';
import { ILoggerService } from './logger';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef( () => ConsoleLoggerService )  // default implementation
})

export abstract class LoggerService extends ILoggerService {


}




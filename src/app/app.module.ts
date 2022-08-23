// main modules
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// material design modules
import { MatdesignsharedModule } from './shared/modules/matdesignshared/matdesignshared.module';

// components
import { ListingComponent } from './listing/listing.component';
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './home/home.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import { AuctionDialogComponent } from './auction-dialog/auction-dialog.component';
import { WonauctionsComponent } from './wonauctions/wonauctions.component';
import { LostauctionsComponent } from './lostauctions/lostauctions.component';
import { WatchlistauctionsComponent } from './watchlistauctions/watchlistauctions.component';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { InfodialogComponent } from './infodialog/infodialog.component';
import { BiddialogComponent } from './biddialog/biddialog.component';
import { CommentdialogComponent } from './commentdialog/commentdialog.component';


// logger service
// import { LoggerService } from './services/logger.service';
// import { ConsoleLoggerService } from './services/console-logger.service';
// import { DbLoggerService } from './services/db-logger.service';
// import { FileLoggerService } from './services/file-logger.service';



// //Implementation provider //

// var providers: Provider[] = [];

// console.group( "Logger Selection" );

// switch (getLogType()) {
// 	case "Console":

// 		console.log( "Logger:", "ConsoleLogger" );
//     providers.push({
// 			provide: LoggerService,
// 			useClass: ConsoleLoggerService
// 		});

// 	break;
// 	case "Db":

// 		console.log( "Logger:", "DbLogger" );
// 		providers.push({
// 			provide: LoggerService,
// 			useClass: DbLoggerService
// 		});

// 	break;
// 	case "File":

// 		console.log( "Logger:", "FileLogger" );
// 		providers.push({
// 			provide: LoggerService,
// 			useClass: FileLoggerService
// 		});

// 	break;
// }

// console.groupEnd();


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HomeComponent,
    AuctionDialogComponent,
    ListingComponent,
    LogindialogComponent,
    WonauctionsComponent,
    LostauctionsComponent,
    WatchlistauctionsComponent,
    InfodialogComponent,
    BiddialogComponent,
    CommentdialogComponent
    // FileLoggerServiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatdesignsharedModule,
    HttpClientModule
  ],
  exports: [],
  providers: [MatTableDataSource, MatSort, MatPaginator],
  bootstrap: [AppComponent]
})
export class AppModule { }


// function getLogType() : string {

// 	return environment.logType;

// }
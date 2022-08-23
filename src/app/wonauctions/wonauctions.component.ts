import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { pageList } from 'src/environments/environment';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { BaseComponent } from '../base/base.component';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import { ApiService } from '../services/api/api.service';
import { BaseService } from '../services/base/base.service';

@Component({
  selector: 'app-wonauctions',
  templateUrl: './wonauctions.component.html',
  styleUrls: ['./wonauctions.component.css']
})
export class WonauctionsComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['title','description', 'currentBidValue', 'imageURL','action'];

  constructor(public override api: ApiService, public override router: Router, public override baseService : BaseService, public override route: ActivatedRoute ,public override dialog : MatDialog) {
    super(router,api,baseService,dialog,route);
  }

  override ngOnInit(): void {
    this.getWonAuctionsOfUser();
  }

  // openDialog() {
  //   this.dialog.open(AuctionDialogComponent, {
  //     width:'30%'
  //   });
  // }

  // openLoginDialog(){
  //   const dialogRef =this.dialog.open(LogindialogComponent, {
  //     width:'20%'
  //   });

  //   dialogRef.afterClosed().subscribe((closeTrigger) => {
  //     console.log(closeTrigger);
  //     this.isLoggedIn = this.api.isLoggedIn();
  //   });
  // }

  override addFavourite(listingid: number){
    this.addToFavourite(listingid,pageList.WonAuctions);
  }

  override removeFavourite(listingid: number){
    this.removeFromFavourite(listingid,pageList.WonAuctions);
  }

}
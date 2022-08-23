import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { BaseComponent } from '../base/base.component';
import { BiddialogComponent } from '../biddialog/biddialog.component';
import { CommentdialogComponent } from '../commentdialog/commentdialog.component';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import { ApiService } from '../services/api/api.service';
import { BaseService } from '../services/base/base.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent extends BaseComponent implements OnInit {

  constructor(public override api: ApiService, public override router: Router, public override baseService : BaseService, public override route : ActivatedRoute, public override dialog : MatDialog) {
    super(router,api,baseService,dialog,route);
  }
  
  displayedColumnsBids: string[] = ['fullName','datetime','value'];
  displayedColumnsComments: string[] = ['fullName','datetime','content'];

  override ngOnInit():void {
    this.selectedListingId = this.route.snapshot.paramMap.get('id')
    this.getAuction(this.selectedListingId);
  }

  openBidDialog(listingId : number) {
    const dialogRef =this.dialog.open(BiddialogComponent, {
      width:'10%',
      data : {listingId}
    });
    dialogRef.afterClosed().subscribe((closeTrigger) => {
      console.log(closeTrigger);
      this.isLoggedIn = this.api.isLoggedIn();
      this.getAuction(this.selectedListingId);
    });
  }

  openCommentDialog(listingId : number) {
    const dialogRef =this.dialog.open(CommentdialogComponent, {
      width:'30%',
      data : {listingId}
    });
    dialogRef.afterClosed().subscribe((closeTrigger) => {
      console.log(closeTrigger);
      this.isLoggedIn = this.api.isLoggedIn();
      this.getAuction(this.selectedListingId);
    });
  }

  closeAuction(listingId : number) {
    this.api.patchAuctionCloseById(false,this.selectedListingId)
    .subscribe(
      {
        next:(res)=>{
          this.isLoggedIn = this.api.isLoggedIn();
          this.getAuction(this.selectedListingId);
        },
        error:(err) => {
          console.log("Fetching auction close error");
        }
      }
    )
  }

}

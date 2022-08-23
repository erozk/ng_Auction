import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { auction_favourite } from '../entities/auction_favourite';
import { ApiService } from '../services/api/api.service';
import { BaseService } from '../services/base/base.service';
import {pageList} from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import { InfodialogComponent } from '../infodialog/infodialog.component';
import { BiddialogComponent } from '../biddialog/biddialog.component';
import { CommentdialogComponent } from '../commentdialog/commentdialog.component';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export class BaseComponent implements OnInit{

  isLoggedIn!: boolean;
  selectedListing: any;
  selectedListingId: any;
  selectedComments: any;
  selectedBids: any;

  constructor(public router: Router, public api: ApiService, public baseService : BaseService, public dialog : MatDialog, public route : ActivatedRoute) {
    this.isLoggedIn = this.api.isLoggedIn();
  }


  ngOnInit(): void {
    this.isLoggedIn = this.api.isLoggedIn();
  }

  openPage(routeName: string) {
    this.router.navigateByUrl('/${routeName}');
  }

  openDialog() {
    const dialogRef =this.dialog.open(AuctionDialogComponent, {
      width:'30%'
    });
    dialogRef.afterClosed().subscribe((closeTrigger) => {
      console.log(closeTrigger);
      this.isLoggedIn = this.api.isLoggedIn();
      this.getAuctions();
    });
  }

  openLoginDialog(){
    const dialogRef =this.dialog.open(LogindialogComponent, {
      width:'20%'
    });

    dialogRef.afterClosed().subscribe((closeTrigger) => {
      console.log(closeTrigger);
      this.isLoggedIn = this.api.isLoggedIn();
      this.selectedListingId = this.route.snapshot.paramMap.get('id')
      if (this.selectedListingId) {
        this.getAuction(this.selectedListingId);
      }
      else
        this.getAuctions();

    });
  }

  signOut() {
    this.api.logout();
    this.isLoggedIn = this.api.isLoggedIn();
    this.router.navigate(['/']);
    this.getAuctions();
  }

  getAuctions(){
    this.api.getAuctions()
    .subscribe(
      {
        next:(res)=>{
          this.onResult(res);
        },
        error:(err) => {
          console.log("Fetching error");
        }
      }
    )
  }

  getWatchlistOfUser(){
    this.api.getWatchlistOfUser()
    .subscribe(
      {
        next:(res)=>{
          this.onResult(res);
        },
        error:(err) => {
          console.log("Fetching error");
        }
      }
    )
  }

  getAuctionsLostByUserId(){
    this.api.getAuctionsLostByUserId()
    .subscribe(
      {
        next:(res)=>{
          this.onResult(res);
        },
        error:(err) => {
          console.log("Fetching error");
        }
      }
    )
  }

  getWonAuctionsOfUser(){
    this.api.getAuctionsWonByUserId()
    .subscribe(
      {
        next:(res)=>{
          this.onResult(res);
        },
        error:(err) => {
          console.log("Fetching error");
        }
      }
    )
  }

  onResult(res: any) {
    this.baseService.dataSource = this.baseService.setSource(res);
    this.baseService.paginator = this.baseService.getPaginator();
    this.baseService.sort=this.baseService.getSort();
  }


  addFavourite(listingid: number){
    this.isLoggedIn = this.api.isLoggedIn();
    if(!this.isLoggedIn) {
      const dialogRef =this.dialog.open(InfodialogComponent, {
        width:'10%',
        data : ['Warning','Please sign-in']
      });
    }
    else {
      this.addToFavourite(listingid,pageList.Home);
    }
  }

  removeFavourite(listingid: number){
    this.isLoggedIn = this.api.isLoggedIn();
    if(!this.isLoggedIn) {
      const dialogRef =this.dialog.open(InfodialogComponent, {
        width:'10%',
        data : ['Warning','Please sign-in']
      });
    }
    else {
      this.removeFromFavourite(listingid,pageList.Home);
    }
  }

  addToFavourite(listingId : number, page : pageList) {
    this.api.addWatchlistItem(listingId,this.api.getUserId()).subscribe( 
      res=> {
        this.loadTable(page);
      })
  }

  removeFromFavourite(listingid : number, page : pageList) {
    this.api.deleteWatchlistItem(listingid,this.api.getUserId()).subscribe( 
      res=> {
        this.loadTable(page);
      })
  }

  loadTable(page:pageList) 
  {
    switch (page){
      case pageList.Home : {
        this.getAuctions();
        break;
      }
      case pageList.Watchlist : {
        this.getWatchlistOfUser();
        break;
      }
      case pageList.WonAuctions : {
        this.getWonAuctionsOfUser();
        break;
      }
      case pageList.LostAuctions : {
        this.getAuctionsLostByUserId();
        break;
      }
    }
  }

  getAuction(id :number){
    this.api.getAuctionById(this.selectedListingId)
    .subscribe(
      {
        next:(res)=>{
          this.selectedListing = res;
          this.api.getBidsByListingId(this.selectedListingId)
          .subscribe(
            {
              next:(resbid)=>{
                this.selectedBids = resbid;
                this.api.getCommentsByListingId(this.selectedListingId)
                .subscribe(
                  {
                    next:(rescomments)=>{
                      this.selectedComments = rescomments;    
                    },
                    error:(err) => {
                      console.log("Comments Fetching error");
                      this.selectedListing = null;
                    }
                  }
                )        
              },
              error:(err) => {
                console.log("Bids Fetching error");
                this.selectedListing = null;
              }
            }
          )
        },
        error:(err) => {
          console.log("Details Fetching error");
          this.selectedListing = null;
        }
      }
    )
  }
}
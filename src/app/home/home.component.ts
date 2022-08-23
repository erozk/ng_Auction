import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { pageList } from 'src/environments/environment';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
import { BaseComponent } from "../base/base.component";
import { InfodialogComponent } from '../infodialog/infodialog.component';
import { LogindialogComponent } from '../logindialog/logindialog.component';
import { ApiService } from '../services/api/api.service';
import { BaseService } from '../services/base/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//export abstract interface implements extends import  in infr instanceof yield
export class HomeComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['title','description', 'currentBidValue', 'imageURL','action'];

  constructor(public override api: ApiService, public override router: Router, public override baseService : BaseService, public override dialog : MatDialog, public override route : ActivatedRoute) {
      super(router,api,baseService,dialog, route);
  }

  override ngOnInit(): void {
    this.getAuctions();
  }
}




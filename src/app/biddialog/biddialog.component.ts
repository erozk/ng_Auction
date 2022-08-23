import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biddialog',
  templateUrl: './biddialog.component.html',
  styleUrls: ['./biddialog.component.css']
})
export class BiddialogComponent implements OnInit {
  listingId: any
  bidForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<BiddialogComponent>, @Inject( MAT_DIALOG_DATA ) public data: any) { }

  ngOnInit(): void {
    this.listingId= this.data.listingId;
    this.bidForm = this.formBuilder.group({
      value: ['', Validators.required]
    })
  }

  newBid() {
    if (this.bidForm.valid) {
       this.api.addBid(this.bidForm.value, this.listingId)
        .subscribe({
          next: () => {
            this.api.patchAuctionById(this.bidForm.value, this.listingId).subscribe({
              next: () => {
                this.bidForm.reset();
                this.dialogRef.close('save bid');
              }, 
              error: () => {
                console.log("bid dialog subscribe patch error")
              }
            });
          }, 
          error: () => {
            console.log("bid dialog subscribe error")
          }
        });
    }
  }

}



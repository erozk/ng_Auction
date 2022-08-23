import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.css']
})
export class LogindialogComponent implements OnInit {

  loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<LogindialogComponent>) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      pass : ['', Validators.required]
    })
  }

  login(){

    if (this.loginForm.valid){
      this.api.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status = "success") {
            this.api.setSession(res.Authorization);
            this.loginForm.reset();
            this.dialogRef.close('save');
          }
          else {
            alert(res.message);
          }

        },
        error:()=>{
          alert("error")
        }
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  regex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
  profileForm: FormGroup;
  minDate = new Date(1999, 0, 4);
  isLoading = false;
  isError = false
  errMsg = ''

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private storeService: StoreService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      ip: ['',[Validators.required, Validators.pattern(this.regex)]],
      date: ['',[Validators.required]]
    });
  }
  back() {
    this.isLoading = false
    this.isError = false
    this.errMsg = ''
    this.profileForm.reset()
  }

  search(){
    this.isLoading = true
    this.dataService.getIP(this.profileForm.value.ip).subscribe(
      (data:any)=>{
        this.isLoading = false
        if (data.error) {
          this.isError = true
          this.errMsg = data.reason
          return
        }
        this.isError = false
        this.storeService.setDetails({...data})
        this.isLoading = true
        this.dataService.getRate(
          new Date(this.profileForm.value.date).toISOString().split('T')[0],
          data.currency
        ).subscribe(
            (data)=>{
              this.isLoading = false
              this.isError = false
              this.storeService.setDetails({...data})
              this.router.navigateByUrl('/data')
            },
            (err)=>{
              console.log(err,'>>>>>>>>>>>')
              this.isLoading = false
              this.isError = true
              this.errMsg = err.error[0].msg
              if (err.error[0].type=="value_error") {
                this.errMsg = 'Base currency is not'
              }
            }
          )
      },
      (err)=>{
        this.isLoading = false
        this.isError = true
        this.errMsg = err.message 
        console.log(err.message)
      }
    )
  }
}

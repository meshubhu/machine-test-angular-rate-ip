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

  getPip() {
    this.dataService.getPresentIp().subscribe(
      (data)=>this.profileForm.controls['ip'].patchValue(data.ip),
      (err)=>console.log(err)
    )
  }

  submit(){
    this.isLoading = true
    // console.log(this.profileForm.value.date);
    this.dataService.getIP(this.profileForm.value.ip).subscribe(
      (data:any)=>{
        // console.log(data,'>>>>>>>>>>>>>>')
        this.storeService.setDetails({...data})
        this.dataService.getRate(
          new Date(this.profileForm.value.date).toISOString().split('T')[0],
          data.currency
        ).subscribe(
            (data)=>{
              this.isLoading = false
              // console.log(data,'>>>>>>>>>>>>>>')
              this.storeService.setDetails({...data})
              this.router.navigateByUrl('/data')
              // console.log(this.storeService.getDetails());
            },
            (err)=>{
              console.log(err)
              this.isLoading = false
              this.router.navigateByUrl('/data')
            }
          )
      },
      (err)=>console.log(err)
    )
  }
}

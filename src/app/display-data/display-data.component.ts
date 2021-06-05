import { Component, OnInit } from '@angular/core';
import { StoreService } from '../service/store.service';
import { Detail } from '../detail'
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.scss']
})
export class DisplayDataComponent implements OnInit {
  details: Detail

  constructor(private storeService: StoreService,private router: Router) { }

  ngOnInit(): void {
    if(this.storeService.getDetails() != undefined) {
      this.details = this.storeService.getDetails()
      console.log(this.details,this.details.rates[this.details.currency],".>>>>>>>>>>>>>>>>");
      return
    }
    console.log(this.details,".>>>>>>>>>>>>>>>>");
    this.router.navigateByUrl('/')
  }

}

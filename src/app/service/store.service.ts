import { Injectable } from '@angular/core';
import {Detail} from '../detail'
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  details: Detail

  constructor() { }

  getDetails() {
    return this.details;
  }

  setDetails(anydetail:any) {
    this.details = {...this.details,...anydetail}
  }

  // setIp(ip:string) {
  //   this.details = {...this.details, ip: ip}
  // }
  // setCc(country:string, currency:string) {
  //   this.details = {...this.details, currency:currency,country:country}
  // }
  // setDate(date:string) {
  //   this.details = {...this.details, date:date}
  // }
  // setrate(rate:string) {
  //   this.details = {...this.details, rate:rate}
  // }
}

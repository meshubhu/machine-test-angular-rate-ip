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
}

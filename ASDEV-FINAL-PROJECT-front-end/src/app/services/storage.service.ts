import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage=window.localStorage;
  constructor() { }

  public setItem(key: any, value: any) {
    this.storage.setItem(key, value)
    return true
  }

  public getItem(key: any) {
    let value = this.storage.getItem(key)
    try {
      return value;
    } catch (e) {
      return null
    }
  }

  public clear() {
    this.storage.clear();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

  constructor(public http: HttpClient) {
  }

  public send(col, row, user) {
    return new Promise(resolve => {
      this.http.post('http://localhost:8081/', {col, row, user}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public user() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8081/').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public reset() {
    return new Promise(resolve => {
      this.http.delete('http://localhost:8081/').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}

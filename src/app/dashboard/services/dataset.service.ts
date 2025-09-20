import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatasetService {
  private API = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.API + 'upload/', formData);
  }

  getHead(): Observable<any> {
    return this.http.get(this.API + 'head/');
  }

  getMissing(): Observable<any> {
    return this.http.get(this.API + 'missing/');
  }

  getDuplicates() {
    return this.http.get<any>(this.API + 'duplicates/');
  }

  getDtypes() {
    return this.http.get<any>(this.API + 'dtypes/');
  }

  getUniqueCounts() {
    return this.http.get<any>(this.API + 'unique_counts/');
  }

}

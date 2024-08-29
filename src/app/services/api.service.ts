import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import allData from '../../data';
import { YouTubeVideo, YouTubeVideoListResponse } from '../interfaces/interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _storeVideos$ = new BehaviorSubject<YouTubeVideo[]>([]);

  public filteredItems$ = this._storeVideos$.pipe(
    map((array) => array)
  );

  constructor(private http: HttpClient) { }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  getItem(value: string): any {
    const data = localStorage.getItem(value);
    return data ? JSON.parse(data) : null;
  }

  getItems(): Observable<YouTubeVideoListResponse> {
    return of(allData).pipe(map(data => data), tap(data => {
      this._storeVideos$.next(JSON.parse(JSON.stringify(data.items)));
    }))
  }

  getStoreVideos(): Observable<YouTubeVideo[]> {
    return this.filteredItems$
  }

  search(word: string = ''): Observable<any> {

    return this.filteredItems$.pipe(
      map((items) => items),
      tap((data) => {
        console.count();
        console.log(data.filter(d => d.snippet.title.toLowerCase().includes(word.toLowerCase())), 'filter')
        this._storeVideos$.next(data.filter(d => d.snippet.title.toLowerCase().includes(word.toLowerCase())))
      }))
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsComponent } from '../../components/cards/cards.component';
import { ApiService } from '../../services/api.service';
import { SearchComponent } from '../../components/search/search.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, CardsComponent, SearchComponent]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) {
  }

  videos$:Observable<any> = this.apiService.filteredItems$;

  ngOnInit(): void {
    const data = this.apiService.getItem('user')
    if (!data) {
      this.router.navigate(['login'])
      return;
    } else if (!data?.username && !data?.username) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getItems().subscribe();
  }

  getUsername(): string {
    if (this.apiService.getItem('user')) {
      return this.apiService.getItem('user').username;
    } else {
      return '';
    }
  }

}

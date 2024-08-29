import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private service: ApiService, private fb: FormBuilder) { }

  searchForm: FormGroup = this.fb.group({
    search: ['']
  })

  ngOnInit(): void {
    // old solution
    // this.searchForm.get('search')?.valueChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap(value => {
    //     return this.service.search(value)
    //   })
    // ).subscribe();

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.service.search(value)),
    ).subscribe();
  }


}

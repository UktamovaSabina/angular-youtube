import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs';
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
    // Listen to value changes on the search input field
    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(2000),
      switchMap(value => {
        return this.service.search(value)  // Perform search whenever input changes
      })
    ).subscribe();
  }


}

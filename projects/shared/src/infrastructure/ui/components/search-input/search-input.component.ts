import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'lib-search-input',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent implements OnInit {
  cityForm!: FormGroup;
  errorMessage: string = '';
  @Output() formSubmit = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cityForm = this.fb.group({
      city: ['', Validators.required],
    });

    this.cityForm.valueChanges.subscribe((value) => {
      this.errorMessage = '';
    });
  }

  onSubmit() {
    if (this.cityForm.valid) {
      this.errorMessage = '';
      const FormData = this.cityForm.value.city.trim();
      this.formSubmit.emit(FormData);
    } else {
      this.errorMessage = 'Please enter a valid city name';
    }
  }
}

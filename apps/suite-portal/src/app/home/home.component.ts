import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from '../service/maintainenceRequest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;

  constructor(
    private fb: FormBuilder,
    private maintaineceRequestService: MaintenanceRequestService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  maintainenceForm = this.fb.group({
    unitNumber: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]],
    summary: ['', [Validators.required]],
    details: [''],
    serviceType: ['', [Validators.required]],
  });

  submitRequest() {
    console.log(this.maintainenceForm.value);
    this.maintaineceRequestService
      .submitMaintainenceRequest(this.maintainenceForm.value)
      .subscribe(
        (_data) => {
          this.snackbar.open('Request submitted successfully', 'okay', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.resetForm();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  resetForm() {
    this.maintainenceForm.reset();
  }
}

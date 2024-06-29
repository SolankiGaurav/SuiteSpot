import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
      verticalPosition:'top',
      horizontalPosition:'right'
    });

    return throwError(() => new Error(error.error));
  }
}

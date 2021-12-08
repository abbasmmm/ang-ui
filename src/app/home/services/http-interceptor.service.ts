import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { catchError, retry, tap, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from 'src/app/layout.service';

export declare type InterceptorInputs = 'suppressErrors' | 'throwErrors' | 'showBusy';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.layoutService.activeRequestCount++;
    var timeZone = (new Date().toString().match(/([\+-][0-9]+.*)/) as any)[1];

    const url = request.url.split('||');

    let suppressErrors = false;
    let throwErrors = false;

    if (url.length > 1) {
      suppressErrors = url[1].indexOf('suppressErrors') !== -1;
      throwErrors = url[1].indexOf('throwErrors') !== -1;
    }

    request = request.clone({
      setHeaders: {
        timeZoneOffset: timeZone,
      },
      url: url[0],
    });

    return next.handle(request).pipe(
      // tap(event => {

      // }),
      catchError((err: HttpErrorResponse) => {

        if (throwErrors)
          return throwError(err)

        if (!suppressErrors) {
          const message = err.error.exceptionMessage ? err.error.exceptionMessage : err.message;
          this._snackBar.open(message, 'Ok', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'error-snackbar'
          })
        }

        console.error(err);
        return EMPTY;
      }),
      finalize(() => {
        this.layoutService.activeRequestCount--;
      })
    );
  }

  constructor(private layoutService: LayoutService, private _snackBar: MatSnackBar) { }
}

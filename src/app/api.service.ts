import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterceptorInputs } from 'src/app/home/services/http-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  url(url, interceptorInputs: InterceptorInputs[]) {
    // if (interceptorInputs.length > 0)
    //   return environment.apiBaseUrl + url + '||' + interceptorInputs.toString();
    // else
    //   return environment.apiBaseUrl + url;
    return url;
  }

  get(path, interceptorInputs: InterceptorInputs[] = []): Observable<any> {
    return this.httpClient.get(this.url(path, interceptorInputs), { withCredentials: true });
  }

  post(path, data, interceptorInputs: InterceptorInputs[] = []): Observable<any> {
    return this.httpClient.post(this.url(path, interceptorInputs), data, { withCredentials: true });
  }
}

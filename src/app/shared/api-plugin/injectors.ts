import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';

@Injectable()
export class Injectors {
  static store: Store | undefined = undefined;
  static httpClient: HttpClient | undefined = undefined;

  connect(store: Store, httpClient: HttpClient) {
    Injectors.store = store;
    Injectors.httpClient = httpClient;
  }
}

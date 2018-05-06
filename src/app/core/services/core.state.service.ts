import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';

import { SetTitle, DisplayError, CoreState } from '../state';

@Injectable()
export class CoreStateService {
    constructor(private store: Store) { }

    public setTitle(title: string): void {
        this.store.dispatch(new SetTitle(title));
    }

    public notificationError(message: string): void {
        this.store.dispatch(new DisplayError(message));
    }

    public getTitle(): Observable<string> {
        return this.store.select(CoreState.title);
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TpgAnalyticsConfig } from '@tpgroup/tpg-analytics';

import { FrontendinitPartialState, FrontendinitState } from './frontendinit.reducer';
import { LoadAnalyticsConfig, LoadFrontendinit } from './frontendinit.actions';
import { frontendinitQuery } from './frontendinit.selectors';

@Injectable()
export class FrontendinitFacade {
  public loaded$: Observable<boolean> = this.store.pipe(
    select(frontendinitQuery.getLoaded)
  );
  public frontendInit$: Observable<FrontendinitState> = this.store.pipe(
    select(frontendinitQuery.getFrontendInit)
  );

  constructor(private store: Store<FrontendinitPartialState>) {
  }

  public loadAll(): void {
    this.store.dispatch(new LoadFrontendinit());
  }

  public loadAnalyticsConfig(): void {
    this.store.dispatch(new LoadAnalyticsConfig())
  }

  public getAnalyticsConfig(): Observable<TpgAnalyticsConfig | null> {
    return this.store.pipe(
      select(frontendinitQuery.getAnalyticsConfig)
    );
  }
}

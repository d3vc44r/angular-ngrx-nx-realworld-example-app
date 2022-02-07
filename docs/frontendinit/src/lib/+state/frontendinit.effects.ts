import {Injectable} from '@angular/core';
import {Effect} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/nx';
import {
  FrontendinitActionTypes,
  FrontendinitLoaded,
  FrontendinitLoadError,
  LoadAnalyticsConfig,
  LoadFrontendinit,
  SetAnalyticsConfig
} from './frontendinit.actions';
import {BackendService, RestConstants} from '@tpg/pizza-store-client';
import 'rxjs-compat/add/operator/map';
import {FrontendinitDto, TpgRefduckLoggingFacadeService} from '@tpg/tpg-ng-common-lib';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {TpgAnalyticsConfig} from '@tpgroup/tpg-analytics';

import {FrontendinitPartialState} from './frontendinit.reducer';

export const MOCK_ANALYTICS_CONFIG: TpgAnalyticsConfig = {
  analyticUrl: 'https://webanalytics.dev.transporeon.nil/',
  siteId: 4,
  enableTracking: true
};
export const MOCK_REQUEST_DELAY = 100;

@Injectable()
export class FrontendinitEffects {
  @Effect() public loadFrontendinit$ = this.dataPersistence.fetch(
    FrontendinitActionTypes.LoadFrontendinit,
    {
      run: (action: LoadFrontendinit, state: FrontendinitPartialState) => {
        return this.backendService.simpleGet(RestConstants.ApplicationInit).map((result: FrontendinitDto) => {
          return new FrontendinitLoaded(result);
        });
      },

      onError: (action: LoadFrontendinit, error) => {
        this.logger.error(error);
        return new FrontendinitLoadError(error);
      }
    }
  );

  @Effect() public loadAnalyticsConfig$ = this.dataPersistence.fetch(
    FrontendinitActionTypes.LoadAnalyticsConfig,
    {
      run: (action: LoadAnalyticsConfig, state: FrontendinitPartialState) => {
        return of(MOCK_ANALYTICS_CONFIG)
          .pipe(delay(MOCK_REQUEST_DELAY))
          .map((config: TpgAnalyticsConfig) => new SetAnalyticsConfig(config))
      },

      onError: (action: LoadAnalyticsConfig, error) => {
        this.logger.error(error);
        return new FrontendinitLoadError(error);
      }
    }
  );

  constructor(
    private dataPersistence: DataPersistence<FrontendinitPartialState>,
    private backendService: BackendService,
    private logger: TpgRefduckLoggingFacadeService
  ) {
  }
}

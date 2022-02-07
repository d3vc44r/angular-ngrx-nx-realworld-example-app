import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TpgAnalyticsConfig } from '@tpgroup/tpg-analytics';

import { FrontendinitState, STATE_FEATURE_KEY } from './frontendinit.reducer';

// Lookup the 'State' feature state managed by NgRx
const getFrontendinitState = createFeatureSelector<FrontendinitState>(STATE_FEATURE_KEY);

const getLoaded = createSelector(
  getFrontendinitState,
  (state: FrontendinitState) => state.loaded
);

const getFrontendInit = createSelector(
  getFrontendinitState,
  (state: FrontendinitState) => state
);

const getAnalyticsConfig = createSelector(
  getFrontendinitState,
  (state: FrontendinitState): TpgAnalyticsConfig | null => state.analyticsConfig
);

export const frontendinitQuery = {
  getLoaded,
  getFrontendInit,
  getAnalyticsConfig
};

import { FrontendinitAction, FrontendinitActionTypes } from "./frontendinit.actions";
import { FrontendinitDto, Slf4jLevelMapping } from "@tpg/tpg-ng-common-lib";
import { TpgAnalyticsConfig } from '@tpgroup/tpg-analytics';

export const STATE_FEATURE_KEY = 'frontendinitState';

/**
 * Interface for the 'State' data used in
 *  - StateState, and
 *  - stateReducer
 *
 *  Note: replace if already defined in another module
 */
export interface FrontendinitState {
  frontendInitDto: FrontendinitDto; // list of State; analogous to a sql normalized table
  loaded: boolean; // has the State list been loaded
  analyticsConfig: TpgAnalyticsConfig | null;
}

export interface FrontendinitPartialState {
  readonly [STATE_FEATURE_KEY]: FrontendinitState;
}

export const initialState: FrontendinitState = {
  frontendInitDto: {
    currencyCode: 'EUR',
    dateFormat: 'STANDARD',
    maxNumberOfReportedErrors: 50,
    logConfiguration: {
      globalLogLevel: "INFO" as Slf4jLevelMapping,
      remoteLogging: false,
      logLevels: {}
    }
  },
  loaded: false,
  analyticsConfig: null
};

export function frontendinitReducer(
  state: FrontendinitState = initialState,
  action: FrontendinitAction
): FrontendinitState {
  switch (action.type) {
    case FrontendinitActionTypes.FrontendinitLoaded: {
      state = {
        ...state,
        frontendInitDto: action.payload,
        loaded: true
      };
      break;
    }
    case FrontendinitActionTypes.SetAnalyticsConfig: {
      state = {
        ...state,
        analyticsConfig: action.payload
      }
    }
  }
  return state;
}

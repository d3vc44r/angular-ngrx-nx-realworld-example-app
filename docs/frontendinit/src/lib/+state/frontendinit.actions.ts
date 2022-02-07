import { Action } from '@ngrx/store';
import { FrontendinitDto } from "@tpg/tpg-ng-common-lib";
import { TpgAnalyticsConfig } from '@tpgroup/tpg-analytics';

export enum FrontendinitActionTypes {
  LoadFrontendinit = '[Frontendinit] Load Frontendinit',
  FrontendinitLoaded = '[Frontendinit] Frontendinit Loaded',
  FrontendinitLoadError = '[Frontendinit] Frontendinit Load Error',
  LoadAnalyticsConfig = '[Frontendinit] Frontendinit Load analytics config',
  GetAnalyticsConfig = '[Frontendinit] Frontendinit Get analytics config',
  SetAnalyticsConfig = '[Frontendinit] Frontendinit Set analytics config',
}

export class LoadFrontendinit implements Action {
  readonly type = FrontendinitActionTypes.LoadFrontendinit;
}

export class LoadAnalyticsConfig implements Action {
  readonly type = FrontendinitActionTypes.LoadAnalyticsConfig;
}

export class GetAnalyticsConfig implements Action {
  readonly type = FrontendinitActionTypes.GetAnalyticsConfig;
}

export class SetAnalyticsConfig implements Action {
  readonly type = FrontendinitActionTypes.SetAnalyticsConfig;
  constructor(public payload: TpgAnalyticsConfig) {}
}

export class FrontendinitLoadError implements Action {
  readonly type = FrontendinitActionTypes.FrontendinitLoadError;
  constructor(public payload: any) {}
}

export class FrontendinitLoaded implements Action {
  readonly type = FrontendinitActionTypes.FrontendinitLoaded;
  constructor(public payload: FrontendinitDto) {}
}

export type FrontendinitAction = LoadFrontendinit
  | LoadAnalyticsConfig
  | FrontendinitLoaded
  | FrontendinitLoadError
  | GetAnalyticsConfig
  | SetAnalyticsConfig;

export const fromFrontendinitActions = {
  LoadFrontendinit,
  FrontendinitLoaded,
  FrontendinitLoadError,
  LoadAnalyticsConfig,
  GetAnalyticsConfig,
  SetAnalyticsConfig
};

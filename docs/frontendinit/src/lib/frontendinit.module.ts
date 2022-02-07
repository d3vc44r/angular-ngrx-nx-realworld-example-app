import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {frontendinitReducer, initialState, STATE_FEATURE_KEY} from './+state/frontendinit.reducer';
import {FrontendinitEffects} from './+state/frontendinit.effects';
import {FrontendinitFacade} from './+state/frontendinit.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STATE_FEATURE_KEY, frontendinitReducer, {
      initialState: initialState
    }),
    EffectsModule.forFeature([FrontendinitEffects]),
  ],
  providers: [FrontendinitFacade]
})
export class FrontendinitModule {}

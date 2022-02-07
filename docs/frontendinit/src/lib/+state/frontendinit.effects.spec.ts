import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {inject, TestBed} from "@angular/core/testing";
import {BackendService, RestConstants} from "@tpg/pizza-store-client";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {FrontendinitModule, FrontendinitPartialState, frontendinitQuery, FrontendinitState} from "@tpg/frontendinit";
import {HttpClientModule} from "@angular/common/http";
import {ScannedActionsSubject, select, Store, StoreModule} from "@ngrx/store";
import {Observable} from "rxjs";
import {LoadFrontendinit} from "./frontendinit.actions";
import {EffectsModule} from "@ngrx/effects";
import {CommonModule} from "@angular/common";
import {DataPersistence} from "@nrwl/nx";
import {TpgLoggingModule, TpgLoggingService} from "@tpgroup/tpg-logging";
import {NgxLoggerLevel} from "ngx-logger";
import {Slf4jLevelMapping} from "@tpg/tpg-ng-common-lib";

describe('FrontendInit', () => {
  let httpMock: HttpTestingController;
  let backend: BackendService;
  let dataPersistence: DataPersistence<FrontendinitPartialState>;
  let store: Store<FrontendinitPartialState>;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        HttpClientModule,
        StoreModule.forRoot({},
          {
            runtimeChecks: {
              strictStateImmutability: false,
              strictActionImmutability: false
            }
          },
        ),
        FrontendinitModule,
        EffectsModule.forRoot([]),
        TpgLoggingModule.forRoot(
          {
            isServerLogging: false,
            isServerErrorLogging: false,
            stackTraceSize: 6,
            isErrorHandlerEnabled: false,
            serverLoggingUrl: " environment.serverLoggingUrl",
            serverErrorLoggingUrl: "environment.serverErrorLoggingUrl",
            level: NgxLoggerLevel.INFO,
            serverLogLevel: NgxLoggerLevel.DEBUG,
            loggingErrorLimit: 60
          }
        )
      ],
      providers: [
        BackendService,
        DataPersistence,
        ScannedActionsSubject,
        TpgLoggingService
      ]
    });
  });

  beforeEach(
    inject([BackendService, HttpTestingController, DataPersistence, Store], (_backend: any,
                                                                             _httpMock: any,
                                                                             _dataPersistence: any,
                                                                             _store: Store<FrontendinitPartialState>) => {
      backend = _backend;
      httpMock = _httpMock;
      dataPersistence = _dataPersistence;
      store = _store;
    }));

  it('getFrontendInit: effect shall call the backend service', () => {
    let frontendInit$: Observable<FrontendinitState> = store.pipe(
      select(frontendinitQuery.getFrontendInit)
    );
    frontendInit$.subscribe((res) => {
        if (res.frontendInitDto.maxNumberOfReportedErrors === 50) {
          expect(res.loaded).toEqual(false);
          return;
        }
        expect(res.loaded).toEqual(true);
      }
    );
    store.dispatch(new LoadFrontendinit());
    const req = httpMock.expectOne(RestConstants.Prefix + RestConstants.ApplicationInit);
    req.flush({
      frontendInitDto: {
        currencyCode: 'EUR',
        dateFormat: 'STANDARD',
        maxNumberOfReportedErrors: 40,
        logConfiguration: {
          globalLogLevel: "INFO" as Slf4jLevelMapping,
          remoteLogging: false,
          logLevels: {}
        }
      },
      loaded: true,
      analyticsConfig: null
    });
    httpMock.verify();
  });
});



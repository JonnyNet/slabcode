import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CONFIG_MOCK } from 'src/app/shared/mocks/config.mock';
import { ConfigService } from './config.service';

import { OpenWeatherService } from './open-weather.service';

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => of({}),
          }
        },
        {
          provide: ConfigService,
          useValue: {
            allConfig: CONFIG_MOCK
          },
        },
      ]
    });
    service = TestBed.inject(OpenWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    service.forecast('12435').subscribe(res => {
      expect(res).toBeTruthy();
    });
  });
});

import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CONFIG_MOCK } from 'src/app/shared/mocks/config.mock';

import { ConfigService } from './config.service';

export function loadConfig(service: ConfigService): any {
  return async () => {
      await service.loadConfig();
  };
}

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: loadConfig,
          multi: true,
          deps: [ConfigService]
        },
        {
          provide: HttpClient,
          useValue: {
            get: () => of(CONFIG_MOCK),
          }
        }
      ]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.allConfig).toBeTruthy();
  });
});

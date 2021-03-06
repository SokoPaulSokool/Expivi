import { TestBed } from '@angular/core/testing';
import { MockRequestService } from 'src/app/helper/mock-helpers';
import { RequestService } from '../general/request/request.service';

import { ModelsService } from './models.service';

describe('ModelsService', () => {
  let service: ModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RequestService, useClass: MockRequestService }],
    });
    service = TestBed.inject(ModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

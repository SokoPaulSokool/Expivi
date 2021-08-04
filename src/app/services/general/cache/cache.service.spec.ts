import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get cache', () => {
    service.set("/data",{data:"data"},new Date())
   const res =  service.get("/data")
    expect(res).toEqual({data:"data"});
  });

  it('should delete cache', () => {
    service.set("/data",{data:"data"},new Date())
    service.delete("/data")
   const res =  service.get("/data")
    expect(res).toEqual(null);
  });

});

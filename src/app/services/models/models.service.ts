import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelsDetails } from '../../interfaces/models-details';
import { RequestService } from '../general/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  constructor(private request: RequestService) {}

  // Fetch model details fromm the backend
  getModels(): Observable<ModelsDetails[]> {
    return this.request.get(`api/items`, {});
  }
}

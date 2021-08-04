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

  // Fetch model details from the backend
  getModels(): Observable<ModelsDetails[]> {
    return this.request.get(`api/items`, {});
  }

  // Add model details to the backend
  createModel(details: ModelsDetails): Observable<String> {
    return this.request.post(`api/items`, details);
  }
  // Fetch model details from the backend
  deleteModel(slug: string): Observable<String> {
    return this.request.delete(`api/items`, slug);
  }
}

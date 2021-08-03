import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateService } from '../general/state/state.service';
import { ModelsState } from '../../interfaces/models-state';
import { ModelsService } from './models.service';
import { ModelsDetails } from '../../interfaces/models-details';

const initialState: ModelsState = {
  models: [],
  avators: [],
};
@Injectable({
  providedIn: 'root',
})
export class ModelsStateService extends StateService<ModelsState> {
  constructor(private modelsService: ModelsService) {
    super(initialState);
  }

  models$: Observable<ModelsDetails[]> = this.select((state) => state.models);

  avators$: Observable<String[]> = this.select((state) => state.avators);

  setModelsState(models: ModelsDetails[]) {
    this.setState({
      models: [...models],
    });
  }

  setAvatorsState(avators: String[]) {
    this.setState({
      avators: [...avators],
    });
  }

  getModels() {
    // Subscribe to getModels and update state
    this.modelsService.getModels().subscribe((results: any[]) => {
      this.setModelsState(results);
    });
  }

  setAvators(avators: String[]) {
    // Update state of avators
    this.setAvatorsState(avators);
  }
}

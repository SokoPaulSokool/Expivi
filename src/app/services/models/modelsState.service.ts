import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateService } from '../general/state/state.service';
import { ModelsState } from '../../interfaces/models-state';
import { ModelsService } from './models.service';
import { ModelsDetails } from '../../interfaces/models-details';
import { ToastrService } from 'ngx-toastr';

const initialState: ModelsState = {
  models: [],
  avators: [],
};
@Injectable({
  providedIn: 'root',
})
export class ModelsStateService extends StateService<ModelsState> {
  constructor(
    public modelsService: ModelsService,
    public toastr: ToastrService
  ) {
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

  deleteModel(modelsDetails: ModelsDetails) {
    // Subscribe to deleteModel and update state
    this.modelsService
      .deleteModel(modelsDetails.slug)
      .subscribe((results: any) => {
        if (results === 'success') {
          // Fetch models after deleting
          this.getModels();
          this.toastr.success(
            `'${modelsDetails.name}' was successfully deleted"`
          );
        } else {
          this.toastr.error(`Failed to delete '${modelsDetails.name}'"`);
        }
      });
  }
}

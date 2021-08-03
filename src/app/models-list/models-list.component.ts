import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ModelsDetails } from '../interfaces/models-details';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthStateService } from '../services/auth/authState.service';
import { ModelsStateService } from '../services/models/modelsState.service';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
})
export class ModelsListComponent implements OnInit {
  modelDetailsList: ModelsDetails[] = [];
  keysOptions = [
    'None',
    'name',
    'category',
    'license',
    'vertices',
    'downloads',
    'description',
  ];
  sortOrderOptions = ['None', 'asc', 'desc'];

  searchByKey = this.keysOptions[0];
  sortByKey = this.keysOptions[0];
  sortOrder = this.sortOrderOptions[0];
  searchValue = '';
  searchInputType = 'text';

  filteredItems$ = new BehaviorSubject<ModelsDetails[]>([]);

  isShowFilters = true;
  constructor(
    public dialog: MatDialog,
    public authStateService: AuthStateService,
    public modelStateService: ModelsStateService
  ) {}

  ngOnInit(): void {
    // Gets the model details if the user is logged in
    this.authStateService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.modelStateService.getModels();
        this.modelStateService.models$.subscribe((results: ModelsDetails[]) => {
          this.modelDetailsList = [...results];
          this.filteredItems$.next([...results]);
          this.updateAvators(results);
        });
      }
    });
  }

  // Opens the login dialog
  openDialog() {
    this.dialog.open(LoginDialogComponent, {
      data: {
        selectedTab: 3,
        currentFarmer: 'element',
      },
      disableClose: true,
      panelClass: 'myapp-no-padding-dialog',
      minHeight: '20vh',
      minWidth: '50vw',
    });
  }
  // Triggered when the sort by key changes
  handleSortByChange($event: any) {
    const { value } = $event;
    this.sortByKey = value;
    this.sortOrder = this.sortOrderOptions[1];
    this.sortValues(this.sortByKey, this.sortOrder);
  }

  // Triggered when the search by key changes
  handleSearchByKeyChange($event: any) {
    const { value } = $event;
    this.searchByKey = value;
    if (this.searchByKey === 'vertices' || this.searchByKey === 'downloads') {
      // If the key is 'vertices' or 'downloads' the input type is changed to number
      // This is because these keys are numbers
      // Then resets the search value if the value is not a number
      this.searchInputType = 'number';
      try {
        const ds = parseInt(this.searchValue);
        if (isNaN(ds)) {
          this.searchValue = '';
        } else {
          this.searchValue = ds + '';
        }
      } catch (error) {
        this.searchValue = '';
      }
    } else {
      // Other keys use the 'text' input value
      this.searchInputType = 'text';
    }
    this.searchModelsDetails();
  }

  // Triggered when the search value changes
  // Changes the filterByKey to 'name' if one searches while the search
  handleSearchValueChange($event: any) {
    const {
      srcElement: { value },
    } = $event;
    if (this.searchByKey === 'None') {
      this.searchByKey = this.keysOptions[1].toLowerCase();
    } else if (value) {
      this.searchValue = value.toLowerCase();
    } else {
      this.searchValue = '';
    }
    this.searchModelsDetails();
  }

  // Does fuzzy search on the text using the search text
  // Checks if the searchText charactors exist in the same order in the text provided
  fuzzySearch(text: String, searchText: String) {
    var textLWC = text.toLowerCase(),
      i = 0,
      n = -1,
      l;
    const searchTextLWC = searchText.toLowerCase();
    for (; (l = searchTextLWC[i++]); )
      if (!~(n = textLWC.indexOf(l, n + 1))) return false;
    return true;
  }

  searchModelsDetails() {
    let results: ModelsDetails[] = [...this.modelDetailsList.slice()];
    if (!this.searchValue) {
      // Do nothing if there is no search value
    } else if (
      this.searchByKey === 'vertices' ||
      this.searchByKey === 'downloads'
    ) {
      // This compares the number values of
      const filtered = results.filter((modelDetails: any) => {
        let filterValue: number = modelDetails[this.searchByKey];
        if (filterValue == parseInt(this.searchValue)) {
          return true;
        } else {
          return false;
        }
      });
      results = [...filtered];
    } else {
      // This compares the string values and applies fuzzy search
      const filtered = results.filter((modelDetails: any) => {
        let filterValue = '';
        if (modelDetails[this.searchByKey]) {
          filterValue = modelDetails[this.searchByKey].toLowerCase();
        } else {
          filterValue = modelDetails[this.searchByKey];
        }
        if (this.fuzzySearch(filterValue, this.searchValue)) {
          return true;
        } else {
          return false;
        }
      });
      results = [...filtered];
    }

    this.filteredItems$.next([...results]);
    this.updateAvators(results);
    this.sortValues(this.sortByKey, this.sortOrder);
  }

  // Triggered when sort order value is selected
  // Sets sort order value and sorts the data
  handleSortOrderChange($event: any) {
    const { value } = $event;
    this.sortOrder = value;
    this.sortValues(this.sortByKey, this.sortOrder);
  }

  // Sorts modal details by any key using the order provided
  sortValues(sortByKey: string, sortOrder: string) {
    if (sortOrder !== 'None') {
      let results = this.filteredItems$.value.sort((a: any, b: any) => {
        let valueA = '';
        let valueB = '';
        if (sortByKey) {
          valueA = a[sortByKey];
          valueB = b[sortByKey];
          if (valueA < valueB) {
            return -1;
          } else {
            return 1;
          }
        }
        return 0;
      });
      if (sortOrder === 'desc') {
        results = results.slice().reverse();
      }
      this.filteredItems$.next([...results]);
    }
  }

  // Updates the list of avators in state
  // The list of avators in state determines the images to draw in the canvas
  updateAvators(modelsDetails: ModelsDetails[]) {
    const avators = modelsDetails.map((res) => res.avatar);
    this.modelStateService.setAvators(avators);
  }

  toggleShowFilters() {
    this.isShowFilters = !this.isShowFilters;
  }
}

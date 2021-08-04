import { Observable, of } from 'rxjs';
import { ModelsDetails } from '../interfaces/models-details';

export class MockRequestService {
  get = () => {};
  post = () => {};
  put = () => {};
  patch = () => {};
  delete = () => {};
}
export class MockAuthStateService {
  isLoggedIn$ = of(true);
  setIsLoggedIn = (val: boolean) => {
    this.isLoggedIn$ = of(val);
  };
  login = () => {};

  logOut = () => {
    this.isLoggedIn$ = of(false);
  };
}
export class MockModelsStateService {
  models$: Observable<ModelsDetails[]> = of([]);
  avators$: Observable<String[]> = of([
    'images/1.svg',
    'images/2.svg',
    'images/3.svg',
  ]);

  setModelsState = (models: ModelsDetails[]) => {
    this.models$ = of([...models]);
  };
  setAvatorsState = (avators: String[]) => {
    this.avators$ = of([...avators]);
  };
  getModels = () => {
    this.setModelsState([
      {
        slug: 'werewolf',
        name: 'Werewolf',
        category: 'Humanoids',
        license: 'CC-BY-NC-ND',
        avatar: 'images/3.svg',
        vertices: 9437,
        downloads: 3042,
        description: 'Keep away from vampires, moonlight and silver bullets.',
      },
      {
        slug: 'icosahedron',
        name: 'Icosahedron',
        category: 'Shapes',
        license: 'CC-BY-SA',
        avatar: 'images/4.svg',
        vertices: 2560,
        downloads: 46,
        description: 'An artistic visualisation of the icosahedron.',
      },
      {
        slug: 'white-tiger',
        name: 'White tiger',
        category: 'Animals',
        license: 'GAL',
        avatar: 'images/5.svg',
        vertices: 5841,
        downloads: 512,
        description:
          'A magnificent white "snow" tiger, that is fully rigged and ready.',
      },
    ]);
  };

  setAvators = () => {
    this.setAvatorsState(['images/1.svg', 'images/2.svg', 'images/3.svg']);
  };
}

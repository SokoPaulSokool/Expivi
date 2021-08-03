import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelsDetails } from '../../interfaces/models-details';
import { RequestService } from '../general/request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private request: RequestService) {

  }

  // Fetch model details fromm the backend
  getModels(): Observable<ModelsDetails[]> {
     const dataFetched = [{"slug":"low-poly-taxi","name":"Low Poly Taxi","category":"Vehicles","license":"CC-0","avatar":"images\/0.svg","vertices":1017,"downloads":43,"description":"This is a low poly 3D model of a taxi which is common in The Netherlands."},{"slug":"dodecahedron","name":"Dodecahedron","category":"Shapes","license":"CC-0","avatar":"images\/1.svg","vertices":3184,"downloads":68,"description":"This is an artist's interpretation of the classic dodecahedron."},{"slug":"teapot","name":"An empty pot of tea","category":"Ceramics","license":"CC-BY","avatar":"images\/2.svg","vertices":895,"downloads":21,"description":"I\u2019m a little teapot, short and stout. Here is my handle, here is my spout. When I get all steamed up, hear me shout: \"Tip me over and pour me out!\""},{"slug":"werewolf","name":"Werewolf","category":"Humanoids","license":"CC-BY-NC-ND","avatar":"images\/3.svg","vertices":9437,"downloads":3042,"description":"Keep away from vampires, moonlight and silver bullets."},{"slug":"icosahedron","name":"Icosahedron","category":"Shapes","license":"CC-BY-SA","avatar":"images\/4.svg","vertices":2560,"downloads":46,"description":"An artistic visualisation of the icosahedron."},{"slug":"white-tiger","name":"White tiger","category":"Animals","license":"GAL","avatar":"images\/5.svg","vertices":5841,"downloads":512,"description":"A magnificent white \"snow\" tiger, that is fully rigged and ready."},{"slug":"mr-meeseeks","name":"Mr Meeseeks","category":"Humanoids","license":"CC-BY-NC","avatar":"images\/6.svg","vertices":2048,"downloads":256,"description":"I'm Mr Meeseeks, look at me! I wanna help you."},{"slug":"medieval-villa","name":"Medieval villa","category":"Architecture","license":"CC-BY-NC-SA","avatar":"images\/7.svg","vertices":3241,"downloads":128,"description":"This is a medieval period inspired villa, with a view of the ocean."},{"slug":"water-bottle","name":"LTT Water bottle","category":"Various","license":"CC-0","avatar":"images\/8.svg","vertices":128,"downloads":64,"description":"You can buy this water bottle at [LTT Store.com](https:\/\/www.lttstore.com)."},{"slug":"knight","name":"Knight in armor","category":"Humanoids","license":"CC-BY-NC","avatar":"images\/9.svg","vertices":4259,"downloads":32,"description":"A guard to the queen."},{"slug":"ancient-mug","name":"Ye olde mug","category":"Ceramics","license":"CC-0","avatar":"images\/10.svg","vertices":371,"downloads":9021,"description":"This is a sort of appliance which our ancestors probably used to drink out of."},{"slug":"eiffel-tower","name":"Tour de eiffel","category":"Architecture","license":"CC-BY-NC-ND","avatar":"images\/11.svg","vertices":5364,"downloads":10,"description":"This is the eiffel tower known from Paris, you cannot use this for any commercial work."},{"slug":"cessna-denali","name":"Cessna Denali","category":"Vehicles","license":"CC-BY-NC-SA","avatar":"images\/12.svg","vertices":4723,"downloads":102,"description":"The Cessna Delani is THE standard for aviation."},{"slug":"flower-vase","name":"Ancient vase","category":"Ceramics","license":"CC-0","avatar":"images\/13.svg","vertices":64,"downloads":0,"description":"This vase would almost be a rock if it weren't made from ceramics."},{"slug":"apache-attack-helicopter","name":"Apache attack helicopter","category":"Vehicles","license":"CC-BY","avatar":"images\/14.svg","vertices":1892,"downloads":7,"description":"The apache attack helicopter is a marvel of engineering, with it's spinny things and boom boom things it is great on the field."},{"slug":"tetrahedron","name":"Tetrahedron","category":"Shapes","license":"GAL","avatar":"images\/15.svg","vertices":1437,"downloads":94,"description":"Ah the tetrahedron, the most famous platonic solid in existence, and this one... this one is mine."},{"slug":"reggae-shark","name":"Reggae Shark","category":"Animals","license":"CC-BY-NC","avatar":"images\/16.svg","vertices":5897,"downloads":420,"description":"There are hundreds of Sharks livin' under da sea... Great Whites, Hammerheads and White Tip Reefs. But the one shark, Discovery always leave out is the dreadlock Rasta fish I'm talkin about... Reggae Shark!"},{"slug":"gaming-computer","name":"Gaming Computer 42069X","category":"Various","license":"CC-BY-SA","avatar":"images\/17.svg","vertices":4723,"downloads":11,"description":"This is a model of a gaming computer that you might find in a redditor their office."},{"slug":"witch-of-the-south","name":"The evil witch of the south","category":"Humanoids","license":"CC-BY","avatar":"images\/18.svg","vertices":5197,"downloads":1,"description":"Be careful as she will curse the living heck out of you!"},{"slug":"alien-book","name":"The title reads: \"O|ni~o-\/ddsa\"","category":"Various","license":"CC-0","avatar":"images\/19.svg","vertices":423,"downloads":2,"description":"This is an alien book that was discovered on the dark side of the sun."},{"slug":"game-controller","name":"Game Controller","category":"Various","license":"CC-BY-NC-SA","avatar":"images\/20.svg","vertices":840,"downloads":26,"description":"This is a generic game controller."},{"slug":"dinner-dish","name":"Luxurious dinner dish","category":"Ceramic","license":"CC-0","avatar":"images\/21.svg","vertices":54,"downloads":404,"description":"This is a dish on which to serve your dinner."},{"slug":"bigfoot","name":"The one, the only, BIGFOOT","category":"Humanoids","license":"CC-BY-SA","avatar":"images\/22.svg","vertices":3051,"downloads":9,"description":"This is a mythical creature of which we don't think it exists."},{"slug":"were-cat","name":"Werecat","category":"Humanoids","license":"CC-BY-NC","avatar":"images\/23.svg","vertices":4293,"downloads":5,"description":"A werecat is like a werewolf, but instead of being half wolf they are half cat."},{"slug":"new-apartment-complex","name":"Apartment Complex 38B","category":"Architecture","license":"CC-BY","avatar":"images\/24.svg","vertices":924,"downloads":1,"description":"This is a new apartment complex that will be built in 3091."}]
   return of(dataFetched)
    // return this.request.get(`api/items`, {  }).pipe(map(value => {

    //   return value
    // }))
  }
}

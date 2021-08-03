import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { ModelsDetails } from '../interfaces/models-details';
import { ModelsStateService } from '../services/models/modelsState.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-avators',
  templateUrl: './avators.component.html',
  styleUrls: ['./avators.component.scss'],
})
export class AvatorsComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef | undefined;

  avators: String[] = [];

  canvasContext: CanvasRenderingContext2D | undefined;

  constructor(private modelsStateService: ModelsStateService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // update canvas when avators state changes
    this.modelsStateService.avators$.subscribe((results) => {
      this.avators = results;
      this.updateCanvas();
    });
  }

  updateCanvas() {
    if (this.canvas) {
      const canvasEl = this.canvas.nativeElement;
      this.canvasContext = canvasEl.getContext('2d');
    }
    if (this.canvasContext && this.canvas) {
      const width = this.canvas.nativeElement.width;
      const height = this.canvas.nativeElement.height;
      this.canvasContext.clearRect(0, 0, width, height);
      // loops all avator urls and draws the images on canvas
      this.avators.forEach((avator) => {
        const img = new Image();
        img.src = `${environment.backendUrl}/` + avator;
        img.width = width;
        img.height = height;
        img.onload = () => {
          if (this.canvasContext) {
            this.canvasContext.drawImage(img, 0, 0,width,height);
          }
        };
      });
    }
  }
}

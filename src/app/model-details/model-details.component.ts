import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModelsDetails } from '../interfaces/models-details';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss'],
})
export class ModelDetailsComponent implements OnInit {
  @Input() details: ModelsDetails = {
    avatar: '',
    category: '',
    description: '',
    downloads: 0,
    license: '',
    name: '',
    slug: '',
    vertices: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}

import { Injectable } from '@angular/core';
import { Property } from './properties.model';
import { PROPERTY } from './Properties-data';

@Injectable()
export class PropertyService {

  constructor() { }

  getProperties() {
    return PROPERTY;
  }

}

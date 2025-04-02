import { Component } from '@angular/core';
import { SmartScaleApiService } from '../services/smart-scale-api-service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConversionRequest } from '../models/ConversionRequest';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  sample: string = '';
  value: number = 0;
  conversionRequest: ConversionRequest = new ConversionRequest();
  // units: string[] = ['kg', 'g', 'lb', 'oz'];
  units: string[] = [];
  selectedUnit: string = '';
  standardUnit?: string = '';
  convertedValue?: number = 0;

  constructor(private smartScaleApiService: SmartScaleApiService) {}

  onInputChange(value: string): void {
    this.sample = value;
    if (this.sample) {
      this.smartScaleApiService.getRelevantUnits(this.sample).subscribe( (response) => {
        this.units =response;
      });
    } else {
      this.units = [];
    }
  }

  onUnitChange(value: string): void {
    this.selectedUnit = value;
    this.onValueChange(this.value);
  }

  onValueChange(value: number): void {
    this.value = value;
    if (this.value) {
      this.conversionRequest.value = this.value;
      this.conversionRequest.fromUnit = this.selectedUnit;
      this.smartScaleApiService.getConvertedUnits(this.conversionRequest).subscribe( (response) => {
        this.convertedValue =response.value;
        this.standardUnit = response.toUnit;
      });
    } else {
      this.units = [];
    }
  }

  onSubmit(): void {
    if (this.selectedUnit) {
      this.smartScaleApiService.saveValue(Number(this.sample)).subscribe(
        (response) => {
          console.log('Value saved:', response);
          this.sample = '';
          this.selectedUnit = '';
        },
        (error) => {
          console.error('Error saving value:', error);
        }
      );
    }
  }
}

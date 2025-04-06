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
  sampleInputValue: number = 0;
  conversionRequest: ConversionRequest = new ConversionRequest();
  units: string[] = [];
  selectedUnit: string = '';
  standardUnit?: string = '';
  convertedValue?: number = 0;
  loading: boolean = false; // New loading state

  constructor(private smartScaleApiService: SmartScaleApiService) {}

  onInputChange(value: string): void {
    this.sample = value;
    if (this.sample) {
      this.loading = true; // Start loading
      this.smartScaleApiService.getRelevantUnits(this.sample).subscribe(
        (response) => {
          this.units = response;
          this.loading = false; // Stop loading
        },
        (error) => {
          console.error('Error fetching units:', error);
          this.loading = false; // Stop loading on error
        }
      );
    } else {
      this.units = [];
    }
  }

  onUnitChange(selectedUnit: string): void {
    this.selectedUnit = selectedUnit;
  }

  onValueChange(value: number): void {
    this.sampleInputValue = value;
    if (this.sampleInputValue) {
      this.conversionRequest.value = this.sampleInputValue;
      this.conversionRequest.fromUnit = this.selectedUnit;
      this.loading = true; // Start loading
      this.smartScaleApiService.getConvertedUnits(this.conversionRequest).subscribe( 
        (response) => {
          this.convertedValue =response.value;
          this.standardUnit = response.toUnit;
          this.loading = false; // Stop loading
        },
        (error) => {
          console.error('Error fetching converted value:', error);
          this.loading = false; // Stop loading on error
        }
      );
      
    } else {
      this.units = [];
    }
  }
}

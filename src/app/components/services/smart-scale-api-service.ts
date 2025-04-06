import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConversionRequest } from '../models/ConversionRequest';
import { ConversionResponse } from '../models/ConversionResponse';

@Injectable({
  providedIn: 'root',
})
export class SmartScaleApiService {
  private API_BASE_URL = 'https://localhost:7100/api/units'; // Replace with the actual SmartScale API base URL

  constructor(private http: HttpClient) {}

  getRelevantUnits(sample: string):Observable<string[]> {
    const apiUrl = `${this.API_BASE_URL}/evaluate`;
    return this.http.get<string[]>(apiUrl, { params: { sample } });
  }

  getConvertedUnits(conversionRequest: ConversionRequest ):Observable<ConversionResponse> {
    const apiUrl = `${this.API_BASE_URL}/convert`;
    return this.http.post<ConversionResponse>(apiUrl, conversionRequest);
  }

  saveValue(value: number): Observable<string> {
    return this.http.post<string>(`${this.API_BASE_URL}/save`, { value });
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { SpeakerDto } from '@org/shared-types';

@Injectable({
  providedIn: 'root',
})
export class CfpService {
  private readonly http = inject(HttpClient);

  submit(speaker: Omit<SpeakerDto, 'id'>): Observable<SpeakerDto> {
    return this.http.post<SpeakerDto>('/api/cfp/submit', speaker);
  }
}

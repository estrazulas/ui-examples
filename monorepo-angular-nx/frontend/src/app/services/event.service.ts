import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { EventDto } from '@org/shared-types';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly http = inject(HttpClient);

  createEvent(event: Omit<EventDto, 'id'>): Observable<EventDto> {
    return this.http.post<EventDto>('/api/events', event);
  }

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>('/api/events');
  }

  getEventById(id: string): Observable<EventDto> {
    return this.http.get<EventDto>(`/api/events/${id}`);
  }
}

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event.service';
import { HttpClient } from '@angular/common/http';
import type { EventDto, SpeakerDto } from '@org/shared-types';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  protected events = signal<EventDto[]>([]);
  protected talks = signal<SpeakerDto[]>([]);
  protected isLoading = signal(true);

  private readonly eventService = inject(EventService);
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => this.events.set(events),
    });
    this.http.get<SpeakerDto[]>('/api/cfp').subscribe({
      next: (talks) => {
        this.talks.set(talks);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}

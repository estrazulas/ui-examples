import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import type { SpeakerDto } from '@org/shared-types';

@Component({
  selector: 'app-talk-list',
  imports: [CommonModule],
  templateUrl: './talk-list.component.html',
  styleUrl: './talk-list.component.css',
})
export class TalkListComponent implements OnInit {
  protected talks = signal<SpeakerDto[]>([]);
  protected isLoading = signal(true);

  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<SpeakerDto[]>('/api/cfp').subscribe({
      next: (talks) => {
        this.talks.set(talks);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}

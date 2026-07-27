import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { BragService } from '../brag.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule, SlicePipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private bragService = inject(BragService);
  prompt = '';

  get brags() {
    return this.bragService.brags();
  }

  get loading() {
    return this.bragService.loading();
  }

  onSubmit(): void {
    if (this.prompt.trim()) {
      this.bragService.generateBrag(this.prompt.trim());
      this.prompt = '';
    }
  }
}

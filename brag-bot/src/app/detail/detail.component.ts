import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BragService, type Brag } from '../brag.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  private bragService = inject(BragService);
  private route = inject(ActivatedRoute);
  brag = signal<Brag | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.brag.set(this.bragService.getBrag(id!));
  }
}

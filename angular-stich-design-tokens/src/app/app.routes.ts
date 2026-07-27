import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pix',
	},
	{
		path: 'pix',
		loadComponent: () =>
			import('./pix-transfer/pix-transfer.component').then(
				(m) => m.PixTransferComponent,
			),
	},
	{
		path: 'extrato',
		loadComponent: () =>
			import('./pix-history/pix-history.component').then(
				(m) => m.PixHistoryComponent,
			),
	},
];

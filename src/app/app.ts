import { Component, signal } from '@angular/core';
import { TicketFormComponent } from './examples/1.creating-form/ticket-form';

@Component({
  selector: 'app-root',
  imports: [TicketFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

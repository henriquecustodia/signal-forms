// ticket-form.component.ts
import { Component, signal } from '@angular/core';
import {
  Control,
  customError,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { form } from '@angular/forms/signals';
import { Ticket } from './ticket.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [Control, JsonPipe],
  templateUrl: './ticket-form.component.html',
})
export class TicketFormComponent {
  // 1. Define o estado inicial com um signal
  ticket = signal<Ticket>({
    attendeeName: 'João',
    ticketType: 'Standard',
    eventId: 'ng-conf 2025',
  });

  // 2. Cria o Signal Form a partir do estado
  ticketForm = form(this.ticket, (path) => {
    // Validadores nativos
    required(path.attendeeName, { message: 'O nome é obrigatório.' });
    minLength(path.attendeeName, 3, { message: 'O nome precisa de pelo menos 3 caracteres.' });

    // Validador customizado
    const allowedTypes = ['VIP', 'Standard'];

    validate(path.ticketType, (ctx) => {
      const value = ctx.value();
      if (allowedTypes.includes(value)) {
        return null; // Válido
      }
      return customError({
        kind: 'ticketType',
        message: 'Apenas os tipos VIP e Standard são permitidos no momento.',
      });
    });
  });

  save(): void {}
}

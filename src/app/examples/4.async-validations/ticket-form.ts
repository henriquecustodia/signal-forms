// ticket-form.component.ts
import { Component, signal } from '@angular/core';
import {
  Control,
  customError,
  FieldPath,
  max,
  maxLength,
  minLength,
  required,
  submit,
  validate,
  validateAsync,
  validateHttp,
} from '@angular/forms/signals';
import { form } from '@angular/forms/signals';
import { Ticket } from './ticket.model';
import { Observable, of, delay, map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

function checkNameAvailability(name: string): Observable<boolean> {
  const existingNames = ['Henrique', 'Mateus'];

  return of(null).pipe(
    delay(1000), // Simula latência de rede
    map(() => !existingNames.includes(name)),
  );
}

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

    validateAsync(path.attendeeName, {
      params: (ctx) => ({ value: ctx.value() }),
      factory: (params) =>
        rxResource({
          params,
          stream: (p) => checkNameAvailability(p.params.value),
        }),
      errors: (isAvailable, ctx) => {
        if (!isAvailable) {
          return { kind: 'nameTaken', message: 'Este nome já está em uso.' };
        }

        return null;
      },
    });
  });

  save(): void {}
}

import { Component, model, input } from '@angular/core'
import { FormValueControl, ValidationError } from '@angular/forms/signals'

@Component({
	selector: 'app-ticket-quantity',
	standalone: true,
	template: `
		<div>
			<button type="button" class="btn btn-sm btn-primary" (click)="decrease()" [disabled]="value() <= 1">-</button>
			<span class="mx-2">{{ value() }}</span>
			<button type="button" class="btn btn-sm btn-primary" (click)="increase()">+</button>
		</div>
	`
})
export class TicketQuantityComponent implements FormValueControl<number> {
	value = model(1)

	increase(): void {
		this.value.update((v) => v + 1)
	}

	decrease(): void {
		this.value.update((v) => v - 1)
	}
}

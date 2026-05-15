// Стейт-машина заказа через discriminated union.
// Каждое состояние — отдельный вариант с уникальным набором полей.
// Переходы — функции (state, event) → state | error.

export type OrderState =
  | { status: 'cart'; items: readonly string[] }
  | { status: 'checkout'; items: readonly string[]; total: number }
  | { status: 'paid'; items: readonly string[]; total: number; paidAt: number }
  | { status: 'shipped'; items: readonly string[]; total: number; trackingId: string }
  | { status: 'delivered'; items: readonly string[]; total: number; deliveredAt: number }
  | { status: 'cancelled'; refund: number };

// TODO: реализовать переходы.
// addToCart(state, item): cart → cart (с расширенным items). Из других состояний — throw.
export function addToCart(_state: OrderState, _item: string): OrderState {
  throw new Error('addToCart is not implemented yet');
}

// TODO: startCheckout(state, total): cart → checkout. Иначе throw.
export function startCheckout(_state: OrderState, _total: number): OrderState {
  throw new Error('startCheckout is not implemented yet');
}

// TODO: pay(state, now): checkout → paid. Иначе throw.
export function pay(_state: OrderState, _now: number): OrderState {
  throw new Error('pay is not implemented yet');
}

// TODO: ship(state, trackingId): paid → shipped. Иначе throw.
export function ship(_state: OrderState, _trackingId: string): OrderState {
  throw new Error('ship is not implemented yet');
}

// TODO: deliver(state, now): shipped → delivered. Иначе throw.
export function deliver(_state: OrderState, _now: number): OrderState {
  throw new Error('deliver is not implemented yet');
}

// TODO: cancel(state): cart | checkout | paid → cancelled. shipped/delivered/cancelled — throw.
// refund = paid ? total : 0
export function cancel(_state: OrderState): OrderState {
  throw new Error('cancel is not implemented yet');
}

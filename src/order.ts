export type OrderState =
  | { status: 'cart'; items: readonly string[] }
  | { status: 'checkout'; items: readonly string[]; total: number }
  | { status: 'paid'; items: readonly string[]; total: number; paidAt: number }
  | { status: 'shipped'; items: readonly string[]; total: number; trackingId: string }
  | { status: 'delivered'; items: readonly string[]; total: number; deliveredAt: number }
  | { status: 'cancelled'; refund: number };

const illegal = (op: string, status: string): Error =>
  new Error(`Order: cannot ${op} from status "${status}"`);

export function addToCart(state: OrderState, item: string): OrderState {
  if (state.status !== 'cart') throw illegal('addToCart', state.status);
  return { status: 'cart', items: [...state.items, item] };
}

export function startCheckout(state: OrderState, total: number): OrderState {
  if (state.status !== 'cart') throw illegal('startCheckout', state.status);
  return { status: 'checkout', items: state.items, total };
}

export function pay(state: OrderState, now: number): OrderState {
  if (state.status !== 'checkout') throw illegal('pay', state.status);
  return { status: 'paid', items: state.items, total: state.total, paidAt: now };
}

export function ship(state: OrderState, trackingId: string): OrderState {
  if (state.status !== 'paid') throw illegal('ship', state.status);
  return { status: 'shipped', items: state.items, total: state.total, trackingId };
}

export function deliver(state: OrderState, now: number): OrderState {
  if (state.status !== 'shipped') throw illegal('deliver', state.status);
  return { status: 'delivered', items: state.items, total: state.total, deliveredAt: now };
}

export function cancel(state: OrderState): OrderState {
  switch (state.status) {
    case 'cart':
    case 'checkout':
      return { status: 'cancelled', refund: 0 };
    case 'paid':
      return { status: 'cancelled', refund: state.total };
    case 'shipped':
    case 'delivered':
    case 'cancelled':
      throw illegal('cancel', state.status);
    default: {
      const _: never = state;
      throw new Error(`Unknown state: ${String(_)}`);
    }
  }
}

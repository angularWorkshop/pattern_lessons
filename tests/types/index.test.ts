import { expectTypeOf } from 'vitest';
import { TextDocument, Caretaker, type DocumentSnapshot } from '../../src/memento.js';

describe('Memento type contracts', () => {
  it('save returns DocumentSnapshot', () => {
    expectTypeOf(TextDocument.prototype.save).returns.toEqualTypeOf<DocumentSnapshot>();
  });
  it('restore takes DocumentSnapshot', () => {
    expectTypeOf(TextDocument.prototype.restore).parameters.toEqualTypeOf<[DocumentSnapshot]>();
  });
  it('Caretaker.at returns DocumentSnapshot', () => {
    expectTypeOf(Caretaker.prototype.at).returns.toEqualTypeOf<DocumentSnapshot>();
  });
});

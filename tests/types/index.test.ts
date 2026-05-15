import { expectTypeOf } from 'vitest';
import { Form, type FormState, type CustomerType } from '../../src/form.js';

describe('Form type contracts', () => {
  it('CustomerType is business | individual', () => {
    expectTypeOf<CustomerType>().toEqualTypeOf<'individual' | 'business'>();
  });

  it('getState returns a FormState snapshot', () => {
    expectTypeOf(Form.prototype.getState).returns.toEqualTypeOf<FormState>();
  });

  it('update is typed by field name', () => {
    const f = new Form();
    expectTypeOf(f.update<'country'>).parameters.toEqualTypeOf<['country', string]>();
    expectTypeOf(f.update<'customerType'>).parameters.toEqualTypeOf<['customerType', CustomerType]>();
  });
});

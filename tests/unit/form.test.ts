import { Form } from '../../src/form.js';

describe('Form mediator — country → city dependency', () => {
  it('setting country populates cityOptions', () => {
    const form = new Form();
    form.update('country', 'RU');
    expect(form.getState().cityOptions).toEqual(['Moscow', 'SPb', 'Kazan']);
  });

  it('changing country resets city to empty', () => {
    const form = new Form();
    form.update('country', 'RU');
    form.update('city', 'Moscow');
    form.update('country', 'US');
    expect(form.getState().city).toBe('');
    expect(form.getState().cityOptions).toEqual(['NY', 'SF', 'LA']);
  });

  it('unknown country gives empty cityOptions', () => {
    const form = new Form();
    form.update('country', 'XX');
    expect(form.getState().cityOptions).toEqual([]);
  });

  it('throws when city is not in cityOptions', () => {
    const form = new Form();
    form.update('country', 'RU');
    expect(() => form.update('city', 'Berlin')).toThrow();
  });
});

describe('Form mediator — customer type → INN dependency', () => {
  it('business customer makes INN visible', () => {
    const form = new Form();
    form.update('customerType', 'business');
    expect(form.getState().innVisible).toBe(true);
  });

  it('individual hides INN and clears the value', () => {
    const form = new Form();
    form.update('customerType', 'business');
    form.update('inn', '7707083893');
    form.update('customerType', 'individual');
    expect(form.getState().innVisible).toBe(false);
    expect(form.getState().inn).toBe('');
  });

  it('switching back to business keeps innVisible true', () => {
    const form = new Form();
    form.update('customerType', 'business');
    form.update('customerType', 'individual');
    form.update('customerType', 'business');
    expect(form.getState().innVisible).toBe(true);
  });
});

describe('Form mediator — independence of rules', () => {
  it('country change does not affect customerType / inn', () => {
    const form = new Form();
    form.update('customerType', 'business');
    form.update('inn', '12345');
    form.update('country', 'DE');
    expect(form.getState().innVisible).toBe(true);
    expect(form.getState().inn).toBe('12345');
  });
});

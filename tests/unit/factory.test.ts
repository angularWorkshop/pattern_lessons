import { LightThemeFactory } from '../../src/light-theme-factory.js';
import { DarkThemeFactory } from '../../src/dark-theme-factory.js';
import { LoginForm } from '../../src/login-form.js';

describe('LightThemeFactory — light family of UI elements', () => {
  it('button renders with light theme and class', () => {
    const button = new LightThemeFactory().createButton();
    const node = button.render('Save');
    expect(node).toEqual({
      tag: 'button',
      className: 'btn btn--light',
      text: 'Save',
      theme: 'light',
    });
  });
  it('input renders with light theme', () => {
    const input = new LightThemeFactory().createInput();
    expect(input.render('search')).toMatchObject({
      tag: 'input',
      className: 'input input--light',
      text: 'search',
      theme: 'light',
    });
  });
  it('card renders combined title and body', () => {
    const card = new LightThemeFactory().createCard();
    expect(card.render('Hello', 'World')).toMatchObject({
      tag: 'div',
      className: 'card card--light',
      text: 'Hello :: World',
      theme: 'light',
    });
  });
});

describe('DarkThemeFactory — dark family of UI elements', () => {
  it('produces a dark button', () => {
    expect(new DarkThemeFactory().createButton().render('Save')).toMatchObject({
      className: 'btn btn--dark',
      theme: 'dark',
    });
  });
  it('produces a dark input', () => {
    expect(new DarkThemeFactory().createInput().render('q')).toMatchObject({
      className: 'input input--dark',
      theme: 'dark',
    });
  });
  it('produces a dark card', () => {
    expect(new DarkThemeFactory().createCard().render('A', 'B')).toMatchObject({
      className: 'card card--dark',
      text: 'A :: B',
      theme: 'dark',
    });
  });
});

describe('LoginForm — high-level code only knows ThemeFactory', () => {
  it('renders a fully light-themed form', () => {
    const nodes = new LoginForm(new LightThemeFactory()).render();
    expect(nodes.every((n) => n.theme === 'light')).toBe(true);
    expect(nodes.map((n) => n.tag)).toEqual(['div', 'input', 'input', 'button']);
  });
  it('renders a fully dark-themed form by swapping the factory', () => {
    const nodes = new LoginForm(new DarkThemeFactory()).render();
    expect(nodes.every((n) => n.theme === 'dark')).toBe(true);
  });
});

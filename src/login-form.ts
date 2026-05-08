import type { RenderedNode, ThemeFactory } from './ui-types.js';

// Демонстрация: высокоуровневый код знает только про ThemeFactory,
// не импортирует ни LightButton, ни DarkInput напрямую. При смене темы
// LoginForm не трогаем — меняется только то, какую фабрику ему передали.
export class LoginForm {
  private readonly factory: ThemeFactory;

  public constructor(factory: ThemeFactory) {
    this.factory = factory;
  }

  public render(): readonly RenderedNode[] {
    const button = this.factory.createButton();
    const input = this.factory.createInput();
    const card = this.factory.createCard();
    return [
      card.render('Login', 'Use your email'),
      input.render('email@example.com'),
      input.render('password'),
      button.render('Sign in'),
    ];
  }
}

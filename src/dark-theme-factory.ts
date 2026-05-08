import type {
  Button,
  Card,
  Input,
  RenderedNode,
  Theme,
  ThemeFactory,
} from './ui-types.js';

export class DarkButton implements Button {
  public readonly theme: Theme = 'dark';
  public render(label: string): RenderedNode {
    return { tag: 'button', className: 'btn btn--dark', text: label, theme: 'dark' };
  }
}

export class DarkInput implements Input {
  public readonly theme: Theme = 'dark';
  public render(placeholder: string): RenderedNode {
    return { tag: 'input', className: 'input input--dark', text: placeholder, theme: 'dark' };
  }
}

export class DarkCard implements Card {
  public readonly theme: Theme = 'dark';
  public render(title: string, body: string): RenderedNode {
    return { tag: 'div', className: 'card card--dark', text: `${title} :: ${body}`, theme: 'dark' };
  }
}

export class DarkThemeFactory implements ThemeFactory {
  public readonly theme: Theme = 'dark';
  public createButton(): Button {
    return new DarkButton();
  }
  public createInput(): Input {
    return new DarkInput();
  }
  public createCard(): Card {
    return new DarkCard();
  }
}

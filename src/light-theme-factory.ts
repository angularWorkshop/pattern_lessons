import type {
  Button,
  Card,
  Input,
  RenderedNode,
  Theme,
  ThemeFactory,
} from './ui-types.js';

export class LightButton implements Button {
  public readonly theme: Theme = 'light';
  public render(label: string): RenderedNode {
    return { tag: 'button', className: 'btn btn--light', text: label, theme: 'light' };
  }
}

export class LightInput implements Input {
  public readonly theme: Theme = 'light';
  public render(placeholder: string): RenderedNode {
    return { tag: 'input', className: 'input input--light', text: placeholder, theme: 'light' };
  }
}

export class LightCard implements Card {
  public readonly theme: Theme = 'light';
  public render(title: string, body: string): RenderedNode {
    return { tag: 'div', className: 'card card--light', text: `${title} :: ${body}`, theme: 'light' };
  }
}

export class LightThemeFactory implements ThemeFactory {
  public readonly theme: Theme = 'light';
  public createButton(): Button {
    return new LightButton();
  }
  public createInput(): Input {
    return new LightInput();
  }
  public createCard(): Card {
    return new LightCard();
  }
}

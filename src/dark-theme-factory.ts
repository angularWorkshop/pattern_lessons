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
  public render(_label: string): RenderedNode {
    throw new Error('DarkButton.render is not implemented yet');
  }
}

export class DarkInput implements Input {
  public readonly theme: Theme = 'dark';
  public render(_placeholder: string): RenderedNode {
    throw new Error('DarkInput.render is not implemented yet');
  }
}

export class DarkCard implements Card {
  public readonly theme: Theme = 'dark';
  public render(_title: string, _body: string): RenderedNode {
    throw new Error('DarkCard.render is not implemented yet');
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

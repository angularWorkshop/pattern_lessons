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
  // TODO: render должен вернуть RenderedNode с tag='button',
  // className='btn btn--light' и text=label.
  public render(_label: string): RenderedNode {
    throw new Error('LightButton.render is not implemented yet');
  }
}

export class LightInput implements Input {
  public readonly theme: Theme = 'light';
  // TODO: tag='input', className='input input--light', text=placeholder.
  public render(_placeholder: string): RenderedNode {
    throw new Error('LightInput.render is not implemented yet');
  }
}

export class LightCard implements Card {
  public readonly theme: Theme = 'light';
  // TODO: tag='div', className='card card--light',
  // text='<title> :: <body>'.
  public render(_title: string, _body: string): RenderedNode {
    throw new Error('LightCard.render is not implemented yet');
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

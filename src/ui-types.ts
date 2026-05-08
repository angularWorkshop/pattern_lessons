export type Theme = 'light' | 'dark';

export interface RenderedNode {
  tag: string;
  className: string;
  text: string;
  theme: Theme;
}

export interface Button {
  readonly theme: Theme;
  render(label: string): RenderedNode;
}

export interface Input {
  readonly theme: Theme;
  render(placeholder: string): RenderedNode;
}

export interface Card {
  readonly theme: Theme;
  render(title: string, body: string): RenderedNode;
}

export interface ThemeFactory {
  readonly theme: Theme;
  createButton(): Button;
  createInput(): Input;
  createCard(): Card;
}

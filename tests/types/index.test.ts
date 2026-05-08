import { expectTypeOf } from 'vitest';
import { LightThemeFactory } from '../../src/light-theme-factory.js';
import { DarkThemeFactory } from '../../src/dark-theme-factory.js';
import type { Button, Card, Input, Theme, ThemeFactory } from '../../src/ui-types.js';

describe('Theme factory type contracts', () => {
  it('Theme union covers light and dark', () => {
    expectTypeOf<Theme>().toEqualTypeOf<'light' | 'dark'>();
  });
  it('ThemeFactory.createButton returns a Button', () => {
    expectTypeOf<ThemeFactory['createButton']>().returns.toEqualTypeOf<Button>();
    expectTypeOf<ThemeFactory['createInput']>().returns.toEqualTypeOf<Input>();
    expectTypeOf<ThemeFactory['createCard']>().returns.toEqualTypeOf<Card>();
  });
  it('Both factories satisfy ThemeFactory', () => {
    expectTypeOf<LightThemeFactory>().toMatchTypeOf<ThemeFactory>();
    expectTypeOf<DarkThemeFactory>().toMatchTypeOf<ThemeFactory>();
  });
});

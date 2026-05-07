import { createLessonUser, sum } from '../../src/index';

describe('runtime baseline', () => {
  it('sums numeric arrays', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  it('creates a user with a branded id', () => {
    expect(createLessonUser('Max')).toEqual({
      id: 'user:max',
      name: 'Max',
    });
  });
});


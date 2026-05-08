import { HttpBuilder } from '../../src/http-builder.js';

describe('HttpBuilder — chained API', () => {
  it('returns this from each setter', () => {
    const builder = new HttpBuilder();
    expect(builder.get()).toBe(builder);
    expect(builder.path('/users')).toBe(builder);
    expect(builder.header('X-A', '1')).toBe(builder);
    expect(builder.queryParam('limit', '10')).toBe(builder);
  });
});

describe('HttpBuilder.build — assembles HttpRequest', () => {
  it('builds a basic GET request', () => {
    const req = new HttpBuilder().get().path('/users').build();
    expect(req).toEqual({
      method: 'GET',
      path: '/users',
      headers: {},
      query: {},
      body: undefined,
    });
  });

  it('accumulates headers and query params', () => {
    const req = new HttpBuilder()
      .get()
      .path('/users')
      .header('Authorization', 'Bearer xyz')
      .header('X-Trace', 'abc')
      .queryParam('limit', '10')
      .queryParam('offset', '20')
      .build();
    expect(req.headers).toEqual({ Authorization: 'Bearer xyz', 'X-Trace': 'abc' });
    expect(req.query).toEqual({ limit: '10', offset: '20' });
  });

  it('builds POST with body', () => {
    const req = new HttpBuilder()
      .post()
      .path('/users')
      .body({ name: 'Alice' })
      .build();
    expect(req.method).toBe('POST');
    expect(req.body).toEqual({ name: 'Alice' });
  });

  it('builds PUT and DELETE methods correctly', () => {
    expect(new HttpBuilder().put().path('/users/1').build().method).toBe('PUT');
    expect(new HttpBuilder().delete().path('/users/1').build().method).toBe('DELETE');
  });

  it('overrides header value when set twice', () => {
    const req = new HttpBuilder()
      .get()
      .path('/users')
      .header('X-A', '1')
      .header('X-A', '2')
      .build();
    expect(req.headers['X-A']).toBe('2');
  });

  it('throws when method is missing', () => {
    expect(() => new HttpBuilder().path('/users').build()).toThrow(/method/i);
  });

  it('throws when path is missing', () => {
    expect(() => new HttpBuilder().get().build()).toThrow(/path/i);
  });

  it('throws when body is set on GET', () => {
    expect(() =>
      new HttpBuilder().get().path('/x').body({ x: 1 }).build(),
    ).toThrow(/body/i);
  });

  it('throws when body is set on DELETE', () => {
    expect(() =>
      new HttpBuilder().delete().path('/x').body({ x: 1 }).build(),
    ).toThrow(/body/i);
  });
});

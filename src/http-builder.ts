export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpRequest {
  method: HttpMethod;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
}

export class HttpBuilder {
  protected method: HttpMethod | null = null;
  protected pathValue: string | null = null;
  protected headersMap: Record<string, string> = {};
  protected queryMap: Record<string, string> = {};
  protected bodyValue: unknown = undefined;

  // TODO: каждый метод сохраняет состояние и возвращает this.
  // build() собирает HttpRequest, валидирует обязательные шаги (method + path)
  // и запрещает body на GET.

  public get(): this {
    throw new Error('HttpBuilder.get is not implemented yet');
  }
  public post(): this {
    throw new Error('HttpBuilder.post is not implemented yet');
  }
  public put(): this {
    throw new Error('HttpBuilder.put is not implemented yet');
  }
  public delete(): this {
    throw new Error('HttpBuilder.delete is not implemented yet');
  }
  public path(_path: string): this {
    throw new Error('HttpBuilder.path is not implemented yet');
  }
  public header(_name: string, _value: string): this {
    throw new Error('HttpBuilder.header is not implemented yet');
  }
  public queryParam(_name: string, _value: string): this {
    throw new Error('HttpBuilder.queryParam is not implemented yet');
  }
  public body(_payload: unknown): this {
    throw new Error('HttpBuilder.body is not implemented yet');
  }
  public build(): HttpRequest {
    throw new Error('HttpBuilder.build is not implemented yet');
  }
}

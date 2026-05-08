export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface HttpRequest {
  method: HttpMethod;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
}

const NO_BODY_METHODS: ReadonlySet<HttpMethod> = new Set(['GET', 'DELETE']);

export class HttpBuilder {
  protected method: HttpMethod | null = null;
  protected pathValue: string | null = null;
  protected headersMap: Record<string, string> = {};
  protected queryMap: Record<string, string> = {};
  protected bodyValue: unknown = undefined;
  protected bodyWasSet = false;

  public get(): this {
    this.method = 'GET';
    return this;
  }
  public post(): this {
    this.method = 'POST';
    return this;
  }
  public put(): this {
    this.method = 'PUT';
    return this;
  }
  public delete(): this {
    this.method = 'DELETE';
    return this;
  }
  public path(path: string): this {
    this.pathValue = path;
    return this;
  }
  public header(name: string, value: string): this {
    this.headersMap[name] = value;
    return this;
  }
  public queryParam(name: string, value: string): this {
    this.queryMap[name] = value;
    return this;
  }
  public body(payload: unknown): this {
    this.bodyValue = payload;
    this.bodyWasSet = true;
    return this;
  }
  public build(): HttpRequest {
    if (!this.method) {
      throw new Error('HttpBuilder: HTTP method must be set before build()');
    }
    if (!this.pathValue) {
      throw new Error('HttpBuilder: path must be set before build()');
    }
    if (this.bodyWasSet && NO_BODY_METHODS.has(this.method)) {
      throw new Error(`HttpBuilder: body is not allowed on ${this.method} requests`);
    }
    return {
      method: this.method,
      path: this.pathValue,
      headers: { ...this.headersMap },
      query: { ...this.queryMap },
      body: this.bodyValue,
    };
  }
}

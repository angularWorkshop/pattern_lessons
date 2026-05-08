// Базовый HTTP-клиент: функция, принимающая запрос, возвращающая ответ.
// Не настоящий fetch, а контролируемая заглушка для упражнения.

export interface HttpRequest {
  url: string;
  method?: 'GET' | 'POST';
}

export interface HttpResponse {
  status: number;
  body: unknown;
}

export type HttpClient = (req: HttpRequest) => Promise<HttpResponse>;

// Хелпер для тестов: создаёт клиент, который реагирует на URL по табличке.
export function makeMockClient(routes: Record<string, HttpResponse>): {
  client: HttpClient;
  callCount: () => number;
  callsByUrl: () => Record<string, number>;
} {
  const calls: Record<string, number> = {};
  let total = 0;
  const client: HttpClient = async (req) => {
    total++;
    calls[req.url] = (calls[req.url] ?? 0) + 1;
    const response = routes[req.url];
    if (!response) {
      throw new Error(`No route for ${req.url}`);
    }
    return response;
  };
  return { client, callCount: () => total, callsByUrl: () => calls };
}

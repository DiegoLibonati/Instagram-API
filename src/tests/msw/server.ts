import {
  DefaultBodyType,
  RequestHandler,
} from "msw/lib/core/handlers/RequestHandler";
import { setupServer } from "msw/node";
import { http, HttpResponse, StrictRequest } from "msw";

type HandleConfig = {
  path: string;
  method: "get" | "post" | "delete" | "patch" | "put";
  status?: number;
  res: ({
    request,
  }: {
    request: StrictRequest<DefaultBodyType>;
  }) => Record<string, unknown> | Record<string, unknown>[];
};

export const createServer = (handlerConfig: HandleConfig[]): void => {
  const handlers: RequestHandler[] = handlerConfig.map((handleConfig) => {
    return http[handleConfig.method](handleConfig.path, ({ request }) => {
      return HttpResponse.json(handleConfig.res({ request }), {
        status: handleConfig.status ?? 200,
      });
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen({
      onUnhandledRequest(req, print) {
        if (req.url.includes("http://127.0.0.1")) return;

        print.warning();
      },
    });
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
};

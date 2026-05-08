export interface MeasureReport {
  method: string;
  durationMs: number;
  ok: boolean;
}

export type Reporter = (report: MeasureReport) => void;

export function measure(reporter: Reporter): <
  This extends object,
  Args extends unknown[],
  Return,
>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) => (this: This, ...args: Args) => Return {
  return function decorator<This extends object, Args extends unknown[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ): (this: This, ...args: Args) => Return {
    const methodName = String(context.name);
    return function (this: This, ...args: Args): Return {
      const started = Date.now();
      let result: Return;
      try {
        result = originalMethod.call(this, ...args);
      } catch (error) {
        reporter({ method: methodName, durationMs: Date.now() - started, ok: false });
        throw error;
      }
      if (result instanceof Promise) {
        const promise = result.then(
          (value: unknown) => {
            reporter({ method: methodName, durationMs: Date.now() - started, ok: true });
            return value;
          },
          (error: unknown) => {
            reporter({ method: methodName, durationMs: Date.now() - started, ok: false });
            throw error;
          },
        );
        return promise as Return;
      }
      reporter({ method: methodName, durationMs: Date.now() - started, ok: true });
      return result;
    };
  };
}

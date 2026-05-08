export type NodeCallback<R> = (err: Error | null, result?: R) => void;

export type CallbackFn<Args extends unknown[], R> = (
  ...args: [...Args, NodeCallback<R>]
) => void;

export function promisify<Args extends unknown[], R>(
  fn: CallbackFn<Args, R>,
): (...args: Args) => Promise<R> {
  return (...args: Args) =>
    new Promise<R>((resolve, reject) => {
      const callback: NodeCallback<R> = (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result as R);
        }
      };
      try {
        fn(...args, callback);
      } catch (error) {
        reject(error as Error);
      }
    });
}

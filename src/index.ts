export type DeepReadonly<T> = T extends (infer R)[]
    ? // eslint-disable-next-line no-use-before-define
      DeepReadonlyArray<R>
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends Function
    ? T
    : T extends object
    ? // eslint-disable-next-line no-use-before-define
      DeepReadonlyObject<T>
    : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type JsonRpcError<U = any> = Error & {
    data?: U;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResultOrError<T, E = any> =
    | {
          result: DeepReadonly<T>;
          error?: never;
      }
    | {
          result?: never;
          error: DeepReadonly<JsonRpcError<E>>;
      };

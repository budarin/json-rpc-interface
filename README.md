# json-rpc-interface

Package with JSON RPC interface in typescript.

## Installation

```bash
yarn add @budarin/json-rpc-interface
```

## Usage

```ts
import { ErrorOrResult } from '@budarin/json-rpc-interface';

function tryToDivide(a: number, b: number): ResultOrError<number> {
    try {
        return { result: a / b };
    } catch (e) {
        return {
            error: e instanceof Error ? e.message : 'Unexpected error',
            stack: e.stack,
        };
    }
}
```

somwhere in code

```ts
const divided = tryToDivide(1, 0);

if (divided.error) {
    console.error(divided.error);
    return;
}

console.log(divided.result);
```

## Type definition

```ts
type JsonRpcError<U> = {
    message: string;
    data?: U;
    stack?: string;
};

type ResultOrError<T, E = any> =
    | {
          result: DeepReadonly<T>;
          error?: never;
      }
    | {
          result?: never;
          error: DeepReadonly<JsonRpcError<E>>;
      };
```

## License

MIT

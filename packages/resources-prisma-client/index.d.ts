
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ResourceRole
 * 
 */
export type ResourceRole = $Result.DefaultSelection<Prisma.$ResourceRolePayload>
/**
 * Model Resource
 * 
 */
export type Resource = $Result.DefaultSelection<Prisma.$ResourcePayload>
/**
 * Model ResourceRolePhaseDependency
 * 
 */
export type ResourceRolePhaseDependency = $Result.DefaultSelection<Prisma.$ResourceRolePhaseDependencyPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ResourceRoles
 * const resourceRoles = await prisma.resourceRole.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ResourceRoles
   * const resourceRoles = await prisma.resourceRole.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.resourceRole`: Exposes CRUD operations for the **ResourceRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceRoles
    * const resourceRoles = await prisma.resourceRole.findMany()
    * ```
    */
  get resourceRole(): Prisma.ResourceRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resource`: Exposes CRUD operations for the **Resource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resources
    * const resources = await prisma.resource.findMany()
    * ```
    */
  get resource(): Prisma.ResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceRolePhaseDependency`: Exposes CRUD operations for the **ResourceRolePhaseDependency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceRolePhaseDependencies
    * const resourceRolePhaseDependencies = await prisma.resourceRolePhaseDependency.findMany()
    * ```
    */
  get resourceRolePhaseDependency(): Prisma.ResourceRolePhaseDependencyDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ResourceRole: 'ResourceRole',
    Resource: 'Resource',
    ResourceRolePhaseDependency: 'ResourceRolePhaseDependency'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "resourceRole" | "resource" | "resourceRolePhaseDependency"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ResourceRole: {
        payload: Prisma.$ResourceRolePayload<ExtArgs>
        fields: Prisma.ResourceRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>
          }
          findFirst: {
            args: Prisma.ResourceRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>
          }
          findMany: {
            args: Prisma.ResourceRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>[]
          }
          create: {
            args: Prisma.ResourceRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>
          }
          createMany: {
            args: Prisma.ResourceRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>[]
          }
          delete: {
            args: Prisma.ResourceRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>
          }
          update: {
            args: Prisma.ResourceRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>
          }
          deleteMany: {
            args: Prisma.ResourceRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>[]
          }
          upsert: {
            args: Prisma.ResourceRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePayload>
          }
          aggregate: {
            args: Prisma.ResourceRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceRole>
          }
          groupBy: {
            args: Prisma.ResourceRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceRoleCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceRoleCountAggregateOutputType> | number
          }
        }
      }
      Resource: {
        payload: Prisma.$ResourcePayload<ExtArgs>
        fields: Prisma.ResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findFirst: {
            args: Prisma.ResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findMany: {
            args: Prisma.ResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          create: {
            args: Prisma.ResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          createMany: {
            args: Prisma.ResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          delete: {
            args: Prisma.ResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          update: {
            args: Prisma.ResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          deleteMany: {
            args: Prisma.ResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          upsert: {
            args: Prisma.ResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          aggregate: {
            args: Prisma.ResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResource>
          }
          groupBy: {
            args: Prisma.ResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceCountAggregateOutputType> | number
          }
        }
      }
      ResourceRolePhaseDependency: {
        payload: Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>
        fields: Prisma.ResourceRolePhaseDependencyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceRolePhaseDependencyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceRolePhaseDependencyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>
          }
          findFirst: {
            args: Prisma.ResourceRolePhaseDependencyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceRolePhaseDependencyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>
          }
          findMany: {
            args: Prisma.ResourceRolePhaseDependencyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>[]
          }
          create: {
            args: Prisma.ResourceRolePhaseDependencyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>
          }
          createMany: {
            args: Prisma.ResourceRolePhaseDependencyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceRolePhaseDependencyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>[]
          }
          delete: {
            args: Prisma.ResourceRolePhaseDependencyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>
          }
          update: {
            args: Prisma.ResourceRolePhaseDependencyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>
          }
          deleteMany: {
            args: Prisma.ResourceRolePhaseDependencyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceRolePhaseDependencyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceRolePhaseDependencyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>[]
          }
          upsert: {
            args: Prisma.ResourceRolePhaseDependencyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceRolePhaseDependencyPayload>
          }
          aggregate: {
            args: Prisma.ResourceRolePhaseDependencyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceRolePhaseDependency>
          }
          groupBy: {
            args: Prisma.ResourceRolePhaseDependencyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceRolePhaseDependencyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceRolePhaseDependencyCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceRolePhaseDependencyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    resourceRole?: ResourceRoleOmit
    resource?: ResourceOmit
    resourceRolePhaseDependency?: ResourceRolePhaseDependencyOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ResourceRoleCountOutputType
   */

  export type ResourceRoleCountOutputType = {
    resources: number
    resourceRolePhaseDependencies: number
  }

  export type ResourceRoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resources?: boolean | ResourceRoleCountOutputTypeCountResourcesArgs
    resourceRolePhaseDependencies?: boolean | ResourceRoleCountOutputTypeCountResourceRolePhaseDependenciesArgs
  }

  // Custom InputTypes
  /**
   * ResourceRoleCountOutputType without action
   */
  export type ResourceRoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRoleCountOutputType
     */
    select?: ResourceRoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResourceRoleCountOutputType without action
   */
  export type ResourceRoleCountOutputTypeCountResourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
  }

  /**
   * ResourceRoleCountOutputType without action
   */
  export type ResourceRoleCountOutputTypeCountResourceRolePhaseDependenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceRolePhaseDependencyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ResourceRole
   */

  export type AggregateResourceRole = {
    _count: ResourceRoleCountAggregateOutputType | null
    _avg: ResourceRoleAvgAggregateOutputType | null
    _sum: ResourceRoleSumAggregateOutputType | null
    _min: ResourceRoleMinAggregateOutputType | null
    _max: ResourceRoleMaxAggregateOutputType | null
  }

  export type ResourceRoleAvgAggregateOutputType = {
    legacyId: number | null
  }

  export type ResourceRoleSumAggregateOutputType = {
    legacyId: number | null
  }

  export type ResourceRoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameLower: string | null
    fullReadAccess: boolean | null
    fullWriteAccess: boolean | null
    isActive: boolean | null
    selfObtainable: boolean | null
    legacyId: number | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ResourceRoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameLower: string | null
    fullReadAccess: boolean | null
    fullWriteAccess: boolean | null
    isActive: boolean | null
    selfObtainable: boolean | null
    legacyId: number | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ResourceRoleCountAggregateOutputType = {
    id: number
    name: number
    nameLower: number
    fullReadAccess: number
    fullWriteAccess: number
    isActive: number
    selfObtainable: number
    legacyId: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type ResourceRoleAvgAggregateInputType = {
    legacyId?: true
  }

  export type ResourceRoleSumAggregateInputType = {
    legacyId?: true
  }

  export type ResourceRoleMinAggregateInputType = {
    id?: true
    name?: true
    nameLower?: true
    fullReadAccess?: true
    fullWriteAccess?: true
    isActive?: true
    selfObtainable?: true
    legacyId?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ResourceRoleMaxAggregateInputType = {
    id?: true
    name?: true
    nameLower?: true
    fullReadAccess?: true
    fullWriteAccess?: true
    isActive?: true
    selfObtainable?: true
    legacyId?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ResourceRoleCountAggregateInputType = {
    id?: true
    name?: true
    nameLower?: true
    fullReadAccess?: true
    fullWriteAccess?: true
    isActive?: true
    selfObtainable?: true
    legacyId?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type ResourceRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceRole to aggregate.
     */
    where?: ResourceRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRoles to fetch.
     */
    orderBy?: ResourceRoleOrderByWithRelationInput | ResourceRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceRoles
    **/
    _count?: true | ResourceRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceRoleMaxAggregateInputType
  }

  export type GetResourceRoleAggregateType<T extends ResourceRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceRole[P]>
      : GetScalarType<T[P], AggregateResourceRole[P]>
  }




  export type ResourceRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceRoleWhereInput
    orderBy?: ResourceRoleOrderByWithAggregationInput | ResourceRoleOrderByWithAggregationInput[]
    by: ResourceRoleScalarFieldEnum[] | ResourceRoleScalarFieldEnum
    having?: ResourceRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceRoleCountAggregateInputType | true
    _avg?: ResourceRoleAvgAggregateInputType
    _sum?: ResourceRoleSumAggregateInputType
    _min?: ResourceRoleMinAggregateInputType
    _max?: ResourceRoleMaxAggregateInputType
  }

  export type ResourceRoleGroupByOutputType = {
    id: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId: number | null
    createdAt: Date
    createdBy: string
    updatedAt: Date | null
    updatedBy: string | null
    _count: ResourceRoleCountAggregateOutputType | null
    _avg: ResourceRoleAvgAggregateOutputType | null
    _sum: ResourceRoleSumAggregateOutputType | null
    _min: ResourceRoleMinAggregateOutputType | null
    _max: ResourceRoleMaxAggregateOutputType | null
  }

  type GetResourceRoleGroupByPayload<T extends ResourceRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceRoleGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceRoleGroupByOutputType[P]>
        }
      >
    >


  export type ResourceRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameLower?: boolean
    fullReadAccess?: boolean
    fullWriteAccess?: boolean
    isActive?: boolean
    selfObtainable?: boolean
    legacyId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resources?: boolean | ResourceRole$resourcesArgs<ExtArgs>
    resourceRolePhaseDependencies?: boolean | ResourceRole$resourceRolePhaseDependenciesArgs<ExtArgs>
    _count?: boolean | ResourceRoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceRole"]>

  export type ResourceRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameLower?: boolean
    fullReadAccess?: boolean
    fullWriteAccess?: boolean
    isActive?: boolean
    selfObtainable?: boolean
    legacyId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["resourceRole"]>

  export type ResourceRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameLower?: boolean
    fullReadAccess?: boolean
    fullWriteAccess?: boolean
    isActive?: boolean
    selfObtainable?: boolean
    legacyId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["resourceRole"]>

  export type ResourceRoleSelectScalar = {
    id?: boolean
    name?: boolean
    nameLower?: boolean
    fullReadAccess?: boolean
    fullWriteAccess?: boolean
    isActive?: boolean
    selfObtainable?: boolean
    legacyId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type ResourceRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameLower" | "fullReadAccess" | "fullWriteAccess" | "isActive" | "selfObtainable" | "legacyId" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["resourceRole"]>
  export type ResourceRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resources?: boolean | ResourceRole$resourcesArgs<ExtArgs>
    resourceRolePhaseDependencies?: boolean | ResourceRole$resourceRolePhaseDependenciesArgs<ExtArgs>
    _count?: boolean | ResourceRoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResourceRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResourceRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResourceRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceRole"
    objects: {
      resources: Prisma.$ResourcePayload<ExtArgs>[]
      resourceRolePhaseDependencies: Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameLower: string
      fullReadAccess: boolean
      fullWriteAccess: boolean
      isActive: boolean
      selfObtainable: boolean
      legacyId: number | null
      createdAt: Date
      createdBy: string
      updatedAt: Date | null
      updatedBy: string | null
    }, ExtArgs["result"]["resourceRole"]>
    composites: {}
  }

  type ResourceRoleGetPayload<S extends boolean | null | undefined | ResourceRoleDefaultArgs> = $Result.GetResult<Prisma.$ResourceRolePayload, S>

  type ResourceRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceRoleCountAggregateInputType | true
    }

  export interface ResourceRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceRole'], meta: { name: 'ResourceRole' } }
    /**
     * Find zero or one ResourceRole that matches the filter.
     * @param {ResourceRoleFindUniqueArgs} args - Arguments to find a ResourceRole
     * @example
     * // Get one ResourceRole
     * const resourceRole = await prisma.resourceRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceRoleFindUniqueArgs>(args: SelectSubset<T, ResourceRoleFindUniqueArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceRoleFindUniqueOrThrowArgs} args - Arguments to find a ResourceRole
     * @example
     * // Get one ResourceRole
     * const resourceRole = await prisma.resourceRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleFindFirstArgs} args - Arguments to find a ResourceRole
     * @example
     * // Get one ResourceRole
     * const resourceRole = await prisma.resourceRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceRoleFindFirstArgs>(args?: SelectSubset<T, ResourceRoleFindFirstArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleFindFirstOrThrowArgs} args - Arguments to find a ResourceRole
     * @example
     * // Get one ResourceRole
     * const resourceRole = await prisma.resourceRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceRoles
     * const resourceRoles = await prisma.resourceRole.findMany()
     * 
     * // Get first 10 ResourceRoles
     * const resourceRoles = await prisma.resourceRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceRoleWithIdOnly = await prisma.resourceRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceRoleFindManyArgs>(args?: SelectSubset<T, ResourceRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceRole.
     * @param {ResourceRoleCreateArgs} args - Arguments to create a ResourceRole.
     * @example
     * // Create one ResourceRole
     * const ResourceRole = await prisma.resourceRole.create({
     *   data: {
     *     // ... data to create a ResourceRole
     *   }
     * })
     * 
     */
    create<T extends ResourceRoleCreateArgs>(args: SelectSubset<T, ResourceRoleCreateArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceRoles.
     * @param {ResourceRoleCreateManyArgs} args - Arguments to create many ResourceRoles.
     * @example
     * // Create many ResourceRoles
     * const resourceRole = await prisma.resourceRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceRoleCreateManyArgs>(args?: SelectSubset<T, ResourceRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceRoles and returns the data saved in the database.
     * @param {ResourceRoleCreateManyAndReturnArgs} args - Arguments to create many ResourceRoles.
     * @example
     * // Create many ResourceRoles
     * const resourceRole = await prisma.resourceRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceRoles and only return the `id`
     * const resourceRoleWithIdOnly = await prisma.resourceRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceRole.
     * @param {ResourceRoleDeleteArgs} args - Arguments to delete one ResourceRole.
     * @example
     * // Delete one ResourceRole
     * const ResourceRole = await prisma.resourceRole.delete({
     *   where: {
     *     // ... filter to delete one ResourceRole
     *   }
     * })
     * 
     */
    delete<T extends ResourceRoleDeleteArgs>(args: SelectSubset<T, ResourceRoleDeleteArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceRole.
     * @param {ResourceRoleUpdateArgs} args - Arguments to update one ResourceRole.
     * @example
     * // Update one ResourceRole
     * const resourceRole = await prisma.resourceRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceRoleUpdateArgs>(args: SelectSubset<T, ResourceRoleUpdateArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceRoles.
     * @param {ResourceRoleDeleteManyArgs} args - Arguments to filter ResourceRoles to delete.
     * @example
     * // Delete a few ResourceRoles
     * const { count } = await prisma.resourceRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceRoleDeleteManyArgs>(args?: SelectSubset<T, ResourceRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceRoles
     * const resourceRole = await prisma.resourceRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceRoleUpdateManyArgs>(args: SelectSubset<T, ResourceRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceRoles and returns the data updated in the database.
     * @param {ResourceRoleUpdateManyAndReturnArgs} args - Arguments to update many ResourceRoles.
     * @example
     * // Update many ResourceRoles
     * const resourceRole = await prisma.resourceRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceRoles and only return the `id`
     * const resourceRoleWithIdOnly = await prisma.resourceRole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceRole.
     * @param {ResourceRoleUpsertArgs} args - Arguments to update or create a ResourceRole.
     * @example
     * // Update or create a ResourceRole
     * const resourceRole = await prisma.resourceRole.upsert({
     *   create: {
     *     // ... data to create a ResourceRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceRole we want to update
     *   }
     * })
     */
    upsert<T extends ResourceRoleUpsertArgs>(args: SelectSubset<T, ResourceRoleUpsertArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleCountArgs} args - Arguments to filter ResourceRoles to count.
     * @example
     * // Count the number of ResourceRoles
     * const count = await prisma.resourceRole.count({
     *   where: {
     *     // ... the filter for the ResourceRoles we want to count
     *   }
     * })
    **/
    count<T extends ResourceRoleCountArgs>(
      args?: Subset<T, ResourceRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceRoleAggregateArgs>(args: Subset<T, ResourceRoleAggregateArgs>): Prisma.PrismaPromise<GetResourceRoleAggregateType<T>>

    /**
     * Group by ResourceRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceRoleGroupByArgs['orderBy'] }
        : { orderBy?: ResourceRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceRole model
   */
  readonly fields: ResourceRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resources<T extends ResourceRole$resourcesArgs<ExtArgs> = {}>(args?: Subset<T, ResourceRole$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    resourceRolePhaseDependencies<T extends ResourceRole$resourceRolePhaseDependenciesArgs<ExtArgs> = {}>(args?: Subset<T, ResourceRole$resourceRolePhaseDependenciesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceRole model
   */
  interface ResourceRoleFieldRefs {
    readonly id: FieldRef<"ResourceRole", 'String'>
    readonly name: FieldRef<"ResourceRole", 'String'>
    readonly nameLower: FieldRef<"ResourceRole", 'String'>
    readonly fullReadAccess: FieldRef<"ResourceRole", 'Boolean'>
    readonly fullWriteAccess: FieldRef<"ResourceRole", 'Boolean'>
    readonly isActive: FieldRef<"ResourceRole", 'Boolean'>
    readonly selfObtainable: FieldRef<"ResourceRole", 'Boolean'>
    readonly legacyId: FieldRef<"ResourceRole", 'Int'>
    readonly createdAt: FieldRef<"ResourceRole", 'DateTime'>
    readonly createdBy: FieldRef<"ResourceRole", 'String'>
    readonly updatedAt: FieldRef<"ResourceRole", 'DateTime'>
    readonly updatedBy: FieldRef<"ResourceRole", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResourceRole findUnique
   */
  export type ResourceRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRole to fetch.
     */
    where: ResourceRoleWhereUniqueInput
  }

  /**
   * ResourceRole findUniqueOrThrow
   */
  export type ResourceRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRole to fetch.
     */
    where: ResourceRoleWhereUniqueInput
  }

  /**
   * ResourceRole findFirst
   */
  export type ResourceRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRole to fetch.
     */
    where?: ResourceRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRoles to fetch.
     */
    orderBy?: ResourceRoleOrderByWithRelationInput | ResourceRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceRoles.
     */
    cursor?: ResourceRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceRoles.
     */
    distinct?: ResourceRoleScalarFieldEnum | ResourceRoleScalarFieldEnum[]
  }

  /**
   * ResourceRole findFirstOrThrow
   */
  export type ResourceRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRole to fetch.
     */
    where?: ResourceRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRoles to fetch.
     */
    orderBy?: ResourceRoleOrderByWithRelationInput | ResourceRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceRoles.
     */
    cursor?: ResourceRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceRoles.
     */
    distinct?: ResourceRoleScalarFieldEnum | ResourceRoleScalarFieldEnum[]
  }

  /**
   * ResourceRole findMany
   */
  export type ResourceRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRoles to fetch.
     */
    where?: ResourceRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRoles to fetch.
     */
    orderBy?: ResourceRoleOrderByWithRelationInput | ResourceRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceRoles.
     */
    cursor?: ResourceRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRoles.
     */
    skip?: number
    distinct?: ResourceRoleScalarFieldEnum | ResourceRoleScalarFieldEnum[]
  }

  /**
   * ResourceRole create
   */
  export type ResourceRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceRole.
     */
    data: XOR<ResourceRoleCreateInput, ResourceRoleUncheckedCreateInput>
  }

  /**
   * ResourceRole createMany
   */
  export type ResourceRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceRoles.
     */
    data: ResourceRoleCreateManyInput | ResourceRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceRole createManyAndReturn
   */
  export type ResourceRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceRoles.
     */
    data: ResourceRoleCreateManyInput | ResourceRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceRole update
   */
  export type ResourceRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceRole.
     */
    data: XOR<ResourceRoleUpdateInput, ResourceRoleUncheckedUpdateInput>
    /**
     * Choose, which ResourceRole to update.
     */
    where: ResourceRoleWhereUniqueInput
  }

  /**
   * ResourceRole updateMany
   */
  export type ResourceRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceRoles.
     */
    data: XOR<ResourceRoleUpdateManyMutationInput, ResourceRoleUncheckedUpdateManyInput>
    /**
     * Filter which ResourceRoles to update
     */
    where?: ResourceRoleWhereInput
    /**
     * Limit how many ResourceRoles to update.
     */
    limit?: number
  }

  /**
   * ResourceRole updateManyAndReturn
   */
  export type ResourceRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * The data used to update ResourceRoles.
     */
    data: XOR<ResourceRoleUpdateManyMutationInput, ResourceRoleUncheckedUpdateManyInput>
    /**
     * Filter which ResourceRoles to update
     */
    where?: ResourceRoleWhereInput
    /**
     * Limit how many ResourceRoles to update.
     */
    limit?: number
  }

  /**
   * ResourceRole upsert
   */
  export type ResourceRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceRole to update in case it exists.
     */
    where: ResourceRoleWhereUniqueInput
    /**
     * In case the ResourceRole found by the `where` argument doesn't exist, create a new ResourceRole with this data.
     */
    create: XOR<ResourceRoleCreateInput, ResourceRoleUncheckedCreateInput>
    /**
     * In case the ResourceRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceRoleUpdateInput, ResourceRoleUncheckedUpdateInput>
  }

  /**
   * ResourceRole delete
   */
  export type ResourceRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
    /**
     * Filter which ResourceRole to delete.
     */
    where: ResourceRoleWhereUniqueInput
  }

  /**
   * ResourceRole deleteMany
   */
  export type ResourceRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceRoles to delete
     */
    where?: ResourceRoleWhereInput
    /**
     * Limit how many ResourceRoles to delete.
     */
    limit?: number
  }

  /**
   * ResourceRole.resources
   */
  export type ResourceRole$resourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    cursor?: ResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * ResourceRole.resourceRolePhaseDependencies
   */
  export type ResourceRole$resourceRolePhaseDependenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    where?: ResourceRolePhaseDependencyWhereInput
    orderBy?: ResourceRolePhaseDependencyOrderByWithRelationInput | ResourceRolePhaseDependencyOrderByWithRelationInput[]
    cursor?: ResourceRolePhaseDependencyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceRolePhaseDependencyScalarFieldEnum | ResourceRolePhaseDependencyScalarFieldEnum[]
  }

  /**
   * ResourceRole without action
   */
  export type ResourceRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRole
     */
    select?: ResourceRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRole
     */
    omit?: ResourceRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRoleInclude<ExtArgs> | null
  }


  /**
   * Model Resource
   */

  export type AggregateResource = {
    _count: ResourceCountAggregateOutputType | null
    _avg: ResourceAvgAggregateOutputType | null
    _sum: ResourceSumAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  export type ResourceAvgAggregateOutputType = {
    legacyId: number | null
  }

  export type ResourceSumAggregateOutputType = {
    legacyId: number | null
  }

  export type ResourceMinAggregateOutputType = {
    id: string | null
    challengeId: string | null
    memberId: string | null
    memberHandle: string | null
    roleId: string | null
    legacyId: number | null
    phaseChangeNotifications: boolean | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ResourceMaxAggregateOutputType = {
    id: string | null
    challengeId: string | null
    memberId: string | null
    memberHandle: string | null
    roleId: string | null
    legacyId: number | null
    phaseChangeNotifications: boolean | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ResourceCountAggregateOutputType = {
    id: number
    challengeId: number
    memberId: number
    memberHandle: number
    roleId: number
    legacyId: number
    phaseChangeNotifications: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type ResourceAvgAggregateInputType = {
    legacyId?: true
  }

  export type ResourceSumAggregateInputType = {
    legacyId?: true
  }

  export type ResourceMinAggregateInputType = {
    id?: true
    challengeId?: true
    memberId?: true
    memberHandle?: true
    roleId?: true
    legacyId?: true
    phaseChangeNotifications?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ResourceMaxAggregateInputType = {
    id?: true
    challengeId?: true
    memberId?: true
    memberHandle?: true
    roleId?: true
    legacyId?: true
    phaseChangeNotifications?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ResourceCountAggregateInputType = {
    id?: true
    challengeId?: true
    memberId?: true
    memberHandle?: true
    roleId?: true
    legacyId?: true
    phaseChangeNotifications?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type ResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resource to aggregate.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resources
    **/
    _count?: true | ResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceMaxAggregateInputType
  }

  export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResource[P]>
      : GetScalarType<T[P], AggregateResource[P]>
  }




  export type ResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithAggregationInput | ResourceOrderByWithAggregationInput[]
    by: ResourceScalarFieldEnum[] | ResourceScalarFieldEnum
    having?: ResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceCountAggregateInputType | true
    _avg?: ResourceAvgAggregateInputType
    _sum?: ResourceSumAggregateInputType
    _min?: ResourceMinAggregateInputType
    _max?: ResourceMaxAggregateInputType
  }

  export type ResourceGroupByOutputType = {
    id: string
    challengeId: string
    memberId: string
    memberHandle: string
    roleId: string
    legacyId: number | null
    phaseChangeNotifications: boolean | null
    createdAt: Date
    createdBy: string
    updatedAt: Date | null
    updatedBy: string | null
    _count: ResourceCountAggregateOutputType | null
    _avg: ResourceAvgAggregateOutputType | null
    _sum: ResourceSumAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceGroupByOutputType[P]>
        }
      >
    >


  export type ResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengeId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    roleId?: boolean
    legacyId?: boolean
    phaseChangeNotifications?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengeId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    roleId?: boolean
    legacyId?: boolean
    phaseChangeNotifications?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challengeId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    roleId?: boolean
    legacyId?: boolean
    phaseChangeNotifications?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectScalar = {
    id?: boolean
    challengeId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    roleId?: boolean
    legacyId?: boolean
    phaseChangeNotifications?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type ResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "challengeId" | "memberId" | "memberHandle" | "roleId" | "legacyId" | "phaseChangeNotifications" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["resource"]>
  export type ResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }

  export type $ResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resource"
    objects: {
      resourceRole: Prisma.$ResourceRolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      challengeId: string
      memberId: string
      memberHandle: string
      roleId: string
      legacyId: number | null
      phaseChangeNotifications: boolean | null
      createdAt: Date
      createdBy: string
      updatedAt: Date | null
      updatedBy: string | null
    }, ExtArgs["result"]["resource"]>
    composites: {}
  }

  type ResourceGetPayload<S extends boolean | null | undefined | ResourceDefaultArgs> = $Result.GetResult<Prisma.$ResourcePayload, S>

  type ResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceCountAggregateInputType | true
    }

  export interface ResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resource'], meta: { name: 'Resource' } }
    /**
     * Find zero or one Resource that matches the filter.
     * @param {ResourceFindUniqueArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceFindUniqueArgs>(args: SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceFindUniqueOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceFindFirstArgs>(args?: SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resources
     * const resources = await prisma.resource.findMany()
     * 
     * // Get first 10 Resources
     * const resources = await prisma.resource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceWithIdOnly = await prisma.resource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceFindManyArgs>(args?: SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resource.
     * @param {ResourceCreateArgs} args - Arguments to create a Resource.
     * @example
     * // Create one Resource
     * const Resource = await prisma.resource.create({
     *   data: {
     *     // ... data to create a Resource
     *   }
     * })
     * 
     */
    create<T extends ResourceCreateArgs>(args: SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resources.
     * @param {ResourceCreateManyArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceCreateManyArgs>(args?: SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resources and returns the data saved in the database.
     * @param {ResourceCreateManyAndReturnArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resource.
     * @param {ResourceDeleteArgs} args - Arguments to delete one Resource.
     * @example
     * // Delete one Resource
     * const Resource = await prisma.resource.delete({
     *   where: {
     *     // ... filter to delete one Resource
     *   }
     * })
     * 
     */
    delete<T extends ResourceDeleteArgs>(args: SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resource.
     * @param {ResourceUpdateArgs} args - Arguments to update one Resource.
     * @example
     * // Update one Resource
     * const resource = await prisma.resource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceUpdateArgs>(args: SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resources.
     * @param {ResourceDeleteManyArgs} args - Arguments to filter Resources to delete.
     * @example
     * // Delete a few Resources
     * const { count } = await prisma.resource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceDeleteManyArgs>(args?: SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceUpdateManyArgs>(args: SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources and returns the data updated in the database.
     * @param {ResourceUpdateManyAndReturnArgs} args - Arguments to update many Resources.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resource.
     * @param {ResourceUpsertArgs} args - Arguments to update or create a Resource.
     * @example
     * // Update or create a Resource
     * const resource = await prisma.resource.upsert({
     *   create: {
     *     // ... data to create a Resource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resource we want to update
     *   }
     * })
     */
    upsert<T extends ResourceUpsertArgs>(args: SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCountArgs} args - Arguments to filter Resources to count.
     * @example
     * // Count the number of Resources
     * const count = await prisma.resource.count({
     *   where: {
     *     // ... the filter for the Resources we want to count
     *   }
     * })
    **/
    count<T extends ResourceCountArgs>(
      args?: Subset<T, ResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceAggregateArgs>(args: Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>

    /**
     * Group by Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceGroupByArgs['orderBy'] }
        : { orderBy?: ResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resource model
   */
  readonly fields: ResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resourceRole<T extends ResourceRoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceRoleDefaultArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resource model
   */
  interface ResourceFieldRefs {
    readonly id: FieldRef<"Resource", 'String'>
    readonly challengeId: FieldRef<"Resource", 'String'>
    readonly memberId: FieldRef<"Resource", 'String'>
    readonly memberHandle: FieldRef<"Resource", 'String'>
    readonly roleId: FieldRef<"Resource", 'String'>
    readonly legacyId: FieldRef<"Resource", 'Int'>
    readonly phaseChangeNotifications: FieldRef<"Resource", 'Boolean'>
    readonly createdAt: FieldRef<"Resource", 'DateTime'>
    readonly createdBy: FieldRef<"Resource", 'String'>
    readonly updatedAt: FieldRef<"Resource", 'DateTime'>
    readonly updatedBy: FieldRef<"Resource", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Resource findUnique
   */
  export type ResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findUniqueOrThrow
   */
  export type ResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findFirst
   */
  export type ResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findFirstOrThrow
   */
  export type ResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findMany
   */
  export type ResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resources to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource create
   */
  export type ResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Resource.
     */
    data: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
  }

  /**
   * Resource createMany
   */
  export type ResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resource createManyAndReturn
   */
  export type ResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource update
   */
  export type ResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Resource.
     */
    data: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
    /**
     * Choose, which Resource to update.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource updateMany
   */
  export type ResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
  }

  /**
   * Resource updateManyAndReturn
   */
  export type ResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource upsert
   */
  export type ResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Resource to update in case it exists.
     */
    where: ResourceWhereUniqueInput
    /**
     * In case the Resource found by the `where` argument doesn't exist, create a new Resource with this data.
     */
    create: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
    /**
     * In case the Resource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
  }

  /**
   * Resource delete
   */
  export type ResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter which Resource to delete.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource deleteMany
   */
  export type ResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resources to delete
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to delete.
     */
    limit?: number
  }

  /**
   * Resource without action
   */
  export type ResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
  }


  /**
   * Model ResourceRolePhaseDependency
   */

  export type AggregateResourceRolePhaseDependency = {
    _count: ResourceRolePhaseDependencyCountAggregateOutputType | null
    _min: ResourceRolePhaseDependencyMinAggregateOutputType | null
    _max: ResourceRolePhaseDependencyMaxAggregateOutputType | null
  }

  export type ResourceRolePhaseDependencyMinAggregateOutputType = {
    id: string | null
    phaseId: string | null
    resourceRoleId: string | null
    phaseState: boolean | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ResourceRolePhaseDependencyMaxAggregateOutputType = {
    id: string | null
    phaseId: string | null
    resourceRoleId: string | null
    phaseState: boolean | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type ResourceRolePhaseDependencyCountAggregateOutputType = {
    id: number
    phaseId: number
    resourceRoleId: number
    phaseState: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type ResourceRolePhaseDependencyMinAggregateInputType = {
    id?: true
    phaseId?: true
    resourceRoleId?: true
    phaseState?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ResourceRolePhaseDependencyMaxAggregateInputType = {
    id?: true
    phaseId?: true
    resourceRoleId?: true
    phaseState?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type ResourceRolePhaseDependencyCountAggregateInputType = {
    id?: true
    phaseId?: true
    resourceRoleId?: true
    phaseState?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type ResourceRolePhaseDependencyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceRolePhaseDependency to aggregate.
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRolePhaseDependencies to fetch.
     */
    orderBy?: ResourceRolePhaseDependencyOrderByWithRelationInput | ResourceRolePhaseDependencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceRolePhaseDependencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRolePhaseDependencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRolePhaseDependencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceRolePhaseDependencies
    **/
    _count?: true | ResourceRolePhaseDependencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceRolePhaseDependencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceRolePhaseDependencyMaxAggregateInputType
  }

  export type GetResourceRolePhaseDependencyAggregateType<T extends ResourceRolePhaseDependencyAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceRolePhaseDependency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceRolePhaseDependency[P]>
      : GetScalarType<T[P], AggregateResourceRolePhaseDependency[P]>
  }




  export type ResourceRolePhaseDependencyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceRolePhaseDependencyWhereInput
    orderBy?: ResourceRolePhaseDependencyOrderByWithAggregationInput | ResourceRolePhaseDependencyOrderByWithAggregationInput[]
    by: ResourceRolePhaseDependencyScalarFieldEnum[] | ResourceRolePhaseDependencyScalarFieldEnum
    having?: ResourceRolePhaseDependencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceRolePhaseDependencyCountAggregateInputType | true
    _min?: ResourceRolePhaseDependencyMinAggregateInputType
    _max?: ResourceRolePhaseDependencyMaxAggregateInputType
  }

  export type ResourceRolePhaseDependencyGroupByOutputType = {
    id: string
    phaseId: string
    resourceRoleId: string
    phaseState: boolean
    createdAt: Date
    createdBy: string
    updatedAt: Date | null
    updatedBy: string | null
    _count: ResourceRolePhaseDependencyCountAggregateOutputType | null
    _min: ResourceRolePhaseDependencyMinAggregateOutputType | null
    _max: ResourceRolePhaseDependencyMaxAggregateOutputType | null
  }

  type GetResourceRolePhaseDependencyGroupByPayload<T extends ResourceRolePhaseDependencyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceRolePhaseDependencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceRolePhaseDependencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceRolePhaseDependencyGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceRolePhaseDependencyGroupByOutputType[P]>
        }
      >
    >


  export type ResourceRolePhaseDependencySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phaseId?: boolean
    resourceRoleId?: boolean
    phaseState?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceRolePhaseDependency"]>

  export type ResourceRolePhaseDependencySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phaseId?: boolean
    resourceRoleId?: boolean
    phaseState?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceRolePhaseDependency"]>

  export type ResourceRolePhaseDependencySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phaseId?: boolean
    resourceRoleId?: boolean
    phaseState?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceRolePhaseDependency"]>

  export type ResourceRolePhaseDependencySelectScalar = {
    id?: boolean
    phaseId?: boolean
    resourceRoleId?: boolean
    phaseState?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type ResourceRolePhaseDependencyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phaseId" | "resourceRoleId" | "phaseState" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["resourceRolePhaseDependency"]>
  export type ResourceRolePhaseDependencyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }
  export type ResourceRolePhaseDependencyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }
  export type ResourceRolePhaseDependencyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resourceRole?: boolean | ResourceRoleDefaultArgs<ExtArgs>
  }

  export type $ResourceRolePhaseDependencyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceRolePhaseDependency"
    objects: {
      resourceRole: Prisma.$ResourceRolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phaseId: string
      resourceRoleId: string
      phaseState: boolean
      createdAt: Date
      createdBy: string
      updatedAt: Date | null
      updatedBy: string | null
    }, ExtArgs["result"]["resourceRolePhaseDependency"]>
    composites: {}
  }

  type ResourceRolePhaseDependencyGetPayload<S extends boolean | null | undefined | ResourceRolePhaseDependencyDefaultArgs> = $Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload, S>

  type ResourceRolePhaseDependencyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceRolePhaseDependencyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceRolePhaseDependencyCountAggregateInputType | true
    }

  export interface ResourceRolePhaseDependencyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceRolePhaseDependency'], meta: { name: 'ResourceRolePhaseDependency' } }
    /**
     * Find zero or one ResourceRolePhaseDependency that matches the filter.
     * @param {ResourceRolePhaseDependencyFindUniqueArgs} args - Arguments to find a ResourceRolePhaseDependency
     * @example
     * // Get one ResourceRolePhaseDependency
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceRolePhaseDependencyFindUniqueArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyFindUniqueArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceRolePhaseDependency that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceRolePhaseDependencyFindUniqueOrThrowArgs} args - Arguments to find a ResourceRolePhaseDependency
     * @example
     * // Get one ResourceRolePhaseDependency
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceRolePhaseDependencyFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceRolePhaseDependency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyFindFirstArgs} args - Arguments to find a ResourceRolePhaseDependency
     * @example
     * // Get one ResourceRolePhaseDependency
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceRolePhaseDependencyFindFirstArgs>(args?: SelectSubset<T, ResourceRolePhaseDependencyFindFirstArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceRolePhaseDependency that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyFindFirstOrThrowArgs} args - Arguments to find a ResourceRolePhaseDependency
     * @example
     * // Get one ResourceRolePhaseDependency
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceRolePhaseDependencyFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceRolePhaseDependencyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceRolePhaseDependencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceRolePhaseDependencies
     * const resourceRolePhaseDependencies = await prisma.resourceRolePhaseDependency.findMany()
     * 
     * // Get first 10 ResourceRolePhaseDependencies
     * const resourceRolePhaseDependencies = await prisma.resourceRolePhaseDependency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceRolePhaseDependencyWithIdOnly = await prisma.resourceRolePhaseDependency.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceRolePhaseDependencyFindManyArgs>(args?: SelectSubset<T, ResourceRolePhaseDependencyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceRolePhaseDependency.
     * @param {ResourceRolePhaseDependencyCreateArgs} args - Arguments to create a ResourceRolePhaseDependency.
     * @example
     * // Create one ResourceRolePhaseDependency
     * const ResourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.create({
     *   data: {
     *     // ... data to create a ResourceRolePhaseDependency
     *   }
     * })
     * 
     */
    create<T extends ResourceRolePhaseDependencyCreateArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyCreateArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceRolePhaseDependencies.
     * @param {ResourceRolePhaseDependencyCreateManyArgs} args - Arguments to create many ResourceRolePhaseDependencies.
     * @example
     * // Create many ResourceRolePhaseDependencies
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceRolePhaseDependencyCreateManyArgs>(args?: SelectSubset<T, ResourceRolePhaseDependencyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceRolePhaseDependencies and returns the data saved in the database.
     * @param {ResourceRolePhaseDependencyCreateManyAndReturnArgs} args - Arguments to create many ResourceRolePhaseDependencies.
     * @example
     * // Create many ResourceRolePhaseDependencies
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceRolePhaseDependencies and only return the `id`
     * const resourceRolePhaseDependencyWithIdOnly = await prisma.resourceRolePhaseDependency.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceRolePhaseDependencyCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceRolePhaseDependencyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceRolePhaseDependency.
     * @param {ResourceRolePhaseDependencyDeleteArgs} args - Arguments to delete one ResourceRolePhaseDependency.
     * @example
     * // Delete one ResourceRolePhaseDependency
     * const ResourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.delete({
     *   where: {
     *     // ... filter to delete one ResourceRolePhaseDependency
     *   }
     * })
     * 
     */
    delete<T extends ResourceRolePhaseDependencyDeleteArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyDeleteArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceRolePhaseDependency.
     * @param {ResourceRolePhaseDependencyUpdateArgs} args - Arguments to update one ResourceRolePhaseDependency.
     * @example
     * // Update one ResourceRolePhaseDependency
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceRolePhaseDependencyUpdateArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyUpdateArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceRolePhaseDependencies.
     * @param {ResourceRolePhaseDependencyDeleteManyArgs} args - Arguments to filter ResourceRolePhaseDependencies to delete.
     * @example
     * // Delete a few ResourceRolePhaseDependencies
     * const { count } = await prisma.resourceRolePhaseDependency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceRolePhaseDependencyDeleteManyArgs>(args?: SelectSubset<T, ResourceRolePhaseDependencyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceRolePhaseDependencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceRolePhaseDependencies
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceRolePhaseDependencyUpdateManyArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceRolePhaseDependencies and returns the data updated in the database.
     * @param {ResourceRolePhaseDependencyUpdateManyAndReturnArgs} args - Arguments to update many ResourceRolePhaseDependencies.
     * @example
     * // Update many ResourceRolePhaseDependencies
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceRolePhaseDependencies and only return the `id`
     * const resourceRolePhaseDependencyWithIdOnly = await prisma.resourceRolePhaseDependency.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceRolePhaseDependencyUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceRolePhaseDependency.
     * @param {ResourceRolePhaseDependencyUpsertArgs} args - Arguments to update or create a ResourceRolePhaseDependency.
     * @example
     * // Update or create a ResourceRolePhaseDependency
     * const resourceRolePhaseDependency = await prisma.resourceRolePhaseDependency.upsert({
     *   create: {
     *     // ... data to create a ResourceRolePhaseDependency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceRolePhaseDependency we want to update
     *   }
     * })
     */
    upsert<T extends ResourceRolePhaseDependencyUpsertArgs>(args: SelectSubset<T, ResourceRolePhaseDependencyUpsertArgs<ExtArgs>>): Prisma__ResourceRolePhaseDependencyClient<$Result.GetResult<Prisma.$ResourceRolePhaseDependencyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceRolePhaseDependencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyCountArgs} args - Arguments to filter ResourceRolePhaseDependencies to count.
     * @example
     * // Count the number of ResourceRolePhaseDependencies
     * const count = await prisma.resourceRolePhaseDependency.count({
     *   where: {
     *     // ... the filter for the ResourceRolePhaseDependencies we want to count
     *   }
     * })
    **/
    count<T extends ResourceRolePhaseDependencyCountArgs>(
      args?: Subset<T, ResourceRolePhaseDependencyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceRolePhaseDependencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceRolePhaseDependency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceRolePhaseDependencyAggregateArgs>(args: Subset<T, ResourceRolePhaseDependencyAggregateArgs>): Prisma.PrismaPromise<GetResourceRolePhaseDependencyAggregateType<T>>

    /**
     * Group by ResourceRolePhaseDependency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceRolePhaseDependencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceRolePhaseDependencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceRolePhaseDependencyGroupByArgs['orderBy'] }
        : { orderBy?: ResourceRolePhaseDependencyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceRolePhaseDependencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceRolePhaseDependencyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceRolePhaseDependency model
   */
  readonly fields: ResourceRolePhaseDependencyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceRolePhaseDependency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceRolePhaseDependencyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resourceRole<T extends ResourceRoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceRoleDefaultArgs<ExtArgs>>): Prisma__ResourceRoleClient<$Result.GetResult<Prisma.$ResourceRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceRolePhaseDependency model
   */
  interface ResourceRolePhaseDependencyFieldRefs {
    readonly id: FieldRef<"ResourceRolePhaseDependency", 'String'>
    readonly phaseId: FieldRef<"ResourceRolePhaseDependency", 'String'>
    readonly resourceRoleId: FieldRef<"ResourceRolePhaseDependency", 'String'>
    readonly phaseState: FieldRef<"ResourceRolePhaseDependency", 'Boolean'>
    readonly createdAt: FieldRef<"ResourceRolePhaseDependency", 'DateTime'>
    readonly createdBy: FieldRef<"ResourceRolePhaseDependency", 'String'>
    readonly updatedAt: FieldRef<"ResourceRolePhaseDependency", 'DateTime'>
    readonly updatedBy: FieldRef<"ResourceRolePhaseDependency", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResourceRolePhaseDependency findUnique
   */
  export type ResourceRolePhaseDependencyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRolePhaseDependency to fetch.
     */
    where: ResourceRolePhaseDependencyWhereUniqueInput
  }

  /**
   * ResourceRolePhaseDependency findUniqueOrThrow
   */
  export type ResourceRolePhaseDependencyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRolePhaseDependency to fetch.
     */
    where: ResourceRolePhaseDependencyWhereUniqueInput
  }

  /**
   * ResourceRolePhaseDependency findFirst
   */
  export type ResourceRolePhaseDependencyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRolePhaseDependency to fetch.
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRolePhaseDependencies to fetch.
     */
    orderBy?: ResourceRolePhaseDependencyOrderByWithRelationInput | ResourceRolePhaseDependencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceRolePhaseDependencies.
     */
    cursor?: ResourceRolePhaseDependencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRolePhaseDependencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRolePhaseDependencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceRolePhaseDependencies.
     */
    distinct?: ResourceRolePhaseDependencyScalarFieldEnum | ResourceRolePhaseDependencyScalarFieldEnum[]
  }

  /**
   * ResourceRolePhaseDependency findFirstOrThrow
   */
  export type ResourceRolePhaseDependencyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRolePhaseDependency to fetch.
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRolePhaseDependencies to fetch.
     */
    orderBy?: ResourceRolePhaseDependencyOrderByWithRelationInput | ResourceRolePhaseDependencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceRolePhaseDependencies.
     */
    cursor?: ResourceRolePhaseDependencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRolePhaseDependencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRolePhaseDependencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceRolePhaseDependencies.
     */
    distinct?: ResourceRolePhaseDependencyScalarFieldEnum | ResourceRolePhaseDependencyScalarFieldEnum[]
  }

  /**
   * ResourceRolePhaseDependency findMany
   */
  export type ResourceRolePhaseDependencyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * Filter, which ResourceRolePhaseDependencies to fetch.
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceRolePhaseDependencies to fetch.
     */
    orderBy?: ResourceRolePhaseDependencyOrderByWithRelationInput | ResourceRolePhaseDependencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceRolePhaseDependencies.
     */
    cursor?: ResourceRolePhaseDependencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceRolePhaseDependencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceRolePhaseDependencies.
     */
    skip?: number
    distinct?: ResourceRolePhaseDependencyScalarFieldEnum | ResourceRolePhaseDependencyScalarFieldEnum[]
  }

  /**
   * ResourceRolePhaseDependency create
   */
  export type ResourceRolePhaseDependencyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceRolePhaseDependency.
     */
    data: XOR<ResourceRolePhaseDependencyCreateInput, ResourceRolePhaseDependencyUncheckedCreateInput>
  }

  /**
   * ResourceRolePhaseDependency createMany
   */
  export type ResourceRolePhaseDependencyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceRolePhaseDependencies.
     */
    data: ResourceRolePhaseDependencyCreateManyInput | ResourceRolePhaseDependencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceRolePhaseDependency createManyAndReturn
   */
  export type ResourceRolePhaseDependencyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceRolePhaseDependencies.
     */
    data: ResourceRolePhaseDependencyCreateManyInput | ResourceRolePhaseDependencyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceRolePhaseDependency update
   */
  export type ResourceRolePhaseDependencyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceRolePhaseDependency.
     */
    data: XOR<ResourceRolePhaseDependencyUpdateInput, ResourceRolePhaseDependencyUncheckedUpdateInput>
    /**
     * Choose, which ResourceRolePhaseDependency to update.
     */
    where: ResourceRolePhaseDependencyWhereUniqueInput
  }

  /**
   * ResourceRolePhaseDependency updateMany
   */
  export type ResourceRolePhaseDependencyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceRolePhaseDependencies.
     */
    data: XOR<ResourceRolePhaseDependencyUpdateManyMutationInput, ResourceRolePhaseDependencyUncheckedUpdateManyInput>
    /**
     * Filter which ResourceRolePhaseDependencies to update
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * Limit how many ResourceRolePhaseDependencies to update.
     */
    limit?: number
  }

  /**
   * ResourceRolePhaseDependency updateManyAndReturn
   */
  export type ResourceRolePhaseDependencyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * The data used to update ResourceRolePhaseDependencies.
     */
    data: XOR<ResourceRolePhaseDependencyUpdateManyMutationInput, ResourceRolePhaseDependencyUncheckedUpdateManyInput>
    /**
     * Filter which ResourceRolePhaseDependencies to update
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * Limit how many ResourceRolePhaseDependencies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceRolePhaseDependency upsert
   */
  export type ResourceRolePhaseDependencyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceRolePhaseDependency to update in case it exists.
     */
    where: ResourceRolePhaseDependencyWhereUniqueInput
    /**
     * In case the ResourceRolePhaseDependency found by the `where` argument doesn't exist, create a new ResourceRolePhaseDependency with this data.
     */
    create: XOR<ResourceRolePhaseDependencyCreateInput, ResourceRolePhaseDependencyUncheckedCreateInput>
    /**
     * In case the ResourceRolePhaseDependency was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceRolePhaseDependencyUpdateInput, ResourceRolePhaseDependencyUncheckedUpdateInput>
  }

  /**
   * ResourceRolePhaseDependency delete
   */
  export type ResourceRolePhaseDependencyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
    /**
     * Filter which ResourceRolePhaseDependency to delete.
     */
    where: ResourceRolePhaseDependencyWhereUniqueInput
  }

  /**
   * ResourceRolePhaseDependency deleteMany
   */
  export type ResourceRolePhaseDependencyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceRolePhaseDependencies to delete
     */
    where?: ResourceRolePhaseDependencyWhereInput
    /**
     * Limit how many ResourceRolePhaseDependencies to delete.
     */
    limit?: number
  }

  /**
   * ResourceRolePhaseDependency without action
   */
  export type ResourceRolePhaseDependencyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceRolePhaseDependency
     */
    select?: ResourceRolePhaseDependencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceRolePhaseDependency
     */
    omit?: ResourceRolePhaseDependencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceRolePhaseDependencyInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ResourceRoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameLower: 'nameLower',
    fullReadAccess: 'fullReadAccess',
    fullWriteAccess: 'fullWriteAccess',
    isActive: 'isActive',
    selfObtainable: 'selfObtainable',
    legacyId: 'legacyId',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type ResourceRoleScalarFieldEnum = (typeof ResourceRoleScalarFieldEnum)[keyof typeof ResourceRoleScalarFieldEnum]


  export const ResourceScalarFieldEnum: {
    id: 'id',
    challengeId: 'challengeId',
    memberId: 'memberId',
    memberHandle: 'memberHandle',
    roleId: 'roleId',
    legacyId: 'legacyId',
    phaseChangeNotifications: 'phaseChangeNotifications',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum]


  export const ResourceRolePhaseDependencyScalarFieldEnum: {
    id: 'id',
    phaseId: 'phaseId',
    resourceRoleId: 'resourceRoleId',
    phaseState: 'phaseState',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type ResourceRolePhaseDependencyScalarFieldEnum = (typeof ResourceRolePhaseDependencyScalarFieldEnum)[keyof typeof ResourceRolePhaseDependencyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ResourceRoleWhereInput = {
    AND?: ResourceRoleWhereInput | ResourceRoleWhereInput[]
    OR?: ResourceRoleWhereInput[]
    NOT?: ResourceRoleWhereInput | ResourceRoleWhereInput[]
    id?: StringFilter<"ResourceRole"> | string
    name?: StringFilter<"ResourceRole"> | string
    nameLower?: StringFilter<"ResourceRole"> | string
    fullReadAccess?: BoolFilter<"ResourceRole"> | boolean
    fullWriteAccess?: BoolFilter<"ResourceRole"> | boolean
    isActive?: BoolFilter<"ResourceRole"> | boolean
    selfObtainable?: BoolFilter<"ResourceRole"> | boolean
    legacyId?: IntNullableFilter<"ResourceRole"> | number | null
    createdAt?: DateTimeFilter<"ResourceRole"> | Date | string
    createdBy?: StringFilter<"ResourceRole"> | string
    updatedAt?: DateTimeNullableFilter<"ResourceRole"> | Date | string | null
    updatedBy?: StringNullableFilter<"ResourceRole"> | string | null
    resources?: ResourceListRelationFilter
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyListRelationFilter
  }

  export type ResourceRoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameLower?: SortOrder
    fullReadAccess?: SortOrder
    fullWriteAccess?: SortOrder
    isActive?: SortOrder
    selfObtainable?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    resources?: ResourceOrderByRelationAggregateInput
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyOrderByRelationAggregateInput
  }

  export type ResourceRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResourceRoleWhereInput | ResourceRoleWhereInput[]
    OR?: ResourceRoleWhereInput[]
    NOT?: ResourceRoleWhereInput | ResourceRoleWhereInput[]
    name?: StringFilter<"ResourceRole"> | string
    nameLower?: StringFilter<"ResourceRole"> | string
    fullReadAccess?: BoolFilter<"ResourceRole"> | boolean
    fullWriteAccess?: BoolFilter<"ResourceRole"> | boolean
    isActive?: BoolFilter<"ResourceRole"> | boolean
    selfObtainable?: BoolFilter<"ResourceRole"> | boolean
    legacyId?: IntNullableFilter<"ResourceRole"> | number | null
    createdAt?: DateTimeFilter<"ResourceRole"> | Date | string
    createdBy?: StringFilter<"ResourceRole"> | string
    updatedAt?: DateTimeNullableFilter<"ResourceRole"> | Date | string | null
    updatedBy?: StringNullableFilter<"ResourceRole"> | string | null
    resources?: ResourceListRelationFilter
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyListRelationFilter
  }, "id">

  export type ResourceRoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameLower?: SortOrder
    fullReadAccess?: SortOrder
    fullWriteAccess?: SortOrder
    isActive?: SortOrder
    selfObtainable?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ResourceRoleCountOrderByAggregateInput
    _avg?: ResourceRoleAvgOrderByAggregateInput
    _max?: ResourceRoleMaxOrderByAggregateInput
    _min?: ResourceRoleMinOrderByAggregateInput
    _sum?: ResourceRoleSumOrderByAggregateInput
  }

  export type ResourceRoleScalarWhereWithAggregatesInput = {
    AND?: ResourceRoleScalarWhereWithAggregatesInput | ResourceRoleScalarWhereWithAggregatesInput[]
    OR?: ResourceRoleScalarWhereWithAggregatesInput[]
    NOT?: ResourceRoleScalarWhereWithAggregatesInput | ResourceRoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResourceRole"> | string
    name?: StringWithAggregatesFilter<"ResourceRole"> | string
    nameLower?: StringWithAggregatesFilter<"ResourceRole"> | string
    fullReadAccess?: BoolWithAggregatesFilter<"ResourceRole"> | boolean
    fullWriteAccess?: BoolWithAggregatesFilter<"ResourceRole"> | boolean
    isActive?: BoolWithAggregatesFilter<"ResourceRole"> | boolean
    selfObtainable?: BoolWithAggregatesFilter<"ResourceRole"> | boolean
    legacyId?: IntNullableWithAggregatesFilter<"ResourceRole"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ResourceRole"> | Date | string
    createdBy?: StringWithAggregatesFilter<"ResourceRole"> | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"ResourceRole"> | Date | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"ResourceRole"> | string | null
  }

  export type ResourceWhereInput = {
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    id?: StringFilter<"Resource"> | string
    challengeId?: StringFilter<"Resource"> | string
    memberId?: StringFilter<"Resource"> | string
    memberHandle?: StringFilter<"Resource"> | string
    roleId?: StringFilter<"Resource"> | string
    legacyId?: IntNullableFilter<"Resource"> | number | null
    phaseChangeNotifications?: BoolNullableFilter<"Resource"> | boolean | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    createdBy?: StringFilter<"Resource"> | string
    updatedAt?: DateTimeNullableFilter<"Resource"> | Date | string | null
    updatedBy?: StringNullableFilter<"Resource"> | string | null
    resourceRole?: XOR<ResourceRoleScalarRelationFilter, ResourceRoleWhereInput>
  }

  export type ResourceOrderByWithRelationInput = {
    id?: SortOrder
    challengeId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    roleId?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    phaseChangeNotifications?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    resourceRole?: ResourceRoleOrderByWithRelationInput
  }

  export type ResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    challengeId?: StringFilter<"Resource"> | string
    memberId?: StringFilter<"Resource"> | string
    memberHandle?: StringFilter<"Resource"> | string
    roleId?: StringFilter<"Resource"> | string
    legacyId?: IntNullableFilter<"Resource"> | number | null
    phaseChangeNotifications?: BoolNullableFilter<"Resource"> | boolean | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    createdBy?: StringFilter<"Resource"> | string
    updatedAt?: DateTimeNullableFilter<"Resource"> | Date | string | null
    updatedBy?: StringNullableFilter<"Resource"> | string | null
    resourceRole?: XOR<ResourceRoleScalarRelationFilter, ResourceRoleWhereInput>
  }, "id">

  export type ResourceOrderByWithAggregationInput = {
    id?: SortOrder
    challengeId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    roleId?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    phaseChangeNotifications?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ResourceCountOrderByAggregateInput
    _avg?: ResourceAvgOrderByAggregateInput
    _max?: ResourceMaxOrderByAggregateInput
    _min?: ResourceMinOrderByAggregateInput
    _sum?: ResourceSumOrderByAggregateInput
  }

  export type ResourceScalarWhereWithAggregatesInput = {
    AND?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    OR?: ResourceScalarWhereWithAggregatesInput[]
    NOT?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resource"> | string
    challengeId?: StringWithAggregatesFilter<"Resource"> | string
    memberId?: StringWithAggregatesFilter<"Resource"> | string
    memberHandle?: StringWithAggregatesFilter<"Resource"> | string
    roleId?: StringWithAggregatesFilter<"Resource"> | string
    legacyId?: IntNullableWithAggregatesFilter<"Resource"> | number | null
    phaseChangeNotifications?: BoolNullableWithAggregatesFilter<"Resource"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"Resource"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Resource"> | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Resource"> | Date | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Resource"> | string | null
  }

  export type ResourceRolePhaseDependencyWhereInput = {
    AND?: ResourceRolePhaseDependencyWhereInput | ResourceRolePhaseDependencyWhereInput[]
    OR?: ResourceRolePhaseDependencyWhereInput[]
    NOT?: ResourceRolePhaseDependencyWhereInput | ResourceRolePhaseDependencyWhereInput[]
    id?: StringFilter<"ResourceRolePhaseDependency"> | string
    phaseId?: StringFilter<"ResourceRolePhaseDependency"> | string
    resourceRoleId?: StringFilter<"ResourceRolePhaseDependency"> | string
    phaseState?: BoolFilter<"ResourceRolePhaseDependency"> | boolean
    createdAt?: DateTimeFilter<"ResourceRolePhaseDependency"> | Date | string
    createdBy?: StringFilter<"ResourceRolePhaseDependency"> | string
    updatedAt?: DateTimeNullableFilter<"ResourceRolePhaseDependency"> | Date | string | null
    updatedBy?: StringNullableFilter<"ResourceRolePhaseDependency"> | string | null
    resourceRole?: XOR<ResourceRoleScalarRelationFilter, ResourceRoleWhereInput>
  }

  export type ResourceRolePhaseDependencyOrderByWithRelationInput = {
    id?: SortOrder
    phaseId?: SortOrder
    resourceRoleId?: SortOrder
    phaseState?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    resourceRole?: ResourceRoleOrderByWithRelationInput
  }

  export type ResourceRolePhaseDependencyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    phaseId_resourceRoleId?: ResourceRolePhaseDependencyPhaseIdResourceRoleIdCompoundUniqueInput
    AND?: ResourceRolePhaseDependencyWhereInput | ResourceRolePhaseDependencyWhereInput[]
    OR?: ResourceRolePhaseDependencyWhereInput[]
    NOT?: ResourceRolePhaseDependencyWhereInput | ResourceRolePhaseDependencyWhereInput[]
    phaseId?: StringFilter<"ResourceRolePhaseDependency"> | string
    resourceRoleId?: StringFilter<"ResourceRolePhaseDependency"> | string
    phaseState?: BoolFilter<"ResourceRolePhaseDependency"> | boolean
    createdAt?: DateTimeFilter<"ResourceRolePhaseDependency"> | Date | string
    createdBy?: StringFilter<"ResourceRolePhaseDependency"> | string
    updatedAt?: DateTimeNullableFilter<"ResourceRolePhaseDependency"> | Date | string | null
    updatedBy?: StringNullableFilter<"ResourceRolePhaseDependency"> | string | null
    resourceRole?: XOR<ResourceRoleScalarRelationFilter, ResourceRoleWhereInput>
  }, "id" | "phaseId_resourceRoleId">

  export type ResourceRolePhaseDependencyOrderByWithAggregationInput = {
    id?: SortOrder
    phaseId?: SortOrder
    resourceRoleId?: SortOrder
    phaseState?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: ResourceRolePhaseDependencyCountOrderByAggregateInput
    _max?: ResourceRolePhaseDependencyMaxOrderByAggregateInput
    _min?: ResourceRolePhaseDependencyMinOrderByAggregateInput
  }

  export type ResourceRolePhaseDependencyScalarWhereWithAggregatesInput = {
    AND?: ResourceRolePhaseDependencyScalarWhereWithAggregatesInput | ResourceRolePhaseDependencyScalarWhereWithAggregatesInput[]
    OR?: ResourceRolePhaseDependencyScalarWhereWithAggregatesInput[]
    NOT?: ResourceRolePhaseDependencyScalarWhereWithAggregatesInput | ResourceRolePhaseDependencyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResourceRolePhaseDependency"> | string
    phaseId?: StringWithAggregatesFilter<"ResourceRolePhaseDependency"> | string
    resourceRoleId?: StringWithAggregatesFilter<"ResourceRolePhaseDependency"> | string
    phaseState?: BoolWithAggregatesFilter<"ResourceRolePhaseDependency"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ResourceRolePhaseDependency"> | Date | string
    createdBy?: StringWithAggregatesFilter<"ResourceRolePhaseDependency"> | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"ResourceRolePhaseDependency"> | Date | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"ResourceRolePhaseDependency"> | string | null
  }

  export type ResourceRoleCreateInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resources?: ResourceCreateNestedManyWithoutResourceRoleInput
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyCreateNestedManyWithoutResourceRoleInput
  }

  export type ResourceRoleUncheckedCreateInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resources?: ResourceUncheckedCreateNestedManyWithoutResourceRoleInput
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyUncheckedCreateNestedManyWithoutResourceRoleInput
  }

  export type ResourceRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resources?: ResourceUpdateManyWithoutResourceRoleNestedInput
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyUpdateManyWithoutResourceRoleNestedInput
  }

  export type ResourceRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resources?: ResourceUncheckedUpdateManyWithoutResourceRoleNestedInput
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyUncheckedUpdateManyWithoutResourceRoleNestedInput
  }

  export type ResourceRoleCreateManyInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceCreateInput = {
    id?: string
    challengeId: string
    memberId: string
    memberHandle: string
    legacyId?: number | null
    phaseChangeNotifications?: boolean | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resourceRole: ResourceRoleCreateNestedOneWithoutResourcesInput
  }

  export type ResourceUncheckedCreateInput = {
    id?: string
    challengeId: string
    memberId: string
    memberHandle: string
    roleId: string
    legacyId?: number | null
    phaseChangeNotifications?: boolean | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resourceRole?: ResourceRoleUpdateOneRequiredWithoutResourcesNestedInput
  }

  export type ResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceCreateManyInput = {
    id?: string
    challengeId: string
    memberId: string
    memberHandle: string
    roleId: string
    legacyId?: number | null
    phaseChangeNotifications?: boolean | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRolePhaseDependencyCreateInput = {
    id?: string
    phaseId: string
    phaseState: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resourceRole: ResourceRoleCreateNestedOneWithoutResourceRolePhaseDependenciesInput
  }

  export type ResourceRolePhaseDependencyUncheckedCreateInput = {
    id?: string
    phaseId: string
    resourceRoleId: string
    phaseState: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceRolePhaseDependencyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resourceRole?: ResourceRoleUpdateOneRequiredWithoutResourceRolePhaseDependenciesNestedInput
  }

  export type ResourceRolePhaseDependencyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    resourceRoleId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRolePhaseDependencyCreateManyInput = {
    id?: string
    phaseId: string
    resourceRoleId: string
    phaseState: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceRolePhaseDependencyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRolePhaseDependencyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    resourceRoleId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ResourceListRelationFilter = {
    every?: ResourceWhereInput
    some?: ResourceWhereInput
    none?: ResourceWhereInput
  }

  export type ResourceRolePhaseDependencyListRelationFilter = {
    every?: ResourceRolePhaseDependencyWhereInput
    some?: ResourceRolePhaseDependencyWhereInput
    none?: ResourceRolePhaseDependencyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ResourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceRolePhaseDependencyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceRoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameLower?: SortOrder
    fullReadAccess?: SortOrder
    fullWriteAccess?: SortOrder
    isActive?: SortOrder
    selfObtainable?: SortOrder
    legacyId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceRoleAvgOrderByAggregateInput = {
    legacyId?: SortOrder
  }

  export type ResourceRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameLower?: SortOrder
    fullReadAccess?: SortOrder
    fullWriteAccess?: SortOrder
    isActive?: SortOrder
    selfObtainable?: SortOrder
    legacyId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceRoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameLower?: SortOrder
    fullReadAccess?: SortOrder
    fullWriteAccess?: SortOrder
    isActive?: SortOrder
    selfObtainable?: SortOrder
    legacyId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceRoleSumOrderByAggregateInput = {
    legacyId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type ResourceRoleScalarRelationFilter = {
    is?: ResourceRoleWhereInput
    isNot?: ResourceRoleWhereInput
  }

  export type ResourceCountOrderByAggregateInput = {
    id?: SortOrder
    challengeId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    roleId?: SortOrder
    legacyId?: SortOrder
    phaseChangeNotifications?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceAvgOrderByAggregateInput = {
    legacyId?: SortOrder
  }

  export type ResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    challengeId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    roleId?: SortOrder
    legacyId?: SortOrder
    phaseChangeNotifications?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceMinOrderByAggregateInput = {
    id?: SortOrder
    challengeId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    roleId?: SortOrder
    legacyId?: SortOrder
    phaseChangeNotifications?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceSumOrderByAggregateInput = {
    legacyId?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ResourceRolePhaseDependencyPhaseIdResourceRoleIdCompoundUniqueInput = {
    phaseId: string
    resourceRoleId: string
  }

  export type ResourceRolePhaseDependencyCountOrderByAggregateInput = {
    id?: SortOrder
    phaseId?: SortOrder
    resourceRoleId?: SortOrder
    phaseState?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceRolePhaseDependencyMaxOrderByAggregateInput = {
    id?: SortOrder
    phaseId?: SortOrder
    resourceRoleId?: SortOrder
    phaseState?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceRolePhaseDependencyMinOrderByAggregateInput = {
    id?: SortOrder
    phaseId?: SortOrder
    resourceRoleId?: SortOrder
    phaseState?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type ResourceCreateNestedManyWithoutResourceRoleInput = {
    create?: XOR<ResourceCreateWithoutResourceRoleInput, ResourceUncheckedCreateWithoutResourceRoleInput> | ResourceCreateWithoutResourceRoleInput[] | ResourceUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceRoleInput | ResourceCreateOrConnectWithoutResourceRoleInput[]
    createMany?: ResourceCreateManyResourceRoleInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceRolePhaseDependencyCreateNestedManyWithoutResourceRoleInput = {
    create?: XOR<ResourceRolePhaseDependencyCreateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput> | ResourceRolePhaseDependencyCreateWithoutResourceRoleInput[] | ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput | ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput[]
    createMany?: ResourceRolePhaseDependencyCreateManyResourceRoleInputEnvelope
    connect?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
  }

  export type ResourceUncheckedCreateNestedManyWithoutResourceRoleInput = {
    create?: XOR<ResourceCreateWithoutResourceRoleInput, ResourceUncheckedCreateWithoutResourceRoleInput> | ResourceCreateWithoutResourceRoleInput[] | ResourceUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceRoleInput | ResourceCreateOrConnectWithoutResourceRoleInput[]
    createMany?: ResourceCreateManyResourceRoleInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceRolePhaseDependencyUncheckedCreateNestedManyWithoutResourceRoleInput = {
    create?: XOR<ResourceRolePhaseDependencyCreateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput> | ResourceRolePhaseDependencyCreateWithoutResourceRoleInput[] | ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput | ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput[]
    createMany?: ResourceRolePhaseDependencyCreateManyResourceRoleInputEnvelope
    connect?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ResourceUpdateManyWithoutResourceRoleNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceRoleInput, ResourceUncheckedCreateWithoutResourceRoleInput> | ResourceCreateWithoutResourceRoleInput[] | ResourceUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceRoleInput | ResourceCreateOrConnectWithoutResourceRoleInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutResourceRoleInput | ResourceUpsertWithWhereUniqueWithoutResourceRoleInput[]
    createMany?: ResourceCreateManyResourceRoleInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutResourceRoleInput | ResourceUpdateWithWhereUniqueWithoutResourceRoleInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutResourceRoleInput | ResourceUpdateManyWithWhereWithoutResourceRoleInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceRolePhaseDependencyUpdateManyWithoutResourceRoleNestedInput = {
    create?: XOR<ResourceRolePhaseDependencyCreateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput> | ResourceRolePhaseDependencyCreateWithoutResourceRoleInput[] | ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput | ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput[]
    upsert?: ResourceRolePhaseDependencyUpsertWithWhereUniqueWithoutResourceRoleInput | ResourceRolePhaseDependencyUpsertWithWhereUniqueWithoutResourceRoleInput[]
    createMany?: ResourceRolePhaseDependencyCreateManyResourceRoleInputEnvelope
    set?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    disconnect?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    delete?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    connect?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    update?: ResourceRolePhaseDependencyUpdateWithWhereUniqueWithoutResourceRoleInput | ResourceRolePhaseDependencyUpdateWithWhereUniqueWithoutResourceRoleInput[]
    updateMany?: ResourceRolePhaseDependencyUpdateManyWithWhereWithoutResourceRoleInput | ResourceRolePhaseDependencyUpdateManyWithWhereWithoutResourceRoleInput[]
    deleteMany?: ResourceRolePhaseDependencyScalarWhereInput | ResourceRolePhaseDependencyScalarWhereInput[]
  }

  export type ResourceUncheckedUpdateManyWithoutResourceRoleNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceRoleInput, ResourceUncheckedCreateWithoutResourceRoleInput> | ResourceCreateWithoutResourceRoleInput[] | ResourceUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceRoleInput | ResourceCreateOrConnectWithoutResourceRoleInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutResourceRoleInput | ResourceUpsertWithWhereUniqueWithoutResourceRoleInput[]
    createMany?: ResourceCreateManyResourceRoleInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutResourceRoleInput | ResourceUpdateWithWhereUniqueWithoutResourceRoleInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutResourceRoleInput | ResourceUpdateManyWithWhereWithoutResourceRoleInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceRolePhaseDependencyUncheckedUpdateManyWithoutResourceRoleNestedInput = {
    create?: XOR<ResourceRolePhaseDependencyCreateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput> | ResourceRolePhaseDependencyCreateWithoutResourceRoleInput[] | ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput[]
    connectOrCreate?: ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput | ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput[]
    upsert?: ResourceRolePhaseDependencyUpsertWithWhereUniqueWithoutResourceRoleInput | ResourceRolePhaseDependencyUpsertWithWhereUniqueWithoutResourceRoleInput[]
    createMany?: ResourceRolePhaseDependencyCreateManyResourceRoleInputEnvelope
    set?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    disconnect?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    delete?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    connect?: ResourceRolePhaseDependencyWhereUniqueInput | ResourceRolePhaseDependencyWhereUniqueInput[]
    update?: ResourceRolePhaseDependencyUpdateWithWhereUniqueWithoutResourceRoleInput | ResourceRolePhaseDependencyUpdateWithWhereUniqueWithoutResourceRoleInput[]
    updateMany?: ResourceRolePhaseDependencyUpdateManyWithWhereWithoutResourceRoleInput | ResourceRolePhaseDependencyUpdateManyWithWhereWithoutResourceRoleInput[]
    deleteMany?: ResourceRolePhaseDependencyScalarWhereInput | ResourceRolePhaseDependencyScalarWhereInput[]
  }

  export type ResourceRoleCreateNestedOneWithoutResourcesInput = {
    create?: XOR<ResourceRoleCreateWithoutResourcesInput, ResourceRoleUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: ResourceRoleCreateOrConnectWithoutResourcesInput
    connect?: ResourceRoleWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type ResourceRoleUpdateOneRequiredWithoutResourcesNestedInput = {
    create?: XOR<ResourceRoleCreateWithoutResourcesInput, ResourceRoleUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: ResourceRoleCreateOrConnectWithoutResourcesInput
    upsert?: ResourceRoleUpsertWithoutResourcesInput
    connect?: ResourceRoleWhereUniqueInput
    update?: XOR<XOR<ResourceRoleUpdateToOneWithWhereWithoutResourcesInput, ResourceRoleUpdateWithoutResourcesInput>, ResourceRoleUncheckedUpdateWithoutResourcesInput>
  }

  export type ResourceRoleCreateNestedOneWithoutResourceRolePhaseDependenciesInput = {
    create?: XOR<ResourceRoleCreateWithoutResourceRolePhaseDependenciesInput, ResourceRoleUncheckedCreateWithoutResourceRolePhaseDependenciesInput>
    connectOrCreate?: ResourceRoleCreateOrConnectWithoutResourceRolePhaseDependenciesInput
    connect?: ResourceRoleWhereUniqueInput
  }

  export type ResourceRoleUpdateOneRequiredWithoutResourceRolePhaseDependenciesNestedInput = {
    create?: XOR<ResourceRoleCreateWithoutResourceRolePhaseDependenciesInput, ResourceRoleUncheckedCreateWithoutResourceRolePhaseDependenciesInput>
    connectOrCreate?: ResourceRoleCreateOrConnectWithoutResourceRolePhaseDependenciesInput
    upsert?: ResourceRoleUpsertWithoutResourceRolePhaseDependenciesInput
    connect?: ResourceRoleWhereUniqueInput
    update?: XOR<XOR<ResourceRoleUpdateToOneWithWhereWithoutResourceRolePhaseDependenciesInput, ResourceRoleUpdateWithoutResourceRolePhaseDependenciesInput>, ResourceRoleUncheckedUpdateWithoutResourceRolePhaseDependenciesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ResourceCreateWithoutResourceRoleInput = {
    id?: string
    challengeId: string
    memberId: string
    memberHandle: string
    legacyId?: number | null
    phaseChangeNotifications?: boolean | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceUncheckedCreateWithoutResourceRoleInput = {
    id?: string
    challengeId: string
    memberId: string
    memberHandle: string
    legacyId?: number | null
    phaseChangeNotifications?: boolean | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceCreateOrConnectWithoutResourceRoleInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutResourceRoleInput, ResourceUncheckedCreateWithoutResourceRoleInput>
  }

  export type ResourceCreateManyResourceRoleInputEnvelope = {
    data: ResourceCreateManyResourceRoleInput | ResourceCreateManyResourceRoleInput[]
    skipDuplicates?: boolean
  }

  export type ResourceRolePhaseDependencyCreateWithoutResourceRoleInput = {
    id?: string
    phaseId: string
    phaseState: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput = {
    id?: string
    phaseId: string
    phaseState: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceRolePhaseDependencyCreateOrConnectWithoutResourceRoleInput = {
    where: ResourceRolePhaseDependencyWhereUniqueInput
    create: XOR<ResourceRolePhaseDependencyCreateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput>
  }

  export type ResourceRolePhaseDependencyCreateManyResourceRoleInputEnvelope = {
    data: ResourceRolePhaseDependencyCreateManyResourceRoleInput | ResourceRolePhaseDependencyCreateManyResourceRoleInput[]
    skipDuplicates?: boolean
  }

  export type ResourceUpsertWithWhereUniqueWithoutResourceRoleInput = {
    where: ResourceWhereUniqueInput
    update: XOR<ResourceUpdateWithoutResourceRoleInput, ResourceUncheckedUpdateWithoutResourceRoleInput>
    create: XOR<ResourceCreateWithoutResourceRoleInput, ResourceUncheckedCreateWithoutResourceRoleInput>
  }

  export type ResourceUpdateWithWhereUniqueWithoutResourceRoleInput = {
    where: ResourceWhereUniqueInput
    data: XOR<ResourceUpdateWithoutResourceRoleInput, ResourceUncheckedUpdateWithoutResourceRoleInput>
  }

  export type ResourceUpdateManyWithWhereWithoutResourceRoleInput = {
    where: ResourceScalarWhereInput
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutResourceRoleInput>
  }

  export type ResourceScalarWhereInput = {
    AND?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    OR?: ResourceScalarWhereInput[]
    NOT?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    id?: StringFilter<"Resource"> | string
    challengeId?: StringFilter<"Resource"> | string
    memberId?: StringFilter<"Resource"> | string
    memberHandle?: StringFilter<"Resource"> | string
    roleId?: StringFilter<"Resource"> | string
    legacyId?: IntNullableFilter<"Resource"> | number | null
    phaseChangeNotifications?: BoolNullableFilter<"Resource"> | boolean | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    createdBy?: StringFilter<"Resource"> | string
    updatedAt?: DateTimeNullableFilter<"Resource"> | Date | string | null
    updatedBy?: StringNullableFilter<"Resource"> | string | null
  }

  export type ResourceRolePhaseDependencyUpsertWithWhereUniqueWithoutResourceRoleInput = {
    where: ResourceRolePhaseDependencyWhereUniqueInput
    update: XOR<ResourceRolePhaseDependencyUpdateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedUpdateWithoutResourceRoleInput>
    create: XOR<ResourceRolePhaseDependencyCreateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedCreateWithoutResourceRoleInput>
  }

  export type ResourceRolePhaseDependencyUpdateWithWhereUniqueWithoutResourceRoleInput = {
    where: ResourceRolePhaseDependencyWhereUniqueInput
    data: XOR<ResourceRolePhaseDependencyUpdateWithoutResourceRoleInput, ResourceRolePhaseDependencyUncheckedUpdateWithoutResourceRoleInput>
  }

  export type ResourceRolePhaseDependencyUpdateManyWithWhereWithoutResourceRoleInput = {
    where: ResourceRolePhaseDependencyScalarWhereInput
    data: XOR<ResourceRolePhaseDependencyUpdateManyMutationInput, ResourceRolePhaseDependencyUncheckedUpdateManyWithoutResourceRoleInput>
  }

  export type ResourceRolePhaseDependencyScalarWhereInput = {
    AND?: ResourceRolePhaseDependencyScalarWhereInput | ResourceRolePhaseDependencyScalarWhereInput[]
    OR?: ResourceRolePhaseDependencyScalarWhereInput[]
    NOT?: ResourceRolePhaseDependencyScalarWhereInput | ResourceRolePhaseDependencyScalarWhereInput[]
    id?: StringFilter<"ResourceRolePhaseDependency"> | string
    phaseId?: StringFilter<"ResourceRolePhaseDependency"> | string
    resourceRoleId?: StringFilter<"ResourceRolePhaseDependency"> | string
    phaseState?: BoolFilter<"ResourceRolePhaseDependency"> | boolean
    createdAt?: DateTimeFilter<"ResourceRolePhaseDependency"> | Date | string
    createdBy?: StringFilter<"ResourceRolePhaseDependency"> | string
    updatedAt?: DateTimeNullableFilter<"ResourceRolePhaseDependency"> | Date | string | null
    updatedBy?: StringNullableFilter<"ResourceRolePhaseDependency"> | string | null
  }

  export type ResourceRoleCreateWithoutResourcesInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyCreateNestedManyWithoutResourceRoleInput
  }

  export type ResourceRoleUncheckedCreateWithoutResourcesInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyUncheckedCreateNestedManyWithoutResourceRoleInput
  }

  export type ResourceRoleCreateOrConnectWithoutResourcesInput = {
    where: ResourceRoleWhereUniqueInput
    create: XOR<ResourceRoleCreateWithoutResourcesInput, ResourceRoleUncheckedCreateWithoutResourcesInput>
  }

  export type ResourceRoleUpsertWithoutResourcesInput = {
    update: XOR<ResourceRoleUpdateWithoutResourcesInput, ResourceRoleUncheckedUpdateWithoutResourcesInput>
    create: XOR<ResourceRoleCreateWithoutResourcesInput, ResourceRoleUncheckedCreateWithoutResourcesInput>
    where?: ResourceRoleWhereInput
  }

  export type ResourceRoleUpdateToOneWithWhereWithoutResourcesInput = {
    where?: ResourceRoleWhereInput
    data: XOR<ResourceRoleUpdateWithoutResourcesInput, ResourceRoleUncheckedUpdateWithoutResourcesInput>
  }

  export type ResourceRoleUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyUpdateManyWithoutResourceRoleNestedInput
  }

  export type ResourceRoleUncheckedUpdateWithoutResourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resourceRolePhaseDependencies?: ResourceRolePhaseDependencyUncheckedUpdateManyWithoutResourceRoleNestedInput
  }

  export type ResourceRoleCreateWithoutResourceRolePhaseDependenciesInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resources?: ResourceCreateNestedManyWithoutResourceRoleInput
  }

  export type ResourceRoleUncheckedCreateWithoutResourceRolePhaseDependenciesInput = {
    id?: string
    name: string
    nameLower: string
    fullReadAccess: boolean
    fullWriteAccess: boolean
    isActive: boolean
    selfObtainable: boolean
    legacyId?: number | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
    resources?: ResourceUncheckedCreateNestedManyWithoutResourceRoleInput
  }

  export type ResourceRoleCreateOrConnectWithoutResourceRolePhaseDependenciesInput = {
    where: ResourceRoleWhereUniqueInput
    create: XOR<ResourceRoleCreateWithoutResourceRolePhaseDependenciesInput, ResourceRoleUncheckedCreateWithoutResourceRolePhaseDependenciesInput>
  }

  export type ResourceRoleUpsertWithoutResourceRolePhaseDependenciesInput = {
    update: XOR<ResourceRoleUpdateWithoutResourceRolePhaseDependenciesInput, ResourceRoleUncheckedUpdateWithoutResourceRolePhaseDependenciesInput>
    create: XOR<ResourceRoleCreateWithoutResourceRolePhaseDependenciesInput, ResourceRoleUncheckedCreateWithoutResourceRolePhaseDependenciesInput>
    where?: ResourceRoleWhereInput
  }

  export type ResourceRoleUpdateToOneWithWhereWithoutResourceRolePhaseDependenciesInput = {
    where?: ResourceRoleWhereInput
    data: XOR<ResourceRoleUpdateWithoutResourceRolePhaseDependenciesInput, ResourceRoleUncheckedUpdateWithoutResourceRolePhaseDependenciesInput>
  }

  export type ResourceRoleUpdateWithoutResourceRolePhaseDependenciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resources?: ResourceUpdateManyWithoutResourceRoleNestedInput
  }

  export type ResourceRoleUncheckedUpdateWithoutResourceRolePhaseDependenciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameLower?: StringFieldUpdateOperationsInput | string
    fullReadAccess?: BoolFieldUpdateOperationsInput | boolean
    fullWriteAccess?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    selfObtainable?: BoolFieldUpdateOperationsInput | boolean
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    resources?: ResourceUncheckedUpdateManyWithoutResourceRoleNestedInput
  }

  export type ResourceCreateManyResourceRoleInput = {
    id?: string
    challengeId: string
    memberId: string
    memberHandle: string
    legacyId?: number | null
    phaseChangeNotifications?: boolean | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceRolePhaseDependencyCreateManyResourceRoleInput = {
    id?: string
    phaseId: string
    phaseState: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string | null
    updatedBy?: string | null
  }

  export type ResourceUpdateWithoutResourceRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceUncheckedUpdateWithoutResourceRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceUncheckedUpdateManyWithoutResourceRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableIntFieldUpdateOperationsInput | number | null
    phaseChangeNotifications?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRolePhaseDependencyUpdateWithoutResourceRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRolePhaseDependencyUncheckedUpdateWithoutResourceRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResourceRolePhaseDependencyUncheckedUpdateManyWithoutResourceRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    phaseId?: StringFieldUpdateOperationsInput | string
    phaseState?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
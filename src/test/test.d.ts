declare namespace jest {
  interface Matchers<R> {
    toHaveGuard: (received: any) => CustomMatcherResult;
    toRequirePermissions: (...received: any) => CustomMatcherResult;
  }
}

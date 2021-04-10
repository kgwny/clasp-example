export {}

// eslint-disable-next-line
type Any = any

declare global {
  namespace NodeJS {
    // eslint-disable-next-line
    interface Global extends Any { }  // for adding gas funcs into global.*
  }
}

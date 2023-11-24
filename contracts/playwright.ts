import 'playwright'
declare module 'playwright' {
  export interface BrowserContext {
    loginAs(user): Promise<void>
  }
}

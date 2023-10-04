import type { Config, PluginFn } from '@japa/runner'
import playwright from 'playwright'
import type { Browser, Page } from 'playwright'
import { getDocument, getQueriesForElement, queries } from 'playwright-testing-library'

declare module '@japa/runner' {
  interface TestContext {
    page: Page
    login(enrollment: string, password: string): Promise<void>
    getScreen(): Promise<ReturnType<typeof getQueriesForElement>>
  }
}

type BrowserName = 'firefox' | 'webkit' | 'chromium'
type PlaywrightClientArgs = {
  /** defaults to firefox */
  browser?: BrowserName
  suiteName?: string
}

export function playwrightClient({
  browser: browserName = 'chromium',
  suiteName = 'e2e',
}: PlaywrightClientArgs = {}): PluginFn {
  return async function (_config, runner) {
    runner.onSuite((suite) => {
      if (suite.name === suiteName) {
        let browser: Browser

        suite.setup(async () => {
          // create a new browser instance, headless by default
          browser = await playwright[browserName].launch({ headless: process.env.HEADLESS !== '0' })
          return () => browser.close()
        })

        suite.onGroup((group) => {
          group.each.setup(async (test) => {
            test.context.page = await browser.newPage({
              baseURL: `http://127.0.0.1:${process.env.PORT}`,
            })
            test.context.login = async (enrollment, password) => {
              await test.context.page.goto('/login') // go to login page
              const loginDoc = await getDocument(test.context.page)
              const enrollmentInput = await queries.getByLabelText(loginDoc, 'Matrícula')
              const passwordInput = await queries.getByLabelText(loginDoc, 'Contraseña')

              await enrollmentInput.fill(enrollment) // enter enrollment arg
              await passwordInput.fill(password) // enter password arg

              await (await queries.findByText(loginDoc, 'Iniciar sesión')).click() // submit the form
            }
            test.context.getScreen = async () => {
              return getQueriesForElement(await getDocument(test.context.page))
            }

            return async () => {
              await test.context.page.close()
            }
          })
        })
      }
    })
  }
}

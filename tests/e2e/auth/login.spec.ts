import { test } from '@japa/runner'
test.group('login', (group) => {
  test('logs in', async ({ assert, page, getScreen, client }) => {
    await page.goto('/login')
    let screen = await getScreen()
    console.log(await page.innerHTML('body'))
    assert.exists(await screen.findByRole('heading', { level: 1, name: 'Inicia sesión' }))
  })
})

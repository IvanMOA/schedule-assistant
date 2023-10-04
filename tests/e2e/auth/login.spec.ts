import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'

test.group('login', () => {
  test('shows invalid credentials message a single time', async ({
    assert,
    page,
    getScreen,
    login,
  }) => {
    const mockedSiaseLoginRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('/')
      .query(() => true)
      .reply(200, siaseLoginMockedErrorResponse)
    await login('1911084', 'asdasd')
    let screen = await getScreen()
    assert.exists(await screen.findByText(/Credenciales inválidas/))
    await page.reload()
    screen = await getScreen()
    assert.notExists(await screen.queryByText(/Credenciales inválidas/))
    mockedSiaseLoginRequest.done()
  })
  test('logs in', async ({ assert, page, getScreen, login }) => {})
})

var siaseLoginMockedErrorResponse = `<LoginAppResponse xmlns="urn:siase:uanl:Uanl" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:S
                  OAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <result xsi:nil="true"></result>
  <pochUsuCve></pochUsuCve>
  <pochTipCve></pochTipCve>
  <pochNombre></pochNombre>
  <pochCtrl></pochCtrl>
  <Usu></Usu>
  <TipCve></TipCve>
  <ttError>
    <ttErrorRow>
      <lError>true</l
        Error>
        <cError>A2.- Combinación incorrecta usuario y clave.</cError>
    </ttErrorRow>
  </ttError>
  <ttCarrera></ttCarrera>
    <ttDepend></ttDepend>
</LoginAppResponse>
`

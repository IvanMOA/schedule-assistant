import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'
import Career from 'App/Models/Career'
import { useGlobalTransaction } from '../../useGlobalTransaction'
import User from 'App/Models/User'

test.group('login', (group) => {
  group.each.setup(useGlobalTransaction)
  test('shows invalid credentials message a single time', async ({ visit }) => {
    const page = await visit('/login')
    const mockedSiaseLoginRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query(() => true)
      .reply(200, siaseLoginMockedErrorResponse)

    await page.getByLabel('Matrícula').fill('2006610')
    await page.getByLabel('Contraseña').fill('asdasd')
    await page.getByText(/Iniciar sesión/).click()

    await page.assertExists(page.getByText(/Credenciales inválidas/))

    mockedSiaseLoginRequest.done()
  })
  test('logs in', async ({ assert, visit }) => {
    const page = await visit('/login')
    const mockedSiaseLoginRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query(() => true)
      .reply(200, siaseLoginMockedSuccessResponse)

    await page.getByLabel('Matrícula').fill('2006610')
    await page.getByLabel('Contraseña').fill('asdasd')
    await page.getByText(/Iniciar sesión/).click()

    await page.waitForURL('/')
    await page.assertExists(page.getByText(/Bienvenido, 2006610/))

    mockedSiaseLoginRequest.done()
    const careers = await Career.all()
    assert.isNotNull(await User.first())
    assert.lengthOf(careers, 3)
    assert.equal(careers[2].key, '0x0000000000a45c7c')
    assert.equal(careers[2].name, 'BACHILLERATO BILINGUE')
    assert.equal(careers[2].shortName, 'BBIL')
  })
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
var siaseLoginMockedSuccessResponse = `<LoginAppResponse xmlns="urn:SIASE:MovilNativo:MovilNativo" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <result xsi:nil="true"></result>
    <pochUsuCve>2006610</pochUsuCve>
    <pochTipCve></pochTipCve>
    <pochNombre>MARCELO TREVI&#xd1;O JUAREZ</pochNombre>
    <pochCtrl>tCwJEvzwH9sgRKFRAiSJQdq142E=</pochCtrl>
    <Usu>0x000000000e4eecda</Usu>
    <TipCve>01</TipCve>
    <ttError>
        <ttErrorRow>
            <lError>false</lError>
            <cError>OK</cError>
        </ttErrorRow>
    </ttError>
    <ttCarrera>
        <ttCarreraRow>
            <CveCarrera>0x0000000000a45c7c</CveCarrera>
            <Abreviatura>BBIL</Abreviatura>
            <DesCarrera>BACHILLERATO BILINGUE</DesCarrera>
        </ttCarreraRow>
        <ttCarreraRow>
            <CveCarrera>0x0000000000af91dd</CveCarrera>
            <Abreviatura>ITS</Abreviatura>
            <DesCarrera>INGENIERO EN TECNOLOGIA DE SOFTWARE</DesCarrera>
        </ttCarreraRow>
        <ttCarreraRow>
            <CveCarrera>0x0000000000b27eea</CveCarrera>
            <Abreviatura>ALEM</Abreviatura>
            <DesCarrera>ALEMAN</DesCarrera>
        </ttCarreraRow>
    </ttCarrera>
    <ttDepend></ttDepend>
</LoginAppResponse>`

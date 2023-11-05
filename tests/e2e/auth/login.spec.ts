import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import nock from 'nock'
import Career from 'App/Models/Career'
import { useGlobalTransaction } from '../../useGlobalTransaction'
import User from 'App/Models/User'
import { LoginPage } from '../pages/LoginPage'
import { siaseLoginMockedSuccessResponse } from '../fixtures/siaseLoginMockedSuccessResponse'
import { siaseLoginMockedErrorResponse } from '../fixtures/siaseLoginMockedErrorResponse'
import { siaseScheduleMockedSuccessResponse } from '../fixtures/siaseScheduleMockedSuccessResponse'
import { siaseScheduleMockedErrorResponse } from '../fixtures/siaseScheduleMockedErrorResponse'

test.group('login', (group) => {
  group.each.setup(useGlobalTransaction)
  test('shows invalid credentials message a single time', async ({ visit }) => {
    const page = await visit(LoginPage)
    const mockedSiaseLoginRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query(() => true)
      .reply(200, siaseLoginMockedErrorResponse)

    await page.login('2006610', 'asdasd')

    await page.page.assertExists(page.page.getByText(/Credenciales inválidas/))

    mockedSiaseLoginRequest.done()
  })
  test('logs in', async ({ assert, visit }) => {
    const page = await visit(LoginPage)
    const mockedSiaseLoginRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query((parsedQuery) => parsedQuery['6bdf3ca'] === '1')
      .reply(200, siaseLoginMockedSuccessResponse)
    // Para ITS, si hay horario
    const mockedSiaseITSScheduleRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query(
        (parsedQuery) =>
          parsedQuery['6bdf3ca'] === '4' && parsedQuery['CveCarrera'] === '0x0000000000af91dd'
      )
      .reply(200, siaseScheduleMockedSuccessResponse)
    // Para bachillerato bilingue, no hay horario y retorna error
    const mockedSiaseBBILScheduleRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query(
        (parsedQuery) =>
          parsedQuery['6bdf3ca'] === '4' && parsedQuery['CveCarrera'] === '0x0000000000a45c7c'
      )
      .reply(200, siaseScheduleMockedErrorResponse)
    // Para Alemán, no hay horario y retorna error
    const mockedSiaseALEMScheduleRequest = nock(Env.get('SIASE_BASE_URL'))
      .get('')
      .query(
        (parsedQuery) =>
          parsedQuery['6bdf3ca'] === '4' && parsedQuery['CveCarrera'] === '0x0000000000b27eea'
      )
      .reply(200, siaseScheduleMockedErrorResponse)

    await page.login('2006610', 'asdasd')

    await page.page.waitForURL('/')
    await page.page.assertExists(page.page.getByText(/Bienvenido, 2006610/))

    mockedSiaseLoginRequest.done()
    mockedSiaseITSScheduleRequest.done()
    mockedSiaseBBILScheduleRequest.done()
    mockedSiaseALEMScheduleRequest.done()

    const careers = await Career.query().preload('classes')
    const ITSCareer = careers.find((career) => career.key === '0x0000000000af91dd')
    const BBILCareer = careers.find((career) => career.key === '0x0000000000a45c7c')
    const ALEMCareer = careers.find((career) => career.key === '0x0000000000b27eea')
    assert.isNotNull(await User.first())
    assert.lengthOf(careers, 3)
    assert.equal(ITSCareer?.key, '0x0000000000af91dd')
    assert.equal(ITSCareer?.name, 'INGENIERO EN TECNOLOGIA DE SOFTWARE')
    assert.equal(ITSCareer?.shortName, 'ITS')
    assert.lengthOf(ITSCareer!.classes, 12)
    assert.equal(BBILCareer?.key, '0x0000000000a45c7c')
    assert.equal(BBILCareer?.name, 'BACHILLERATO BILINGUE')
    assert.equal(BBILCareer?.shortName, 'BBIL')
    assert.lengthOf(BBILCareer!.classes, 0)
    assert.equal(ALEMCareer?.key, '0x0000000000b27eea')
    assert.equal(ALEMCareer?.name, 'ALEMAN')
    assert.equal(ALEMCareer?.shortName, 'ALEM')
    assert.lengthOf(ALEMCareer!.classes, 0)
  }).pin()
})

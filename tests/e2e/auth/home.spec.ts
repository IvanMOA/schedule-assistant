import { test } from '@japa/runner'
import { useGlobalTransaction } from '../../useGlobalTransaction'
import UserFactory from 'Database/factories/UserFactory'
import { HomePage } from '../pages/HomePage'

test.group('home', (group) => {
  group.each.setup(useGlobalTransaction)
  test('shows a dropdown with all available careers', async ({ browserContext, visit }) => {
    const user = await UserFactory.with('careers', 3).create()
    await browserContext.loginAs(user)
    const page = await visit(HomePage)

    await page.openCareersDropdown()

    await page.assertAvailableCareersInDropdown(user.careers.map((career) => career.name))
  })
  test('shows a selected career with its schedule, defaulting to the first with a schedule', async ({
    browserContext,
    visit,
  }) => {
    let alreadyAssignedClassesToACareer = false
    const user = await UserFactory.with('careers', 3, (careerFactory) => {
      if (!alreadyAssignedClassesToACareer) {
        careerFactory.with('classes', 10)
        alreadyAssignedClassesToACareer = true
      }
    }).create()
    await browserContext.loginAs(user)
    const page = await visit(HomePage)
    // Se preselecciona la primera ya que es la única que tiene clases asignadas
    await page.assertSelectedCareer(user.careers[0].shortName)
    await page.page.assertExists(page.page.getByText(user.careers[0].classes[0].subjectName))
  }).pin()
  // test('changes the selected career', async ({ browserContext, visit }) => {
  //   const user = await UserFactory.with('careers', 3, (careerFactory) => {
  //     careerFactory.with('classes', 10)
  //   }).create()
  //   await browserContext.loginAs(user)
  //   const page = await visit(HomePage)
  //   // Se preselecciona la primera ya que es la única que tiene clases asignadas
  //   await page.page.assertExists(page.getByText(user.careers[0].shortName))
  //   await page.page.assertExists(page.getByText(user.careers[0].classes[0].subjectName))
  // })
})

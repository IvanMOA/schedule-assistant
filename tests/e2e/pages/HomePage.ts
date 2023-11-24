import { BasePage } from '@japa/browser-client'

export class HomePage extends BasePage {
  url = '/'
  public async openCareersDropdown() {
    await this.page.getByTestId('dropdown-button').click()
  }
  public async assertAvailableCareersInDropdown(careerNames: string[]) {
    const dropDownPanelLocator = this.page.getByTestId('dropdown-panel')
    for (const careerName of careerNames)
      await this.page.assertVisible(dropDownPanelLocator.getByText(careerName))
  }
  public async assertSelectedCareer(careerShortName: string) {
    await this.page.assertTextContains(this.page.getByTestId('dropdown-button'), careerShortName)
  }
}

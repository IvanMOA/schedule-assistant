import { BasePage } from '@japa/browser-client'

export class LoginPage extends BasePage {
  public url = '/login'
  public async login(enrollment: string, password: string) {
    await this.page.getByLabel('Matrícula').fill(enrollment)
    await this.page.getByLabel('Contraseña').fill(password)
    await this.page.getByText(/Iniciar sesión/).click()
  }
}

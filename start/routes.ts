import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

Route.get('/', 'HomeController.home').middleware('auth')
Route.post('/careers/:id/select', 'HomeController.selectCareer').middleware('auth')
Route.get('/login', 'AuthController.loginShow')
Route.post('/login', 'AuthController.login')

if (Env.get('NODE_ENV') === 'test') {
  Route.post('/login-as', async ({ auth, request }) => {
    const userId = request.body().user_id
    const user = await User.findOrFail(userId)
    await auth.loginViaId(user.id)
  })
}

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.loginShow')
Route.post('/login', 'AuthController.login')

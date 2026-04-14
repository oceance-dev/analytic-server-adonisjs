/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AnalysesController from '#controllers/analyses_controller'
import CollectsController from '#controllers/collects_controller'
import SitesController from '#controllers/sites_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


// Lien du fichier permet juste copier un lien dans le site
router.get('/analytic.js', async ({ response }) => {
  return response.download('resources/scripts/analytic.js')
})
router.post('/collect', [CollectsController, 'store'])

router.group(() => {
  router.get('/analyses', [AnalysesController, 'index'])
  router.get('/sites', [SitesController, 'index'])

}).prefix('/api')



router.post('/api/users', [UsersController, 'store'])

router.post('/api/sites', [SitesController, 'store'])



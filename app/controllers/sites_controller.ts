import Site from '#models/site';
import { createPostSites } from '#validators/site'
import type { HttpContext } from '@adonisjs/core/http'

export default class SitesController {

    async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createPostSites);

        return Site.create(payload)
    }
}
import Site from '#models/site';
import { createPostSites } from '#validators/site'
import type { HttpContext } from '@adonisjs/core/http'

export default class SitesController {

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createPostSites);

        const site = await Site.find(payload.domain);
        if (site) {
            return response.notFound({ message: "Le site possède déjà un nom de domaine"})
        }

        return Site.create(payload)
    }
}
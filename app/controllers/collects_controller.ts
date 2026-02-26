import PagesView from '#models/pages_view'
import Site from '#models/site'
import { createPostCollect } from '#validators/collect'
import type { HttpContext } from '@adonisjs/core/http'

export default class CollectsController {

    // Permet de récuperer les informations du script envoyé 
    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createPostCollect)

        const site = await Site.find(payload.site_id);
        if (!site) {
            return response.notFound({ message: "Site introuvable"})
        }

        const urlDomain = new URL(payload.path).hostname
        if (!site.domain.includes(urlDomain)) {
            return response.forbidden({ message: "Domaine non autorisé"})
        }
        
        return PagesView.create(payload)
    }

}                                                                                                                                                                                                                                                                              
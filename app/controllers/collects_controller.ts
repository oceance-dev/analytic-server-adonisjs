import Site from '#models/site'
import { CollectService } from '#services/collect_service'
import { SiteService } from '#services/site_service'
import { createPostCollect } from '#validators/collect'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CollectsController {

    constructor(private collectService: CollectService, private siteService: SiteService) {}

    // Permet de récuperer les informations du script envoyé 
    async store({ request, response }: HttpContext): Promise<void> {
        const payload = await request.validateUsing(createPostCollect)

        const site = await this.siteService.getSiteData(payload.site_id);
        if (!site) {
            return response.notFound({ message: "Site introuvable"})
        }

        const urlDomain = new URL(payload.path).hostname
        if (!site.domain.includes(urlDomain)) {
            return response.forbidden({ message: "Domaine non autorisé"})
        }
        await this.collectService.collectDataByScriptJs(payload)
        
        return response.ok({ message: "Données collectées avec succès"});
    }

}                                                                                                                                                                                                                                                                              
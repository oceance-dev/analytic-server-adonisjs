import Site from '#models/site';
import { createPostSites } from '#validators/site';
export default class SitesController {
    async index({ response }) {
        const sites = await Site.all();
        return response.ok({ sites });
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(createPostSites);
        const site = await Site.find(payload.domain);
        if (site) {
            return response.notFound({ message: "Le site possède déjà un nom de domaine" });
        }
        return Site.create(payload);
    }
}
//# sourceMappingURL=sites_controller.js.map
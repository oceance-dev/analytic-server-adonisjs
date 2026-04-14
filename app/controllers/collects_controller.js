var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Site from '#models/site';
import { CollectService } from '#services/collect_service';
import { createPostCollect } from '#validators/collect';
import { inject } from '@adonisjs/core';
let CollectsController = class CollectsController {
    collectService;
    constructor(collectService) {
        this.collectService = collectService;
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(createPostCollect);
        const site = await Site.find(payload.site_id);
        if (!site) {
            return response.notFound({ message: "Site introuvable" });
        }
        const urlDomain = new URL(payload.path).hostname;
        if (!site.domain.includes(urlDomain)) {
            return response.forbidden({ message: "Domaine non autorisé" });
        }
        await this.collectService.collectDataByScriptJs(payload);
        return response.ok({ message: "Données collectées avec succès" });
    }
};
CollectsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [CollectService])
], CollectsController);
export default CollectsController;
//# sourceMappingURL=collects_controller.js.map
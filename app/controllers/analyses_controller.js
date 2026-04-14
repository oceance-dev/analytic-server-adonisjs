var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AnalysisService } from '#services/analysis_service';
import { inject } from '@adonisjs/core';
let AnalysesController = class AnalysesController {
    analysisService;
    constructor(analysisService) {
        this.analysisService = analysisService;
    }
    async index({ response }) {
        const pagesByDate = await this.analysisService.pagesViewByDate();
        const devicesByDate = await this.analysisService.devicesByDate();
        const devicesByType = await this.analysisService.devicesByType();
        return response.ok({ pagesByDate, devicesByDate, devicesByType });
    }
};
AnalysesController = __decorate([
    inject(),
    __metadata("design:paramtypes", [AnalysisService])
], AnalysesController);
export default AnalysesController;
//# sourceMappingURL=analyses_controller.js.map
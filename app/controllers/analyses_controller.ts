import { AnalysisService } from '#services/analysis_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AnalysesController {

    constructor(private analysisService: AnalysisService) {}

    async index({ response }: HttpContext): Promise<void> {
        const pagesByDate = await this.analysisService.pagesViewByDate()    
        const devicesByDate = await this.analysisService.devicesByDate()
        const devicesByType = await this.analysisService.devicesByType()

        return response.ok({ pagesByDate, devicesByDate, devicesByType })
    }
}
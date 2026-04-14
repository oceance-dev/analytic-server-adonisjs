import PagesView from '#models/pages_view';
import db from '@adonisjs/lucid/services/db';
export class AnalysisService {
    async pagesViewByDate() {
        const pagesByDate = await db
            .from(db
            .from(PagesView.table)
            .select(db.raw('DATE(created_at) as raw_date'))
            .countDistinct('path as total')
            .groupByRaw('DATE(created_at)')
            .as('sub'))
            .select(db.raw("DATE_FORMAT(raw_date, '%d/%m/%Y') as date"), 'total')
            .orderBy('raw_date', 'asc');
        return pagesByDate;
    }
    async devicesByDate() {
        const rows = await db
            .from(PagesView.table)
            .select(db.raw("DATE(created_at) as raw_date"))
            .select(db.raw("JSON_UNQUOTE(JSON_EXTRACT(device, '$.type')) as device_type"))
            .count('* as total')
            .groupByRaw("DATE(created_at), JSON_UNQUOTE(JSON_EXTRACT(device, '$.type'))")
            .orderByRaw('DATE(created_at) ASC');
        const map = new Map();
        for (const row of rows) {
            if (!map.has(row.raw_date)) {
                map.set(row.raw_date, {
                    date: new Date(row.raw_date).toLocaleDateString('fr-FR'),
                });
            }
            map.get(row.raw_date)[row.device_type] = Number(row.total);
        }
        return [...map.values()];
    }
    async devicesByType() {
        const devicesByType = await db
            .from(db
            .from(PagesView.table)
            .select('device')
            .countDistinct('device as total')
            .groupBy('device')
            .as('sub'))
            .select('device', 'total');
        return devicesByType;
    }
}
//# sourceMappingURL=analysis_service.js.map
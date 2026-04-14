import PagesView from "#models/pages_view";
export class CollectService {
    async collectDataByScriptJs(data) {
        const collectData = await PagesView.create(data);
        if (!data) {
            throw new Error("Failed to collect data");
        }
        return collectData;
    }
}
//# sourceMappingURL=collect_service.js.map
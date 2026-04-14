import PagesView from "#models/pages_view";

export class CollectService {
  // Your code here

  async collectDataByScriptJs(data: any) {
    const collectData = await PagesView.create(data);

    if (!data) {
      throw new Error("Failed to collect data");
    }

    return collectData;
  }
}
import Site from "#models/site";

export class SiteService {
  // Your code here

  async getSiteData(siteId: string) {
    
    if (!siteId) {
      throw new Error("Site ID is required");
    }

    const result = await Site.find(siteId);

    if (!result) {
      throw new Error("Site not found");
    }

    return result;
  }
}
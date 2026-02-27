

/**
 * analytics.js - Script de collecte de données de navigation
 * Collecte : URL, Referrer, Screen size, Timestamp, User Agent
 * 
 * Usage: 
 * <script src="https://analytics-api.com/analytic.js" data-endpoint="https://analytic-api.com/collecte"></script>
 */

(function() {

    const currentScript = document.currentScript;
    const endpoint = currentScript ? currentScript.getAttribute("data-endpoint") : null;
    const debug = currentScript ? currentScript.getAttribute("data-debug") === "true" : false;
    const site_id = currentScript ? currentScript.getAttribute("data-site-id") : null;

    if (!endpoint) {
        console.warn("[Analytic] Aucun endpoint défini. Ajouter data-endpoint à la balise script.");
        return;
    }
    /**
     * Collecte tous les points de données
     * @returns {Object} Les données collectées
     */
    function collectTrackingData() {
        const parsed = parserUserAgent(navigator.userAgent);

        return {
            site_id: site_id, 
            path: window.location.href,
            referrer: document.referrer || null,
            device: {
                type: parsed.deviceType,
                vendor: parsed.deviceVendor,
                model: parsed.deviceModel,
            },
            os: {
                name: parsed.osName,
                version: parsed.osVersion,
            },
            browser: {
                name: parsed.browserName,
                version: parsed.browserVersion,
            }
        }
    };

    /**
     * Permet de paser l'user agent
     * @param {userAgent} userAgent - L'user agent
     * @returns {Object} Les données parsé
     */
    function parserUserAgent(ua) {
        let osName = null;
        let osVersion = null;

        if (/Windows NT 10\.0/.test(ua))       { osName = 'Windows'; osVersion = '10'; }
        else if (/Windows NT 11\.0/.test(ua))  { osName = 'Windows'; osVersion = '11'; }
        else if (/Windows NT 6\.1/.test(ua))   { osName = 'Windows'; osVersion = '7'; }
        else if (/Mac OS X ([\d_]+)/.test(ua)) { osName = 'macOS'; osVersion = ua.match(/Mac OS X ([\d_]+)/)[1].replace(/_/g, '.'); }
        else if (/Android ([\d.]+)/.test(ua))  { osName = 'Android'; osVersion = ua.match(/Android ([\d.]+)/)[1]; }
        else if (/iPhone OS ([\d_]+)/.test(ua)){ osName = 'iOS'; osVersion = ua.match(/iPhone OS ([\d_]+)/)[1].replace(/_/g, '.'); }
        else if (/iPad.*OS ([\d_]+)/.test(ua)) { osName = 'iPadOS'; osVersion = ua.match(/OS ([\d_]+)/)[1].replace(/_/g, '.'); }
        else if (/Linux/.test(ua))             { osName = 'Linux'; }

        // Browser
        let browserName = null;
        let browserVersion = null;

        if (/Edg\/([\d.]+)/.test(ua))         { browserName = 'Edge'; browserVersion = ua.match(/Edg\/([\d.]+)/)[1]; }
        else if (/OPR\/([\d.]+)/.test(ua))    { browserName = 'Opera'; browserVersion = ua.match(/OPR\/([\d.]+)/)[1]; }
        else if (/Chrome\/([\d.]+)/.test(ua)) { browserName = 'Chrome'; browserVersion = ua.match(/Chrome\/([\d.]+)/)[1]; }
        else if (/Firefox\/([\d.]+)/.test(ua)){ browserName = 'Firefox'; browserVersion = ua.match(/Firefox\/([\d.]+)/)[1]; }
        else if (/Safari\/([\d.]+)/.test(ua)) { browserName = 'Safari'; browserVersion = ua.match(/Version\/([\d.]+)/)?.[1]; }

        // Device
        let deviceType = 'desktop';
        let deviceVendor = null;
        let deviceModel = null;

        if (/iPhone/.test(ua))                { deviceType = 'mobile'; deviceVendor = 'Apple'; deviceModel = 'iPhone'; }
        else if (/iPad/.test(ua))             { deviceType = 'tablet'; deviceVendor = 'Apple'; deviceModel = 'iPad'; }
        else if (/Android.*Mobile/.test(ua))  { deviceType = 'mobile'; }
        else if (/Android/.test(ua))          { deviceType = 'tablet'; }

        // Vendor mobile
        if (deviceType !== 'desktop') {
            if (/Samsung/.test(ua))             { deviceVendor = 'Samsung'; }
            else if (/Huawei/.test(ua))         { deviceVendor = 'Huawei'; }
            else if (/Xiaomi/.test(ua))         { deviceVendor = 'Xiaomi'; }
        }

        return { osName, osVersion, browserName, browserVersion, deviceType, deviceVendor, deviceModel }
    }

    /**
     * Envoie les données vers un endpoint
     * @param {string} endpoint - URL de l'API réceptrice
     * @param {Object} data - Les données à envoyer
     */
    async function sendTrackingAnalytics(data) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                keepalive: true,
            });

            if (!response.ok) {
                console.warn("[Analytic] Erreur lors de l'envoie : ", response.status);
            }
        } catch (error) {
            console.error("[Analytic] Impossible d'envoyer les données :", error);
        }
    }

    const data = collectTrackingData();

     if (debug) {
        console.group("[Analytic] Données collectées");
        console.log("URL :", data.url);
        console.log("Referrer :", data.referrer ?? "(aucun)");
        console.table("Device :", data.device);
        console.table("Os :", data.os);
        console.table("Browser :", data.browser);
        console.groupEnd();
    }

    sendTrackingAnalytics(data);
})();
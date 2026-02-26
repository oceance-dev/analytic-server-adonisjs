

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
        return {
            site_id: site_id, 
            path: window.location.href,
            referrer: document.referrer || null,
            device: {
                width: window.screen.width,
                height: window.screen.height,
                availWidth: window.screen.availWidth,
                availHeight: window.screen.availHeight,
                devicePixelRatio: window.devicePixelRatio || 1,
            },
            //userAgent: navigator.userAgent,
        }
    };

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
        console.log("Screen size :", `${data.device.width}x${data.device.height}`);
        console.log("User agent :", data.userAgent);
        console.groupEnd();
    }

    sendTrackingAnalytics(data);
})();
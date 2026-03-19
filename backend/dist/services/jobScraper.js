import { logger } from '../utils/logger.js';
export class JobScraperService {
    async scrapeInternshala() {
        logger.info('Scraping Internshala...');
        // Placeholder — real impl uses cheerio + axios
        return [];
    }
    async scrapeRemoteOK() {
        logger.info('Scraping RemoteOK...');
        return [];
    }
    async scrapeArbeitnow() {
        logger.info('Scraping Arbeitnow...');
        try {
            const res = await fetch('https://www.arbeitnow.com/api/job-board-api?page=1');
            if (!res.ok)
                return [];
            const data = (await res.json());
            return (data.data ?? []).map((j) => ({
                title: j?.title,
                company: j?.company_name,
                type: 'FULL_TIME',
                domain: ['Tech'],
                location: j?.location,
                remote: j?.remote,
                source: 'ARBEITNOW',
                sourceUrl: j?.url,
                externalId: j?.slug,
                requiredSkills: [],
            }));
        }
        catch (err) {
            logger.error('Arbeitnow scrape failed:', err);
            return [];
        }
    }
    async runFullScrape() {
        logger.info('Starting full job scrape...');
        try {
            const [internshala, remoteOk, arbeitnow] = await Promise.allSettled([
                this.scrapeInternshala(),
                this.scrapeRemoteOK(),
                this.scrapeArbeitnow(),
            ]);
            const allJobs = [
                ...(internshala.status === 'fulfilled' ? internshala.value : []),
                ...(remoteOk.status === 'fulfilled' ? remoteOk.value : []),
                ...(arbeitnow.status === 'fulfilled' ? arbeitnow.value : []),
            ];
            logger.info(`Scraped ${allJobs.length} jobs total`);
        }
        catch (err) {
            logger.error('Full scrape failed:', err);
        }
    }
}
//# sourceMappingURL=jobScraper.js.map
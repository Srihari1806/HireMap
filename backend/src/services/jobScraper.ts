import { logger } from '../utils/logger.js';

interface ScrapedJob {
  title: string;
  company: string;
  type: string;
  domain: string[];
  location: string;
  remote: boolean;
  source: string;
  sourceUrl: string;
  externalId: string;
  description?: string;
  requiredSkills: string[];
}

export class JobScraperService {
  async scrapeInternshala(): Promise<ScrapedJob[]> {
    logger.info('Scraping Internshala...');
    // Placeholder — real impl uses cheerio + axios
    return [];
  }

  async scrapeRemoteOK(): Promise<ScrapedJob[]> {
    logger.info('Scraping RemoteOK...');
    return [];
  }

  async scrapeArbeitnow(): Promise<ScrapedJob[]> {
    logger.info('Scraping Arbeitnow...');
    try {
      const res = await fetch('https://www.arbeitnow.com/api/job-board-api?page=1');
      if (!res.ok) return [];
      const data = (await res.json()) as { data?: ScrapedJob[] };
      return (data.data ?? []).map((j) => ({
        title: (j as Record<string, unknown>)['title'] as string,
        company: (j as Record<string, unknown>)['company_name'] as string,
        type: 'FULL_TIME',
        domain: ['Tech'],
        location: (j as Record<string, unknown>)['location'] as string,
        remote: (j as Record<string, unknown>)['remote'] as boolean,
        source: 'ARBEITNOW',
        sourceUrl: (j as Record<string, unknown>)['url'] as string,
        externalId: (j as Record<string, unknown>)['slug'] as string,
        requiredSkills: [],
      }));
    } catch (err) {
      logger.error('Arbeitnow scrape failed:', err);
      return [];
    }
  }

  async runFullScrape(): Promise<void> {
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
    } catch (err) {
      logger.error('Full scrape failed:', err);
    }
  }
}

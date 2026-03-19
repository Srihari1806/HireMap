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
export declare class JobScraperService {
    scrapeInternshala(): Promise<ScrapedJob[]>;
    scrapeRemoteOK(): Promise<ScrapedJob[]>;
    scrapeArbeitnow(): Promise<ScrapedJob[]>;
    runFullScrape(): Promise<void>;
}
export {};

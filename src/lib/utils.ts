import { Company, DashboardStats } from "./types";

export function parseCtc(ctc: string): number {
    if (!ctc || ctc === "-" || ctc === "Will be informed") return 0;
    const matches = ctc.match(/[\d.]+/g);
    if (!matches) return 0;
    const nums = matches.map(Number).filter(n => n < 100);
    return nums.length > 0 ? Math.max(...nums) : 0;
}

export function parseCgpa(cgpa: string): number {
    if (!cgpa) return 0;
    return parseFloat(cgpa) || 0;
}

export function getStats(companies: Company[]): DashboardStats {
    const ctcValues = companies.map(c => parseCtc(c.ctc)).filter(v => v > 0);
    const avgPackage = ctcValues.length ? ctcValues.reduce((a, b) => a + b, 0) / ctcValues.length : 0;
    const highestPackage = ctcValues.length ? Math.max(...ctcValues) : 0;

    const locationMap: Record<string, number> = {};
    companies.forEach(c => {
        const loc = c.location && c.location !== "-" ? c.location.split("/")[0].trim() : "Other";
        locationMap[loc] = (locationMap[loc] || 0) + 1;
    });
    const topLocations = Object.entries(locationMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

    const ranges = [
        { range: "< 5 LPA", min: 0, max: 5 },
        { range: "5–8 LPA", min: 5, max: 8 },
        { range: "8–12 LPA", min: 8, max: 12 },
        { range: "12–20 LPA", min: 12, max: 20 },
        { range: "20+ LPA", min: 20, max: 999 },
    ];
    const packageRanges = ranges.map(r => ({
        range: r.range,
        count: ctcValues.filter(v => v >= r.min && v < r.max).length,
    }));

    const uniqueRoles = new Set(companies.map(c => c.role)).size;

    return {
        totalCompanies: new Set(companies.map(c => c.name)).size,
        avgPackage: Math.round(avgPackage * 100) / 100,
        highestPackage,
        totalRoles: uniqueRoles,
        topLocations,
        packageRanges,
    };
}

export function filterCompanies(
    companies: Company[],
    search: string,
    minCtc: number,
    maxCtc: number,
    cgpa: number,
    location: string
): Company[] {
    return companies.filter(c => {
        const matchesSearch = !search ||
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.role.toLowerCase().includes(search.toLowerCase());
        const ctcVal = parseCtc(c.ctc);
        const matchesCtc = ctcVal >= minCtc && (maxCtc === 0 || ctcVal <= maxCtc);
        const companyCgpa = parseCgpa(c.cgpa);
        const matchesCgpa = cgpa === 0 || companyCgpa === 0 || companyCgpa <= cgpa;
        const matchesLocation = !location || location === "All" ||
            c.location.toLowerCase().includes(location.toLowerCase());
        return matchesSearch && matchesCtc && matchesCgpa && matchesLocation;
    });
}

export function sortCompanies(
    companies: Company[],
    sortBy: string,
    sortOrder: string
): Company[] {
    return [...companies].sort((a, b) => {
        let valA: number | string, valB: number | string;
        switch (sortBy) {
            case "ctc": valA = parseCtc(a.ctc); valB = parseCtc(b.ctc); break;
            case "cgpa": valA = parseCgpa(a.cgpa); valB = parseCgpa(b.cgpa); break;
            case "name": valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); break;
            default: valA = a.id; valB = b.id;
        }
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });
}

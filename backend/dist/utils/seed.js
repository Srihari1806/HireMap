import { prisma } from './database.js';
export async function seed() {
    console.log('🌱 Seeding database...');
    // Seed sample jobs
    const sampleJobs = [
        {
            title: 'Frontend Developer Intern',
            company: 'TechCorp India',
            type: 'INTERNSHIP',
            domain: ['Frontend', 'Web'],
            location: 'Bangalore',
            remote: false,
            stipend: '₹15,000/month',
            requiredSkills: ['React', 'TypeScript', 'CSS'],
            source: 'HIREMAP',
            sourceUrl: 'https://hiremap.app',
            verified: true,
            description: 'Work on cutting-edge React applications.',
            shortDesc: 'React internship at TechCorp India.',
        },
        {
            title: 'Backend Engineer',
            company: 'Startup Labs',
            type: 'FULL_TIME',
            domain: ['Backend', 'API'],
            location: 'Remote',
            remote: true,
            ctc: '8-12 LPA',
            requiredSkills: ['Node.js', 'PostgreSQL', 'Docker'],
            source: 'HIREMAP',
            sourceUrl: 'https://hiremap.app',
            verified: true,
            description: 'Build scalable APIs for our SaaS platform.',
            shortDesc: 'Remote backend role at Startup Labs.',
        },
    ];
    for (const job of sampleJobs) {
        await prisma.job.upsert({
            where: { sourceUrl: job.sourceUrl + '/' + job.title.replace(/\s+/g, '-').toLowerCase() },
            update: {},
            create: { ...job, postedAt: new Date() },
        });
    }
    console.log('✅ Seeding complete!');
    await prisma.$disconnect();
}
//# sourceMappingURL=seed.js.map
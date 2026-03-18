/**
 * HireMap API Client
 * Centralizes all backend API calls with auth token injection
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Token Management ──────────────────────────────────────────
export const tokenStorage = {
  get: (): string | null => localStorage.getItem('hm_token'),
  set: (token: string): void => localStorage.setItem('hm_token', token),
  clear: (): void => localStorage.removeItem('hm_token'),
};

// ── Core Fetch Wrapper ────────────────────────────────────────
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStorage.get();

  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `API error: ${response.status}`);
  }

  return data as T;
}

// ── Auth API ──────────────────────────────────────────────────
export const authAPI = {
  register: (payload: { firebaseUid: string; email: string; name: string }) =>
    apiFetch<{ token: string; user: User; isNew: boolean }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (firebaseUid: string) =>
    apiFetch<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ firebaseUid }),
    }),

  me: () => apiFetch<User>('/api/auth/me'),

  updateProfile: (data: Partial<ProfileUpdate>) =>
    apiFetch<User>('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// ── Jobs API ──────────────────────────────────────────────────
export const jobsAPI = {
  list: (filters: JobFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
    });
    return apiFetch<JobListResponse>(`/api/jobs?${params}`);
  },

  get: (id: string) => apiFetch<JobDetail>(`/api/jobs/${id}`),

  stats: () => apiFetch<JobStats>('/api/jobs/stats/overview'),

  save: (jobId: string) =>
    apiFetch(`/api/jobs/${jobId}/save`, { method: 'POST' }),

  updateStatus: (jobId: string, status: ApplicationStatus, notes?: string) =>
    apiFetch(`/api/jobs/${jobId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),

  applications: () => apiFetch<Application[]>('/api/jobs/user/applications'),
};

// ── Resume API ────────────────────────────────────────────────
export const resumeAPI = {
  upload: async (file: File): Promise<ResumeUploadResponse> => {
    const formData = new FormData();
    formData.append('resume', file);
    return apiFetch('/api/resume/upload', {
      method: 'POST',
      body: formData,
    });
  },

  atsCheck: (params: { targetRole?: string; resumeId?: string }) =>
    apiFetch<ATSCheckResult>('/api/resume/ats-check', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  atsHistory: () => apiFetch<ATSCheckSummary[]>('/api/resume/ats-history'),

  list: () => apiFetch<ResumeInfo[]>('/api/resume/list'),

  enhanceSection: (section: string, content: string, targetRole?: string) =>
    apiFetch<{ enhanced: string }>('/api/resume/enhance-section', {
      method: 'POST',
      body: JSON.stringify({ section, content, targetRole }),
    }),

  generateCoverLetter: (params: {
    targetRole: string;
    company: string;
    tone?: 'professional' | 'enthusiastic' | 'formal';
  }) =>
    apiFetch<{ coverLetter: string }>('/api/resume/cover-letter', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
};

// ── Roadmap API ───────────────────────────────────────────────
export const roadmapAPI = {
  generate: (params: {
    targetRole: string;
    targetCompany?: string;
    durationWeeks?: number;
    currentSkills?: string[];
  }) =>
    apiFetch<RoadmapGenerateResponse>('/api/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  list: () => apiFetch<RoadmapSummary[]>('/api/roadmap'),

  get: (id: string) => apiFetch<RoadmapDetail>(`/api/roadmap/${id}`),

  markTask: (roadmapId: string, weekId: string, taskId: string, done: boolean) =>
    apiFetch(`/api/roadmap/${roadmapId}/week/${weekId}/task`, {
      method: 'PATCH',
      body: JSON.stringify({ taskId, done }),
    }),

  skillGap: (params: { targetRole: string; jobId?: string }) =>
    apiFetch<SkillGapResult>('/api/roadmap/skill-gap', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  delete: (id: string) =>
    apiFetch(`/api/roadmap/${id}`, { method: 'DELETE' }),
};

// ── Types ─────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  college?: string;
  branch?: string;
  cgpa?: number;
  graduationYear?: number;
  location?: string;
  bio?: string;
  github?: string;
  leetcode?: string;
  skills: string[];
  targetRoles: string[];
  readinessScore: number;
  createdAt: string;
}

export interface ProfileUpdate {
  college: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  location: string;
  bio: string;
  github: string;
  leetcode: string;
  skills: string[];
  targetRoles: string[];
  preferredLocs: string[];
  jobFocus: string;
  weeklyHours: number;
}

export interface JobItem {
  id: string;
  title: string;
  company: string;
  type: string;
  domain: string[];
  location: string;
  remote: boolean;
  salaryMin?: number;
  salaryMax?: number;
  stipend?: string;
  ctc?: string;
  requiredSkills: string[];
  minCgpa?: number;
  source: string;
  sourceUrl: string;
  verified: boolean;
  openings?: number;
  applicants?: number;
  postedAt: string;
  deadline?: string;
  shortDesc?: string;
  // Computed on backend if authenticated
  matchScore?: number;
  missingSkills?: string[];
}

export interface JobDetail extends JobItem {
  description: string;
  preferredSkills: string[];
}

export interface JobListResponse {
  jobs: JobItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface JobStats {
  totalJobs: number;
  internships: number;
  remoteJobs: number;
  fullTimeJobs: number;
}

export type ApplicationStatus =
  | 'SAVED' | 'APPLIED' | 'PHONE_SCREEN'
  | 'INTERVIEW' | 'OFFER' | 'REJECTED' | 'WITHDRAWN';

export interface Application {
  id: string;
  status: ApplicationStatus;
  notes?: string;
  appliedAt?: string;
  createdAt: string;
  job: Pick<JobItem, 'id' | 'title' | 'company' | 'type' | 'location' | 'remote' | 'stipend' | 'ctc'>;
}

export interface JobFilters {
  page?: number;
  limit?: number;
  type?: string;
  domain?: string;
  location?: string;
  remote?: boolean;
  search?: string;
  source?: string;
  minSalary?: number;
  sortBy?: 'latest' | 'salary' | 'match';
  skills?: string;
}

export interface ResumeUploadResponse {
  resume: { id: string; fileName: string; createdAt: string };
  parsed: {
    name?: string;
    email?: string;
    skills: string[];
    education: { degree: string; institution: string }[];
    experienceCount: number;
    projectCount: number;
  };
  message: string;
}

export interface ATSCheckResult {
  id: string;
  overallScore: number;
  breakdown: {
    keywords: number;
    formatting: number;
    experience: number;
    education: number;
    skills: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
  suggestions: {
    section: string;
    issue: string;
    fix: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  createdAt: string;
}

export interface ATSCheckSummary {
  id: string;
  overallScore: number;
  targetRole?: string;
  createdAt: string;
  keywordScore: number;
  formattingScore: number;
  experienceScore: number;
}

export interface ResumeInfo {
  id: string;
  fileName: string;
  createdAt: string;
}

export interface RoadmapTask {
  id: string;
  text: string;
  type: 'learn' | 'practice' | 'build' | 'apply';
  link?: string;
  done: boolean;
  estimatedHours: number;
}

export interface RoadmapResource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'book' | 'tool';
  free: boolean;
}

export interface RoadmapWeek {
  id: string;
  weekNumber: number;
  title: string;
  focus: string;
  tasks: RoadmapTask[];
  resources: RoadmapResource[];
  completed: boolean;
  completedAt?: string;
}

export interface RoadmapDetail {
  id: string;
  title: string;
  targetRole: string;
  targetCompany?: string;
  durationWeeks: number;
  skillGaps: string[];
  weeks: RoadmapWeek[];
  progress: number;
  completedAt?: string;
  createdAt: string;
}

export interface RoadmapSummary {
  id: string;
  title: string;
  targetRole: string;
  durationWeeks: number;
  progress: number;
  completedAt?: string;
  createdAt: string;
  weeks: { weekNumber: number; title: string; completed: boolean }[];
}

export interface RoadmapGenerateResponse {
  roadmap: RoadmapDetail;
  skillGap: SkillGapResult;
  message: string;
}

export interface SkillGapResult {
  targetRole: string;
  userSkills: string[];
  requiredSkills: string[];
  matchScore: number;
  missingSkills: string[];
  niceToHaveSkills: string[];
  estimatedWeeksToClose: number;
}

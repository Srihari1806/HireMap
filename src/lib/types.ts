export interface Company {
  id: number;
  name: string;
  date: string;
  cgpa: string;
  role: string;
  stipend: string;
  duration: string;
  ctc: string;
  location: string;
}

export interface FilterState {
  search: string;
  minCtc: number;
  maxCtc: number;
  cgpa: number;
  location: string;
  role: string;
  sortBy: 'ctc' | 'date' | 'name' | 'cgpa';
  sortOrder: 'asc' | 'desc';
}

export interface DashboardStats {
  totalCompanies: number;
  avgPackage: number;
  highestPackage: number;
  totalRoles: number;
  topLocations: { name: string; count: number }[];
  packageRanges: { range: string; count: number }[];
}

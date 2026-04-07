export type Role = 'ADMIN' | 'MANAGER' | 'PARTNER';
export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email?: string | null;
  phone?: string | null;
  name: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}

export interface Material {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  thumbnailUrl?: string | null;
  city: string;
  propertyType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientLead {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  comment?: string | null;
  status: LeadStatus;
  bitrixId?: string | null;
  createdAt: Date;
  userId: string;
}

export interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link?: string | null;
  order: number;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SMSCredentials {
  phone: string;
  code: string;
}

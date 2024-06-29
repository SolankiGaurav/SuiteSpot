export enum ServiceType {
  Electrical = 'electrical',
  General = 'general',
  PestControl = 'pest-control',
  Plumbing = 'plumbing',
}

export const ALL_SERVICE_TYPES = [
  ServiceType.Electrical,
  ServiceType.General,
  ServiceType.PestControl,
  ServiceType.Plumbing,
];

export interface MaintenanceRequest {
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;

  isClosed?: boolean;
}

export enum USER_ROLE {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export const ALL_USER_TYPES = [USER_ROLE.ADMIN, USER_ROLE.CLIENT];

export interface IUser {
  username: string;

  role?: USER_ROLE;

  password: string;
}

export interface IStatistics {
  serviceType: string;
  openCount: number;
  closedCount: number;
}

export interface CreateActivityRequest {
  type: 'TRANSPORTATION' | 'ENERGY' | 'FOOD' | 'WASTE' | 'WATER' | 'OTHER';
  customType?: string;
  description?: string;
  carbonValue: number;
  date?: Date;
  location?: string;
  source?: string;
  tags?: string[];
  mediaUrl?: string;
  notes?: string;
  isPublic?: boolean;
}

export interface UpdateActivityRequest {
  type?: 'TRANSPORTATION' | 'ENERGY' | 'FOOD' | 'WASTE' | 'WATER' | 'OTHER';
  customType?: string;
  description?: string;
  carbonValue?: number;
  date?: Date;
  location?: string;
  source?: string;
  tags?: string[];
  mediaUrl?: string;
  notes?: string;
  isPublic?: boolean;
}

export interface ActivityResponse {
  id: number;
  userId: number;
  type: string;
  customType?: string;
  description?: string;
  carbonValue: number;
  date: Date;
  location?: string;
  source?: string;
  tags: string[];
  verificationStatus?: string;
  mediaUrl?: string;
  notes?: string;
  isPublic?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityFilters {
  type?: string;
  startDate?: Date;
  endDate?: Date;
  minCarbonValue?: number;
  maxCarbonValue?: number;
  tags?: string[];
  isPublic?: boolean;
  page?: number;
  limit?: number;
} 
export interface CreateGoalRequest {
  title: string;
  targetValue: number;
  deadline: Date;
  description?: string;
  category?: 'TRANSPORT' | 'ENERGY' | 'FOOD' | 'LIFESTYLE' | 'OTHER';
  notes?: string;
  recurring?: 'NONE' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
}

export interface UpdateGoalRequest {
  title?: string;
  targetValue?: number;
  deadline?: Date;
  description?: string;
  category?: 'TRANSPORT' | 'ENERGY' | 'FOOD' | 'LIFESTYLE' | 'OTHER';
  notes?: string;
  recurring?: 'NONE' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  isActive?: boolean;
}

export interface GoalResponse {
  id: number;
  userId: number;
  title: string;
  targetValue: number;
  currentValue: number;
  deadline: Date;
  isActive: boolean;
  description?: string;
  category?: string;
  notes?: string;
  recurring?: string;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalProgressRequest {
  value: number;
  date?: Date;
}

export interface GoalProgressResponse {
  id: number;
  goalId: number;
  value: number;
  date: Date;
}

export interface GoalFilters {
  category?: string;
  isActive?: boolean;
  recurring?: string;
  page?: number;
  limit?: number;
} 
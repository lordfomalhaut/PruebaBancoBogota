export interface Progress {
  id: number;
  course_id: number;
  title: string;
  module: string;
  status: 'iniciado' | 'completado';
  percentage?: number;
  updated_at: string;
}

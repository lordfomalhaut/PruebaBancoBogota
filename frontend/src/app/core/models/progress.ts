export interface Progress {
  id: number;
  course_id: number;
  title: string;
  module: string;
  status: 'iniciado' | 'completado';
  updated_at: string;
}

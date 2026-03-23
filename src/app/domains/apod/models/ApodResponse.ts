export interface ApodResponse {
  date: string;
  explanation: string;
  title: string;
  url: string;
  media_type: 'image' | 'video'; 
  hdurl?: string;               
  thumbnail_url?: string;        
  copyright?: string;          
  service_version: string;
}
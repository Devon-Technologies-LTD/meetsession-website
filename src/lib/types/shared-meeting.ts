export interface TranscriptItem {
  word: string;
  label: string;
  source: string;
  confidence: number | null;
  utterances: unknown | null;
  end_timestamp: string;
  start_timestamp: string;
}

export interface SharedMeetingData {
  id: string;
  user_id: string;
  meet_id: string;
  title: string;
  audio_link: string;
  shared_link: string;
  transcript: TranscriptItem[];
  download_count: number;
  view_count: number;
  recipient: string | null;
  meeting_date: string;
  created_at: string;
  updated_at: string;
}

export interface SharedMeetingResponse {
  message: string;
  data: SharedMeetingData;
  status: boolean;
}

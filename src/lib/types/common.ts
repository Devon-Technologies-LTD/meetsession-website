export type TQueryParams = {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  size?: string;
};

export type TPagedResponse<T> = {
  entity: string;
  total_rows: number;
  total_pages: number;
  size: number;
  page: number;
  data: T[];
};

export type TFolder = {
  id: string;
  user_id: string;
  name: string;
  total_meetings: number;
  total_transcripts: number;
  total_edited_transcript: number;
  created_at: string;
  updated_at: string;
};

export type TMeetSessionFolder = {
  id: string;
  name: string;
  created_at: string;
};

export type TMeetSession = {
  id: string;
  meet_reference: string;
  user_id: string;
  folder_id: string;
  folder: TMeetSessionFolder;
  title: string;
  link: string;
  attendees: string;
  started_at: string;
  is_transcribed: boolean;
  is_edited: boolean;
  has_synced: boolean;
  ended_at: string;
  created_at: string;
  updated_at: string;
};

export type TMeetTranscriptItem = {
  word: string;
  label: string;
  source: string;
  summary: string;
  confidence: number | null;
  utterances: unknown | null;
  end_timestamp: string;
  start_timestamp: string;
};

export type TLabelledTranscriptItem = {
  word: string;
  label: string;
  source: string;
  summary: string;
  confidence: number;
  utterances: unknown | null;
  end_timestamp: string;
  start_timestamp: string;
};

export type TMeetSessionWithTranscript = TMeetSession & {
  transcript: TMeetTranscriptItem[];
  labelled_transcript: TLabelledTranscriptItem[];
  is_summarized: boolean;
  transcript_summary: string;
};

/**
 * Håndskrevne typer for tabellene i supabase/schema.sql.
 * Kan erstattes med `supabase gen types typescript` senere.
 */

export type Profile = {
    id: string;
    navn: string;
    epost: string;
    created_at: string;
};

export type Project = {
    id: string;
    navn: string;
    kunde: string;
    timepris: number;
    ramme: number;
    aktiv: boolean;
    farge: string;
    created_at: string;
};

export type TimeEntry = {
    id: string;
    user_id: string;
    project_id: string;
    dato: string; // YYYY-MM-DD
    timer: number;
    reise: number;
    beskrivelse: string;
    fakturerbar: boolean;
    created_at: string;
};

type Insert<T, Omitted extends keyof T> = Omit<T, Omitted> &
    Partial<Pick<T, Omitted>>;

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: Insert<Profile, "created_at">;
                Update: Partial<Profile>;
                Relationships: [];
            };
            projects: {
                Row: Project;
                Insert: Insert<Project, "id" | "created_at" | "aktiv">;
                Update: Partial<Project>;
                Relationships: [];
            };
            time_entries: {
                Row: TimeEntry;
                Insert: Insert<TimeEntry, "id" | "created_at" | "user_id">;
                Update: Partial<TimeEntry>;
                Relationships: [];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
};

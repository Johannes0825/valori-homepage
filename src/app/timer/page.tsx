import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TimerApp from "@/Timer/TimerApp";

export const dynamic = "force-dynamic";

export default async function TimerPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/timer/logg-inn");

    const [profiles, projects, entries] = await Promise.all([
        supabase.from("profiles").select("*").order("navn"),
        supabase.from("projects").select("*").order("created_at"),
        supabase
            .from("time_entries")
            .select("*")
            .order("dato", { ascending: false })
            .order("created_at", { ascending: false }),
    ]);

    return (
        <TimerApp
            userId={user.id}
            profiles={profiles.data ?? []}
            projects={projects.data ?? []}
            entries={entries.data ?? []}
        />
    );
}

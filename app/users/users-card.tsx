import type { Database } from "@/lib/schema";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function UsersCard({ profile }: { profile: Profile }) {
  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded border-2 p-3 shadow">
      <h3 className="mt-3 text-2xl font-semibold">Name: {profile.display_name}</h3>
      <h4 className="text-m font-light">Email: {profile.email}</h4>
      <h4 className="text-m font-light">Biography: {profile.biography}</h4>
    </div>
  );
}

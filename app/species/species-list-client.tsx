"use client";
// species-list-client.tsx
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import type { Database } from "@/lib/schema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesListClient({
  initialSpecies,
  sessionID,
}: {
  initialSpecies: Species;
  sessionID: string;
}) {
  const router = useRouter();

  const [species, setSpecies] = useState(initialSpecies);
  const [sortOrder, setSortOrder] = useState(router.query.sort || "asc");

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    router.push(`/?sort=${newSortOrder}`);
  };

  useEffect(() => {
    const sortedSpecies = initialSpecies.sort((speciesA, speciesB) => {
      const scientificNameA = speciesA.scientific_name.toLowerCase();
      const scientificNameB = speciesB.scientific_name.toLowerCase();
      const comparisonResult = scientificNameA.localeCompare(scientificNameB);

      return sortOrder === "asc" ? comparisonResult : -comparisonResult;
    });

    setSpecies(sortedSpecies);
  }, [sortOrder]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog key={sessionID} />
        <button className="rounded-md bg-gray-300 px-4 py-2 text-gray-800" onClick={handleSortToggle}>
          {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
        </button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species.map((species) => (
          <SpeciesCard key={species.id} species={species} currentUser={sessionID} />
        ))}
      </div>
    </>
  );
}

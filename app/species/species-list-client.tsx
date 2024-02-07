// species-list-client.tsx
"use client";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

export default function SpeciesListClient({ initialSpecies, sessionID }) {
  const [species, setSpecies] = useState(initialSpecies);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    const sortedSpecies = [...initialSpecies].sort((speciesA, speciesB) => {
      const scientificNameA = speciesA.scientific_name.toLowerCase();
      const scientificNameB = speciesB.scientific_name.toLowerCase();
      const comparisonResult = scientificNameA.localeCompare(scientificNameB);

      return sortOrder === "asc" ? comparisonResult : -comparisonResult;
    });

    setSpecies(sortedSpecies);
  }, [initialSpecies, sortOrder]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionID} />
        <button className="rounded-md bg-gray-300 px-4 py-2 text-gray-800" onClick={handleSortToggle}>
          {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
        </button>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.map((species) => <SpeciesCard key={species.id} species={species} currentUser={sessionID} />)}
      </div>
    </>
  );
}

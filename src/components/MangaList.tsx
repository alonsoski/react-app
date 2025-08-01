import React from "react";
import MangaListItem from "./MangaListItem";

type Manga = {
  id: string;
  type: string;
  attributes: {
    title: {
      en: string;
    };
    description: {
      en: string;
    };
  };
  coverUrl?: string | null;
};

type MangaListProps = {
  mangas: Manga[];
};

const MangaList: React.FC<MangaListProps> = ({ mangas }) => (
  <div className="container">
    <div className="row">
      {mangas.map((manga) => (
        <div key={manga.id} className="col-12 col-sm-6 col-md-3 mb-4">
          <MangaListItem
            id={manga.id}
            type={manga.type}
            title={manga.attributes.title?.en || "Sin título"}
            description={
              typeof manga.attributes.description === "string"
                ? manga.attributes.description
                : manga.attributes.description?.en || "Sin descripción"
            }
            coverUrl={manga.coverUrl}
          />
        </div>
      ))}
    </div>
  </div>
);

export default MangaList;

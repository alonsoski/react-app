import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData, getMangaCoverUrl } from "../services/api";

type Manga = {
  id: string;
  type: string;
  attributes: {
    title: { en: string };
    description: { en: string };
  };
};

const MangaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadManga = async () => {
      try {
        const response = await fetchData<{ data: Manga }>(
          `https://api.mangadex.org/manga/${id}`
        );
        setManga(response.data);
        const cover = await getMangaCoverUrl(id!);
        setCoverUrl(cover);
      } catch (err) {
        console.error("Error al cargar el manga:", err);
      }
    };

    if (id) loadManga();
  }, [id]);
  const MangaCardStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "0 0 8px 8px",
    overflow: "hidden", // importante para que el fondo no sobresalga
    minHeight: 400,
    maxWidth: "100%",
    color: "#fff",
  };

  const backgroundStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(24px) brightness(0.7)",
    zIndex: 0,
  };

  if (!manga) return <p>Cargando...</p>;

  return (
    <div style={MangaCardStyle}>
      {coverUrl && (
        <img
          src={coverUrl}
          alt="background"
          style={backgroundStyle}
          aria-hidden="true"
        />
      )}
      {/* Máscara negra degradada */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to top, #14131496 0%, #ffc5ed49 50%, #14131470 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{manga.attributes.title.en}</h2>
        {coverUrl && (
          <img
            src={coverUrl}
            alt={manga.attributes.title.en}
            style={{
              maxWidth: 300,
              borderRadius: 8,
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          />
        )}
        <p style={{ marginTop: "1rem" }}>
          {manga.attributes.description.en || "Sin descripción"}
        </p>
      </div>
    </div>
  );
};
export default MangaDetails;

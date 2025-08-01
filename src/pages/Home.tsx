import { useState } from "react";
import { fetchData, getMangaCoverUrl } from "../services/api";
import MangaList from "../components/MangaList";

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
const appContainerStyle: React.CSSProperties = {};

const Home = () => {
  const [title, setTitle] = useState("berserk");
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData<{ data: Manga[] }>(
        `https://api.mangadex.org/manga?title=${encodeURIComponent(title)}`
      );
      const mangasWithCovers = await Promise.all(
        result.data.map(async (manga) => {
          const coverUrl = await getMangaCoverUrl(manga.id);
          return { ...manga, coverUrl };
        })
      );
      setMangas(mangasWithCovers);
    } catch (err) {
      setError((err as Error).message);
      setMangas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={appContainerStyle}>
      <div style={{ marginTop: 24 }}>
        <input
          type="text"
          placeholder="Buscar manga por título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading || !title}>
          Buscar
        </button>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {mangas.length > 0 && (
          <div>
            <h3>Mangas encontrados:</h3>
            <MangaList mangas={mangas} />
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default Home;

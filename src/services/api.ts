// Ejemplo de función para obtener datos de un endpoint
export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Error al obtener datos: ${response.statusText}`);
  }
  const data: T = await response.json();
  return data;
}

// Puedes agregar más funciones según tus necesidades, por ejemplo:
export async function postData<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error al enviar datos: ${response.statusText}`);
  }
  const data: T = await response.json();
  return data;
}

export async function getMangaCoverUrl(
  mangaId: string
): Promise<string | null> {
  const result = await fetchData<{ data: any[] }>(
    `https://api.mangadex.org/cover?manga[]=${mangaId}&limit=1`
  );
  const cover = result.data[0];
  if (!cover) return null;
  const fileName = cover.attributes.fileName;
  return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}.256.jpg`;
}

// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // nueva ruta de búsqueda

import { MangaHome } from "./pages/MangaHome";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/manga/:id" element={<MangaHome />} />
    </Routes>
  );
}

export default App;

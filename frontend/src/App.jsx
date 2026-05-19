import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./base/Base";
// import Signin from "./auth/Singin";
// import Signup from "./auth/Signup";
import Home from "./pages/home/Home";
import Anime from "./pages/anime/Anime";
import Manga from "./pages/manga/Manga";
import Movie from "./pages/movie/Movie";
import Tv from "./pages/tv/Tv";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base />}>
          <Route path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
        </Route>
        {/* <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieList from "./MovieList.jsx";
import MovieDetail from "./component/MovieDetail.jsx";
import Layout from "./component/Layout.jsx";
import SearchResult from "./SearchResult.jsx";
import { useState } from "react";
import Signup from "./pages/SingUp.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route index element={<MovieList />} />
          <Route path="/details/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

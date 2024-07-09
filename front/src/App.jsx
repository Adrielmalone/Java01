import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Individuos from "./paginas/Individuos";
import Genomas from "./paginas/Genomas";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Individuos />
            </Layout>
          }
        />
        <Route
          path="/genomas"
          element={
            <Layout>
              <Genomas />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
export default App;

import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Seo } from "./components/Seo";
import Home from "./pages/Home";
import NorthstarReskillingArticle from "./pages/articles/NorthstarReskillingArticle";
import BestGlobalEmployeeBenefitsPlatforms2026 from "./pages/articles/BestGlobalEmployeeBenefitsPlatforms2026";
import MakiBusinessCase from "./pages/articles/MakiBusinessCase";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Nav />
      <Routes>

        <Route
          path="/"
          element={
            <>
              <Seo
                title="GrowUp | EdTech Writing Portfolio"
                description="See edtech content built for pipeline growth, from buyer guides and comparison pieces to research-led articles and customer stories."
                path="/"
                type="website"
              />
              <Home />
            </>
          }
        />

        <Route
          path="/articles/northstar-reskilling"
          element={
            <>
              <Seo
               title="EdTech Article Writing Sample | Northstar Reskilling"
               description="A story-led EdTech writing sample from GrowUp, following one fictional employee through hiring, onboarding, performance, retention and exit to show where AI helps, where it needs a human, and who owns the decision."
                path="/articles/northstar-reskilling"
              />
              <NorthstarReskillingArticle />
            </>
          }
        />

  

        <Route
          path="/articles/best-global-employee-benefits-platform"
          element={
            <>
              <Seo
                title="HR Tech Writing Sample: 7 Best Global Employee Benefits Platforms | GrowUp"
                description="An HR tech writing sample by GrowUp: a practical comparison of seven global employee benefits platforms across administration, local flexibility, payroll controls and reporting, written as an example of content for Ben."
                path="/articles/best-global-employee-benefits-platform"
              />
              <BestGlobalEmployeeBenefitsPlatforms2026 />
            </>
          }
        />

        <Route
          path="/articles/maki-business-case"
          element={
            <>
<Seo
                title="HR Tech Business Case Builder | GrowUp"
                description="An HR tech portfolio sample showing how GrowUp designed an interactive business case builder for Maki, turning hiring inputs into a defensible executive summary."
                path="/articles/maki-business-case"
                image="/images/maki-business-case-og.png"
              />



              <MakiBusinessCase />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <Seo
                title="Page not found | GrowUp"
                description="This page doesn't exist. Return to the GrowUp hrtech writing portfolio."
                path="/"
                type="website"
              />
              <Home />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
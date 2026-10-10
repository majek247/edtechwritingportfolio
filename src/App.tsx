import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Seo } from "./components/Seo";
import Home from "./pages/Home";
import NorthstarReskillingArticle from "./pages/articles/NorthstarReskillingArticle";
import BestMathsInterventionProgrammes2026 from "./pages/articles/BestMathsInterventionProgrammes2026";
import JenzabarImplementationRealityMap from "./pages/articles/JenzabarImplementationRealityMap";
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
          path="/articles/maki-business-case"
          element={
            <>
              <Seo
               title="EdTech Article Writing Sample | Northstar Reskilling"
               description="A story-led EdTech writing sample from GrowUp, following one fictional employee through hiring, onboarding, performance, retention and exit to show where AI helps, where it needs a human, and who owns the decision."
                path="/articles/maki-business-case"
              />
              <MakiBusinessCase />
            </>
          }
        />


  

        <Route
          path="/articles/best-maths-intervention-programmes"
          element={
            <>
           <Seo
  title="EdTech Writing Sample: 7 Best Maths Intervention Programmes for UK Schools in 2026 | GrowUp"
  description="An EdTech writing sample by GrowUp: a practical comparison of seven maths intervention programmes for UK schools, covering diagnosis, delivery, staffing, progress reporting and total cost."
  path="/articles/best-maths-intervention-programmes"
/>
              <BestMathsInterventionProgrammes2026 />
            </>
          }
        />

        <Route
          path="/articles/jenzabar-implementation-reality-map"
          element={
            <>
<Seo
                title="EdTech Sales Enablement Content for Jenzabar | GrowUp"
                description="Explore an EdTech sales enablement example built for Jenzabar One, with an interactive planner for implementation timelines, staffing and campus risks."
                path="/articles/jenzabar-implementation-reality-map"
                image="/images/maki-business-case-og.png"
              />



              <JenzabarImplementationRealityMap />
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
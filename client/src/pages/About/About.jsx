import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import teamImage from "../../assets/obrazek.webp";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-green-100 via-lime-100 to-yellow-50 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            O nás
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10">
            Ve <span className="font-semibold text-green-700">Smooth IT</span>{" "}
            milujeme čerstvost – jak v kódu, tak v ovoci. Naší misí je dodávat
            digitální řešení tak osvěžující, jako je smoothie po józe.
          </p>
          <img
            src={teamImage}
            alt="Smoothie team"
            className="rounded-3xl shadow-lg mx-auto w-full md:w-3/4 lg:w-2/3 mb-10"
          />
          <div className="grid md:grid-cols-2 gap-8 text-left text-gray-800">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-lime-800">
                Naše hodnoty
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Skvělá chuť bez výčitek</li>
                <li>Plné vitamínů a energie</li>
                <li>Přírodní suroviny</li>
                <li>Bez konzervantů a dochucovadel</li>
                <li>Čerstvě mixované na místě</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-lime-800">
                Proč smoothie?
              </h2>
              <p>
                Naše smoothie nejsou jen nápoje – jsou to plné dávky energie,
                vitamínů a čerstvosti v každém doušku. Vyrábíme je z těch
                nejkvalitnějších surovin, bez umělých dochucovadel, konzervantů
                nebo přidaného cukru. Používáme čerstvé ovoce, zeleninu a
                superpotraviny, které mixujeme těsně před podáním – takže
                chutnají nejen skvěle, ale i udrží maximum živin. Každý náš
                recept je pečlivě vyladěný tak, aby nejen potěšil chuťové buňky,
                ale také podpořil tvé zdraví, imunitu a celkovou pohodu. Ať už
                hledáš ranní dávku energie, něco na doplnění po tréninku nebo
                zdravou svačinu – máme smoothie přesně pro tebe.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-block mt-12 px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;

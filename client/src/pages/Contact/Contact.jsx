import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Contact = () => {
  return (
    <>
      {<Navbar />}
      <section className="min-h-screen bg-gradient-to-br from-yellow-50 via-lime-100 to-green-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-6">
            Kontaktujte nás
          </h1>
          <p className="text-center text-lg text-gray-700 mb-10">
            Máte otázky ohledně našich smoothie řešení? Napište nám!
          </p>

          <form className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jméno
              </label>
              <input
                type="text"
                placeholder="Vaše jméno"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="vase@email.cz"
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zpráva
              </label>
              <textarea
                rows="5"
                placeholder="Sem napište svůj dotaz..."
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Odeslat zprávu
            </button>
          </form>
          <div className="text-center mt-10"></div>
        </div>
      </section>
    </>
  );
};

export default Contact;

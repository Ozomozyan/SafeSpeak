"use client";

import React from 'react';
import Navbar from '@/components/navbar';
import { useRouter } from "next/navigation";


const App: React.FC = () => {

  const router = useRouter();

  const handleCommencerClick = () => {
    router.push('/accueil');
  };

  return (
    <div className="bg-base-200">
      <Navbar />
      {/* Hero Section */}
      <header
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: 'url("https://files.oaiusercontent.com/file-8kaAMRwliCy7jvYv410BCzFo?se=2024-09-26T08%3A01%3A22Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D60faacef-c9ce-4cd4-baf0-996ee7f89b1c.webp&sig=9DbCfZw/eDCEH9Co6axgmb%2BSf5jqZGxYzrdJ4TnSSaw%3D")' }}
      >
        <div className="text-center max-w-xl">
          <h1 className="text-6xl font-bold">Bienvenue sur le Forum</h1>
          <p className="mt-6 text-xl">
            Participez aux discussions, explorez nos catégories, et partagez vos idées avec notre communauté.
          </p>
          <div className="mt-8">
            <button className="btn btn-primary mr-4" onClick={handleCommencerClick}>Commencer</button>
            <button className="btn btn-secondary">S'inscrire</button>
          </div>
        </div>
      </header>

      {/* Footer*/}
      <footer className="footer p-10 bg-base-300 text-base-content">
        <div>
          <h4 className="font-bold">À propos du Forum</h4>
          <p>Un espace où les esprits se rencontrent pour discuter et partager leurs idées.</p>
        </div>
        <div>
          <h4 className="font-bold">Liens utiles</h4>
          <a className="link link-hover">Accueil</a>
          <a className="link link-hover">Discussions</a>
        </div>
        <div>
          <h4 className="font-bold">Ressources</h4>
          <a className="link link-hover">Conditions d'utilisation</a>
          <a className="link link-hover">Confidentialité</a>
          <a className="link link-hover">Support</a>
        </div>
        <div>
          <h4 className="font-bold">Suivez-nous</h4>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default App;

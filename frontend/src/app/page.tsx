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
        style={{ backgroundImage: 'url("/backgrundhome.webp")' }}
      >
        <div className="text-center max-w-xl">
          <h1 className="text-6xl font-bold">Bienvenue sur le Forum</h1>
          <p className="mt-6 text-xl">
            Participez aux discussions et partagez vos idées avec notre communauté.
          </p>
          <div className="flex-none gap-4"> {/* Use gap for spacing */}
            <a href="/register" className="btn btn-secondary">Register</a> {/* Register button first */}
            <a href="/login" className="btn btn-primary">Login</a>
          </div>
        </div>
      </header>

      {/* Footer */}
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

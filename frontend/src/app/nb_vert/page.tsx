"use client";
import React, { useState } from 'react';
import Navbar from '@/components/navbar';

// Liste des numéros d'urgence
const emergencyNumbers = [
    { number: "112", description: "Appels d'urgence dans l'ensemble de l'Union européenne." },
    { number: "15", description: "Samu (service d'aide médicale urgente)." },
    { number: "17", description: "Police secours - En cas d'urgence concernant un accident ou une infraction." },
    { number: "18", description: "Sapeurs-pompiers - Pour des situations mettant des vies en danger." },
    { number: "114", description: "Numéro d'appel d'urgence pour les sourds et malentendants." },
    { number: "197", description: "Alerte attentat / Alerte enlèvement." },
    { number: "115", description: "Samu social pour aider les personnes démunies." },
    { number: "119", description: "Enfant en danger." },
    { number: "39 19", description: "Femmes victimes de violences." },
    { number: "30 18", description: "Contre le cyberharcèlement des jeunes." },
    { number: "31 14", description: "Prévention suicide." },
    { number: "116 006", description: "France victime." },
    { number: "30 39", description: "Accès au droit." },
    { number: "0 800 00 56 96", description: "Stop-djihadisme." },
    { number: "0 805 80 58 17", description: "Info Escroqueries." },
    { number: "32 37", description: "Pharmacie de garde." },
    { number: "196", description: "Secours en mer." },
    { number: "191", description: "Urgence aéronautique." },
    { number: "31 17", description: "SNCF et RATP - pour des situations à risque." },
    { number: "09 72 67 50 XX", description: "Service dépannage Enedis." },
    { number: "0 800 47 33 33", description: "Fuite ou coupure de gaz." },
    { number: "0 800 23 13 13", description: "Drogues info services." },
    { number: "09 74 75 13 13", description: "Joueurs info services." },
    { number: "39 89", description: "Tabac info service." },
    { number: "09 80 98 09 30", description: "Alcool info services." },
];

const UrgencePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNumbers = emergencyNumbers.filter(item =>
        item.number.includes(searchTerm) || item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-base-200">
            <Navbar />
            <section className="py-16 text-center">
                <h2 className="text-4xl font-bold mb-6">Numéros d'urgence et utiles</h2>
                <input
                    type="text"
                    placeholder="Rechercher un numéro..."
                    className="input input-bordered w-full max-w-xs mb-6"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {filteredNumbers.map((item, index) => (
                        <div className="card shadow-lg hover:shadow-2xl transition-shadow duration-300" key={index}>
                            <div className="card-body">
                                <h3 className="card-title text-xl font-bold text-primary">{item.number}</h3>
                                <p className="text-white">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Section d'information supplémentaire */}
                <div className="mt-12">
                    <h3 className="text-2xl font-semibold">Conseils en cas d'urgence</h3>
                    <p className="mt-4 text-gray-600">En cas d'urgence, gardez votre calme et fournissez des informations claires. Donnez votre localisation, le type d'urgence et toute autre information pertinente.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer p-10 bg-base-300 text-base-content">
                <div>
                    <h4 className="font-bold">Notre entreprise</h4>
                    <p>Nous sommes engagés à offrir les meilleures solutions pour nos clients.</p>
                </div>
                <div>
                    <h4 className="font-bold">Liens rapides</h4>
                    <a className="link link-hover">Accueil</a>
                    <a className="link link-hover">Services</a>
                    <a className="link link-hover">Contact</a>
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

export default UrgencePage;

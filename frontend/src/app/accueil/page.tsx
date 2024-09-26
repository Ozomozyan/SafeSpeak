import React from 'react';
import Navbar from '@/components/navbar';

const Acceuil: React.FC = () => {
    return (
        <div className="bg-base-200">
            <Navbar />

            {/* Section Discussions Récentes */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-bold mb-6">Discussions récentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">Sujet de discussion 1</h3>
                            <p className="text-gray-700">Une brève description de ce dont il s'agit dans cette discussion récente.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-outline">Voir la discussion</button>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">Sujet de discussion 2</h3>
                            <p className="text-gray-700">Un aperçu des points clés abordés dans cette discussion.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-outline">Voir la discussion</button>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">Sujet de discussion 3</h3>
                            <p className="text-gray-700">Un résumé de la conversation dans ce fil de discussion actif.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-outline">Voir la discussion</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button className="btn btn-primary">Voir toutes les discussions</button>
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

export default Acceuil;



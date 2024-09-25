import React from 'react';
import Navbar from './components/navbar';

const App: React.FC = () => {
    return (
        <div className="bg-base-200">
            <Navbar />
            <header className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
                style={{ backgroundImage: 'url("https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp")' }}>
                <div className="text-center">
                    <h1 className="text-6xl font-bold">Bienvenue sur notre site</h1>
                    <p className="mt-6 text-xl">
                        Explorez nos services et découvrez comment nous pouvons vous aider à réussir.
                    </p>
                    <div className="mt-8">
                        <button className="btn btn-primary mr-4">Commencer</button>
                        <button className="btn btn-secondary">Contactez-nous</button>
                    </div>
                </div>
            </header>

            <section className="py-16 text-center">
                <h2 className="text-4xl font-bold mb-6">Nos Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">Service 1</h3>
                            <p>
                                Nous offrons un service incroyable pour vous aider à développer votre entreprise rapidement et efficacement.
                            </p>
                        </div>
                    </div>
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">Service 2</h3>
                            <p>
                                Obtenez un accompagnement personnalisé grâce à notre équipe d'experts dédiée à votre succès.
                            </p>
                        </div>
                    </div>
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-xl font-bold">Service 3</h3>
                            <p>
                                Profitez de nos solutions innovantes pour rester en avance sur vos concurrents.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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

export default App;

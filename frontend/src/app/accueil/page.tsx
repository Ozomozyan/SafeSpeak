"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import { z } from 'zod';

interface Post {
    id: number;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    userName?: string;
    replyTo?: string;
}

const PostSchema = z.object({
    id: z.string().or(z.number()),
    title: z.string(),
    content: z.string(),
    userId: z.string(),
    createdAt: z.date().or(z.string()),
    userName: z.string().optional(),
    replyTo: z.string().optional(),
});

const Acceuil: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newPost, setNewPost] = useState<{ title: string; content: string }>({ title: '', content: '' });

    // Nouveaux états pour la modale et les réponses
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [replies, setReplies] = useState<Post[]>([]);
    const [newReply, setNewReply] = useState<string>('');
    const [loadingReplies, setLoadingReplies] = useState<boolean>(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:9552/post/all');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data = await response.json();
                const parsedPosts = data.map((post: any) => {
                    const result = PostSchema.safeParse(post);
                    if (!result.success) {
                        throw result.error;
                    }
                    return result.data;
                });
                setPosts(parsedPosts);
                setLoading(false);
            } catch (err) {
                console.error('Erreur détaillée :', err);
                setError(err instanceof Error ? err.message : 'Erreur lors de la récupération des posts.');
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const fetchReplies = async (postId: number) => {
        setLoadingReplies(true);
        try {
            const response = await fetch(`http://localhost:9552/post/${postId}/replies`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            setReplies(data);
            setLoadingReplies(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des réponses :', error);
            setLoadingReplies(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9552/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newPost.title,
                    content: newPost.content,
                    userId: 'user-id', // Remplace par le bon ID utilisateur
                    createdAt: new Date(),
                }),
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const newPostData = await response.json();
            const result = PostSchema.safeParse(newPostData);
            if (!result.success) {
                throw result.error;
            }
            setPosts(prev => [...prev, result.data]);
            setNewPost({ title: '', content: '' });
        } catch (err) {
            console.error('Erreur lors de la création du post :', err);
            setError(err instanceof Error ? err.message : 'Erreur lors de la création du post.');
        }
    };

    const handleOpenModal = (post: Post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
        fetchReplies(post.id); // Récupérer les réponses pour ce post
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
        setReplies([]); // Réinitialiser les réponses lors de la fermeture
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        try {
            const response = await fetch('http://localhost:9552/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Réponse',
                    content: newReply,
                    userId: 'user-id',
                    replyTo: selectedPost?.id,
                    createdAt: new Date(),
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }

            const newReplyData = await response.json();
            setReplies(prev => [...prev, newReplyData]);
            setNewReply('');
        } catch (error) {
            console.error('Erreur lors de la publication de la réponse :', error);
        }
    };

    return (
        <div className="bg-base-200">
            <Navbar />

            {/* Section Créer un Post */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-bold mb-6 text-primary">Créer un nouveau post</h2>
                <form onSubmit={handleSubmit} className="mb-10">
                    <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        value={newPost.title}
                        onChange={handleInputChange}
                        className="input input-bordered w-full mb-4"
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="Contenu"
                        value={newPost.content}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full mb-4"
                        required
                    />
                    <button type="submit" className="btn btn-primary">Poster</button>
                </form>
            </section>

            {/* Section Discussions Récentes */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-bold mb-6 text-primary">Discussions récentes</h2>
                {loading && <p>Chargement des discussions...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 text-primary">
                    {posts.map((post) => (
                        <div className="card shadow-lg" key={post.id}>
                            <div className="card-body">
                                <h3 className="card-title text-xl font-bold">{post.title}</h3>
                                <p className="text-gray-700">{post.content}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline" onClick={() => handleOpenModal(post)}>
                                        Voir la discussion
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <button className="btn btn-primary">Voir toutes les discussions</button>
                </div>
            </section>

            {/* Modal pour afficher le post complet et ses réponses */}
            {isModalOpen && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl font-bold mb-4 text-primary dark:text-primary">{selectedPost.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{selectedPost.content}</p>

                        {/* Réponses */}
                        <div className="mt-6">
                            <h4 className="text-xl font-semibold text-primary dark:text-primary mb-4">Réponses :</h4>
                            {loadingReplies ? (
                                <p>Chargement des réponses...</p>
                            ) : (
                                replies.map((reply) => (
                                    <div key={reply.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                                        <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                                    </div>
                                ))
                            )}

                            <form onSubmit={handleReplySubmit} className="mt-4">
                                <textarea
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    placeholder="Votre réponse..."
                                    className="textarea textarea-bordered w-full mb-4"
                                    required
                                />
                                <button type="submit" className="btn btn-primary">Répondre</button>
                            </form>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="btn btn-secondary dark:btn-primary" onClick={handleCloseModal}>
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

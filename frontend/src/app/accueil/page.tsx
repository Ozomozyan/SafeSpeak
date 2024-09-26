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
    id: z.number(),
    title: z.string(),
    content: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    userName: z.string().optional(),
    replyTo: z.string().optional(),
});

const Acceuil: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newPost, setNewPost] = useState<{ title: string; content: string }>({ title: '', content: '' });

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
                        throw new Error('Validation échouée pour un ou plusieurs posts');
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newPost.title,
                    content: newPost.content,
                    userId: 'user-id', // Replace with actual user ID or retrieve it from context
                }),
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const newPostData = await response.json();
            const result = PostSchema.safeParse(newPostData);
            if (!result.success) {
                throw new Error('Validation échouée pour le nouveau post');
            }
            setPosts(prev => [...prev, result.data]);
            setNewPost({ title: '', content: '' });
        } catch (err) {
            console.error('Erreur lors de la création du post :', err);
            setError(err instanceof Error ? err.message : 'Erreur lors de la création du post.');
        }
    };

    return (
        <div className="bg-base-200">
            <Navbar />

            {/* Section Créer un Post */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-bold mb-6">Créer un nouveau post</h2>
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
                <h2 className="text-4xl font-bold mb-6">Discussions récentes</h2>
                {loading && <p>Chargement des discussions...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                    {posts.map((post) => (
                        <div className="card shadow-lg" key={post.id}>
                            <div className="card-body">
                                <h3 className="card-title text-xl font-bold">{post.title}</h3>
                                <p className="text-gray-700">{post.content}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline">Voir la discussion</button>
                                </div>
                            </div>
                        </div>
                    ))}
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

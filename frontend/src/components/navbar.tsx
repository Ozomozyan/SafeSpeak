import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/accueil" className="btn btn-ghost flex items-center">
                    <img src="https://cdn.discordapp.com/attachments/1153257187049742356/1288802935626666017/IMG_9231.png?ex=66f682c4&is=66f53144&hm=4b4b4fa917502a145f2f68be8bfb8a5607eeba9b4f1e602cda69f2c8364d18c8&" alt="SafeSpeak Logo" className="h-10 w-10 rounded-full mr-2" />
                    <span className="text-xl">SafeSpeak</span>
                </Link>
            </div>
            <div className="flex-none gap-2">
                {/* Lien vers la page UrgencePage */}
                <Link href="/nb_vert" className="btn btn-primary">Urgences</Link>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src={"/unknow.jpg"} alt={'unknow'} width={50} height={50} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

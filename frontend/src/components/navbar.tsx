import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use this to handle redirection after logout

const Navbar: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear any session data (e.g., localStorage, sessionStorage, or cookies)
        localStorage.removeItem('userId'); // Remove stored user information (if any)

        // Redirect to the login page
        router.push('/login');
    };
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/accueil" className="btn btn-ghost flex items-center">
                    <img src="/logoworkshop.png" alt="SafeSpeak Logo" className="h-10 w-30 mr-2" />
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
                        <li><a onClick={handleLogout}>Logout</a></li> {/* Trigger logout onClick */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

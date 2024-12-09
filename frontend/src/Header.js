import { useState } from 'react';



function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap dark:bg-gray-800 p-6 mb-2">
            <div className="flex items-center flex-shrink-0 text-white mr-6">

                <span className="font-semibold text-xl tracking-tight"><a href='/'>TODO APP</a></span>
            </div>

            {/* Hamburger button */}
            <div className="block lg:hidden">
                <button
                    onClick={toggleMenu}  // Toggle menu on button click
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>

            {/* Menu items */}
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow">
                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-500 mr-4">
                        Home
                    </a>
                    <a href="/completedTasks" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-500 mr-4">
                        Completed Tasks
                    </a>
                    <a href="createTask" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-500">
                        Add Tasks
                    </a>
                </div>

            </div>
        </nav>
    );
}

export default Header;
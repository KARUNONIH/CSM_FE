import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 10);

    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/projects' },
    { name: 'Clients', path: '/clients' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const isHome = location.pathname === '/';

  const getNavBackground = () => {
    if (!isHome) return 'bg-white/95 backdrop-blur-md shadow-sm';

    return isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent shadow-none';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 font-jakarta py-1 md:py-1 ${getNavBackground()}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logo-csm.png" alt="cipta Selamat Mandiri" className={`h-16 md:h-26 w-auto object-contain transition-all duration-300 ${isHome && !isScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'}`} />
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const textColor = isHome && !isScrolled ? (active ? 'text-white' : 'text-white/80 hover:text-white') : active ? 'text-brm-maroon' : 'text-brm-maroon/80 hover:text-brm-maroon';
            const underlineColor = isHome && !isScrolled ? 'bg-white' : 'bg-brm-maroon';

            return (
              <Link key={link.path} to={link.path} className={`text-[18px] font-bold tracking-wide transition-all duration-300 relative pb-1 ${textColor}`}>
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${underlineColor} ${active ? 'w-full' : 'w-0'}`}></span>
              </Link>
            );
          })}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden focus:outline-none p-2 transition-colors ${isHome && !isScrolled ? 'text-white' : 'text-brm-maroon'}`} aria-label="Toggle Menu">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out lg:hidden w-full h-screen top-0 left-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`text-2xl font-bold transition-colors ${isActive(link.path) ? 'text-brm-maroon border-b-2 border-brm-maroon inline-block' : 'text-gray-600 hover:text-brm-maroon'}`}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-10 text-center space-y-1">
          <p className="text-sm font-semibold text-brm-green">PT. CIPTA SELAMAT MANDIRI</p>
          <p className="text-xs text-gray-400">Precision Building. Sustainable Value.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

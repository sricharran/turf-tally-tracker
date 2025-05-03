
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button } from './ui/button';
import { User, LogOut, UserPlus } from 'lucide-react';

const Header = () => {
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false);

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-cricket-pitch rounded-full p-1">
            <div className="bg-cricket-highlight rounded-full h-5 w-5"></div>
          </div>
          <span className="font-bold text-lg">Turf Tally</span>
        </Link>
        
        <nav className="flex items-center ml-6 space-x-4 lg:space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/matches" className="text-sm font-medium transition-colors hover:text-primary">
            Matches
          </Link>
          <Link to="/players" className="text-sm font-medium transition-colors hover:text-primary">
            Players
          </Link>
          <Link to="/stats" className="text-sm font-medium transition-colors hover:text-primary">
            Statistics
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          {isAdmin ? (
            <>
              <Link to="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                <Button variant="outline" size="sm" className="gap-1">
                  <User size={16} />
                  <span>Admin</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="gap-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-1">
                  <User size={16} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" size="sm" className="gap-1">
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">Agent Control Panel</h2>
                <div className="h-4 w-[1px] bg-border mx-2" />
                <span className="text-sm text-muted-foreground font-mono">
                    {time.toLocaleTimeString()}
                </span>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>System Online</span>
                </div>

                <Button variant="ghost" size="icon">
                    <Bell size={20} className="text-muted-foreground" />
                </Button>

                <div className="flex items-center space-x-3 pl-4 border-l border-border">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-medium">Jason Schober</div>
                        <div className="text-xs text-muted-foreground">Admin</div>
                    </div>
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        JS
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

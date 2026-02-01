import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Activity, label: 'Executions', path: '/executions' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="w-64 bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    NNR Control
                </h1>
            </div>

            <div className="flex-1 px-4 py-2 space-y-2">
                {navItems.map((item) => (
                    <Link to={item.path} key={item.path}>
                        <div
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                location.pathname === item.path
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-border">
                <Link to="/agents/new">
                    <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> New Agent
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;

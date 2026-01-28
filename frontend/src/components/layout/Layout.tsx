import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;

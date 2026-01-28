import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AgentDetail from './pages/AgentDetail';
import Executions from './pages/Executions';
import AgentForm from './pages/AgentForm';
import Settings from './pages/Settings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents/:id" element={<AgentDetail />} />
            <Route path="/agents/new" element={<AgentForm />} />
            <Route path="/agents/:id/edit" element={<AgentForm />} />
            <Route path="/executions" element={<Executions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

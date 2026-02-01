import { useMetrics } from '@/hooks/useMetrics';
import { useAgents } from '@/hooks/useAgents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
    const { data: metricsData } = useMetrics();
    const { data: agents, isLoading: agentsLoading } = useAgents();
    const queryClient = useQueryClient();
    const [triggeringAgent, setTriggeringAgent] = useState<string | null>(null);

    const handleTriggerAgent = async (agentName: string) => {
        try {
            setTriggeringAgent(agentName);
            console.log('Triggering agent:', agentName);
            
            const response = await api.executeAgent(agentName, {
                source: 'control-panel',
                timestamp: new Date().toISOString(),
            });
            
            console.log('Agent triggered successfully:', response);
            
            // Show success notification (you can add a toast library later)
            alert(`Agent "${agentName}" triggered successfully!\nExecution ID: ${response.executionId || 'N/A'}`);
            
            // Refresh executions list
            queryClient.invalidateQueries({ queryKey: ['executions'] });
        } catch (error) {
            console.error('Failed to trigger agent:', error);
            alert(`Failed to trigger agent: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setTriggeringAgent(null);
        }
    };

    // Extract metrics or use defaults
    const metrics = metricsData || {};
    
    // Agents is already an array from the API
    const agentsList = agents || [];

    const stats = [
        { label: 'Total Agents', value: agentsList.length || 0, icon: Zap, color: 'text-blue-500' },
        { label: 'Executions Today', value: metrics.executionsToday || 0, icon: Activity, color: 'text-purple-500' },
        { label: 'Success Rate', value: metrics.successRate ? `${(metrics.successRate * 100).toFixed(0)}%` : 'NaN%', icon: CheckCircle, color: 'text-green-500' },
        { label: 'Avg Response', value: metrics.avgResponseTime ? `${metrics.avgResponseTime}s` : 'undefined', icon: Clock, color: 'text-orange-500' },
    ];

    if (agentsLoading) {
        return <div className="flex items-center justify-center h-64">Loading agents...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agentsList.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground py-8">
                        No agents found. Create your first agent to get started.
                    </div>
                ) : (
                    agentsList.map((agent: any) => (
                        <Card key={agent.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">
                                    {agent.name}
                                </CardTitle>
                                <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                                    {agent.status || 'inactive'}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4 h-10 line-clamp-2">
                                    {agent.description}
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type:</span>
                                        <span className="capitalize">{agent.type || 'webhook'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Model:</span>
                                        <span>{agent.model || 'N/A'}</span>
                                    </div>
                                    {agent.schedule && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Schedule:</span>
                                            <span>{agent.schedule}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <Link to={`/agents/${agent.id}`} className="w-full">
                                        <Button variant="outline" className="w-full">View Details</Button>
                                    </Link>
                                    <Button 
                                        size="sm" 
                                        onClick={() => handleTriggerAgent(agent.name)}
                                        disabled={triggeringAgent === agent.name}
                                    >
                                        {triggeringAgent === agent.name ? 'Triggering...' : 'Trigger'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;

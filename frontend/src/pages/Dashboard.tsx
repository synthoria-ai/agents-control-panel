import { useMetrics } from '@/hooks/useMetrics';
import { useAgents } from '@/hooks/useAgents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
    const { data: metricsData } = useMetrics();
    const { data: agentsData } = useAgents();

    const metrics = metricsData?.data || {};
    const agents = agentsData?.data || [];

    const stats = [
        { label: 'Total Agents', value: metrics.totalAgents || 0, icon: Zap, color: 'text-blue-500' },
        { label: 'Executions Today', value: metrics.executionsToday || 0, icon: Activity, color: 'text-purple-500' },
        { label: 'Success Rate', value: `${(metrics.successRate * 100).toFixed(0)}%`, icon: CheckCircle, color: 'text-green-500' },
        { label: 'Avg Response', value: `${metrics.avgResponseTime}s`, icon: Clock, color: 'text-orange-500' },
    ];

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
                {agents.map((agent: any) => (
                    <Card key={agent.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">
                                {agent.name}
                            </CardTitle>
                            <Badge variant={agent.status === 'running' ? 'default' : agent.status === 'error' ? 'destructive' : 'secondary'}>
                                {agent.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 h-10 line-clamp-2">
                                {agent.description}
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Run:</span>
                                    <span>{new Date(agent.lastExecution).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Next Run:</span>
                                    <span>{agent.nextExecution === 'Manual trigger' ? 'Manual' : new Date(agent.nextExecution).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <Link to={`/agents/${agent.id}`} className="w-full">
                                    <Button variant="outline" className="w-full">View Details</Button>
                                </Link>
                                <Button size="sm">Trigger</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

import { useParams, Link } from 'react-router-dom';
import { useAgent } from '@/hooks/useAgents';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Play, Settings, Clock } from 'lucide-react';
import SkillsEditor from '@/components/agents/SkillsEditor';


const AgentDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useAgent(id || '');

    // @ts-ignore
    const agent = data?.data;

    if (isLoading) return <div>Loading...</div>;
    if (!agent) return <div>Agent not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Link to="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        {agent.name}
                        <Badge variant={agent.status === 'running' ? 'default' : agent.status === 'error' ? 'destructive' : 'secondary'}>
                            {agent.status}
                        </Badge>
                    </h1>
                    <p className="text-muted-foreground">{agent.description}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" /> Configure
                    </Button>
                    <Button>
                        <Play className="w-4 h-4 mr-2" /> Trigger Now
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Skills Editor</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Type</div>
                                        <div>{agent.type}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Model</div>
                                        <div>{agent.model}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Schedule</div>
                                        <div>{agent.schedule || "N/A"}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Temperature</div>
                                        <div>{agent.temperature}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Next Execution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-2xl font-mono">
                                    <Clock className="w-6 h-6 text-muted-foreground" />
                                    {agent.nextExecution === 'Manual trigger'
                                        ? 'Manual Trigger Only'
                                        : new Date(agent.nextExecution).toLocaleString()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="skills">
                    <SkillsEditor filePath={`skills/${agent.id}.md`} />
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Execution History</CardTitle>
                            <CardDescription>Recent runs for this agent</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm italic">
                                Execution history table would go here (filtered by agent ID).
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="performance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border-dashed border-2 rounded-lg">
                                <span className="text-muted-foreground">Charts loading... (Requires Recharts Implementation)</span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AgentDetail;

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { AlertTriangle, Key, RefreshCcw, Save, Server, Trash2 } from 'lucide-react';

const Settings = () => {
    const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

    // Mock initial data
    const [integrations, setIntegrations] = useState({
        slack: true,
        n8n: false,
        email: true
    });

    const handleIntegrationToggle = (key: keyof typeof integrations) => {
        setIntegrations(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} integration ${newState[key] ? 'enabled' : 'disabled'}`);
            return newState;
        });
    };

    const handleSystemSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("System configuration saved");
    };

    const handleRestart = () => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
            loading: 'Restarting system...',
            success: 'System restarted successfully',
            error: 'Failed to restart'
        });
    };

    const handleClearLogs = () => {
        toast.success("All logs cleared");
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-10">
            <h1 className="text-3xl font-bold">Settings</h1>

            {/* SECTION 1: API KEYS */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="w-5 h-5" /> API Keys
                    </CardTitle>
                    <CardDescription>Manage your external service credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <div className="font-medium">Gemini API Key</div>
                            <div className="text-sm text-muted-foreground font-mono">••••••••••••abc123</div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setApiKeyModalOpen(true)}>Edit</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <div className="font-medium">Ghost API Key</div>
                            <div className="text-sm text-muted-foreground font-mono">••••••••••••xyz789</div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setApiKeyModalOpen(true)}>Edit</Button>
                    </div>
                </CardContent>
            </Card>

            {/* API Key Modal */}
            <Dialog open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update API Key</DialogTitle>
                        <DialogDescription>Enter the new API key for the selected service.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>API Key</Label>
                            <Input type="password" placeholder="sk-..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setApiKeyModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            setApiKeyModalOpen(false);
                            toast.success("API Key updated");
                        }}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* SECTION 2: INTEGRATIONS */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Server className="w-5 h-5" /> Integrations
                    </CardTitle>
                    <CardDescription>Connect with third-party services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Slack Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts in your Slack workspace</p>
                        </div>
                        <Switch
                            checked={integrations.slack}
                            onCheckedChange={() => handleIntegrationToggle('slack')}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">n8n Webhooks</Label>
                            <p className="text-sm text-muted-foreground">Trigger n8n workflows on events</p>
                        </div>
                        <Switch
                            checked={integrations.n8n}
                            onCheckedChange={() => handleIntegrationToggle('n8n')}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Email Alerts</Label>
                            <p className="text-sm text-muted-foreground">Get daily summaries via email</p>
                        </div>
                        <Switch
                            checked={integrations.email}
                            onCheckedChange={() => handleIntegrationToggle('email')}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* SECTION 3: SYSTEM CONFIG */}
            <Card>
                <CardHeader>
                    <CardTitle>System Configuration</CardTitle>
                    <CardDescription>Configure the agent runtime environment</CardDescription>
                </CardHeader>
                <form onSubmit={handleSystemSave}>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="runtime-url">Agent Runtime URL</Label>
                            <Input id="runtime-url" defaultValue="http://localhost:3000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="polling">Polling Interval (s)</Label>
                                <Input id="polling" type="number" defaultValue="10" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="retention">Log Retention (days)</Label>
                                <Input id="retention" type="number" defaultValue="30" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Configuration</Button>
                    </CardFooter>
                </form>
            </Card>

            {/* SECTION 4: DANGER ZONE */}
            <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div>
                            <div className="font-medium text-red-900 dark:text-red-200">Restart All Agents</div>
                            <div className="text-sm text-red-700 dark:text-red-400">Restarts the background process manager. Active tasks may be interrupted.</div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive"><RefreshCcw className="w-4 h-4 mr-2" /> Restart</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription>
                                        This will immediately restart all running agents. Any in-progress executions might be lost.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button variant="destructive" onClick={handleRestart}>Yes, Restart System</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div>
                            <div className="font-medium text-red-900 dark:text-red-200">Clear All Logs</div>
                            <div className="text-sm text-red-700 dark:text-red-400">Permanently delete all execution history. This action cannot be undone.</div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive"><Trash2 className="w-4 h-4 mr-2" /> Clear Logs</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete all logs?</DialogTitle>
                                    <DialogDescription>
                                        This will permanently remove all execution history from the database.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="ghost">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button variant="destructive" onClick={handleClearLogs}>Yes, Delete Everything</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;

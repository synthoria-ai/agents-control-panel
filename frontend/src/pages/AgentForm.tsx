import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { api } from '@/lib/api';

// Schema
const agentSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
    displayName: z.string().min(3, "Display name is required"),
    description: z.string().optional(),
    type: z.enum(["scheduled", "webhook"]),
    schedule: z.string().optional(),
    model: z.string(),
    temperature: z.number().min(0).max(1),
    enabled: z.boolean().default(true),
    useTemplate: z.boolean().optional(),
    templateId: z.string().optional(),
});

type AgentFormValues = z.infer<typeof agentSchema>;

const AgentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const form = useForm<AgentFormValues>({
        resolver: zodResolver(agentSchema),
        defaultValues: {
            name: '',
            displayName: '',
            description: '',
            type: 'scheduled',
            schedule: '0 9 * * *',
            model: 'gemini-2.5-flash-latest',
            temperature: 0.7,
            enabled: true,
            useTemplate: true,
            templateId: 'basic-agent'
        }
    });

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = form;
    const type = watch('type');
    const useTemplate = watch('useTemplate');

    const onSubmit = async (data: AgentFormValues) => {
        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app:
            // if (isEditMode) await api.put(`/agents/${id}`, data);
            // else await api.post('/agents', data);

            toast.success(isEditMode ? "Agent updated successfully" : "Agent created successfully");
            navigate('/agents/content-research'); // Go to detail page (mock)
        } catch (error) {
            toast.error("Failed to save agent");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-10">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Agent' : 'Create New Agent'}</h1>
                    <p className="text-muted-foreground">{isEditMode ? 'Update agent configuration' : 'Configure a new autonomous agent'}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Identity and core settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Display Name</Label>
                                <Input {...register('displayName')} placeholder="e.g. Content Researcher" />
                                {errors.displayName && <p className="text-sm text-red-500">{errors.displayName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Agent ID (Slug)</Label>
                                <Input {...register('name')} placeholder="e.g. content-researcher" disabled={isEditMode} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea {...register('description')} placeholder="What does this agent do?" />
                        </div>

                        <div className="space-y-2">
                            <Label>Execution Type</Label>
                            <div className="flex gap-4">
                                <div className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${type === 'scheduled' ? 'bg-primary/5 border-primary' : 'hover:bg-muted'}`} onClick={() => setValue('type', 'scheduled')}>
                                    <div className="font-semibold">Scheduled</div>
                                    <div className="text-sm text-muted-foreground">Runs on a cron schedule</div>
                                </div>
                                <div className={`flex-1 border rounded-lg p-4 cursor-pointer transition-colors ${type === 'webhook' ? 'bg-primary/5 border-primary' : 'hover:bg-muted'}`} onClick={() => setValue('type', 'webhook')}>
                                    <div className="font-semibold">Webhook</div>
                                    <div className="text-sm text-muted-foreground">Runs when triggered via API</div>
                                </div>
                            </div>
                        </div>

                        {type === 'scheduled' && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                <Label>Schedule (Cron)</Label>
                                <div className="flex gap-2">
                                    <Input {...register('schedule')} placeholder="0 9 * * *" className="font-mono" />
                                </div>
                                <p className="text-xs text-muted-foreground">Example: 0 9 * * * (Daily at 9 AM)</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>AI Configuration</CardTitle>
                        <CardDescription>Model and behavior settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Model</Label>
                                <Select onValueChange={(val) => setValue('model', val)} defaultValue={watch('model')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gemini-2.5-flash-latest">Gemini 2.5 Flash</SelectItem>
                                        <SelectItem value="gemini-2.5-pro-latest">Gemini 2.5 Pro</SelectItem>
                                        <SelectItem value="gemini-1.5-pro-002">Gemini 1.5 Pro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Temperature: {watch('temperature')}</Label>
                                <Input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    {...register('temperature', { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {!isEditMode && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                            <CardDescription>Define how the agent works</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={useTemplate}
                                    onCheckedChange={(val) => setValue('useTemplate', val)}
                                />
                                <Label>Start from template</Label>
                            </div>

                            {useTemplate && (
                                <div className="space-y-2 animate-in fade-in">
                                    <Label>Select Template</Label>
                                    <Select onValueChange={(val) => setValue('templateId', val)} defaultValue={watch('templateId')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="basic-agent">Basic Agent (Research & Summarize)</SelectItem>
                                            <SelectItem value="data-extraction">Data Extraction</SelectItem>
                                            <SelectItem value="social-media">Social Media Post Generator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> {isEditMode ? 'Update Agent' : 'Create Agent'}</>}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AgentForm;

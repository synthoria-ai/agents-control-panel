import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const Executions = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['executions'],
        queryFn: () => api.get('/executions?limit=50'),
    });

    // API returns array directly after mapping
    const executions = data || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Executions</h2>
                <Button>Download CSV</Button>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : executions.map((exec: any) => (
                            <TableRow key={exec.id}>
                                <TableCell>{format(new Date(exec.startTime), 'MMM d, HH:mm:ss')}</TableCell>
                                <TableCell>{exec.agentName}</TableCell>
                                <TableCell>
                                    <Badge variant={exec.status === 'success' ? 'default' : 'destructive'}>
                                        {exec.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{exec.duration}s</TableCell>
                                <TableCell className="max-w-[200px] truncate text-muted-foreground">
                                    {typeof exec.result === 'string' ? exec.result : exec.result?.summary || 'N/A'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">View Logs</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Executions;

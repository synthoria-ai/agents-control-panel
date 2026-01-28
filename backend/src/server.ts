import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { agentRoutes } from './routes/agents';
import { executionRoutes } from './routes/executions';
import { metricsRoutes } from './routes/metrics';
import { settingsRoutes } from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/agents', agentRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/system', (req: any, res: any) => {
    if (req.path === '/status') {
        res.json({ status: 'ok', uptime: process.uptime() });
    } else if (req.path === '/restart' && req.method === 'POST') {
        // Mock restart
        setTimeout(() => {
            console.log('System restarting...');
        }, 1000);
        res.json({ success: true, message: 'Restart initiated' });
    } else {
        res.status(404).send('Not found');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

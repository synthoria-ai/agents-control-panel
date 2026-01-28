import { Router } from 'express';
// Mock data
import { MOCK_AGENTS } from '../lib/mockData';

const router = Router();

// GET /api/agents
router.get('/', (req, res) => {
    // @ts-ignore
    res.json({ success: true, data: MOCK_AGENTS });
});

// GET /api/agents/:id
router.get('/:id', (req, res) => {
    const agent = MOCK_AGENTS.find(a => a.id === req.params.id);
    if (!agent) {
        return res.status(404).json({ success: false, error: 'Agent not found' });
    }
    res.json({ success: true, data: agent });
});

// POST /api/agents
router.post('/', (req, res) => {
    // Mock create
    // @ts-ignore
    const newAgent = { ...req.body, id: req.body.name.toLowerCase().replace(/\s+/g, '-'), status: 'idle' };
    MOCK_AGENTS.push(newAgent);
    res.status(201).json({ success: true, data: newAgent });
});

// POST /api/agents/:id/trigger
router.post('/:id/trigger', (req, res) => {
    // Mock trigger
    res.json({ success: true, message: `Agent ${req.params.id} triggered` });
});

// GET /api/agents/:id/toggle
router.get('/:id/toggle', (req, res) => {
    // Mock toggle
    const agent = MOCK_AGENTS.find(a => a.id === req.params.id);
    if (agent) {
        // @ts-ignore
        agent.enabled = !agent.enabled;
        res.json({ success: true, data: agent });
    } else {
        res.status(404).json({ success: false, error: 'Agent not found' });
    }
});


export const agentRoutes = router;

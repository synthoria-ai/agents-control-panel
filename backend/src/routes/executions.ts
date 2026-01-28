import { Router } from 'express';
import { MOCK_EXECUTIONS } from '../lib/mockData';

const router = Router();

// GET /api/executions
router.get('/', (req, res) => {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = MOCK_EXECUTIONS.slice(startIndex, endIndex);

    res.json({
        success: true,
        data: results,
        pagination: {
            total: MOCK_EXECUTIONS.length,
            page,
            limit,
            pages: Math.ceil(MOCK_EXECUTIONS.length / limit)
        }
    });
});

// GET /api/executions/:id
router.get('/:id', (req, res) => {
    const execution = MOCK_EXECUTIONS.find(e => e.id === req.params.id);
    if (!execution) {
        return res.status(404).json({ success: false, error: 'Execution not found' });
    }
    res.json({ success: true, data: execution });
});

export const executionRoutes = router;

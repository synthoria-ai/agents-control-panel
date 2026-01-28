import { Router } from 'express';
import { MOCK_METRICS } from '../lib/mockData';

const router = Router();

// GET /api/metrics
router.get('/', (req, res) => {
    res.json({ success: true, data: MOCK_METRICS });
});

export const metricsRoutes = router;

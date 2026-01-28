export const MOCK_AGENTS = [
    {
        id: "content-research",
        name: "Content Research Agent",
        description: "Identifies trending topics and generates content briefs based on market analysis.",
        type: "scheduled",
        schedule: "0 7 * * *",
        model: "gemini-2.5-flash-latest",
        temperature: 0.7,
        enabled: true,
        status: "idle",
        lastExecution: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        nextExecution: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // in 5 hours
    },
    {
        id: "social-media-manager",
        name: "Social Media Manager",
        description: "Generates and posts social media updates across platforms.",
        type: "scheduled",
        schedule: "0 9 * * *",
        model: "gemini-2.5-pro-latest",
        temperature: 0.8,
        enabled: true,
        status: "running",
        lastExecution: new Date(Date.now() - 1000 * 30).toISOString(), // 30s ago
        nextExecution: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        id: "revenue-tracker",
        name: "Revenue Tracker",
        description: "Monitors stripe events and updates tracking sheets.",
        type: "webhook",
        schedule: null,
        model: "gemini-2.5-flash-latest",
        temperature: 0.1,
        enabled: true,
        status: "idle",
        lastExecution: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        nextExecution: "Manual trigger",
    },
    {
        id: "customer-support",
        name: "Customer Support Helper",
        description: "Drafts responses to customer emails.",
        type: "webhook",
        schedule: null,
        model: "gemini-2.5-pro-latest",
        temperature: 0.3,
        enabled: false,
        status: "idle",
        lastExecution: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        nextExecution: null
    },
    {
        id: "seo-optimizer",
        name: "SEO Optimizer",
        description: "Analyzes blog posts and suggests SEO improvements.",
        type: "scheduled",
        schedule: "0 2 * * 1", // Weekly
        model: "gemini-2.5-flash-latest",
        temperature: 0.5,
        enabled: true,
        status: "error",
        lastExecution: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        nextExecution: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
        id: "weekly-report",
        name: "Weekly Report Generator",
        description: "Compiles weekly performance metrics into a PDF report.",
        type: "scheduled",
        schedule: "0 8 * * 5", // Fridays
        model: "gemini-2.5-pro-latest",
        temperature: 0.2,
        enabled: true,
        status: "idle",
        lastExecution: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        nextExecution: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
    }
];

export const MOCK_EXECUTIONS = Array.from({ length: 50 }).map((_, i) => ({
    id: `exec_${Math.random().toString(36).substr(2, 9)}`,
    agentId: MOCK_AGENTS[i % MOCK_AGENTS.length].id,
    agentName: MOCK_AGENTS[i % MOCK_AGENTS.length].name,
    status: Math.random() > 0.1 ? 'success' : 'error',
    startTime: new Date(Date.now() - 1000 * 60 * 60 * i).toISOString(),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * i + 1000 * (Math.random() * 10)).toISOString(),
    duration: (Math.random() * 10).toFixed(2),
    result: { summary: "Operation completed successfully", items_processed: Math.floor(Math.random() * 10) },
    logs: "[INFO] Starting agent...\n[INFO] Processing data...\n[INFO] Step 1 complete.\n[SUCCESS] Done.",
    tokensUsed: Math.floor(Math.random() * 2000),
    cost: (Math.random() * 0.05).toFixed(4)
}));

export const MOCK_METRICS = {
    totalAgents: MOCK_AGENTS.length,
    activeAgents: MOCK_AGENTS.filter(a => a.enabled).length,
    executionsToday: 12,
    successRate: 0.95,
    avgResponseTime: 3.2,
    totalTokens: 145000,
    estimatedCost: 24.50
};

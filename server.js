const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const port = 3000;

// Enable compression
app.use(compression());

// Serve static files with caching
app.use(express.static('.', {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// Serve service worker with proper headers
app.get('/sw.js', (req, res) => {
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, 'sw.js'));
});

// Serve manifest
app.get('/manifest.json', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, 'manifest.json'));
});

// Serve index for all routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`
    ═══════════════════════════════════════════════
    🌍 World TV PWA is running!
    ═══════════════════════════════════════════════
    📱 Local:    http://localhost:${port}
    📱 Network:  http://${getLocalIp()}:${port}
    ═══════════════════════════════════════════════
    Press Ctrl+C to stop
    `);
});

function getLocalIp() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

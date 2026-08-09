const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    // Allow the frontend to communicate with the backend
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle browser preflight requests
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Health check
    if (req.url === "/api/health" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            status: "online",
            platform: "Security Platform V5.0",
            version: "5.1"
        }));

        return;
    }

    // Unknown route
    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        error: "Route not found"
    }));
});

server.listen(PORT, () => {
    console.log(
        `Security Platform backend running on port ${PORT}`
    );
});

import path from 'path';
const _dirname = path.resolve();


app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


"dev": "nodemon backend/index.js",
"build" : "npm install && npm install --prefix frontend && npm run build --prefix frontend",
"start": "nodemon backend/index.js"
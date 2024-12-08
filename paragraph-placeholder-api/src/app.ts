import express from 'express';
import { join } from 'path';
import paragraphRoutes from './routes/paragraphRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the "dist/public" directory
app.use(express.static(join(__dirname, 'public')));

// API routes
app.use('/api/paragraphs', paragraphRoutes);

// Root route to serve the landing page
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Handle 404 for unmatched routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

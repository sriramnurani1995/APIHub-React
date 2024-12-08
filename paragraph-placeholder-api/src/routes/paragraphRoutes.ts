import express, { Request, Response } from 'express';
import { generateParagraphs } from '../services/paragraphService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const type = (req.query.type as string) || 'lorem';
    const length = (req.query.length as string) || 'medium';
    const count = parseInt(req.query.count as string, 10) || 1;

    // Validate inputs
    if (!['lorem', 'cat', 'pup', 'business', 'tech', 'hipster'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type. Supported types are lorem, cat, pup, business, tech, hipster.' });
    }

    if (!['short', 'medium', 'long'].includes(length)) {
        return res.status(400).json({ error: 'Invalid length. Supported values are short, medium, long.' });
    }

    if (count < 1 || count > 10) {
        return res.status(400).json({ error: 'Invalid count. Please provide a number between 1 and 10.' });
    }

    // Generate paragraphs
    const paragraphs = generateParagraphs(type, length, count);
    res.json({ paragraphs });
});

export default router;

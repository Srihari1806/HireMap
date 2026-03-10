import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import jobRoutes from './routes/jobs';
import collegeRoutes from './routes/colleges';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/colleges', collegeRoutes);

app.get('/', (req, res) => {
    res.send('HireMap API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

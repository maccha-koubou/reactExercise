import express from 'express';
import calculateBmi from '../bmiCalculator';
import calculateExercises from "../exerciseCalculator";

const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

// @ts-expect-error some explanations here
app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({weight, height, bmi});
});

// @ts-expect-error some explanations here
app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        return res.status(400).json({ error: 'parameters missing' });
    }
    if (
        !Array.isArray(daily_exercises) || daily_exercises.some(day => isNaN(Number(day))) || isNaN(Number(target))
    ) {
        return res.status(400).json({ error: 'malformatted parameters' })
    }
    const result = calculateExercises(daily_exercises.map(Number), Number(target));
    res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
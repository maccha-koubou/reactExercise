const calculateExercises = (timeEveryday: Array<number>, target: number) => {
    const periodLength = timeEveryday.length;
    const trainingDays = timeEveryday.filter(day => day != 0).length;
    const average = timeEveryday.reduce((sum, day) => sum + day, 0) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = 'good';
    } else if (average >= target / 2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'could be better';
    }

    return { periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const array: Array<number> = process.argv.slice(3).map(Number);
const t: number = Number(process.argv[2]);

console.log(calculateExercises(array, t));

export default calculateExercises;
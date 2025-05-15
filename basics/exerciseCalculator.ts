interface exerciseReturn {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

let rateDescription = (rating: number): string => {
    switch (rating) {
        case 1:
            return "Pretty Bad";
        case 2:
            return "Not Great but keep it up";
        case 3:
            return "You are doing good keep at it";
        case 4:
            return "You are doing great don't stop";
        case 5:
            return "You have achieved peak of humanity";
        default:
            return "Wauu You suck";
    }
};

let exerciseCalculator = (
    exerciseEachDay: Array<number>,
    targetPerDay: number
): exerciseReturn => {
    let average: number =
        exerciseEachDay.reduce((accu, cur) => accu + cur) /
        exerciseEachDay.length;
    let trainingDays: number = exerciseEachDay.reduce((accu, cur) => {
        if (cur > 0) {
            return accu + 1;
        }
        return accu;
    }, 0);
    let rating: number = Math.min(Math.floor((average / targetPerDay) * 5), 5);
    if (trainingDays < exerciseEachDay.length) {
        rating -= 1;
    }
    let ratingDes: string = rateDescription(rating);

    return {
        periodLength: exerciseEachDay.length,
        trainingDays: trainingDays,
        success: false,
        rating: rating,
        ratingDescription: ratingDes,
        target: targetPerDay,
        average: average,
    };
};
let target: number = Number(process.argv[2]);
let arr: number[] = process.argv.slice(3).map((e) => Number(e));
console.log(arr);
console.log(exerciseCalculator(arr, target));

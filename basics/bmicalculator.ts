const calculateBmi = (height: number, weight: number): string => {
    let bmi = weight / (height * height);
    if (bmi < 25) {
        return "Normal Range";
    }
    if (bmi < 29) {
        return "Overweight Range";
    } else {
        return "Obese Range";
    }
};
let height: number = Number(process.argv[2]);
let weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));

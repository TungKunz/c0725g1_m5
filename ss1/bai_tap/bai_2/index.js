//Bai 1
const isPrime = n => {
    if (n < 2) {
        return false;
    }
    for (i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15];
const primeNumber = numbers.filter(numbers => isPrime(numbers));
console.log(primeNumber);
//Bai 2
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    occupation: 'developer',
    nationality: 'American',
    city: 'New York',
    hobbies: ['reading', 'traveling', 'photography'],
    languages: ['English', 'Spanish'],
    education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Harvard University'
    }
};
const student = {
    firstName: person.firstName,
    gender: person.gender,
    degree: 'Bachelor',
    english: 'English'
};

console.log(student);
//Bai 3
const showInfor = ({firstName = 'Quân', degree = 'NA'}) => {
    console.log(`firstName: ${firstName}`);
    console.log(`degree: ${degree}`)
};
const sv1 = {
    firstName: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
};
const sv2 = {
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
};

showInfor(sv2);

//Bai 4
let courses = [
    {
        id: 1,
        title: "ReactJS Tutorial",
        rating: 4.2,
    },
    {
        id: 2,
        title: "Angular Tutorial",
        rating: 2.5
    },
    {
        id: 3,
        title: "VueJS Tutorial",
        rating: 3.8
    },
    {
        id: 4,
        title: "Java Tutorial",
        rating: 4
    },
    {
        id: 5,
        title: "JavaScript Tutorial",
        rating: 3.5
    },
];
courses.filter(courses=>courses.rating>=4).forEach(item=>console.log(item));

//------------------Sort()--------------------------














//-----------------filter()--------------------------

//Example 1
// let numbers =[5,2,9,6,3,4,7,10];
// let evens=numbers.filter(num=>num %2===0)
// console.log(evens);

// //Example 2
// let students =[
//     {name:"Summi",grade :82},
//     {name:"Varsh",grade :89},
//     {name:"Sharu",grade :87},
//     {name:"Likki",grade :92}
// ]
// let grades =students.filter(student=>student.grade>90);
// console.log(grades);
// //returns the Array of object {}

// let grades =students.filter(student=>student.grade>90).map(student=>student.name);
// console.log(grades);

//returns array of names 

//----------------------Reduce()----------------------------

let numbers=[45,32,67,47,98,32,97]
let sum=numbers.reduce((acc,curr)=>acc+curr,0)
let max=numbers.reduce((acc,curr)=> Math.max(acc,curr),numbers[0])
console.log(max);





const people = [
  { name: "A", age: 21 },
  { name: "B", age: 42 },
  { name: "C", age: 29 },
  { name: "D", age: 36 }
];

const totalTop3 = people
  .sort((a, b) => b.age - a.age)     // Descending order by age
  .slice(0, 3)                       
  .reduce((sum, person) => sum + person.age, 0); // Total of their ages

console.log(totalTop3); 

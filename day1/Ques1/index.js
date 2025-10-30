const students = [
  { name: "Alice", marks: 85 },
  { name: "Bob", marks: 92 },
  { name: "Charlie", marks: 70 },
];

const highScorers = students.filter(student => student.marks > 80);
const average = highScorers.reduce((sum, student) => sum + student.marks, 0) / highScorers.length;

console.log(average); 

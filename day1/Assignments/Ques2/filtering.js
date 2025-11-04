const employees = [
  { name: "Amit", dept: "Tech", salary: 70000, rating: 4.8 },
  { name: "Neha", dept: "Tech", salary: 60008, rating: 4.2 },
  { name: "Sonia", dept: "Tech", salary: 75000, rating: 4.9 },
  { name: "Ravi", dept: "HR", salary: 55000, rating: 4.7 },
  { name: "Karan", dept: "Finance", salary: 50000, rating: 3.9 },
];

// task 1: Filter only Tech department employees
const techEmployees = employees.filter(emp => emp.dept === "Tech");

// task 2: Filter those with rating > 4.5
const topPerformers = techEmployees.filter(emp => emp.rating > 4.5);

// task 3: Sort by salary (highest to lowest)
const sortedTopPerformers = topPerformers.sort((a, b) => b.salary - a.salary);

// task 4: Use reduce() to calculate total salary
const totalSalary = sortedTopPerformers.reduce((acc, emp) => acc + emp.salary, 0);

//  Extract names of the filtered employees
const names = sortedTopPerformers.map(emp => emp.name);

console.log(names);
console.log("Total Salary:", totalSalary);

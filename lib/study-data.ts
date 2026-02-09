'use client';

// Study data for StudyStream

export interface StudySection {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  keyTerms: string[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  subject: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: StudySection[];
  practiceQuestions: PracticeQuestion[];
  prerequisites: string[];
  learningOutcomes: string[];
}

export const studyTopics: StudyTopic[] = [
  // JAVASCRIPT TOPICS
  {
    id: 'js-arrays',
    title: 'JavaScript Arrays',
    description: 'Master array methods like map, filter, reduce and more. Learn to manipulate data effectively.',
    icon: '📦',
    color: '#f7df1e',
    subject: 'JavaScript',
    duration: '45 min',
    difficulty: 'beginner',
    prerequisites: ['Basic JavaScript syntax', 'Variables and data types'],
    learningOutcomes: [
      'Create and manipulate arrays',
      'Use map, filter, and reduce effectively',
      'Understand array mutation vs immutability'
    ],
    sections: [
      {
        id: 'array-basics',
        title: 'Array Basics',
        content: 'Arrays are ordered collections of values. They can hold any type of data and are zero-indexed, meaning the first element is at index 0.',
        codeExample: `// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, { name: 'John' }];

// Accessing elements
console.log(fruits[0]); // 'apple'
console.log(fruits.length); // 3`,
        keyTerms: ['array', 'index', 'length', 'element'],
      },
      {
        id: 'array-map',
        title: 'The map() Method',
        content: 'The map() method creates a new array by calling a function on every element of the original array. It never modifies the original array.',
        codeExample: `const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Transform objects
const users = [{ name: 'John' }, { name: 'Jane' }];
const names = users.map(user => user.name);
console.log(names); // ['John', 'Jane']`,
        keyTerms: ['map', 'transform', 'callback', 'new array'],
      },
      {
        id: 'array-filter',
        title: 'The filter() Method',
        content: 'The filter() method creates a new array with all elements that pass a test (return true from the callback function).',
        codeExample: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter objects
const products = [
  { name: 'Phone', price: 999 },
  { name: 'Tablet', price: 499 },
  { name: 'Watch', price: 299 }
];
const expensive = products.filter(p => p.price > 400);`,
        keyTerms: ['filter', 'predicate', 'boolean', 'condition'],
      },
      {
        id: 'array-reduce',
        title: 'The reduce() Method',
        content: 'The reduce() method executes a reducer function on each element, resulting in a single output value. It\'s powerful for aggregating data.',
        codeExample: `const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }`,
        keyTerms: ['reduce', 'accumulator', 'aggregate', 'fold'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does the map() method return?',
        options: ['The original array modified', 'A new array with transformed elements', 'undefined', 'A single value'],
        correctAnswer: 1,
        explanation: 'map() always returns a new array with the same length as the original, containing the transformed elements.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'Which method would you use to get only elements that meet a condition?',
        options: ['map()', 'reduce()', 'filter()', 'find()'],
        correctAnswer: 2,
        explanation: 'filter() creates a new array with only the elements that pass the test in the callback function.',
        difficulty: 'beginner',
      },
      {
        id: 'q3',
        question: 'What is the initial value in reduce((acc, curr) => acc + curr, 0)?',
        options: ['acc', 'curr', '0', 'undefined'],
        correctAnswer: 2,
        explanation: 'The second argument to reduce() (0 in this case) is the initial value of the accumulator.',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'js-async',
    title: 'JavaScript Async/Await',
    description: 'Understand asynchronous JavaScript with Promises, async/await, and error handling.',
    icon: '⚡',
    color: '#f7df1e',
    subject: 'JavaScript',
    duration: '60 min',
    difficulty: 'intermediate',
    prerequisites: ['JavaScript functions', 'Callbacks basics'],
    learningOutcomes: [
      'Understand Promises and their states',
      'Use async/await for cleaner async code',
      'Handle errors in asynchronous operations'
    ],
    sections: [
      {
        id: 'promises-intro',
        title: 'Understanding Promises',
        content: 'A Promise represents a value that may not be available yet. It can be pending, fulfilled (resolved), or rejected.',
        codeExample: `// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('Data loaded!');
    } else {
      reject('Error loading data');
    }
  }, 1000);
});

// Using a Promise
myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
        keyTerms: ['promise', 'resolve', 'reject', 'pending'],
      },
      {
        id: 'async-await',
        title: 'Async/Await Syntax',
        content: 'async/await provides a cleaner way to work with Promises. An async function always returns a Promise, and await pauses execution until the Promise resolves.',
        codeExample: `// Async function
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Usage
const user = await fetchUserData(123);
console.log(user.name);`,
        keyTerms: ['async', 'await', 'try-catch', 'asynchronous'],
      },
      {
        id: 'parallel-async',
        title: 'Parallel Async Operations',
        content: 'Use Promise.all() to run multiple async operations in parallel and wait for all to complete.',
        codeExample: `// Sequential (slow)
const user = await fetchUser(1);
const posts = await fetchPosts(1);
const comments = await fetchComments(1);

// Parallel (fast!)
const [user, posts, comments] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1)
]);

// Promise.allSettled for handling mixed results
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(999) // might fail
]);`,
        keyTerms: ['Promise.all', 'parallel', 'concurrent', 'Promise.allSettled'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does an async function always return?',
        options: ['undefined', 'The returned value directly', 'A Promise', 'null'],
        correctAnswer: 2,
        explanation: 'An async function always wraps its return value in a Promise, even if you return a plain value.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'What happens if you don\'t use try-catch with await?',
        options: ['Nothing special', 'Errors are silently ignored', 'Unhandled promise rejection', 'Code stops executing'],
        correctAnswer: 2,
        explanation: 'Without try-catch, rejected promises will result in unhandled promise rejections, which can crash your app.',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'js-objects',
    title: 'JavaScript Objects',
    description: 'Deep dive into object manipulation, destructuring, and modern object methods.',
    icon: '🗂️',
    color: '#f7df1e',
    subject: 'JavaScript',
    duration: '50 min',
    difficulty: 'beginner',
    prerequisites: ['Basic JavaScript syntax'],
    learningOutcomes: [
      'Create and manipulate objects',
      'Use destructuring and spread operators',
      'Understand object methods and references'
    ],
    sections: [
      {
        id: 'object-basics',
        title: 'Object Fundamentals',
        content: 'Objects are collections of key-value pairs. Keys are strings (or Symbols), and values can be any type.',
        codeExample: `// Object literal
const person = {
  name: 'John',
  age: 30,
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

// Accessing properties
console.log(person.name); // 'John'
console.log(person['age']); // 30
console.log(person.greet()); // "Hello, I'm John"`,
        keyTerms: ['object', 'property', 'method', 'key-value'],
      },
      {
        id: 'destructuring',
        title: 'Object Destructuring',
        content: 'Destructuring allows you to extract properties from objects and bind them to variables in a concise way.',
        codeExample: `const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  address: {
    city: 'Mumbai',
    country: 'India'
  }
};

// Basic destructuring
const { name, email } = user;

// With renaming
const { name: userName } = user;

// Nested destructuring
const { address: { city } } = user;

// Default values
const { role = 'user' } = user;`,
        keyTerms: ['destructuring', 'extract', 'rename', 'default'],
      },
      {
        id: 'spread-rest',
        title: 'Spread and Rest Operators',
        content: 'The spread operator (...) expands objects, while rest collects remaining properties into a new object.',
        codeExample: `// Spread - copying objects
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 };
// { a: 1, b: 2, c: 3 }

// Merging objects
const merged = { ...obj1, ...obj2 };

// Rest - collecting remaining properties
const { id, ...rest } = user;
// rest contains everything except id

// Function parameters
function createUser({ name, ...options }) {
  return { name, ...options, createdAt: new Date() };
}`,
        keyTerms: ['spread', 'rest', 'clone', 'merge'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does {...obj} create?',
        options: ['A reference to obj', 'A shallow copy of obj', 'A deep copy of obj', 'An empty object'],
        correctAnswer: 1,
        explanation: 'The spread operator creates a shallow copy - nested objects are still references.',
        difficulty: 'intermediate',
      },
      {
        id: 'q2',
        question: 'In const { name = "Guest" } = user, when is "Guest" used?',
        options: ['Always', 'When name is null', 'When name is undefined', 'When name is falsy'],
        correctAnswer: 2,
        explanation: 'Default values in destructuring only apply when the value is undefined, not null or other falsy values.',
        difficulty: 'intermediate',
      },
    ],
  },

  // PYTHON TOPICS
  {
    id: 'py-functions',
    title: 'Python Functions',
    description: 'Learn function definitions, parameters, decorators, and functional programming concepts.',
    icon: '🐍',
    color: '#3776ab',
    subject: 'Python',
    duration: '55 min',
    difficulty: 'beginner',
    prerequisites: ['Python basics', 'Variables and data types'],
    learningOutcomes: [
      'Define functions with various parameter types',
      'Use *args and **kwargs',
      'Understand decorators and closures'
    ],
    sections: [
      {
        id: 'func-basics',
        title: 'Function Basics',
        content: 'Functions are reusable blocks of code defined with the def keyword. They can take parameters and return values.',
        codeExample: `# Basic function
def greet(name):
    """Greet a person by name."""
    return f"Hello, {name}!"

# Calling the function
message = greet("Alice")
print(message)  # Hello, Alice!

# Function with default parameter
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Bob"))           # Hello, Bob!
print(greet("Bob", "Hi"))     # Hi, Bob!`,
        keyTerms: ['def', 'return', 'parameter', 'argument'],
      },
      {
        id: 'args-kwargs',
        title: '*args and **kwargs',
        content: '*args allows variable number of positional arguments, while **kwargs allows variable number of keyword arguments.',
        codeExample: `# *args - variable positional arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))  # 15

# **kwargs - variable keyword arguments
def create_user(**details):
    return details

user = create_user(name="John", age=30, city="Mumbai")
# {'name': 'John', 'age': 30, 'city': 'Mumbai'}

# Combining both
def flexible_func(required, *args, **kwargs):
    print(f"Required: {required}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")`,
        keyTerms: ['*args', '**kwargs', 'unpacking', 'variable arguments'],
      },
      {
        id: 'decorators',
        title: 'Decorators',
        content: 'Decorators are functions that modify the behavior of other functions. They\'re widely used for logging, authentication, and more.',
        codeExample: `import time

# Simple decorator
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done!"

# Using multiple decorators
@decorator1
@decorator2
def my_function():
    pass`,
        keyTerms: ['decorator', '@', 'wrapper', 'higher-order function'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does *args represent in a function definition?',
        options: ['A pointer to arguments', 'A tuple of positional arguments', 'A list of arguments', 'A dictionary of arguments'],
        correctAnswer: 1,
        explanation: '*args collects all extra positional arguments into a tuple.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'What does a decorator return?',
        options: ['The original function', 'A modified function', 'None', 'The function result'],
        correctAnswer: 1,
        explanation: 'A decorator returns a new function (usually called wrapper) that adds behavior to the original.',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'py-oop',
    title: 'Python OOP',
    description: 'Master object-oriented programming with classes, inheritance, and special methods.',
    icon: '🏗️',
    color: '#3776ab',
    subject: 'Python',
    duration: '70 min',
    difficulty: 'intermediate',
    prerequisites: ['Python functions', 'Basic Python syntax'],
    learningOutcomes: [
      'Create classes with attributes and methods',
      'Implement inheritance and polymorphism',
      'Use magic methods effectively'
    ],
    sections: [
      {
        id: 'classes-intro',
        title: 'Classes and Objects',
        content: 'Classes are blueprints for creating objects. Objects have attributes (data) and methods (behavior).',
        codeExample: `class Dog:
    # Class attribute
    species = "Canis familiaris"
    
    # Constructor
    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age
    
    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"
    
    # String representation
    def __str__(self):
        return f"{self.name}, {self.age} years old"

# Creating objects
buddy = Dog("Buddy", 3)
print(buddy.bark())  # Buddy says Woof!
print(buddy.species)  # Canis familiaris`,
        keyTerms: ['class', '__init__', 'self', 'instance'],
      },
      {
        id: 'inheritance',
        title: 'Inheritance',
        content: 'Inheritance allows a class to inherit attributes and methods from a parent class, promoting code reuse.',
        codeExample: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())

# Multiple inheritance
class FlyingDog(Dog, FlyingMixin):
    pass`,
        keyTerms: ['inheritance', 'super', 'polymorphism', 'override'],
      },
      {
        id: 'magic-methods',
        title: 'Magic Methods',
        content: 'Magic methods (dunder methods) allow you to define how objects behave with built-in operations.',
        codeExample: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)   # Vector(4, 6)
print(len(v1))   # 5`,
        keyTerms: ['__add__', '__repr__', '__eq__', 'dunder'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What is self in a Python class?',
        options: ['A keyword', 'Reference to the class', 'Reference to the instance', 'A type of variable'],
        correctAnswer: 2,
        explanation: 'self is a reference to the current instance, allowing access to attributes and methods within the class.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'How do you call the parent class constructor?',
        options: ['parent.__init__()', 'super().__init__()', 'self.parent()', 'Parent.init()'],
        correctAnswer: 1,
        explanation: 'super().__init__() calls the parent class constructor, passing any required arguments.',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'py-data-structures',
    title: 'Python Data Structures',
    description: 'Explore lists, dictionaries, sets, and tuples with practical examples and best practices.',
    icon: '📊',
    color: '#3776ab',
    subject: 'Python',
    duration: '50 min',
    difficulty: 'beginner',
    prerequisites: ['Basic Python syntax'],
    learningOutcomes: [
      'Choose the right data structure for different use cases',
      'Use list/dict comprehensions effectively',
      'Understand time complexity of operations'
    ],
    sections: [
      {
        id: 'lists-tuples',
        title: 'Lists and Tuples',
        content: 'Lists are mutable sequences, while tuples are immutable. Use tuples for fixed data that shouldn\'t change.',
        codeExample: `# Lists - mutable
fruits = ['apple', 'banana', 'cherry']
fruits.append('date')
fruits[0] = 'apricot'

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

# Tuples - immutable
point = (10, 20)
x, y = point  # Unpacking

# Named tuples for clarity
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x)  # 10`,
        keyTerms: ['list', 'tuple', 'mutable', 'immutable'],
      },
      {
        id: 'dictionaries',
        title: 'Dictionaries',
        content: 'Dictionaries store key-value pairs with O(1) average lookup time. Keys must be hashable (immutable).',
        codeExample: `# Creating dictionaries
user = {'name': 'John', 'age': 30}

# Dict comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Safe access with get()
email = user.get('email', 'no email')

# Merging (Python 3.9+)
merged = dict1 | dict2

# defaultdict for automatic defaults
from collections import defaultdict
word_count = defaultdict(int)
for word in words:
    word_count[word] += 1`,
        keyTerms: ['dict', 'key', 'value', 'hashable'],
      },
      {
        id: 'sets',
        title: 'Sets',
        content: 'Sets are unordered collections of unique elements. Perfect for removing duplicates and membership testing.',
        codeExample: `# Creating sets
colors = {'red', 'green', 'blue'}

# Remove duplicates from list
unique = list(set([1, 2, 2, 3, 3, 3]))

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}

print(a | b)  # Union: {1, 2, 3, 4}
print(a & b)  # Intersection: {2, 3}
print(a - b)  # Difference: {1}
print(a ^ b)  # Symmetric diff: {1, 4}

# Fast membership testing
if 'red' in colors:
    print("Red is present!")`,
        keyTerms: ['set', 'union', 'intersection', 'unique'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'Which data structure should you use for fast membership testing?',
        options: ['List', 'Tuple', 'Set', 'String'],
        correctAnswer: 2,
        explanation: 'Sets have O(1) average membership testing, compared to O(n) for lists.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'Can a dictionary key be a list?',
        options: ['Yes', 'No', 'Only empty lists', 'Only if the list is sorted'],
        correctAnswer: 1,
        explanation: 'Dictionary keys must be hashable (immutable). Lists are mutable, so they cannot be keys. Use tuples instead.',
        difficulty: 'intermediate',
      },
    ],
  },

  // REACT TOPICS
  {
    id: 'react-hooks',
    title: 'React Hooks',
    description: 'Master useState, useEffect, useContext and custom hooks for modern React development.',
    icon: '⚛️',
    color: '#61dafb',
    subject: 'React',
    duration: '65 min',
    difficulty: 'intermediate',
    prerequisites: ['JavaScript ES6+', 'React basics'],
    learningOutcomes: [
      'Use useState and useEffect correctly',
      'Understand the rules of hooks',
      'Create and use custom hooks'
    ],
    sections: [
      {
        id: 'usestate',
        title: 'useState Hook',
        content: 'useState allows functional components to have state. It returns a state value and a function to update it.',
        codeExample: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // Functional update for state based on previous value
  const increment = () => setCount(prev => prev + 1);
  
  // Object state
  const [user, setUser] = useState({ name: '', age: 0 });
  
  // Update only specific properties
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`,
        keyTerms: ['useState', 'setState', 'initial state', 'functional update'],
      },
      {
        id: 'useeffect',
        title: 'useEffect Hook',
        content: 'useEffect handles side effects like data fetching, subscriptions, and DOM manipulation. It runs after render.',
        codeExample: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Effect function
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }
    
    fetchUser();
    
    // Cleanup function (optional)
    return () => {
      // Cancel subscriptions, timers, etc.
    };
  }, [userId]); // Dependency array
  
  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}`,
        keyTerms: ['useEffect', 'side effect', 'cleanup', 'dependencies'],
      },
      {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        content: 'Custom hooks let you extract component logic into reusable functions. They must start with "use".',
        codeExample: `// Custom hook for fetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading } = useFetch('/api/users');
  // ...
}`,
        keyTerms: ['custom hook', 'reusable', 'use prefix', 'composition'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'When does useEffect run by default?',
        options: ['Before every render', 'After every render', 'Only on mount', 'Only on unmount'],
        correctAnswer: 1,
        explanation: 'By default (with no dependency array), useEffect runs after every render.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'What does an empty dependency array [] in useEffect mean?',
        options: ['Run on every render', 'Run only on mount', 'Never run', 'Run on unmount'],
        correctAnswer: 1,
        explanation: 'An empty dependency array means the effect runs once after initial render (like componentDidMount).',
        difficulty: 'beginner',
      },
      {
        id: 'q3',
        question: 'Why must custom hooks start with "use"?',
        options: ['It\'s a naming convention', 'React enforces the rules of hooks for them', 'They won\'t work otherwise', 'For better autocomplete'],
        correctAnswer: 1,
        explanation: 'The "use" prefix allows React\'s linter to check that the rules of hooks are followed inside custom hooks.',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'react-state-management',
    title: 'React State Management',
    description: 'Learn Context API, useReducer, and when to use external state management libraries.',
    icon: '🔄',
    color: '#61dafb',
    subject: 'React',
    duration: '60 min',
    difficulty: 'intermediate',
    prerequisites: ['React Hooks', 'JavaScript ES6+'],
    learningOutcomes: [
      'Use Context API for global state',
      'Implement useReducer for complex state',
      'Choose between different state solutions'
    ],
    sections: [
      {
        id: 'context-api',
        title: 'Context API',
        content: 'Context provides a way to pass data through the component tree without passing props manually at every level.',
        codeExample: `import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}`,
        keyTerms: ['createContext', 'Provider', 'useContext', 'consumer'],
      },
      {
        id: 'usereducer',
        title: 'useReducer Hook',
        content: 'useReducer is an alternative to useState for complex state logic with multiple sub-values or when next state depends on previous.',
        codeExample: `import { useReducer } from 'react';

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  return (
    <div>
      {state.items.map(item => <CartItem key={item.id} {...item} />)}
    </div>
  );
}`,
        keyTerms: ['useReducer', 'dispatch', 'action', 'reducer'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'When should you use useReducer over useState?',
        options: ['Always', 'For simple state', 'When state logic is complex', 'Never'],
        correctAnswer: 2,
        explanation: 'useReducer is preferred when state logic is complex, involves multiple sub-values, or when next state depends on previous.',
        difficulty: 'intermediate',
      },
      {
        id: 'q2',
        question: 'What causes a Context re-render?',
        options: ['Any parent re-render', 'Only when context value changes', 'Manual trigger only', 'Never'],
        correctAnswer: 1,
        explanation: 'Components consuming a context will re-render when the context value changes.',
        difficulty: 'intermediate',
      },
    ],
  },

  // NEW TOPICS
  {
    id: 'ts-basics',
    title: 'TypeScript Basics',
    description: 'Learn TypeScript fundamentals: types, interfaces, generics, and type-safe code.',
    icon: '📘',
    color: '#3178c6',
    subject: 'TypeScript',
    duration: '60 min',
    difficulty: 'beginner',
    prerequisites: ['JavaScript ES6+'],
    learningOutcomes: [
      'Understand TypeScript type system',
      'Define interfaces and types',
      'Use generics for reusable code'
    ],
    sections: [
      {
        id: 'type-basics',
        title: 'Basic Types',
        content: 'TypeScript adds static types to JavaScript. Define types for variables, function parameters, and return values.',
        codeExample: `// Basic types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Objects
let user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Functions
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Optional parameters
function createUser(name: string, age?: number): void {
  console.log(name, age);
}`,
        keyTerms: ['type', 'string', 'number', 'boolean'],
      },
      {
        id: 'interfaces',
        title: 'Interfaces and Types',
        content: 'Interfaces define the shape of objects. Use them to ensure type safety across your codebase.',
        codeExample: `// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional
  readonly createdAt: Date; // Readonly
}

// Type alias
type Status = 'active' | 'inactive' | 'pending';

// Extending interfaces
interface Admin extends User {
  permissions: string[];
}

// Implementing interfaces
class UserService implements IUserService {
  getUser(id: number): User {
    // ...
  }
}`,
        keyTerms: ['interface', 'type', 'extends', 'implements'],
      },
      {
        id: 'generics',
        title: 'Generics',
        content: 'Generics allow you to write flexible, reusable functions and classes that work with any type.',
        codeExample: `// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity("hello"); // Type inferred

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Generic with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic class
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
}`,
        keyTerms: ['generic', 'T', 'constraint', 'keyof'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does the ? after a property name mean?',
        options: ['The property is null', 'The property is optional', 'The property is any type', 'The property is readonly'],
        correctAnswer: 1,
        explanation: 'The ? after a property name makes it optional - it may or may not be present.',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'What does <T> represent in generics?',
        options: ['A specific type T', 'A type parameter placeholder', 'A template', 'A type error'],
        correctAnswer: 1,
        explanation: '<T> is a type parameter that acts as a placeholder for a type that will be specified when the generic is used.',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'css-layout',
    title: 'CSS Grid & Flexbox',
    description: 'Master modern CSS layout with Grid and Flexbox for responsive, beautiful designs.',
    icon: '📐',
    color: '#264de4',
    subject: 'CSS',
    duration: '55 min',
    difficulty: 'beginner',
    prerequisites: ['Basic CSS knowledge'],
    learningOutcomes: [
      'Build layouts with CSS Grid',
      'Use Flexbox for alignment and distribution',
      'Create responsive designs'
    ],
    sections: [
      {
        id: 'flexbox',
        title: 'Flexbox Fundamentals',
        content: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns with powerful alignment options.',
        codeExample: `.container {
  display: flex;
  justify-content: space-between; /* Main axis */
  align-items: center; /* Cross axis */
  gap: 1rem;
}

/* Direction and wrapping */
.flex-wrap {
  display: flex;
  flex-direction: row; /* or column */
  flex-wrap: wrap;
}

/* Individual item control */
.item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  align-self: flex-start; /* Override align-items for this item */
}

/* Common patterns */
.space-between { justify-content: space-between; }
.center-all { justify-content: center; align-items: center; }`,
        keyTerms: ['flex', 'justify-content', 'align-items', 'flex-wrap'],
      },
      {
        id: 'grid',
        title: 'CSS Grid Layout',
        content: 'CSS Grid is a two-dimensional layout system for creating complex layouts with rows and columns.',
        codeExample: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

/* Named areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }

/* Responsive grid */
.auto-fit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}`,
        keyTerms: ['grid', 'grid-template', 'fr', 'grid-area'],
      },
      {
        id: 'responsive',
        title: 'Responsive Design',
        content: 'Combine Grid, Flexbox, and media queries to create layouts that work on all screen sizes.',
        codeExample: `/* Mobile-first approach */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Container queries (modern) */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}`,
        keyTerms: ['media query', 'responsive', 'mobile-first', 'breakpoint'],
      },
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: 'What does justify-content control in Flexbox?',
        options: ['Vertical alignment', 'Main axis alignment', 'Cross axis alignment', 'Item order'],
        correctAnswer: 1,
        explanation: 'justify-content controls alignment along the main axis (horizontal by default in flex-direction: row).',
        difficulty: 'beginner',
      },
      {
        id: 'q2',
        question: 'What does 1fr mean in CSS Grid?',
        options: ['1 frame', '1 fraction of available space', '1 fixed row', '1 pixel'],
        correctAnswer: 1,
        explanation: 'fr is a fractional unit that represents a fraction of the available space in the grid container.',
        difficulty: 'beginner',
      },
    ],
  },
];

// Helper functions
export function getTopicsBySubject(subject: string): StudyTopic[] {
  if (subject === 'all') return studyTopics;
  return studyTopics.filter(topic => topic.subject === subject);
}

export function getTopicById(id: string): StudyTopic | undefined {
  return studyTopics.find(topic => topic.id === id);
}

export function getAllSubjects(): string[] {
  return [...new Set(studyTopics.map(topic => topic.subject))];
}

export function getQuestionsByDifficulty(difficulty: string): PracticeQuestion[] {
  return studyTopics.flatMap(topic =>
    topic.practiceQuestions.filter(q => q.difficulty === difficulty)
  );
}

export function searchTopics(query: string): StudyTopic[] {
  const lowerQuery = query.toLowerCase();
  return studyTopics.filter(topic =>
    topic.title.toLowerCase().includes(lowerQuery) ||
    topic.description.toLowerCase().includes(lowerQuery) ||
    topic.subject.toLowerCase().includes(lowerQuery) ||
    topic.sections.some(s => s.keyTerms.some(term => term.includes(lowerQuery)))
  );
}

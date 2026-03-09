 1️⃣ What is the difference between var, let, and const?
 Ans:
  var => 1.Function scoped
         2.Can be redeclared
         3.Can be reassigned
         4.Hoisted but initialized with undefined
    [
    console.log(x) //undefined
    var x = 2 ;
    var x = 3 ; (allowed)
    x = 4 ; (allowed)
    ]
    [
    if(true){
        var x = 5 ;
    }
    console.log(x)  //5
    ]

    let => 1.Block scoped
           2.Cannot be redeclared
           3.Can be reassigned
           4.Hoisted but not initialized (temporal dead zone)
    [
    let x = 2 ;
    let x = 3 ; (not allowed)
    x = 4 ; (allowed)
    ]   
    [
        let x = 3 ;

        {
            let x = 5;
        }
        console.log(x) //3
    ]

   const => 1.Block scoped
            2.Cannot be redeclared
            3.Cannot be reassigned
    [
    const x = 2 ;
    const x = 3 ;(not allowed)
    x = 4 ; (not allowed)
    ]
    [
        const x = 2 ;

        {
            const x = 1 ;
        }
        console.log(x) //2
    ]




 2️⃣ What is the spread operator (...)?
 Ans:
 (...) => It expands elements of an array or object .

 [
    const arr1 = [1,2,3];
    const arr2 = [...arr1 ,4,5] ;
    console.log(arr2) //[1,2,3,4,5]
 ]
 [
    const obj1 = {name:"tom",age:34}
    const obj2 = {
        ...obj1 ,
        country :"canada"
        weight  :"75 kg"}
    console.log(obj2) //{name:"tom", age:34, country: "canada", weight: "75 kg"}
 ]



 3️⃣ What is the difference between map(), filter(), and forEach()?
 Ans:
 map() => It is used to modify or transform every element of a array.
   [
    const arr = [2,3,4,5];
    const arr2 = arr.map(num => num * 2);
    console.log(arr2) //[4,6,8,10]
   ]

filter() => It is used to select elements that match the condition.
   [
    const arr = [1,2,3,4,5];
    const arr2 =arr.filter(num => num%2 === 0);
    console.log(arr2)  //[2,4]
   ]

forEach() => It is used to loop through each element of a array.
   [
    const arr = [1,2,3,4,5];
    arr.forEach(num=>{
        console.log(num)
    })
       //  1
           2
           3
           4
           5
   ]


 4️⃣ What is an arrow function?
 Ans:
 Arrow function => Arrow functions are a shorter syntax for writing functions in JavaScript .
  [
    const square = x => x*x ;

    const sayHello =() => console.log("Hello, Sir");

    const sum = (a , b , c) =>{
        const result = a+b+c ;
        return result ;
    }

    console.log(square(2)); // 4 
    sayHello();  //Hello, Sir
    console.log(sum(1,2,3));  //6
    ]

 5️⃣ What are template literals?
  Ans:

  [
    const name = "rahim"
    const greet = `Hello ${name}`
    const sum = `sum will be ${4+4+4}`
    const sentence = `My name
    is rahim. I am 6 years old .`
  ]
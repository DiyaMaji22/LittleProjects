// const promiseOne= new Promise(function(resolve,reject){
//      setTimeout(function(){
//         console.log("Async task is completed");
//         resolve();
//      },1000)
// });
// promiseOne.then(function (){
//     console.log("promise consumed");
// })


// new Promise(function(resolve,reject){
//     setTimeout(function(){
//         console.log("Async task 2 ");
//         resolve()
//     })
// }).then(function(){
//     console.log("Without using a constant and using then directly");
// })



// const promiseThree=new Promise(function(resolve,reject){

//     setTimeout(function(){
//         resolve({ username: "Hollow", email: "example@gmail.com" });
//     },1000)

// })
// promiseThree.then(function(user){
//     console.log("promiseThree resolved with:", user);
// })
 

// const  promiseFour=new Promise(function(resolve,reject){
//     setTimeout(function(){
//         let error=false;
//         if(!error){
//             resolve({username:"miku",password:"12345"});
//         }
//         else{
//             reject("Error ocuured brooo");
//         }
        
//     },1000)
// })
// const username=promiseFour.then((user)=>{
//     console.log(user);
//     return user.username;
// }).then((username)=>{
//     console.log(username);
// }).catch(function(error){
//     console.log(error);
// })



// const promiseFive=new Promise(function(resolve,reject){
//     setTimeout(function(){
//         let error=false;
//         if(!error){
//             resolve({username:"miku",password:"12345"});
//         }
//         else{
//             reject("Error ocuured brooo");
//         }
        
//     },1000)
     

// })
// async function consumePromiseFive() {
//     try {
//         const user = await promiseFive;
//         console.log("consumePromiseFive resolved with:", user);
//     } catch (error) {
//         console.log("consumePromiseFive rejected with:", error);
//     }
// }

// consumePromiseFive();


// async function getAllUSers(){
//     try{
//         const response=await fetch('https://jsonplaceholder.typicode.com/users')
//     // const data=response.json();
//         // console.log(data)
//         console.log(response);
//     }catch(error){
//         console("Error: ",error);
//     }
// }
// getAllUSers();


fetch('https://jsonplaceholder.typicode.com/users').then((response)=>{

    return response.json();
}).then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error)
})
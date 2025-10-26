


// const descriptor=Object.getOwnPropertyDescriptor (Math,"PI");
// console.log(descriptor);

// console.log(Math.PI);


const chai={
    name:'chaii',
    price:250,
    isAvailable:true

}

console.log(Object.getOwnPropertyDescriptor(chai,'name'));
Object.defineProperty(chai,'name',{
    writable:false,
    configurable:false
})
console.log(chai.name);
console.log(Object.getOwnPropertyDescriptor(chai,'name'));
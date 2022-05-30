const {descriptors, places} = require('./seedHelpers')

const randomSample = arr => arr[Math.floor(Math.random() * arr.length)]

console.log(randomSample(descriptors))
console.log(randomSample(places))

// 0. import a built-in library called "path"
const path = require("path")

// 1. import express into the Javascript program
const express = require("express")

// 2. Initialize express
const app = express()

// 3. Specify the port that you want your webserver to run on
// - by default, it will run on port 3000
const port = process.env.PORT || 3000

// ------- 
// In this section, define the server's behaviour 
// - defining the endpoints that the server will respond to

// when the person comes to the main page (localhost:xxxx/), then do something
app.get("/", (req, res) => {
    res.send("HELLO WORLD!")
})

// define the about endpoint
app.get("/about", (req, res) => {
    // by default, res.send() is used to send string data back to a client
    res.send("Welcome to the About endpoint")
})

// define the about endpoint
app.get("/faq", (req, res) => {
    // the endpoint can send string containing HTML back to the client
    // if the client is a browser, it will render this string as HTML 
    res.send("<h1>FAQ Page</h1><ol><li>How do servers work?</li><li>What is node?</li></ul>")
})

app.get("/contact", (req, res) => {
    // res.send() can also be used to send files back to the client
    // in this example, we send the HTML file located in the server's view/s directory
    res.sendFile(path.join(__dirname, "/views/contact-us.html"))
})

// endpoints can be any length and any complexity
// - server performs "pattern matching to determine which endpoint should
// respond to the request
app.get("/students", (req, res) => {
    res.send("Students!")
})
app.get("/students/gbc", (req, res) => {
    res.send("GBC Students!")
})
app.get("/students/mycollege", (req, res) => {
    res.send("mycollege Students!")
})
app.get("/students/mycollege/accounting", (req, res) => {
    res.send("mycollege accounting Students!")
})

// in real life, some endpoints may be used transmit additional information to the server
// - for example, in many e-commerce websites, the endpoints
// contain information about the product's id or sku

// - if you have only a few products, you "could" manually code
// the product ids into each endpoint. But, this is tedious and difficult to maintain
// app.get("/products/6018-408", (req, res) => {
//     res.send("Show Yellow shirt!")
// })

// app.get("/products/5025-333", (req, res) => {
//     res.send("Show Red shirt!")
// })

// app.get("/products/999-222", (req, res) => {
//     res.send("Show pants!")
// })


// instead, developers create endpoints with contain url parameters
// - url parameters communicate information to the server 
app.get("/products/:category/:productId", (req, res) => {

    // use req.params to access the value of :category and :productId
    console.log(req.params)
    // req.params is a Javascript object 
    console.log(`What is the data type of req.params? ${typeof(req.params)}`)
    console.log(`What is the category: ${req.params.category}`)
    console.log(`What is the productId: ${req.params.productId}`)
    
    // choose what should be displayed based on the category
    if (req.params.category === "kids-clothing") {
        res.send("There are 5 products in the kids clothing category")
    }
    else if (req.params.category === "sunglasses") {
        res.send("There are 100 sunglasses")
    }
    else {
        res.send(req.params)
    }
})




// exercise:
// write an endpoint that accepts a number and a math operation
// if the math operation is +, then the endpoint will display
// the sum of all values from 1 to the number
// if the math operation is *, then the endpoint will display
// the product of all values from 1 to the number
// if the operation is something else, then output -1
// the maximum number that can be selected is 10



app.get("/do-math/number/:num/op/:operation", (req,res)=>{
    console.log(`Number: ${req.params.num}`)
    console.log(`Math operation: ${req.params.operation}`)

    // 1.  get the number & convert it to a number before you can do math on it
    const numFromUrl = parseInt(req.params.num)
    // - check that person provided a number
    if (isNaN(numFromUrl) === true) {
        res.send(`Error: you must enter a number, ${req.params.num} is not a number`)
        return
    }
    // - check for maximum value on the nubmer
    if (numFromUrl > 10) {
        res.send(`Error: max value is 10, ${req.params.num} is greater than 10`)
        return
    }
    // 2. get the operation and do the math based on the operation
    if (req.params.operation === "plus") {
        // sum
        let sum = 0
        for (let i = 0; i < numFromUrl; i++) {
            sum = sum + i
        }
        res.send(`The result of adding is ${sum}`)        
    }
    else if (req.params.operation === "multiply") {
        let result = 1
        for (let i = 1; i <= numFromUrl; i++) {
            result = result * i
        }
        res.send(`The result of multiply is ${result}`)    
    }
    else {
        // output -1
        res.send("-1")
    }

})






// catch-all router --> is an endpoint that is executed when
// the user types in an endpoint that doesn't exist
app.use((req,res) => {
    //  res.status(404).send("404 This page does not exist")    
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"))
})
 //

 app.use((req,res) => {
    //  res.status(404).send("404 This page does not exist")    
    res.status(200).sendFile(path.join(__dirname, "/views/contact-us.html"))
})
 

// --------

// - this function will execute when the server is started
const startServer = () => {
    console.log(`The server is running on http://localhost:${port}`)
    console.log(`Press CTRL + C to exit`)
}
// 4. Start the server on the specified port
// 5. What should happen when the server runs
app.listen(port, startServer)
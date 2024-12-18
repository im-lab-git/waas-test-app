const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Fake user data for API route
const fakeUserData = {
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@example.com",
	address: "123 Elm Street",
	creditCard: "5425233430109903",
	expiryDate: "04/2026",
	cvv: "235",
};

// Serve the HTML form
app.get("/checkout", (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Checkout</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background: radial-gradient(circle, rgba(147,228,202,1) 0%, rgba(111,166,232,1) 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
            }
            .form-container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 90%;
                margin: 20px auto;
            }
            .form-container h1 {
                font-size: 24px;
                margin-bottom: 20px;
                text-align: center;
                color: #333;
            }
            .form-container label {
                font-size: 14px;
                color: #555;
                display: block;
                margin-top: 10px;
                margin-bottom: 5px;
            }
            .form-container input {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 14px;
                transition: border-color 0.3s;
            }
            .form-container input:focus {
                border-color: #fda085;
                outline: none;
            }
            .form-container button {
                width: 100%;
                padding: 12px;
                background: linear-gradient(120deg, #f6d365, #fda085);
                color: white;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s;
            }
            .form-container button:hover {
                background: linear-gradient(120deg, #fda085, #f6d365);
            }
        </style>
    </head>
    <body>
        <div class="form-container">
            <h1>Pseudo Checkout</h1>
            <form action="/submit" method="POST">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value="John" required>
                
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value="Doe" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="john.doe@example.com" required>
                
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" value="123 Elm Street" required>
                
                <label for="creditCard">Credit Card Number:</label>
                <input type="text" id="creditCard" name="creditCard" value="5425233430109903" required>
                
                <label for="expiryDate">Expiry Date:</label>
                <input type="text" id="expiryDate" name="expiryDate" value="04/2026" required>
                
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" value="235" required>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    </body>
    </html>
  `);
});

// Handle form submission
app.post("/submit", (req, res) => {
	const { firstName, lastName, email, address, creditCard, expiryDate, cvv } = req.body;

	console.log("Form submitted:", { firstName, lastName, email, address, creditCard, expiryDate, cvv });

	res.send(`
    <h1 style="text-align: center; color: #333;">Thank You, ${firstName}!</h1>
    <p style="text-align: center; color: #666;">Your form has been submitted successfully.</p>
    <h2 style="text-align: center; color: #555;">Submitted Data</h2>
    <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; max-width: 600px; margin: 20px auto; color: #333;">${JSON.stringify(
			{ firstName, lastName, email, address, creditCard, expiryDate, cvv },
			null,
			2
		)}</pre>
    <div style="text-align: center; margin-top: 20px;">
      <a href="/checkout" style="text-decoration: none; color: #fda085; font-weight: bold;">Go back to the form</a>
    </div>
  `);
});

// API route to return user data
app.get("/user", (req, res) => {
	res.json(fakeUserData);
});

// Root route
app.get("/", (req, res) => {
	res.send("Welcome to the Checkout App!");
});

// HTTPS Options
const sslOptions = {
	key: fs.readFileSync("./tls.key"), // Replace with your SSL key
	cert: fs.readFileSync("./tls.crt"), // Replace with your SSL certificate
};

// HTTPS Server
const HTTPS_PORT = 445;
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
	console.log(`HTTPS server is running at https://localhost:${HTTPS_PORT}`);
});

// HTTP Server for Redirect
const HTTP_PORT = 80;
http
	.createServer((req, res) => {
		res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
		res.end();
	})
	.listen(HTTP_PORT, () => {
		console.log(`HTTP server is redirecting to HTTPS`);
	});

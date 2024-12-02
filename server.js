const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
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
                background: rgb(147,228,202);
                background: radial-gradient(circle, rgba(147,228,202,1) 0%, rgba(111,166,232,1) 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 0;
            }
            .form-container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 90%; /* Ensures responsiveness on smaller screens */
                box-sizing: border-box; /* Includes padding in the width */
                margin: 20px auto; /* Centers the form */
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
                margin-bottom: 5px; /* Adds space below labels */
            }
            .form-container input {
                width: 100%;
                padding: 10px;
                margin-bottom: 15px; /* Adds space below input fields */
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 14px;
                transition: border-color 0.3s;
                box-sizing: border-box; /* Ensures proper width with padding */
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
            @media (max-width: 500px) {
                .form-container {
                    padding: 20px;
                }
                .form-container h1 {
                    font-size: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="form-container">
            <h1>Checkout</h1>
            <h3>Checkout - Just one step away from placing your order</h3>
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

app.post("/submit", (req, res) => {
	const { firstName, lastName, email, address, creditCard, expiryDate, cvv } = req.body;

	// Log the submitted data
	console.log("Form submitted:", { firstName, lastName, email, address, creditCard, expiryDate, cvv });

	// Respond with a success page including the JSON data
	res.send(`
    <h1 style="text-align: center; color: #333;">Thank You, ${firstName}!</h1>
    <p style="text-align: center; color: #666;">Your order has been submitted successfully.</p>
    <h2 style="text-align: center; color: #555;">Submitted Data</h2>
    <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; max-width: 600px; margin: 20px auto; color: #333;">${JSON.stringify(
			{ firstName, lastName, email, address, creditCard, expiryDate, cvv },
			null,
			2
		)}</pre>
    <div style="text-align: center; margin-top: 20px;">
      <a href="/" style="text-decoration: none; color: #fda085; font-weight: bold;">Go back to the form</a>
    </div>
  `);
});

const PORT = 80;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

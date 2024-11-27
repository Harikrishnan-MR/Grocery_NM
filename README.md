🛒 MERN Grocery Application

Welcome to the MERN Grocery Application! This project is built using the MERN (MongoDB, Express.js, React, Node.js) stack and provides users with a seamless shopping experience, featuring user authentication, product management, cart functionality, and more.

📋 Features

🚀 User Features:

Login/Sign Up: Create an account or log in to an existing one.

Forgot Password: Reset your password securely via email.

Update Password: Update your password for added security.

Product Listings: Browse and view detailed product information.

Customer Reviews: Leave, edit, or delete reviews for products.

Search Products: Quickly search for products by name or keywords.

Filter Products: Filter by categories, price range, and other attributes.

Cart Management: Add or remove products from the cart.

Order Summary: View and confirm your order before checkout.

Order History: Access details of past orders.

👨‍💼 Admin Features:

Manage Products: Add, update, or delete product listings.

Manage Users: View and manage registered users.

Order Management: Track and update the status of customer orders.

🚀 Installation

Clone the Repository:

bash

Copy code

git clone https://github.com/your-username/grocery-app.git

Change to the Project Directory:

bash

Copy code

cd grocery-app

Install Backend Dependencies:

bash

Copy code

npm install

Install Frontend Dependencies:

bash

Copy code

cd frontend

npm install

🔧 Configuration

Create a .env file in the root directory with the following environment variables:

env

Copy code

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_RESET_PASSWORD_SECRET=your_jwt_reset_password_secret
COOKIE_EXPIRE=5
SMTP_MAIL=your_smtp_mail
SMTP_PASSWORD=your_smtp_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

▶️ Usage

Start the Backend:

bash

Copy code

npm run dev

Start the Frontend:

bash

Copy code

cd frontend

npm start

Access the Application:

Open your browser and go to http://localhost:3000.

🛠️ Technologies

Backend:

MongoDB: NoSQL database for storing data.

Express.js: Web application framework for Node.js.

Node.js: JavaScript runtime for server-side development.

Frontend:

React.js: JavaScript library for building dynamic user interfaces.

Tailwind CSS: Utility-first CSS framework for responsive designs.

Authentication & Security:

JWT: JSON Web Tokens for secure authentication
.
bcrypt.js: Library for hashing and securing passwords.

Email Functionality:

Nodemailer: Library for sending email notifications.

Media Management:

Cloudinary: Cloud-based service for managing images and videos.

const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASS,
    }
});

async function sendOtp(OTP, recipientEmail) {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: recipientEmail,
        subject: 'OTP for email verification',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Burst - Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f8fc;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #007BFF;
      color: #ffffff;
      text-align: center;
      padding: 1.5rem;
    }
    .header h1 {
      margin: 0;
      font-size: 1.8rem;
    }
    .content {
      padding: 2rem;
      color: #333333;
      text-align: center;
    }
    .content p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }
    .otp-box {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background-color: #e0efff;
      border: 2px dashed #007BFF;
      border-radius: 8px;
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: 5px;
      color: #007BFF;
    }
    .footer {
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
      color: #888;
      background-color: #f4f8fc;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h1>Burst</h1>
    </div>
    <div class="content">
      <p>Use the following One-Time Password (OTP) to verify your email address:</p>
      <div class="otp-box">${OTP}</div>
      <p>This OTP is valid for the next 5 minutes.</p>
    </div>
    <div class="footer">
      &copy; 2025 Burst Headphones. All rights reserved.
    </div>
  </div>
</body>
</html>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email Sent:', info.response);
    } catch (error) {
        console.error('❌ Email Send Error:', error);
    }
};

// function buildproductCards(order, product) {
//     let htmlblock = ""
//     for (product of order.products) {
//         htmlblock += `
//         <div class="order-details">
//         <p><strong>Product Name:</strong> ${product.productName}</p>
//         <p><strong>Quantity:</strong> ${order.products[0].quantity}</p>
//         <p><strong>Price:</strong> ₹${order.totalAmount}</p>
//       </div>
//         `;
//     }
// }

async function sendOrderdetail(populatedOrder) {
  try {
    const productDetailsHTML = populatedOrder.products.map(item => {
      return `
        <div style="
          padding: 1rem;
          border: 1px solid #d0e6ff;
          border-radius: 8px;
          background-color: #f0f8ff;
          margin-bottom: 1rem;
        ">
          <p><strong>Product Name:</strong> ${item.productId.productName}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Price:</strong> ₹${item.productId.price}</p>
        </div>
      `;
    }).join('');

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: populatedOrder.userId.email,
      subject: 'Order Details',
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Burst - Order Confirmation</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f8fc;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #007BFF;
      color: white;
      text-align: center;
      padding: 1.5rem;
    }
    .content {
      padding: 2rem;
      color: #333;
    }
    .footer {
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
      background-color: #f4f8fc;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Burst - Your Order Summary</h1>
    </div>
    <div class="content">
      <h2>Hello, ${populatedOrder.userId.firstName}!</h2>
      <p><strong>Shipping Address:</strong><br>${populatedOrder.shippingAddress}</p>
      
      ${productDetailsHTML}

      <p><strong>Grand Total:</strong> ₹${populatedOrder.totalAmount}</p>

      <p>If you have any questions, feel free to reach out to our support team.</p>
    </div>
    <div class="footer">
      &copy; 2025 Burst Headphones. All rights reserved.
    </div>
  </div>
</body>
</html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email Sent:', info.response);
  } catch (error) {
    console.error('❌ Email Send Error:', error);
  }
}


module.exports = {
    sendOtp,
    sendOrderdetail
}
# LifeFlow -- Blood Donation Website

Welcome to LifeFlow, a comprehensive platform designed to streamline blood donation by connecting donors, recipients, and volunteers. This README provides an overview of the features, installation steps, and additional information to help you get started.

## Live Site URL

Visit the live website: [LifeFlow](https://lifeflow-72f2b.firebaseapp.com/)

## GitHub Repositories

- [Client Repository](https://github.com/mdimamhosen/LifeFlow-Client)
- [Server Repository](https://github.com/mdimamhosen/LifeFlow-Server)

## Admin Credentials

- **Admin Email:** admin@gmail.com
- **Password:** Pa$$w0rd!

- **Donor:** Just create an account normally.
- **Volunteer:** Create a user volunteer from the admin dashboard.

## Website Features

1. **User Roles and Permissions:**

   - **Admin:** Full access to all features, including user management, donation requests, and content management.
   - **Donor:** Register, view, respond to donation requests, and maintain profiles.
   - **Volunteer:** Create and manage donation requests.

2. **User Registration and Authentication:**

   - Register with email, name, avatar, blood group, district, upazila, and password.
   - Default role for new users is "Donor".
   - Secure login for registered users.

3. **Dashboard:**

   - **Profile Page:** View and update personal information.
   - **Donor Dashboard:** Manage recent donation requests.
   - **Admin Dashboard:** Oversee user data, donation requests, and content.
   - **Volunteer Dashboard:** Manage donation requests with limited permissions.

4. **Donation Requests:**

   - Create, edit, view, and delete donation requests.
   - Manage request status: pending, in-progress, done, and canceled.
   - Blocked users cannot create requests.

5. **Content Management:**

   - Create, edit, and manage blog content.
   - Publish or save blogs as drafts.
   - Only admins can delete blogs and change their status.

6. **Home Page:**

   - Banner with "Join as a donor" and "Search Donors" buttons.
   - Featured sections and a contact form.

7. **Search Page:**

   - Search for donors by blood group, district, and upazila.

8. **Public Donation Requests:**

   - Display all pending donation requests.
   - View detailed information about each request.

9. **Blog Page:**

   - Show all published blogs with detailed content.

10. **Funding Page:**

    - Display user contributions with names and amounts.
    - Integrated Stripe for secure donations.

11. **JWT Authentication:**

    - Secure login and protected API endpoints using JWT.

12. **Email Notifications:**
    - Used Nodemailer for sending email notifications.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Firebase for hosting

### Installation

1. **Clone the repositories:**

   ```sh
   git clone https://github.com/mdimamhosen/LifeFlow-Client
   git clone https://github.com/mdimamhosen/LifeFlow-Server
   ```

2. **Install dependencies:**

   ```sh
   cd b9a12-client-side-mdimamhosen
   npm install
   cd ../b9a12-server-side-mdimamhosen
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the server directory and add MongoDB URI, JWT secret, and other necessary variables.

4. **Run the client and server:**
   ```sh
   cd b9a12-client-side-mdimamhosen
   npm start
   cd ../b9a12-server-side-mdimamhosen
   npm start
   ```

### Deployment

- Deploy the client on Firebase or other hosting services.
- Deploy the server on Heroku, Vercel, or any VPS provider.

Thank you for using LifeFlow! Your contributions and feedback are always welcome.

# LifeFlow-Client

# LifeFlow-Client

1. Frontend
 - A homepage displaying all tour packages.
 - A detailed page for each package with a 'Book Now' button.
 - Booking request forms with field validation (e.g., required fields, valid email format).
 Display a list of tour packages with details:
 - Title
 - Description
 - Price
 - Available dates
 - Image
 - Data should be fetched from a MongoDB collection
2. Package Booking:
 - Include a 'Book Now' button for each package.
 - Clicking 'Book Now' opens a form for the customer to fill in details:
 - Name
 - Email
 - Phone Number
 - Number of travelers
 - Special requests (optional)
 - Save the booking in MongoDB.
 - Generate a basic invoice containing:
 - Customer details
 - Package details
 - Total price (price per person * number of travelers)

 3. Admin Panel:
 - A basic dashboard to manage tour packages:
 - Add, update, or delete packages.
 - View submitted bookings

2. Backend
- API Endpoints:
 1. GET /packages: Retrieve all tour packages.
 2. GET /packages/:id: Retrieve details of a specific package.
 3. POST /bookings: Submit a package booking.
 4. Admin:
    - POST /admin/packages: Add a new package.
    - PUT /admin/packages/:id: Update an existing package.
    - DELETE /admin/packages/:id: Delete a package.
    - Save tour packages and bookings requests in separate MongoDB collections.
 3. Invoice Generation
    - After a successful booking, generate an invoice:
    - Option 1: Display a styled HTML page with booking details.
    - Option 2 (Bonus): Provide a downloadable PDF using libraries like `pdf-lib` or `jspdf`.
 4. Admin Panel
    - Accessible via a hardcoded route (e.g., `/admin`).
    - Implement basic authentication (hardcoded credentials).
    - CRUD operations for tour packages.

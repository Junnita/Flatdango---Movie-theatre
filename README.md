#FLATDANGO MOVIE THEATRE

*Film Ticket Booking System JavaScript Application*

- This JavaScript application interacts with a backend API to provide a Film Ticket Booking System. It allows users to view films, purchase tickets, manage film details, and delete films from the system.


            FEATURES
Fetch Films: Retrieves a list of films from the backend API (fetchFilms function).
Film Details: Displays detailed information about each film, including title, poster, runtime, showtime, description, and available tickets (filmDetails function).
Purchase Tickets: Allows users to buy tickets for films, updating the ticket count and disabling the purchase button when tickets are sold out (purchaseTicket function).
Update Ticket Number: Updates the number of tickets sold for a film (updateTicketNumber function).
Create Ticket: Creates a new ticket for a film (createTicket function).
Delete Film: Provides functionality to delete a film from the system (deleteFilm function).
Interactive Film Menu: Dynamically generates a film menu with clickable film items that display details and allow deletion (filmMenu function).


           SETUP INSTRUCTIONS
    1. Clone Repository: Clone this repository to your local machine.

bash
Copy code
git clone <repository_url>
cd <repository_directory>

    2. Install Dependencies: Ensure Node.js is installed on your machine. Install dependencies using npm.

bash
Copy code
npm install

      3.Art Backend Server: Start the backend server that provides the API for the Film Ticket Booking System. You can use JSON Server as an example:

bash
Copy code
json-server --watch db.json --port 3000
Replace db.json with your JSON file containing film data. Ensure the server is running on http://localhost:3000.


        4. Open Application: Open the index.html file in a web browser to launch the Film Ticket Booking System.



                 USAGE
Upon opening the application, films will be fetched from the backend API and displayed in a film menu.
Click on any film to view detailed information such as poster, title, runtime, showtime, description, and available tickets.
If tickets are available, click the "Buy Ticket" button to purchase a ticket. The ticket count will update accordingly.
Administrators can delete films by clicking the "Delete" button next to each film in the list.


to visit the site click the link here: [here](https://week3codechallenge-hg8w.vercel.app/)



### Author
- JUNNE WANJA 

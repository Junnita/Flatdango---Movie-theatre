document.addEventListener('DOMContentLoaded'), () => 
    const baseURL = 'https://vercelweek3.vercel.app/films';

    function fetchFilms() {
        return fetch(`${baseURL}/films`)
            .then(res => res.json())
            .catch(error => console.error('Error fetching films:', error));
    }

    function fetchFilmById(id) {
        return fetch(`${baseURL}/films/${id}`)
            .then(res => res.json())
            .catch(error => console.error('Error fetching film by ID:', error));
    }

    function updateTicketNumber(id, newTicketNumber) {
        return fetch(`${baseURL}/films/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets_sold: newTicketNumber }),
        })
        .then(res => res.json())
        .catch(error => console.error('Error updating ticket:', error));
    }

    function createTicket(filmId, numberOfTickets) {
        fetch(`${baseURL}/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "film_id": filmId,
                "number_of_tickets": numberOfTickets
            }),
        })
        .then(res => res.json())
        .catch(error => console.error('Error creating ticket:', error));
    }

    function purchaseTicket(filmId, ticketsSold, capacity) {
        const buyTicketBtn = document.getElementById("buy-ticket");
        const ticketNumberElement = document.getElementById('ticket-num');

        if (ticketsSold < capacity) {
            let newTicketNumber = ticketsSold + 1;
            ticketNumberElement.textContent = capacity - newTicketNumber;

            return updateTicketNumber(filmId, newTicketNumber)
                .then(updatedFilm => {
                    if (updatedFilm) {
                        if (updatedFilm.tickets_sold === capacity) {
                            buyTicketBtn.textContent = "Sold Out";
                            buyTicketBtn.disabled = true;
                        }
                        return createTicket(filmId, 1)
                            .then(createdTicket => {
                                if (createdTicket) {
                                    console.log("Ticket purchased successfully:", createdTicket);
                                    return updatedFilm;
                                }
                            });
                    }
                })
                .catch(error => console.error('Update ticket number error:', error));
        } else {
            alert("Film is sold out!");
            return Promise.resolve();
        }
    }

    function deleteFilm(id) {
        return fetch(`${baseURL}/films/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            let filmItem = document.getElementById(`film-${id}`);
            if (filmItem) {
                filmItem.remove();
            }
        })
        .catch(error => console.error('Error deleting film:', error))
    }

    function filmMenu() 
        return fetchFilms())
            .then(films => {
                let filmMenu = document.getElementById("films");
                filmMenu.innerHTML = "";

                films.forEach((film, index) => {
                    let filmItem = document.createElement("li");
                    filmItem.id = `film-${film.id}`;
                    filmItem.classList.add("film", "item")
                    filmItem.textContent = film.title;

                    filmItem.addEventListener("click", () => {
                        fetchFilmById(film.id)
                            .then(selectedFilm => filmDetails(selectedFilm))
                            .catch(error => console.error('Fetch film by ID error:', error));
                    });

                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener("click", () => {
                        deleteFilm(film.id)
                            .catch(error => console.error('Delete film error:', error));
                    });

                    filmItem.appendChild(deleteButton);
                    filmMenu.appendChild(filmItem);

                    if (index === 0) {
                        fetchFilmById(film.id)
                            .then(selectedFilm => filmDetails(selectedFilm))
                            .catch(error => console.error('Error fetching film by ID:', error));
                    }
                });
            })
            .catch(error => console.error('Error fetching films:', error));
    

    function filmDetails(film) {
        let posterElement = document.getElementById('poster');
        posterElement.src = film.poster;
        let titleElement = document.getElementById('title');
        titleElement.textContent = film.title;
        let runtimeElement = document.getElementById('runtime');
        runtimeElement.textContent = `${film.runtime} minutes`;
        let showtimeElement = document.getElementById('showtime');
        showtimeElement.textContent = film.showtime;
        let descriptionElement = document.getElementById('film-info');
        descriptionElement.textContent = film.description;

        let remainingTickets = film.capacity - film.tickets_sold;
        let ticketNumberElement = document.getElementById('ticket-num');

        if (remainingTickets >= 0) {
            ticketNumberElement.textContent = `${remainingTickets}`;
        } else if (remainingTickets === 0) {
            ticketNumberElement.textContent = "Sold Out"
        }

        const buyTicketBtn = document.getElementById("buy-ticket");
        buyTicketBtn.onclick = () => {
            purchaseTicket(film.id, film.tickets_sold, film.capacity, ticketNumberElement, buyTicketBtn)
                .then(updatedFilm => {
                    if (updatedFilm) {
                        let remainingTickets = updatedFilm.capacity - updatedFilm.tickets_sold;
                        if (remainingTickets >= 0) {
                            ticketNumberElement.textContent = `${remainingTickets}`;
                        } else if (remainingTickets === 0) {
                            ticketNumberElement.textContent = "Sold Out"
                        } else if (remainingTickets === 0) {
                            ticketNumberElement.textContent = "Sold Out";
                        }
                    }
                })
                .catch(error => console.error('Ticket purchase error:', error));
        };
    }

    filmMenu();
;

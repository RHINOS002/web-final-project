var teamData = [
    {
        "teamName": "MI",
        "icon": "mi-icon-url",
        "championshipsWon": 4,
        "nameTeam": "Mumbai Indians"
    },
    {
        "teamName": "RCB",
        "icon": "rcb.png",
        "championshipsWon": 0,
        "nameTeam": "Royal Challengers Bangalore"
    },
    {
        "teamName": "CSK",
        "icon": "rcb.png",
        "championshipsWon": 5,
        "nameTeam": "Chennai Super Kings"
    },
    {
        "teamName": "KKR",
        "icon": "rcb.png",
        "championshipsWon": 2,
        "nameTeam": "Kolkata Knight Riders"
    },
    {
        "teamName": "SRH",
        "icon": "rcb.png",
        "championshipsWon": 1,
        "nameTeam": " Sunrisers Hyderabad"
    },
        {
            "teamName": "KXIP",
            "icon": "rcb.png",
            "championshipsWon": 1,
            "nameTeam": "Kings XI Punjab"
        },
        {
            "teamName": "RR",
            "icon": "rcb.png",
            "championshipsWon": 2,
            "nameTeam": "Rajasthan Royals"
        },
        {
            "teamName": "DC",
            "icon": "rcb.png",
            "championshipsWon": 1,
            "nameTeam": "Delhi Capitals"
        },

        // Add data for other teams
];
var playerData = [
    {
    "id": 0,
    "playerName": "Hardik Pandya",
    "from": "MI",
    "price": "6.50 Cr",
    "isPlaying": true,
    "description": "All-rounder"
    },
    {
    "id": 1,
    "playerName": "Virat Kohli",
    "from": "RCB",
    "price": "8.00 Cr",
    "isPlaying": true,
    "description": "Batsman"
    },
    {
    "id": 2,
    "playerName": "Yuvraj Singh",
    "from": "MI",
    "price": "1.00 Cr",
    "isPlaying": false,
    "description": "Batsman"
    },
    {
    "id": 3,
    "playerName": "Chris Morris",
    "from": "RR",
    "price": "16.25 Cr",
    "isPlaying": true,
    "description": "All-rounder"
    },
    {
    "id": 4,
    "playerName": "Glenn Maxwell",
    "from": "RCB",
    "price": "14.25 Cr",
    "isPlaying": true,
    "description": "All-rounder"
    },
    {
    "id": 5,
    "playerName": "Rohit Sharma",
    "from": "MI",
    "price": "6.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    },
    {
    "id": 6,
    "playerName": "Ishan Kishan",
    "from": "MI",
    "price": "2.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    }
    
    ];
    var container = document.getElementById('player-cards-container');

        // Get the add player button and form elements
        var addPlayerButton = document.getElementById('add-player-button');
        var addPlayerForm = document.getElementById('add-player-form');
        
        // Get the search bar input element
        var searchBar = document.getElementById('search-bar');
            
        // Function to add a new player card
        function addPlayerCard(player) {
            var card = document.createElement('div');
            card.className = 'player-card';

            // Create an anchor element with a link to the team page
            var teamPageLink = document.createElement('a');
            teamPageLink.href = 'team.html?team=' + player.from; // Replace with the actual team page URL
            teamPageLink.innerHTML = `
                <h2>${player.playerName}</h2>
                <p><strong>Team:</strong> ${player.from}</p>
                <p><strong>Price:</strong> ${player.price}</p>
                <p><strong>Playing Status:</strong> ${player.isPlaying ? 'Playing' : 'Not Playing'}</p>
                <p><strong>Description:</strong> ${player.description}</p>
            `;

            card.appendChild(teamPageLink);
            container.appendChild(card);
        }

        // Function to handle the "Add New Player" button click
        addPlayerButton.addEventListener('click', function() {
            if (addPlayerForm.style.display === 'none' || addPlayerForm.style.display === '') {
                addPlayerForm.style.display = 'flex';
            } else {
                addPlayerForm.style.display = 'none';
            }
        });

        // Function to handle the form submission
 // Function to handle the form submission
document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page

    // Get the form input values
    var playerName = document.getElementById('playerName').value;
    var team = document.getElementById('team').value;
    var price = document.getElementById('price').value;
    var isPlaying = document.getElementById('isPlaying').checked;
    var description = document.getElementById('description').value;

    // Create a new player object
    var newPlayer = {
        "id": playerData.length, // Assign a unique ID based on the current length of playerData
        "playerName": playerName,
        "from": team,
        "price": price,
        "isPlaying": isPlaying,
        "description": description
    };

    // Check for duplicates based on player name
    var isDuplicate = playerData.some(function(player) {
        return player.playerName === newPlayer.playerName;
    });

    if (isDuplicate) {
        // Handle duplicate player (display a message or take appropriate action)
        alert('Player with the same name already exists.');
    } else {
        // Add the new player to the playerData array
        playerData.push(newPlayer);

        // Save the updated playerData to local storage (simulate permanent storage)
        localStorage.setItem('playerData', JSON.stringify(playerData));

        // Add the new player card
        addPlayerCard(newPlayer);

        // Reset the form and hide it
        document.getElementById('player-form').reset();
        addPlayerForm.style.display = 'none';
    }
});

// Function to load player data from local storage on page load
function loadPlayerData() {
    var storedPlayerData = localStorage.getItem('playerData');

    if (storedPlayerData) {
        playerData = JSON.parse(storedPlayerData);
    }
}

// Call the function to load player data from local storage on page load
loadPlayerData();

function filterPlayers(query) {
            container.innerHTML = ''; // Clear the current player cards
        
            // Convert the query to lowercase for case-insensitive matching
            query = query.toLowerCase();
        
            playerData.forEach(function(player) {
                if (
                    player.playerName.toLowerCase().includes(query) ||
                    player.from.toLowerCase().includes(query)
                ) {
                    addPlayerCard(player);
                }
            });
        
            teamData.forEach(function(teamdata) {
                if (teamdata.nameTeam.toLowerCase().includes(query)) {
                    // Create a fake player object to display team data in the player card
                    addPlayerCard(fakePlayer);
                }
            });
        }
        
        // Add an input event listener to the search bar
        searchBar.addEventListener('input', function() {
            var searchQuery = searchBar.value;
            filterPlayers(searchQuery);
        });
        // Initially, add player cards for the existing data
        playerData.forEach(function(player) {
            addPlayerCard(player);
        });
        teamData.forEach(function(teamdata){
            addteamdata(teamdata);
        });

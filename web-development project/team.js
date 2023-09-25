var teamData = [
    {
        "teamName": "MI",
        "icon": "https://media.crictracker.com/media/attachments/1680698558309_Mumbai-Indians-new-logo.jpeg",
        "championshipsWon": 4,
        "nameTeam": "Mumbai Indians"
    },
    {
        "teamName": "RCB",
        "icon": "https://media.crictracker.com/media/attachments/1674557817477_Royal-Challengers-Bangalore.jpeg",
        "championshipsWon": 0,
        "nameTeam": "Royal Challengers Bangalore"
    },
    {
        "teamName": "CSK",
        "icon": "https://media.crictracker.com/media/attachments/1674543242945_CSK-Logo.jpeg",
        "championshipsWon": 5,
        "nameTeam": "Chennai Super Kings"
    },
    {
        "teamName": "KKR",
        "icon": "https://media.crictracker.com/media/attachments/1671612736819_KKR-logo.jpeg",
        "championshipsWon": 2,
        "nameTeam": "Kolkata Knight Riders"
    },
    {
        "teamName": "SRH",
        "icon": "https://media.crictracker.com/media/attachments/1669546081953_Sunrisers-Hyderabad.jpeg",
        "championshipsWon": 1,
        "nameTeam": " Sunrisers Hyderabad"
    },
        {
            "teamName": "KXIP",
            "icon": "https://media.crictracker.com/media/attachments/1671443590572_Punjab-Kings.jpeg",
            "championshipsWon": 1,
            "nameTeam": "Kings XI Punjab"
        },
        {
            "teamName": "RR",
            "icon": "https://media.crictracker.com/media/attachments/1674647344276_Rajasthan-Royals-Logo.jpeg",
            "championshipsWon": 2,
            "nameTeam": "Rajasthan Royals"
        },
        {
            "teamName": "DC",
            "icon": "https://media.crictracker.com/media/featureimage/Delhi-Capitals-logo-1.jpg",
            "championshipsWon": 1,
            "nameTeam": "Delhi Capitals"
        },

        // Add data for other teams
];
var savedPlayerData = localStorage.getItem('playerData');
var playerData = [];

if (savedPlayerData) {
    playerData = JSON.parse(savedPlayerData);
}

    function getSelectedTeam() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('team');
    }
    
    // Function to filter and display team data or players in grid card format
    function displayTeamDataOrPlayers() {
        var selectedTeam = getSelectedTeam();
    
        // Get the container where team data or players will be displayed
        var container = document.getElementById('team-players-container');
        container.innerHTML = ''; // Clear previous content
    
        // Loop through all teams in the teamData array
        teamData.forEach(function (team) {
            // Check if the selected team matches the current team or if no team is selected
            if (!selectedTeam || selectedTeam === team.teamName) {
                // Display the team information
                var teamInfoElement = document.createElement('div');
                teamInfoElement.className = 'team-info';
                teamInfoElement.innerHTML = `
                    <img src="${team.icon}" alt="${team.teamName} Icon">
                    <h2>${team.nameTeam}</h2>
                    <p><strong>Team Name:</strong> ${team.teamName}</p>
                    <p><strong>Championships Won:</strong> ${team.championshipsWon}</p>
                `;
                container.appendChild(teamInfoElement);
    var teamPlayers = playerData.filter(function (player) {
        return player.from === team.teamName;
    });

    if (teamPlayers.length > 0) {
        var playerGridContainer = document.createElement('div');
        playerGridContainer.className = 'player-grid';

        teamPlayers.forEach(function (player) {
            var playerCard = document.createElement('div');
            playerCard.className = 'player-card';

            // Create a link to the player details page with the player's name as a query parameter
            var playerDetailsLink = document.createElement('a');
            playerDetailsLink.href = 'playerdetail.html?player=' + encodeURIComponent(player.playerName);
            playerDetailsLink.innerHTML = `
                <h2>${player.playerName}</h2>
                <p><strong>Team:</strong> ${player.from}</p>
                <p><strong>Price:</strong> ${player.price}</p>
                <p><strong>Playing Status:</strong> ${player.isPlaying ? 'Playing' : 'Not Playing'}</p>
                <p><strong>Description:</strong> ${player.description}</p>
            `;

            playerCard.appendChild(playerDetailsLink);
            playerGridContainer.appendChild(playerCard);
        });

        container.appendChild(playerGridContainer);
        
        // Display the total player count for the team
        var totalPlayersCount = teamPlayers.length;
        var totalPlayersCountElement = document.createElement('p');
        totalPlayersCountElement.textContent = `Total Players: ${totalPlayersCount}`;
        container.appendChild(totalPlayersCountElement);
    } else {
        // Display a message when no players are found for the current team
        var noPlayersMessage = document.createElement('p');
        noPlayersMessage.textContent = `No players found for ${team.nameTeam}.`;
        container.appendChild(noPlayersMessage);
    }
}
});
}

// Call the function to display team data or players when the page loads
window.addEventListener('load', displayTeamDataOrPlayers);
var savedPlayerData = localStorage.getItem('playerData');
var playerData = [];

if (savedPlayerData) {
    playerData = JSON.parse(savedPlayerData);
}
        // Function to get the selected player name from the URL
        function getSelectedPlayer() {
            var urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('player');
        }

        // Function to display player details
        function displayPlayerDetails() {
            var selectedPlayer = getSelectedPlayer();

            // Get the container where player details will be displayed
            var container = document.getElementById('player-details-container');

            // Find the player with the selected name
            var player = playerData.find(function(player) {
                return player.playerName === selectedPlayer;
            });

            if (player) {
                var playerDetails = document.createElement('div');
                playerDetails.innerHTML = `
                    <h2>${player.playerName}</h2>
                    <p><strong>Team:</strong> ${player.from}</p>
                    <p><strong>Price:</strong> ${player.price}</p>
                    <p><strong>Playing Status:</strong> ${player.isPlaying ? 'Playing' : 'Not Playing'}</p>
                    <p><strong>Description:</strong> ${player.description}</p>
                `;

                container.appendChild(playerDetails);
            } else {
                // Handle the case where the player is not found
                container.innerHTML = '<p>Player not found.</p>';
            }
        }

        // Call the function to display player details when the page loads
        window.addEventListener('load', displayPlayerDetails);
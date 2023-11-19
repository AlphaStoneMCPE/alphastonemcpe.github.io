function checkServerStatus(serverId, serverIP, serverPort) {
    var serverElement = document.getElementById(serverId);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.mcsrvstat.us/3/${serverIP}:${serverPort}`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var statusElement = serverElement.querySelector(".server-status");

            if (response.online) {
                statusElement.textContent = `${response.players.online}/${response.players.max}`;
                serverElement.style.border = "1px solid #00ff00";
            } else {
                statusElement.textContent = "Offline";
                serverElement.style.border = "1px solid #ff0000";
            }
        } else if (xhr.readyState == 4) {
            var statusElement = serverElement.querySelector(".server-status");
            statusElement.textContent = "Failed to get server status";
            serverElement.style.border = "1px solid #666";
        }
    };

    xhr.send();
}

checkServerStatus("alphastone-095", "95.216.68.161", 37183);
checkServerStatus("alphastone-081", "95.216.68.161", 20907);
checkServerStatus("alphastone-076", "95.216.68.161", 20354);
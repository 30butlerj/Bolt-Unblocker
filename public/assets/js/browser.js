var cloak = localStorage.getItem("cloak");
if (!cloak) {
    document.title = "Home";
} else {
    document.title = cloak;
}

if (cloak == "Home | Schoology") {
    document.getElementById('icon').setAttribute('href','https://logosandtypes.com/wp-content/uploads/2020/07/powerschool.svg');
} else {
    document.getElementById("icon").setAttribute("href","https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png");
}

async function init() {
    try {
        const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
        const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
        if (localStorage.getItem("transport") == "epoxy") {
            if (await connection.getTransport() !== "/epoxy/index.mjs") {
                await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
                console.log("Using websocket transport. Wisp URL is: " + wispUrl);
            }
        }
        else {
            if (await connection.getTransport() !== "/libcurl/index.mjs") {
                await connection.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
                console.log("Using websocket transport. Wisp URL is: " + wispUrl);
            }
        }

    } catch (err) {
        console.error("An error occurred while setting up baremux:", err);
    }
    document.getElementById("frame").src = localStorage.getItem("url");
}

init().then(() => {
});

var cloak = localStorage.getItem("cloak");
document.title = cloak;
if (cloak == "Home | Schoology") {
    document.getElementById('icon').setAttribute('href','public/assets/imgs/bg/schoology.png');
} else {
    document.getElementById("icon").setAttribute("href","public/assets/imgs/bg/Google_Classroom_Logo.png");
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

function injectButton() {
    const host = window.location.hostname;
    let titleEl = null;

    // 1. Find the title element based on the store
    if (host.includes('steampowered')) {
        titleEl = document.getElementById("appHubAppName");
    } else if (host.includes('epicgames')) {
        // Epic Games uses a specific data-testid for their main title
        titleEl = document.querySelector('[data-testid="pdp-title"]');
    }

    // 2. If we found a title and the button isn't already there
    if (titleEl && !document.getElementById("1337x-btn")) {
        const gameName = titleEl.innerText.trim();
        
        // MODIFIED: Use %20 for spaces and point to category-search/Games
        const searchName = gameName.replace(/\s+/g, '%20');
        const searchUrl = `https://1337x.to/category-search/${searchName}/Games/1/`;

        const btn = document.createElement("button");
        btn.id = "1337x-btn";
        btn.innerHTML = "Search 1337x";
        
        // Sleek, Inline Styling
        btn.style.cssText = `
            background: #ff6600;
            color: white;
            border: none;
            padding: 5px 12px;
            margin-left: 15px;
            cursor: pointer;
            border-radius: 4px;
            font-weight: bold;
            font-size: 13px;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            transition: 0.2s;
            font-family: sans-serif;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;

        // Hover effects
        btn.onmouseover = () => { btn.style.background = "#e65c00"; btn.style.transform = "scale(1.05)"; };
        btn.onmouseout = () => { btn.style.background = "#ff6600"; btn.style.transform = "scale(1)"; };

        btn.onclick = () => window.open(searchUrl, '_blank');

        // Force alignment: Ensures the title is a flex container so button stays next to name
        titleEl.style.display = "inline-flex";
        titleEl.style.alignItems = "center";
        titleEl.appendChild(btn);
    }
}

// Epic Games and Steam load content dynamically, so we run the check every 2 seconds
// until the button is successfully placed.
const runInterval = setInterval(() => {
    injectButton();
    if (document.getElementById("1337x-btn")) {
        clearInterval(runInterval);
    }
}, 2000);
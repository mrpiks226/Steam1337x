function addSearchButton() {
    // Check which site we are on
    const isSteam = window.location.hostname.includes('steampowered.com');
    const isEpic = window.location.hostname.includes('epicgames.com');

    let titleElement = null;

    if (isSteam) {
        // Steam title selector
        titleElement = document.getElementById('appHubAppName');
    } else if (isEpic) {
        // Epic title selector (tries multiple common tags)
        titleElement = document.querySelector('h1') || document.querySelector('[data-testid="pdp-title"]');
    }

    // Only add the button if we found a title and the button isn't already there
    if (titleElement && !document.getElementById('1337x-search-btn')) {
        const gameTitle = titleElement.innerText.trim();
        
        const btn = document.createElement('button');
        btn.id = '1337x-search-btn';
        btn.innerText = '🔍 Search 1337x';
        
        // Style it to look like a legit button
        btn.style.marginLeft = '15px';
        btn.style.padding = '6px 12px';
        btn.style.backgroundColor = '#da3617'; // 1337x Red
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '13px';
        btn.style.fontWeight = 'bold';
        btn.style.zIndex = '9999';

        btn.onclick = (e) => {
            e.preventDefault();
            // Category 19 is Games on 1337x
            const searchUrl = `https://1337x.to/category-search/${encodeURIComponent(gameTitle)}/Games/1/`;
            window.open(searchUrl, '_blank');
        };

        // Put the button next to the title
        titleElement.style.display = 'inline-flex';
        titleElement.style.alignItems = 'center';
        titleElement.appendChild(btn);
    }
}

// Run immediately
addSearchButton();

// Epic Games uses "Soft Loading" (the page doesn't fully refresh).
// This interval checks every 2 seconds if the button needs to be re-added.
setInterval(addSearchButton, 2000);

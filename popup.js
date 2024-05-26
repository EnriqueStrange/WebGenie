document.getElementById('getData').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getPageData,
    }, (results) => {
        let pageData = results[0].result;
        document.getElementById('output').textContent = pageData || 'No data found';
    });
});


function getPageData() {
    // Get the title and URL
    let title = document.title;
    let url = window.location.href;

    // Remove HTML tags from the body content
    let content = document.body.innerHTML.replace(/<[^>]*>/g, '');

    // Replace specified characters with an empty string
    content = content.replace(/[\\\/\[\]_$\-]/g, '');

    // Create an object with the extracted data
    let pageData = {
        title: title,
        url: url,
        content: content.trim() // Trim any leading or trailing whitespace
    };

    // Return the page data as a JSON string
    return JSON.stringify(pageData);
}




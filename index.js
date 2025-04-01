/* # ===================== # */
/* # ===================== # */
// # Get Elements:
const [
    formEle,
    siteNameInput,
    siteUrlInput,
    tableEle
] = [
        document.querySelector('form'),
        document.getElementById('siteName'),
        document.getElementById('siteUrl'),
        document.querySelector('table')
    ];
const tBodyEle = tableEle.querySelector('tbody');
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Array of Bookmarks:
let bookmarks = [];
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Function to validation data:
function validateData() {
    const siteName = siteNameInput.value.trim();
    let siteUrl = siteUrlInput.value.trim();

    if (siteName === '') {
        alert('Please enter a site name.');
        return null;
    }

    if (siteUrl === '') {
        alert('Please enter a site URL.');
        return null;
    }

    siteUrl = normalizeUrl(siteUrl);

    const urlRegex = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}([\/?#].*)?$/i;
    if (!urlRegex.test(siteUrl)) {
        alert('Please enter a valid URL.');
        return null;
    }

    return { siteName, siteUrl };
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Make a normalize url:
function normalizeUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Function to create a new Bookmark:
function createBookmark() {
    const data = validateData();
    if (!data) return;

    const bookmark = {
        id: bookmarks.length + 1,
        name: data.siteName,
        url: data.siteUrl
    };

    bookmarks.push(bookmark);
    console.log(bookmarks);

    // Clear inputs:
    clearInputs();
    // Display bookmarks:
    displayBookmarks(bookmarks);
    // Save Bookmarks:
    saveBookmarks();
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Function to Clear inputs fields:
function clearInputs() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Display Bookmarks:
function displayBookmarks(bookmarks) {
    let trEle = '';
    bookmarks.forEach((b, index) => {
        trEle += `<tr>
                        <td>${index + 1}</td>
                            <td>${b.name}</td>
                            <td>
                                <a href=${b.url} target="_blank" class="visit-btn" title="Visit This Site" aria-label="Visit Site">
                                    <i class="fa-solid fa-eye fa-fw"></i>
                                    <span>Visit</span>
                                </a>
                            </td>
                            <td>
                                <button type="button" onclick="deleteBookmark(${b.id})" class="delete-btn" title="Delete This Site" aria-label="Delete Site">
                                    <i class="fa-solid fa-trash fa-fw"></i>
                                    <span>Delete</span>
                                </button>
                            </td>
                        </tr>`;
    });
    tBodyEle.innerHTML = trEle;
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Save Bookmarks:
function saveBookmarks() {
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Display Bookmarks When Page Load:
function displayBookmarksSaved() {
    bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'));
    displayBookmarks(bookmarks);
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Delete bookmark:
function deleteBookmark(id) {
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    // Redisplay bookmarks:
    displayBookmarks(bookmarks);
    // Save Bookmarks:
    saveBookmarks();
};
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # When user add bookmark or when submit:
formEle.addEventListener('submit', (e) => {
    e.preventDefault();
    createBookmark();
});
/* # ===================== # */
/* # ===================== # */

/* # ===================== # */
/* # ===================== # */
// # Display Bookmarks When Page Load:
window.addEventListener('load', () => {
    displayBookmarksSaved();
});
/* # ===================== # */
/* # ===================== # */
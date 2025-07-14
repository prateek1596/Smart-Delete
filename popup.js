document.getElementById("delete-custom").addEventListener("click", () => {
  const keyword = document.getElementById("keyword").value.trim();
  if (!keyword) {
    alert("Please enter a keyword");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: deleteEmails,
      args: [keyword]
    });
  });
});

function deleteEmails(keyword) {
  const emailRows = document.querySelectorAll("tr.zA");
  let deletedCount = 0;

  emailRows.forEach(row => {
    if (row.innerText.includes(keyword)) {
      const checkbox = row.querySelector('div[role="checkbox"]');
      if (checkbox) {
        checkbox.click();
        deletedCount++;
      }
    }
  });

  if (deletedCount > 0) {
    setTimeout(() => {
      const deleteBtn = document.querySelector('div[aria-label="Delete"]');
      if (deleteBtn) {
        deleteBtn.click();
        alert(`Deleted ${deletedCount} emails with keyword "${keyword}"`);
      } else {
        alert("Delete button not found. Please try again after Gmail finishes loading.");
      }
    }, 1000);
  } else {
    alert(`No emails found with keyword "${keyword}"`);
  }
}

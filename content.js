const addCleanerButton = () => {
  const toolbar = document.querySelector("div[gh='mtb']");
  if (toolbar && !document.getElementById("cleaner-btn")) {
    const btn = document.createElement("button");
    btn.id = "cleaner-btn";
    btn.innerText = "🧹 Clean Inbox";
    btn.style.marginLeft = "10px";
    btn.onclick = () => {
      alert("Scanning emails...");
      scanEmails(); // ✅ call safely when clicked
    };
    toolbar.appendChild(btn);
  }
};

// Observe DOM changes (Gmail loads dynamically)
const observer = new MutationObserver(addCleanerButton);
observer.observe(document.body, { childList: true, subtree: true });

// ✅ Email scanning and safe deletion
const scanEmails = () => {
  const emails = document.querySelectorAll('tr[role="row"]');
  let selected = 0;

  emails.forEach(row => {
    const subject = row.innerText;
    if (subject.includes("Offer") || subject.includes("Sale")) {
      const checkbox = row.querySelector('div[role="checkbox"]');
      if (checkbox) {
        checkbox.click();
        selected++;
      }
    }
  });

  // Safely click delete after selecting
  if (selected > 0) {
    setTimeout(() => {
      const deleteBtn = document.querySelector('div[aria-label="Delete"]');
      if (deleteBtn) {
        deleteBtn.click();
        alert(`Deleted ${selected} emails with Offer or Sale`);
      } else {
        alert("Delete button not found. Try again later.");
      }
    }, 1000);
  } else {
    alert("No matching emails found.");
  }
};

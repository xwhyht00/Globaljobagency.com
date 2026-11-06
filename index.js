
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const sidebar = document.getElementById("sidebar");
const pageTitle = document.getElementById("pageTitle");

const titles = {
  overview: "Dashboard Overview",
  jobs: "Find Jobs",
  applications: "My Applications",
  saved: "Saved Jobs",
  profile: "My Profile",
  messages: "Messages",
  settings: "Account Settings"
};

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.toggle("active-page", page.id === pageId);
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  pageTitle.textContent = titles[pageId] || "Dashboard";
  sidebar.classList.remove("open");
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

document.getElementById("menuBtn").addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const jobs = [
  {
    title: "Software Developer",
    company: "Global Technology Ltd",
    location: "Abuja, Nigeria",
    salary: "₦250,000 - ₦400,000"
  },
  {
    title: "Data Analyst",
    company: "Digital Solutions",
    location: "Lagos, Nigeria",
    salary: "₦180,000 - ₦300,000"
  },
  {
    title: "Customer Service Officer",
    company: "Business Connect",
    location: "Abuja, Nigeria",
    salary: "₦120,000 - ₦180,000"
  },
  {
    title: "Graphic Designer",
    company: "Creative Media",
    location: "Remote",
    salary: "₦150,000 - ₦250,000"
  }
];

let savedJobs = [];

function displayJobs(search = "") {
  const jobList = document.getElementById("jobList");

  const filtered = jobs.filter(job =>
    (job.title + job.company + job.location)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  jobList.innerHTML = filtered.map(job => `
    <div class="job-item">
      <h4>${job.title}</h4>
      <p>${job.company}</p>
      <p>${job.location}</p>
      <p>${job.salary}</p>
      <button onclick="saveJob('${job.title}')">Save Job</button>
    </div>
  `).join("") || "<p>No jobs found.</p>";
}

document.getElementById("jobSearch").addEventListener("input", event => {
  displayJobs(event.target.value);
});

function saveJob(title) {
  if (!savedJobs.includes(title)) {
    savedJobs.push(title);
    displaySavedJobs();
    alert("Job saved successfully!");
  } else {
    alert("This job is already saved.");
  }
}

function displaySavedJobs() {
  const container = document.getElementById("savedJobs");

  container.innerHTML = savedJobs.map(title => `
    <div class="job-item">
      <h4>${title}</h4>
      <button onclick="removeSavedJob('${title}')">
        Remove
      </button>
    </div>
  `).join("") || "<p>No saved jobs yet.</p>";
}

function removeSavedJob(title) {
  savedJobs = savedJobs.filter(job => job !== title);
  displaySavedJobs();
}

document.getElementById("profileForm").addEventListener("submit", event => {
  event.preventDefault();

  const profile = {
    name: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    skills: document.getElementById("skills").value
  };

  localStorage.setItem("globalJobsProfile", JSON.stringify(profile));

  alert("Profile saved successfully!");
});

const savedProfile = JSON.parse(
  localStorage.getItem("globalJobsProfile") || "null"
);

if (savedProfile) {
  document.getElementById("fullName").value = savedProfile.name || "";
  document.getElementById("email").value = savedProfile.email || "";
  document.getElementById("phone").value = savedProfile.phone || "";
  document.getElementById("skills").value = savedProfile.skills || "";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Connect your authentication system to enable secure logout.");
});

displayJobs();
displaySavedJobs();

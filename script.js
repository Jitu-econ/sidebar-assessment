const rightSidebar = document.getElementById("rightSidebar");
const toggleBtn = document.getElementById("toggleBtn");
const btnA = document.getElementById("btnA");
const btnB = document.getElementById("btnB");
const btnSettings = document.getElementById("btnSettings");
const btnUser = document.getElementById("btnUser");
const panelName = document.querySelector(".panel-name");
const rightArrow = document.querySelector(".fa-chevron-right");
const leftArrow = document.querySelector(".fa-chevron-left");
const hamburger = document.getElementById("hamburger");
const sidebarContainer = document.getElementById("sidebarContainer");
const btnTheme = document.getElementById("btnTheme");
const searchInput = document.getElementById("sidebarSearch");

const sidebarData = {
  dashboard: [
    {
      label: "Main",
      items: [
        { icon: "fas fa-tachometer-alt", text: "Overview" },
        { icon: "fas fa-chart-line", text: "Analytics" },
        { icon: "fas fa-file-alt", text: "Reports", options: ["Monthly", "Annual", "Custom"] }
      ]
    },
    {
      label: "Management",
      items: [
        { icon: "fas fa-users", text: "Users" },
        { icon: "fas fa-user-friends", text: "Teams" },
        { icon: "fas fa-briefcase", text: "Projects", options: ["Active", "Pending", "Archived"] }
      ]
    },
    {
      label: "Settings",
      items: [
        { icon: "fas fa-cog", text: "General" },
        { icon: "fas fa-shield-alt", text: "Security" },
        { icon: "fas fa-bell", text: "Notifications" }
      ]
    }
  ],
  tasks: [
    {
      label: "My Tasks",
      items: [
        { icon: "fas fa-calendar-day", text: "Today" },
        { icon: "fas fa-calendar-alt", text: "Upcoming" },
        { icon: "fas fa-check-circle", text: "Completed" }
      ]
    },
    {
      label: "Projects",
      items: [
        { icon: "fas fa-tasks", text: "Active" },
        { icon: "fas fa-archive", text: "Archived" }
      ]
    },
    {
      label: "Resources",
      items: [
        { icon: "fas fa-file", text: "Documents" },
        { icon: "fas fa-folder", text: "Files" }
      ]
    }
  ],
  settings: [
    {
      label: "Preferences",
      items: [
        { icon: "fas fa-sliders-h", text: "General" },
        { icon: "fas fa-bell", text: "Notifications" },
        { icon: "fas fa-lock", text: "Security" }
      ]
    },
    {
      label: "System",
      items: [
        { icon: "fas fa-database", text: "Storage" },
        { icon: "fas fa-plug", text: "Integrations" }
      ]
    }
  ],
  user: [
    {
      label: "Account",
      items: [
        { icon: "far fa-user", text: "Profile" },
        { icon: "fas fa-envelope", text: "Messages" },
        { icon: "fas fa-cog", text: "Account Settings" }
      ]
    },
    {
      label: "Support",
      items: [
        { icon: "fas fa-question-circle", text: "Help Center" },
        { icon: "fas fa-sign-out-alt", text: "Logout" }
      ]
    }
  ]
};

function buildSidebar(panelElement, data) {
  panelElement.innerHTML = "";
  data.forEach(group => {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("sidebar-group");
    const label = document.createElement("span");
    label.classList.add("sidebar-label");
    label.textContent = group.label;
    groupDiv.appendChild(label);
    group.items.forEach(item => {
      if (item.options) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item", "has-children");
        const mainLink = document.createElement("a");
        mainLink.href = "#";
        mainLink.innerHTML = `
          <i class="${item.icon}"></i>
          <span class="link-text">${item.text}</span>
          <span class="arrow"><i class="fas fa-chevron-down"></i></span>
        `;
        menuItem.appendChild(mainLink);
        const submenu = document.createElement("div");
        submenu.classList.add("submenu");
        item.options.forEach(opt => {
          const optLink = document.createElement("a");
          optLink.href = "#";
          optLink.textContent = opt;
          submenu.appendChild(optLink);
        });
        menuItem.appendChild(submenu);
        groupDiv.appendChild(menuItem);
      } else {
        const link = document.createElement("a");
        link.href = "#";
        link.innerHTML = `<i class="${item.icon}"></i><span class="link-text">${item.text}</span>`;
        groupDiv.appendChild(link);
      }
    });
    panelElement.appendChild(groupDiv);
  });
}

const panelA = document.createElement("div");
panelA.className = "panel";
rightSidebar.appendChild(panelA);
buildSidebar(panelA, sidebarData.dashboard);

const panelB = document.createElement("div");
panelB.className = "panel";
panelB.style.display = "none";
rightSidebar.appendChild(panelB);
buildSidebar(panelB, sidebarData.tasks);

const panelSettings = document.createElement("div");
panelSettings.className = "panel";
panelSettings.style.display = "none";
rightSidebar.appendChild(panelSettings);
buildSidebar(panelSettings, sidebarData.settings);

const panelUser = document.createElement("div");
panelUser.className = "panel";
panelUser.style.display = "none";
rightSidebar.appendChild(panelUser);
buildSidebar(panelUser, sidebarData.user);

toggleBtn.addEventListener("click", () => {
  rightSidebar.classList.toggle("expanded");
  rightSidebar.classList.toggle("collapsed");
  if (rightSidebar.classList.contains("collapsed")) {
    leftArrow.style.display = "none";
    rightArrow.style.display = "inline";
    panelName.style.display = "none";
    document.querySelectorAll(".menu-item.open").forEach(el => el.classList.remove("open"));
  } else {
    leftArrow.style.display = "inline";
    rightArrow.style.display = "none";
    panelName.style.display = "inline";
  }
});

function showPanel(activePanel, name, button) {
  [panelA, panelB, panelSettings, panelUser].forEach(p => (p.style.display = "none"));
  activePanel.style.display = "block";
  panelName.textContent = name;
  [btnA, btnB, btnSettings, btnUser].forEach(b => b.classList.remove("active"));
  button.classList.add("active");
}

btnA.addEventListener("click", () => showPanel(panelA, "Dashboard", btnA));
btnB.addEventListener("click", () => showPanel(panelB, "Tasks", btnB));
btnSettings.addEventListener("click", () => showPanel(panelSettings, "Settings", btnSettings));
btnUser.addEventListener("click", () => showPanel(panelUser, "User", btnUser));

document.addEventListener("click", (e) => {
  if (e.target.closest(".menu-item.has-children > a")) {
    e.preventDefault();
    if (rightSidebar.classList.contains("expanded")) {
      e.target.closest(".menu-item").classList.toggle("open");
    }
  }
});

hamburger.addEventListener("click", () => {
  sidebarContainer.classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebarContainer.contains(e.target) && !hamburger.contains(e.target)) {
      sidebarContainer.classList.remove("show");
    }
  }
});

btnTheme.addEventListener("click", () => {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  if (currentTheme === "dark") {
    root.setAttribute("data-theme", "light");
    btnTheme.innerHTML = `<i class="fas fa-moon"></i>`;
  } else {
    root.setAttribute("data-theme", "dark");
    btnTheme.innerHTML = `<i class="fas fa-sun"></i>`;
  }
});

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  document.querySelectorAll(".right-sidebar .panel a").forEach(link => {
    const text = link.textContent.toLowerCase();
    if (text.includes(term)) {
      link.style.display = "flex";
    } else {
      link.style.display = "none";
    }
  });
});

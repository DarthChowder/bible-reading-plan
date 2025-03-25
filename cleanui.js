document.addEventListener("DOMContentLoaded", () => {
  // Modal Toggle
  const modals = document.querySelectorAll(".modal");
  document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      document.getElementById(modalId).classList.add("active");
    });
  });

  modals.forEach(modal => {
    modal.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  });

  // Alert Close
  document.querySelectorAll(".alert .close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      closeBtn.parentElement.style.display = "none";
    });
  });

  // Dropdown Toggle
  document.querySelectorAll(".dropdown").forEach(dropdown => {
    const btn = dropdown.querySelector(".dropdown-btn");
    btn.addEventListener("click", () => dropdown.classList.toggle("active"));
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove("active");
    });
  });

  // Accordion Toggle
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  // Progress Bar Demo
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) setTimeout(() => progressBar.style.width = "75%", 500);

  // Pagination
  document.querySelectorAll(".pagination a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      link.parentElement.querySelectorAll("a").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
    });
  });
  if (tabButtons.length) {
    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

  // Carousel
  const carousel = document.querySelector(".carousel-inner");
  if (carousel) {
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let currentIndex = 0;

    function updateCarousel() {
      carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      updateCarousel();
    });
  }

  // Sidebar
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => sidebar.classList.toggle("active"));
  }

  // Datepicker
  const datepickerInput = document.querySelector(".datepicker .input");
  if (datepickerInput) {
    const datepickerCalendar = document.querySelector(".datepicker-calendar");
    const datepickerDays = document.querySelector(".datepicker-days");
    const datepickerMonthYear = document.querySelector(".datepicker-month-year");
    const prevMonthBtn = document.querySelector(".datepicker-btn.prev");
    const nextMonthBtn = document.querySelector(".datepicker-btn.next");
    let currentDate = new Date();

    datepickerInput.addEventListener("click", () => {
      datepickerCalendar.classList.toggle("active");
      renderCalendar();
    });

    document.addEventListener("click", (e) => {
      if (!datepickerInput.contains(e.target) && !datepickerCalendar.contains(e.target)) {
        datepickerCalendar.classList.remove("active");
      }
    });

    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    function renderCalendar() {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      datepickerMonthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
      datepickerDays.innerHTML = "";

      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("datepicker-day", "disabled");
        datepickerDays.appendChild(emptyDay);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("datepicker-day");
        day.textContent = i;
        day.addEventListener("click", () => {
          datepickerInput.value = `${month + 1}/${i}/${year}`;
          datepickerCalendar.classList.remove("active");
          datepickerDays.querySelectorAll(".datepicker-day").forEach(d => d.classList.remove("selected"));
          day.classList.add("selected");
        });
        datepickerDays.appendChild(day);
      }
    }
  }

  // Charts
  const barChart = document.querySelector(".chart-bar");
  if (barChart) {
    const barData = [
      { label: "Jan", value: 50 },
      { label: "Feb", value: 80 },
      { label: "Mar", value: 120 }
    ];
    const maxBarValue = Math.max(...barData.map(d => d.value));
    barChart.innerHTML = "";
    barData.forEach(data => {
      const item = document.createElement("div");
      item.classList.add("chart-bar-item");
      item.style.height = `${(data.value / maxBarValue) * 100}%`;
      item.setAttribute("data-label", `${data.label}: ${data.value}`);
      barChart.appendChild(item);
    });
  }

  const pieChart = document.querySelector(".chart-pie");
  if (pieChart) {
    const pieData = [
      { label: "Category 1", value: 60, color: "var(--chart-pie1)" },
      { label: "Category 2", value: 40, color: "var(--chart-pie2)" }
    ];
    let totalPieValue = pieData.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;
    const pieGradient = pieData.map(d => {
      const percentage = (d.value / totalPieValue) * 100;
      const startAngle = currentAngle;
      currentAngle += percentage * 3.6;
      return `${d.color} ${startAngle}deg ${currentAngle}deg`;
    }).join(", ");
    pieChart.style.background = `conic-gradient(${pieGradient})`;

    const legend = document.createElement("div");
    legend.classList.add("chart-legend");
    pieData.forEach(d => {
      const item = document.createElement("div");
      item.classList.add("chart-legend-item");
      const color = document.createElement("span");
      color.classList.add("chart-legend-color");
      color.style.backgroundColor = d.color;
      const text = document.createElement("span");
      text.textContent = `${d.label}: ${d.value}`;
      item.appendChild(color);
      item.appendChild(text);
      legend.appendChild(item);
    });
    pieChart.parentElement.appendChild(legend);
  }

  // File Upload
  const fileInput = document.querySelector(".file-upload input");
  if (fileInput) {
    const fileText = document.querySelector(".file-upload-text");
    fileInput.addEventListener("change", () => {
      fileText.textContent = fileInput.files[0]?.name || "No file selected";
    });
  }

  // Tree View
  document.querySelectorAll(".tree-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => toggle.classList.toggle("active"));
  });

  // Context Menu
  const contextMenu = document.querySelector(".context-menu");
  if (contextMenu) {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      contextMenu.style.top = `${e.pageY}px`;
      contextMenu.style.left = `${e.pageX}px`;
      contextMenu.classList.add("active");
    });
    document.addEventListener("click", () => contextMenu.classList.remove("active"));
  }

  // Autocomplete
  const autocompleteInput = document.querySelector(".autocomplete .input");
  if (autocompleteInput) {
    const autocompleteList = document.querySelector(".autocomplete-list");
    const suggestions = ["Apple", "Banana", "Cherry", "Dragon Fruit", "Elderberry"];

    autocompleteInput.addEventListener("input", () => {
      const value = autocompleteInput.value.toLowerCase();
      autocompleteList.innerHTML = "";
      if (value) {
        const filtered = suggestions.filter(item => item.toLowerCase().includes(value));
        filtered.forEach(item => {
          const div = document.createElement("div");
          div.classList.add("autocomplete-item");
          div.textContent = item;
          div.addEventListener("click", () => {
            autocompleteInput.value = item;
            autocompleteList.classList.remove("active");
          });
          autocompleteList.appendChild(div);
        });
        autocompleteList.classList.add("active");
      } else {
        autocompleteList.classList.remove("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (!autocompleteInput.contains(e.target) && !autocompleteList.contains(e.target)) {
        autocompleteList.classList.remove("active");
      }
    });
  }

  // Rating Stars
  document.querySelectorAll(".rating-star").forEach((star, index, stars) => {
    star.addEventListener("click", () => {
      stars.forEach((s, i) => s.classList.toggle("active", i <= index));
    });
  });

  // Form Validation
  document.querySelectorAll(".form-validate").forEach(form => {
    const inputs = form.querySelectorAll(".input[data-validate]");
    inputs.forEach(input => {
      input.addEventListener("input", () => validateInput(input));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) isValid = false;
      });
      if (isValid) {
        form.querySelector(".form-success")?.classList.add("active");
        form.querySelector(".form-error")?.classList.remove("active");
      }
    });
  });

  function validateInput(input) {
    const rule = input.getAttribute("data-validate");
    const value = input.value.trim();
    const error = input.nextElementSibling;
    let isValid = true;

    if (rule === "required" && !value) isValid = false;
    if (rule === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) isValid = false;
    if (rule === "number" && (isNaN(value) || value === "")) isValid = false;

    input.classList.toggle("invalid", !isValid);
    input.classList.toggle("valid", isValid);
    if (error && error.classList.contains("form-error")) {
      error.classList.toggle("active", !isValid);
    }
    return isValid;
  }

  // Theme Switcher
  const themeToggle = document.createElement("select");
  themeToggle.classList.add("theme-switcher");
  themeToggle.innerHTML = `
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="high-contrast">High Contrast</option>
  `;
  document.body.appendChild(themeToggle);

  themeToggle.addEventListener("change", () => {
    document.body.className = `theme-${themeToggle.value}`;
    localStorage.setItem("theme", themeToggle.value);
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.className = `theme-${savedTheme}`;
  themeToggle.value = savedTheme;

  // Lazy Loading
  const lazyElements = document.querySelectorAll(".lazy-load");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px 100px 0px" });
  lazyElements.forEach(el => observer.observe(el));

  // Table Sorting and Filtering
  document.querySelectorAll(".table").forEach(table => {
    const headers = table.querySelectorAll("th.sortable");
    headers.forEach((header, index) => {
      header.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        const isAscending = !header.classList.contains("sort-asc");

        headers.forEach(h => h.classList.remove("sort-asc", "sort-desc"));
        header.classList.add(isAscending ? "sort-asc" : "sort-desc");

        rows.sort((a, b) => {
          const aValue = a.cells[index].textContent.trim();
          const bValue = b.cells[index].textContent.trim();
          return isAscending
            ? aValue.localeCompare(bValue, undefined, { numeric: true })
            : bValue.localeCompare(aValue, undefined, { numeric: true });
        });

        rows.forEach(row => tbody.appendChild(row));
      });
    });

    const filterInput = table.previousElementSibling?.querySelector(".table-filter");
    if (filterInput) {
      filterInput.addEventListener("input", () => {
        const filter = filterInput.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(filter) ? "" : "none";
        });
      });
    }
  });

  // Toast Variants and Stacking
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`, "animate-slide", "toast-stack");
    toast.textContent = message;
    const existingToasts = document.querySelectorAll(".toast");
    toast.style.setProperty("--toast-index", existingToasts.length);
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("active"), 10);
    setTimeout(() => {
      toast.classList.remove("active");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  document.querySelectorAll("[data-toast]").forEach(btn => {
    btn.addEventListener("click", () => {
      const message = btn.getAttribute("data-toast");
      const type = btn.getAttribute("data-toast-type") || "info";
      showToast(message, type);
    });
  });
});

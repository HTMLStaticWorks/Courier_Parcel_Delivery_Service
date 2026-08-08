document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if(icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- Theme Toggle Logic ---
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }

    // Update all theme toggle buttons across the DOM
    document.querySelectorAll('#themeToggle, .theme-toggle-btn').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === "dark") {
          icon.className = 'fas fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Light Mode');
        } else {
          icon.className = 'fas fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Dark Mode');
        }
      }
    });
  };

  // Determine initial theme
  const savedTheme = localStorage.getItem("theme");
  let currentTheme = "light";
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    currentTheme = "dark";
  }
  applyTheme(currentTheme);

  // Attach event listener to all theme toggles
  document.querySelectorAll('#themeToggle, .theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  });

  // --- RTL / LTR Direction & Language Toggle Logic ---
  const applyDirection = (dir) => {
    document.documentElement.setAttribute("dir", dir);

    // Update direction toggle buttons
    document.querySelectorAll('#dirToggle, .dir-toggle-btn').forEach(btn => {
      if (dir === "rtl") {
        btn.textContent = "LTR";
        btn.setAttribute('aria-label', 'Switch to Left to Right');
        btn.setAttribute('title', 'Switch to LTR');
      } else {
        btn.textContent = "RTL";
        btn.setAttribute('aria-label', 'Switch to Right to Left');
        btn.setAttribute('title', 'Switch to RTL');
      }
    });

    // Update dynamic translation elements (data-en, data-ar, data-en-placeholder, data-ar-placeholder)
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      if (dir === 'rtl') {
        el.textContent = el.getAttribute('data-ar');
      } else {
        el.textContent = el.getAttribute('data-en');
      }
    });

    document.querySelectorAll('[data-en-placeholder][data-ar-placeholder]').forEach(el => {
      if (dir === 'rtl') {
        el.setAttribute('placeholder', el.getAttribute('data-ar-placeholder'));
      } else {
        el.setAttribute('placeholder', el.getAttribute('data-en-placeholder'));
      }
    });
  };

  // Determine initial direction
  const savedDir = localStorage.getItem("dir") || "ltr";
  applyDirection(savedDir);

  // Attach event listener to all direction toggles
  document.querySelectorAll('#dirToggle, .dir-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const activeDir = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
      const newDir = activeDir === "rtl" ? "ltr" : "rtl";
      localStorage.setItem("dir", newDir);
      applyDirection(newDir);
    });
  });

  // --- Password Visibility Toggle ---
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const wrapper = this.closest('.password-input-wrapper');
      if (!wrapper) return;
      const input = wrapper.querySelector('input');
      const icon = this.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      } else {
        input.type = 'password';
        if (icon) {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
});

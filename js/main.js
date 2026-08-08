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

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  
  // Check local storage for theme
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    document.body.setAttribute("data-theme", "dark");
  } else if (currentTheme == "light") {
    document.body.removeAttribute("data-theme");
  } else if (prefersDarkScheme.matches) {
    document.body.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // RTL/LTR Toggle
  const dirToggle = document.getElementById('dirToggle');
  
  // Check local storage for direction
  const currentDir = localStorage.getItem("dir") || "ltr";
  document.documentElement.setAttribute("dir", currentDir);

  if (dirToggle) {
    dirToggle.addEventListener("click", () => {
      const isRtl = document.documentElement.getAttribute("dir") === "rtl";
      if (isRtl) {
        document.documentElement.setAttribute("dir", "ltr");
        localStorage.setItem("dir", "ltr");
      } else {
        document.documentElement.setAttribute("dir", "rtl");
        localStorage.setItem("dir", "rtl");
      }
    });
  }

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

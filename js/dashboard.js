document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const sidebar = document.getElementById('dashboardSidebar');
  const dashMenuBtn = document.getElementById('dashMenuBtn');
  
  if (dashMenuBtn && sidebar) {
    dashMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });

    // Close sidebar on mobile when clicking a nav item
    document.querySelectorAll('.dash-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('active');
        }
      });
    });
  }

  // Dashboard Tabs Switching
  const navItems = document.querySelectorAll('.dash-nav-item');
  const sections = document.querySelectorAll('.dash-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if(item.id === "navLogout") return; // Let logout redirect

      // Remove active from all
      navItems.forEach(nav => nav.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));

      // Add active to clicked
      item.classList.add('active');
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Simulated Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Booking Confirmed! Your tracking ID is CR" + Math.floor(100000 + Math.random() * 900000));
        bookingForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Switch to My Shipments tab
        document.querySelector('[data-target="myShipments"]').click();
      }, 1500);
    });
  }

  // Handle Receipt Download
  document.querySelectorAll('.download-receipt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const trackingId = btn.getAttribute('data-id');
      alert(`Downloading receipt for shipment ${trackingId}...`);
    });
  });
});

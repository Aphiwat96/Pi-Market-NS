function goToPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) targetPage.classList.add('active');
  
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.page === pageName) btn.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      goToPage(btn.dataset.page);
    });
  });
  goToPage('home');
});

(() => {
  const loginScreen = document.querySelector('[data-screen="login"]');
  const dashboardScreen = document.querySelector('[data-screen="dashboard"]');
  const openButton = document.querySelector('[data-preview-open]');
  const closeButton = document.querySelector('[data-preview-close]');

  function setPreviewOpen(isOpen) {
    loginScreen.hidden = isOpen;
    dashboardScreen.hidden = !isOpen;

    if (isOpen) {
      dashboardScreen.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    openButton.focus({ preventScroll: true });
  }

  openButton.addEventListener('click', () => setPreviewOpen(true));
  closeButton.addEventListener('click', () => setPreviewOpen(false));
})();

const themeToggle = document.getElementById('themeToggle');
const trailerBtn = document.getElementById('trailerBtn');
const scrollBtn = document.getElementById('scrollBtn');
const storyTabs = document.querySelectorAll('.story-tab');
const storyPanels = document.querySelectorAll('.story-panel');
const modal = document.getElementById('trailerModal');
const closeModal = document.getElementById('closeModal');
const nextQuoteBtn = document.getElementById('nextQuoteBtn');
const quoteText = document.getElementById('quoteText');
const cardButtons = document.querySelectorAll('.card-button');

const quotes = [
  '“With great power comes great responsibility.”',
  '“I’m not the hero you need. I’m the hero you deserve.”',
  '“The best part of being Spider-Man is that it lets me be Peter Parker too.”',
  '“You can’t look at the world in the same way after you’ve seen it from above.”'
];

let quoteIndex = 0;

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function openModal() {
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModalWindow() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function switchStoryTab(tab) {
  const targetId = tab.dataset.target;

  storyTabs.forEach((btn) => btn.classList.toggle('active', btn === tab));
  storyPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === targetId);
  });
}

function updateQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteText.textContent = quotes[quoteIndex];
}

function toggleCardText(button) {
  const fullText = button.dataset.fulltext;
  const isOpen = button.classList.contains('is-open');

  if (isOpen) {
    button.textContent = 'Read more';
    button.classList.remove('is-open');
    return;
  }

  button.textContent = fullText;
  button.classList.add('is-open');
}

themeToggle.addEventListener('click', toggleTheme);
trailerBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalWindow);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModalWindow();
  }
});

scrollBtn.addEventListener('click', () => {
  document.getElementById('story').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

storyTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchStoryTab(tab));
});

nextQuoteBtn.addEventListener('click', updateQuote);

cardButtons.forEach((button) => {
  button.addEventListener('click', () => toggleCardText(button));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModalWindow();
  }
});

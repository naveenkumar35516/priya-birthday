(function () {
  'use strict';

  const BIRTHDAY = new Date('2026-06-22T00:00:00');
  const BIRTHDAY_END = new Date('2026-06-23T00:00:00');

  // ===== Particles =====
  function initParticles() {
    const container = document.getElementById('particles');
    const colors = ['#EC1C24', '#D4AF37', '#FF69B4', '#FFFFFF', '#FF1493'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 8 + 4;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration:${Math.random() * 8 + 6}s;
        animation-delay:${Math.random() * 6}s;
      `;
      container.appendChild(p);
    }
  }

  // ===== Clock & Countdown =====
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('liveClock').textContent = `${h}:${m}:${s}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('liveDate').textContent = now.toLocaleDateString('en-IN', options);
  }

  function updateCountdown() {
    const now = new Date();
    const label = document.getElementById('countdownLabel');
    let target, prefix;

    if (now >= BIRTHDAY && now < BIRTHDAY_END) {
      label.textContent = '🎉 IT\'S YOUR BIRTHDAY! 🎉';
      document.getElementById('cdDays').textContent = '🎂';
      document.getElementById('cdHours').textContent = '21';
      document.getElementById('cdMins').textContent = '♥';
      document.getElementById('cdSecs').textContent = '✨';
      return;
    }

    if (now >= BIRTHDAY_END) {
      label.textContent = 'Birthday memories live forever ♾';
      target = new Date('2027-06-22T00:00:00');
    } else {
      label.textContent = 'Countdown to June 22';
      target = BIRTHDAY;
    }

    const diff = target - now;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cdSecs').textContent = String(secs).padStart(2, '0');
  }

  // ===== Music =====
  const bgMusic = document.getElementById('bgMusic');

  // Attempt to play on load (some browsers require user interaction and may block autoplay).
  window.addEventListener('load', () => {
    if (bgMusic) {
      bgMusic.play().catch(() => {
        // fallback: keep audio element ready; user can manually enable if autoplay is blocked
        console.warn('Autoplay blocked or audio file missing: audio/kadhaippoma.mp3');
      });
    }
  });

  // Device detection: add class to body and enable touchstart to trigger audio on mobile
  function detectMobile() {
    const ua = navigator.userAgent || '';
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(ua);
  }

  if (detectMobile()) {
    document.body.classList.add('is-mobile');
    // try to play on first user interaction if autoplay was blocked
    const unlockAudio = () => {
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('click', unlockAudio, { once: true });
  }

  // ===== Enter Site =====
  document.getElementById('enterBtn').addEventListener('click', () => {
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('hero').style.display = 'none';
    showSection('wishes');
    revealCards('#wishes .wish-card');
    try { bgMusic.play(); } catch (_) {}
    launchConfetti(80);
  });

  // ===== Section Navigation =====
  const panels = ['wishes', 'memories', 'celebrate'];

  function showSection(id) {
    panels.forEach(p => {
      const el = document.getElementById(p);
      el.classList.toggle('active', p === id);
      el.classList.toggle('hidden-panel', p !== id);
    });
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === id);
    });
    if (id === 'memories') revealCards('#memories .photo-frame');
    if (id === 'wishes') revealCards('#wishes .wish-card');
  }

  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  function revealCards(selector) {
    document.querySelectorAll(selector).forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 150);
    });
  }

  document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.reveal;
      revealCards(`#${section} .reveal`);
      btn.textContent = 'All shown with love 💕';
      btn.disabled = true;
    });
  });

  // ===== Lightbox =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  document.querySelectorAll('.photo-frame img').forEach(img => {
    img.closest('.photo-frame').addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.closest('.photo-frame').dataset.caption || '';
      lightbox.classList.remove('hidden');
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  // Note: special wish / video features removed to keep the site focused on the vibe.

  // ===== FX Canvas =====
  const canvas = document.getElementById('fxCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class FXParticle {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = Math.random() * -12 - 4;
      this.gravity = 0.3;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.008;
      this.size = Math.random() * 8 + 4;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 10;
      const colors = ['#EC1C24', '#D4AF37', '#FF69B4', '#FFFFFF', '#FF1493', '#FFD700'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.emoji = type === 'heart' ? '💕' : type === 'firework' ? '✨' : type === 'sparkle' ? '🌟' : '';
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      this.rotation += this.rotSpeed;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      if (this.emoji) {
        ctx.font = `${this.size * 2}px serif`;
        ctx.fillText(this.emoji, -this.size, this.size / 2);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      }
      ctx.restore();
    }
  }

  function animateFX() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateFX);
  }

  animateFX();

  function launchConfetti(count) {
    for (let i = 0; i < count; i++) {
      particles.push(new FXParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.3,
        'confetti'
      ));
    }
  }

  function launchHearts(count) {
    for (let i = 0; i < count; i++) {
      particles.push(new FXParticle(
        Math.random() * canvas.width,
        canvas.height,
        'heart'
      ));
    }
  }

  function launchFireworks() {
    for (let burst = 0; burst < 5; burst++) {
      setTimeout(() => {
        const cx = Math.random() * canvas.width;
        const cy = Math.random() * canvas.height * 0.5;
        for (let i = 0; i < 40; i++) {
          const p = new FXParticle(cx, cy, 'firework');
          const angle = (Math.PI * 2 * i) / 40;
          const speed = Math.random() * 6 + 4;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          p.gravity = 0.1;
          particles.push(p);
        }
      }, burst * 300);
    }
  }

  function launchSparkle(count = 60) {
    for (let i = 0; i < count; i++) {
      const p = new FXParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.35,
        'sparkle'
      );
      p.vx = (Math.random() - 0.5) * 4;
      p.vy = Math.random() * -5 - 2;
      p.gravity = 0.02;
      particles.push(p);
    }
  }

  document.getElementById('confettiBtn').addEventListener('click', () => launchConfetti(100));
  document.getElementById('fireworksBtn').addEventListener('click', launchFireworks);
  document.getElementById('heartsBtn').addEventListener('click', () => launchHearts(50));
  document.getElementById('sparkleBtn').addEventListener('click', () => launchSparkle(80));
  document.getElementById('cakeBtn').addEventListener('click', () => {
    document.getElementById('cakeDisplay').classList.remove('hidden');
    launchConfetti(50);
  });

  document.querySelector('.celebrate-btn').addEventListener('click', () => {
    setTimeout(() => launchConfetti(80), 300);
  });

  // ===== Texted Wishes (local storage) =====
  const TEXT_WISH_KEY = 'bd_text_wishes_v1';

  function loadTextWishes() {
    try {
      return JSON.parse(localStorage.getItem(TEXT_WISH_KEY) || '[]');
    } catch (_) { return []; }
  }

  function saveTextWishes(list) {
    try { localStorage.setItem(TEXT_WISH_KEY, JSON.stringify(list)); } catch (_) {}
  }

  const ADMIN_NOTE_KEY = 'bd_admin_notes_v1';

  function loadAdminNotes() {
    try { return JSON.parse(localStorage.getItem(ADMIN_NOTE_KEY) || '[]'); } catch (_) { return []; }
  }

  function saveAdminNotes(list) {
    try { localStorage.setItem(ADMIN_NOTE_KEY, JSON.stringify(list)); } catch (_) {}
  }

  function renderAdminNotes() {
    const container = document.getElementById('adminNoteList');
    if (!container) return;
    const list = loadAdminNotes();
    if (list.length === 0) {
      container.innerHTML = '<p class="muted">No private admin notes yet. Unlock to add one.</p>';
      return;
    }
    container.innerHTML = list.slice().reverse().map(item => {
      const time = new Date(item.time).toLocaleString();
      return `<div class="admin-note-card"><strong>Admin note</strong><p>${escapeHtml(item.note).replace(/\n/g, '<br>')}</p><small>${time}</small></div>`;
    }).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderTextWishes() {
    const container = document.getElementById('textWishList');
    if (!container) return;
    const list = loadTextWishes();
    if (list.length === 0) {
      container.innerHTML = '<p class="muted">No messages yet — paste one above.</p>';
      return;
    }
    const html = list.slice().reverse().map(item => {
      const name = item.name ? escapeHtml(item.name) : 'Someone';
      const time = new Date(item.time).toLocaleString();
      const msg = escapeHtml(item.msg).replace(/\n/g, '<br>');
      return `<div class="text-wish-card"><div class="tw-meta"><strong>${name}</strong> <small>${time}</small></div><div class="tw-msg">${msg}</div></div>`;
    }).join('');
    container.innerHTML = html;
  }

  const sendBtn = document.getElementById('sendTextBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const input = document.getElementById('textWishInput');
      const nameInput = document.getElementById('textWishName');
      if (!input) return;
      const msg = input.value.trim();
      const name = nameInput ? nameInput.value.trim() : '';
      if (!msg) return;
      const list = loadTextWishes();
      list.push({ name, msg, time: Date.now() });
      saveTextWishes(list);
      input.value = '';
      if (nameInput) nameInput.value = '';
      renderTextWishes();
      launchConfetti(20);
    });
  }

  const adminToggle = document.getElementById('adminToggle');
  const adminPanel = document.getElementById('adminPanel');
  const adminNoteInput = document.getElementById('adminNoteInput');
  const saveAdminNoteBtn = document.getElementById('saveAdminNote');

  if (adminToggle && adminPanel) {
    adminToggle.addEventListener('click', () => {
      const secret = prompt('Enter the admin key to unlock private notes');
      if (secret && secret.trim().toLowerCase() === 'birthdayadmin') {
        adminPanel.classList.remove('hidden');
        renderAdminNotes();
      } else {
        alert('Secret admin key is required.');
      }
    });
  }

  if (saveAdminNoteBtn) {
    saveAdminNoteBtn.addEventListener('click', () => {
      if (!adminNoteInput) return;
      const note = adminNoteInput.value.trim();
      if (!note) return;
      const list = loadAdminNotes();
      list.push({ note, time: Date.now() });
      saveAdminNotes(list);
      adminNoteInput.value = '';
      renderAdminNotes();
      launchSparkle(24);
    });
  }

  // render on init
  renderTextWishes();
  renderAdminNotes();

  // ===== Init =====
  initParticles();
  updateClock();
  updateCountdown();
  setInterval(() => { updateClock(); updateCountdown(); }, 1000);
})();

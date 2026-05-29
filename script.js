/* ========================================================================
   FRAYLON TECHNOLOGIES — Workshop Portal
   Final polished script
   ======================================================================== */

// ---------- Navbar scroll state ----------
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 4) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile navigation ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Toast ----------
const toast = document.getElementById('toast');
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll(
  '.card, .price-card, .highlight-item, .agenda-list li, .faq-list details, .stat-block, .section-head, .section-head-left, .register-intro, .register-form, .cta-inner > div, .cta-inner > a'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Slight stagger when multiple enter together
      setTimeout(() => entry.target.classList.add('in'), Math.min(i * 60, 240));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ---------- Stat counters ----------
const statValues = document.querySelectorAll('.stat-value');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      let display;
      if (isDecimal) {
        display = (current / 10).toFixed(1);
      } else {
        display = Math.floor(current).toLocaleString();
      }
      el.textContent = display + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else {
        el.textContent = (isDecimal ? (target / 10).toFixed(1) : Math.floor(target).toLocaleString()) + suffix;
      }
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.4 });

statValues.forEach(el => statObserver.observe(el));

// ---------- Workshop card "Select track" → scroll to form ----------
document.querySelectorAll('[data-select]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`"${btn.dataset.select}" — complete the form to reserve your seat.`);
  });
});

// ---------- Year segmented control ----------
const yearGroup = document.getElementById('yearGroup');
const yearValue = document.getElementById('yearValue');

yearGroup?.querySelectorAll('.seg-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    yearGroup.querySelectorAll('.seg-btn').forEach(b => b.setAttribute('aria-checked', 'false'));
    btn.setAttribute('aria-checked', 'true');
    yearValue.value = btn.dataset.value;
    yearValue.closest('.field')?.classList.remove('has-error');
  });
});

// ---------- Domain selection ----------
const domainCards = document.querySelectorAll('.domain-card');
const domainValue = document.getElementById('domainValue');
const domainHelper = document.getElementById('domainHelper');

domainCards.forEach(card => {
  card.addEventListener('click', () => {
    domainCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    domainValue.value = card.dataset.value;
    domainHelper.textContent = `Selected: ${card.dataset.value}`;
    domainHelper.classList.remove('has-error');
  });
});

// ---------- Character counter ----------
const motivation = document.getElementById('motivation');
const charCount = document.getElementById('charCount');
motivation?.addEventListener('input', () => {
  const len = motivation.value.length;
  charCount.textContent = `${len} / 600`;
  charCount.style.color = len > 540 ? 'var(--error)' : '';
});

// ---------- Inline validation ----------
function setError(field, hasError) {
  const wrapper = field.closest('.field');
  if (!wrapper) return;
  wrapper.classList.toggle('has-error', hasError);
  wrapper.classList.toggle('has-success', !hasError && field.value.trim() !== '');
}

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = v => /^[+()0-9\s-]{7,}$/.test(v.trim());

const inlineRules = {
  fullName: v => v.trim().length >= 2,
  email: v => isEmail(v),
  phone: v => isPhone(v),
  institution: v => v.trim().length >= 2,
  motivation: v => v.trim().length >= 10,
};

Object.keys(inlineRules).forEach(name => {
  const field = document.querySelector(`[name="${name}"]`);
  if (!field) return;
  field.addEventListener('blur', () => {
    if (field.value.trim() === '') {
      setError(field, false);
      field.closest('.field')?.classList.remove('has-success');
      return;
    }
    setError(field, !inlineRules[name](field.value));
  });
  field.addEventListener('input', () => {
    if (field.closest('.field')?.classList.contains('has-error') && inlineRules[name](field.value)) {
      setError(field, false);
    }
  });
});

// ---------- Success Modal ----------
const successModal = document.getElementById('successModal');
const modalSummary = document.getElementById('modalSummary');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalClose = document.getElementById('modalClose');
const modalContinue = document.getElementById('modalContinue');

function openModal(data) {
  // Build a clean summary
  modalSummary.innerHTML = `
    <dl>
      <dt>Name</dt><dd>${escapeHTML(data.fullName)}</dd>
      <dt>Email</dt><dd>${escapeHTML(data.email)}</dd>
      <dt>Domain</dt><dd>${escapeHTML(data.domain)}</dd>
      <dt>Year</dt><dd>${escapeHTML(data.year)}</dd>
    </dl>
  `;
  successModal.hidden = false;
  requestAnimationFrame(() => successModal.classList.add('show'));
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  successModal.classList.remove('show');
  setTimeout(() => {
    successModal.hidden = true;
    document.body.style.overflow = '';
    // Reset SVG check animations so they replay next time
    const c = successModal.querySelector('.check-circle');
    const p = successModal.querySelector('.check-path');
    if (c && p) {
      c.style.animation = 'none';
      p.style.animation = 'none';
      void c.offsetWidth;
      c.style.animation = '';
      p.style.animation = '';
    }
  }, 250);
}

modalCloseBtn?.addEventListener('click', closeModal);
modalClose?.addEventListener('click', closeModal);
modalContinue?.addEventListener('click', closeModal);
successModal?.addEventListener('click', (e) => { if (e.target === successModal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !successModal.hidden) closeModal();
});

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// ---------- Form submit ----------
const form = document.getElementById('registerForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';
  status.className = 'form-status';

  const data = Object.fromEntries(new FormData(form).entries());
  const agree = document.getElementById('agree').checked;
  let firstInvalid = null;

  Object.keys(inlineRules).forEach(name => {
    const field = form.querySelector(`[name="${name}"]`);
    const ok = inlineRules[name](field.value || '');
    setError(field, !ok);
    if (!ok && !firstInvalid) firstInvalid = field;
  });

  if (!yearValue.value) {
    yearValue.closest('.field')?.classList.add('has-error');
    if (!firstInvalid) firstInvalid = yearGroup;
  }

  if (!domainValue.value) {
    domainHelper.textContent = 'Please select a domain to continue.';
    domainHelper.classList.add('has-error');
    if (!firstInvalid) firstInvalid = document.querySelector('.domain-card');
  }

  if (!agree) {
    status.textContent = 'Please confirm you agree to the terms.';
    status.classList.add('error');
    if (!firstInvalid) firstInvalid = document.getElementById('agree');
  }

  if (firstInvalid) {
    status.textContent = status.textContent || 'Please complete the highlighted fields.';
    status.classList.add('error');
    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (firstInvalid.focus) firstInvalid.focus();
    return;
  }

  submitBtn.classList.add('loading');
submitBtn.disabled = true;

// amount in paise
const amount = 99900;

const options = {
  key: "YOUR_RAZORPAY_KEY_ID",
  amount: amount,
  currency: "INR",
  name: "Fraylon Technologies",
  description: "Workshop Registration",
  image: "fraylontechnologies_logo.jpeg",

  handler: async function (response) {

    // Payment successful
    console.log(response);

    // Save form + payment details to backend
    const finalData = {
      ...data,
      payment_id: response.razorpay_payment_id
    };

    try {

      const res = await fetch("http://localhost:5000/save-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData)
      });

      const result = await res.json();

      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      if (result.success) {

        form.querySelectorAll('.field').forEach(f =>
          f.classList.remove('has-error', 'has-success')
        );

        domainCards.forEach(c => c.classList.remove('active'));

        yearGroup.querySelectorAll('.seg-btn').forEach(b =>
          b.setAttribute('aria-checked', 'false')
        );

        const submittedData = { ...data };

        yearValue.value = '';
        domainValue.value = '';

        domainHelper.textContent = 'Select one domain to continue.';
        domainHelper.classList.remove('has-error');

        charCount.textContent = '0 / 600';

        form.reset();

        status.textContent = '';

        openModal(submittedData);

        showToast('Payment Successful ✓');

      } else {

        alert("Payment succeeded but DB save failed.");

      }

    } catch (err) {

      console.log(err);
      alert("Server Error");

    }

  },

  prefill: {
    name: data.fullName,
    email: data.email,
    contact: data.phone
  },

  theme: {
    color: "#111827"
  }
};

const rzp = new Razorpay(options);

rzp.on('payment.failed', function (response) {

  submitBtn.classList.remove('loading');
  submitBtn.disabled = false;

  alert("Payment Failed");

  console.log(response.error);

});

rzp.open();
});

form?.addEventListener('reset', () => {
  setTimeout(() => {
    form.querySelectorAll('.field').forEach(f => f.classList.remove('has-error', 'has-success'));
    domainCards.forEach(c => c.classList.remove('active'));
    yearGroup.querySelectorAll('.seg-btn').forEach(b => b.setAttribute('aria-checked', 'false'));
    yearValue.value = '';
    domainValue.value = '';
    domainHelper.textContent = 'Select one domain to continue.';
    domainHelper.classList.remove('has-error');
    charCount.textContent = '0 / 600';
    status.textContent = '';
    status.className = 'form-status';
  }, 0);
});
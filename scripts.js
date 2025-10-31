// === DADOS DE FALLBACK ===
const fallbackPortfolio = [
  {
    id: 'proj001',
    category: 'E-commerce',
    name: 'FreshMart',
    description:
      'Mercearia online com catálogo de produtos, filtros por categoria e integração com WhatsApp.',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['E-commerce', 'Responsivo', 'JSON'],
    link: '',
  },
  {
    id: 'proj002',
    category: 'Imobiliária',
    name: 'PropertiaBR',
    description:
      'Site para corretora de imóveis com filtros avançados e detalhes de propriedades.',
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['Imóveis', 'Filtros', 'SEO'],
    link: '',
  },
  {
    id: 'proj003',
    category: 'Estética',
    name: 'BeautyStudio',
    description:
      'Site para estúdio de beleza com design em cascata e agendamento online.',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tags: ['Estética', 'Design Único', 'Animações'],
    link: '',
  },
];

const fallbackTestimonials = [
  {
    id: 'test001',
    name: 'Maria Silva',
    role: 'Proprietária - FreshMart',
    rating: 5,
    text: 'Site ficou incrível! Minhas vendas online aumentaram 300% em 2 meses. O Akbar é muito profissional e atencioso.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test002',
    name: 'Dr. Carlos Mendes',
    role: 'Dentista - DentalCare',
    rating: 5,
    text: 'Profissional, rápido e atencioso. Superou todas as expectativas! O site trouxe muitos novos pacientes.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test003',
    name: 'Ana Beatriz',
    role: 'Personal Trainer - FitPower',
    rating: 5,
    text: 'Melhor investimento que fiz para meu negócio. Site lindo e funcional. Recomendo de olhos fechados!',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
];

let portfolio = [];
let testimonials = [];

// === CARREGAR PORTFÓLIO ===
async function loadPortfolio() {
  try {
    const response = await fetch('portfolio.json');

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    portfolio = await response.json();
    console.log(`✅ ${portfolio.length} projetos carregados!`);
  } catch (error) {
    console.warn('⚠️ Usando dados de fallback para portfólio:', error.message);
    portfolio = fallbackPortfolio;
  }

  renderPortfolio();
}

function renderPortfolio() {
  const grid = document.getElementById('portfolioGrid');

  if (portfolio.length === 0) {
    grid.innerHTML = '<div class="loading">Nenhum projeto encontrado.</div>';
    return;
  }

  grid.innerHTML = '';

  portfolio.forEach((project, index) => {
    const item = document.createElement('div');
    item.classList.add('portfolio-item', 'fade-in');
    item.style.animationDelay = `${index * 0.1}s`;

    const tagsHtml = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    item.innerHTML = `
      <img src="${project.image}" alt="${project.name}" loading="lazy">
      <div class="portfolio-info">
        <div class="portfolio-category">${project.category}</div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="portfolio-tags">
          ${tagsHtml}
        </div>
      </div>
    `;

    // Adicionar evento de clique no card inteiro
    if (project.link) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        window.open(project.link, '_blank');
      });
    } else {
      item.style.cursor = 'default';
    }

    grid.appendChild(item);
  });
}

// === CARREGAR DEPOIMENTOS ===
async function loadTestimonials() {
  try {
    const response = await fetch('testimonials.json');

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    testimonials = await response.json();
    console.log(`✅ ${testimonials.length} depoimentos carregados!`);
  } catch (error) {
    console.warn(
      '⚠️ Usando dados de fallback para depoimentos:',
      error.message
    );
    testimonials = fallbackTestimonials;
  }

  renderTestimonials();
}

function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');

  if (testimonials.length === 0) {
    grid.innerHTML = '<div class="loading">Nenhum depoimento encontrado.</div>';
    return;
  }

  grid.innerHTML = '';

  testimonials.forEach((testimonial, index) => {
    const item = document.createElement('div');
    item.classList.add('testimonial-card', 'fade-in');
    item.style.animationDelay = `${index * 0.1}s`;

    const starsHtml = '⭐'.repeat(testimonial.rating);

    item.innerHTML = `
      <div class="stars">${starsHtml}</div>
      <p>"${testimonial.text}"</p>
      <div class="testimonial-author">
        <strong>${testimonial.name}</strong>
        <span>${testimonial.role}</span>
      </div>
    `;

    grid.appendChild(item);
  });
}

// === FORMULÁRIO DE CONTATO ===
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('❌ Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert('❌ Por favor, insira um e-mail válido.');
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = '📤 Enviando...';
      button.disabled = true;

      try {
        const formAction = form.getAttribute('action');
        const isDemoMode =
          !formAction || formAction.includes('SEU_ENDPOINT_AQUI');

        if (isDemoMode) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          alert(
            `✅ Mensagem enviada com sucesso!\n\nNome: ${name}\nEmail: ${email}\n\n⚠️ Para enviar emails reais, configure seu endpoint do Formspree.`
          );
          form.reset();
        } else {
          const formData = new FormData(form);
          const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
          });

          if (response.ok) {
            alert(
              '✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve!'
            );
            form.reset();
          } else {
            throw new Error('Erro ao enviar');
          }
        }
      } catch (error) {
        alert(`❌ Erro: ${error.message}`);
      } finally {
        button.textContent = originalText;
        button.disabled = false;
      }
    });

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.style.borderColor = '#ff6b6b';
        } else if (
          this.type === 'email' &&
          this.value &&
          (!this.value.includes('@') || !this.value.includes('.'))
        ) {
          this.style.borderColor = '#ff6b6b';
        } else {
          this.style.borderColor = '#e0e0e0';
        }
      });
    });
  }
}

// === MÁSCARA DE TELEFONE ===
document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        if (value.length <= 10) {
          value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
      }
      e.target.value = value;
    });
  }
});

// === NAVEGAÇÃO SUAVE ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Atualiza link ativo
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// === SCROLL SPY (atualiza menu ao rolar) ===
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// === BOTÃO VOLTAR AO TOPO ===
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');

  if (!backToTopButton) return;

  // Mostrar/esconder botão ao rolar
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  // Voltar ao topo ao clicar
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', function () {
  loadPortfolio();
  loadTestimonials();
  initContactForm();
  initBackToTop();

  // Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observa elementos para animação
  document
    .querySelectorAll('.service-card, .stat-card, .skill-card')
    .forEach(el => {
      observer.observe(el);
    });
});

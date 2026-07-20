/* ==========================================================================
   GIGA.AI — CLON EDUCATIVO — main.js
   El sitio original usa Framer Motion + Radix UI (ambas exclusivas de React).
   Este archivo reproduce el mismo comportamiento visual en JS vanilla:
   - reveal-on-scroll vía IntersectionObserver (equivalente a whileInView de Framer)
   - dropdowns de navegación (equivalente a Radix NavigationMenu)
   - contador animado, stepper con auto-avance y barra de progreso,
     crossfade de paneles, parallax del hero, marquee (puro CSS).
   ========================================================================== */

/* Diccionario ES/EN — cubre toda la página. El toggle de idioma recorre
   [data-i18n] / [data-i18n-html] / [data-i18n-aria-label] / [data-i18n-tooltip]
   / [data-i18n-alt] y reemplaza cada uno por la entrada correspondiente. */
const I18N = {
  es: {
    page_title: 'Briqia — IA que habla como un humano',
    meta_description: 'Las empresas eligen Briqia por sus agentes de IA que gestionan flujos de trabajo complejos y ofrecen experiencias de cliente similares a las humanas, a gran escala.',
    nav_main: 'Principal',
    nav_product: 'Producto',
    nav_company: 'Empresa',
    seedemo: 'Ver una demo',
    open_menu: 'Abrir menú',
    lang_switch_label: 'Cambiar idioma',
    briqia_home: 'Briqia — inicio',
    hero_badge: 'Briqia lanza Scout',
    hero_title: 'IA aplicada al sector inmobiliario y sus derivados',
    hero_subtitle: 'Agentes de IA para soporte empresarial',
    talk_to_us: 'Hablemos',
    hero_bg_alt: 'Atardecer púrpura y naranja sobre una cordillera, enmarcado por ramas de pino',

    stats_lead: 'Convierte cada consulta inmobiliaria en una venta: la IA califica, da seguimiento y agenda visitas en piloto automático.',
    stat_label_conversion: 'Tasa de conversión',

    canvas_title: 'Agente Briqia',
    dash_search_placeholder: 'Buscar leads…',
    dash_channels: 'Canales',
    dash_all: 'Todos',
    dash_pipeline: 'Pipeline',
    dash_new_leads: 'Nuevos',
    dash_followup: 'En seguimiento',
    dash_scheduled_nav: 'Agendados',
    dash_closed: 'Cerrados',
    dash_unified_inbox: 'Bandeja unificada',
    dash_live: 'EN VIVO',
    time_now: 'ahora',
    time_2min: '2 min',
    time_6min: '6 min',
    time_12min: '12 min',
    convo1_text: 'Hola, me interesa el departamento de 2 ambientes que vi en su web…',
    tag_hot: 'Caliente',
    convo2_text: '¿Tienen disponibilidad para visitar el lote en Nordelta este sábado?',
    tag_new: 'Nuevo',
    convo3_text: 'Quería saber si esta propiedad admite crédito hipotecario.',
    tag_warm: 'Tibio',
    convo4_text: 'Confirmo la visita al departamento del jueves a las 17 hs.',
    tag_scheduled: 'Agendado',
    dash_sub_lucia: 'WhatsApp · interesa depto. 2 ambientes',
    dash_bubble_lucia: 'Hola, me interesa el departamento de 2 ambientes que vi en su web. ¿Tienen disponibilidad?',
    dash_suggestion_label: '⚡ Sugerencia de Briqia',
    dash_suggestion_text: 'Hola Lucía 👋 Sí, tenemos 2 unidades disponibles del departamento de 2 ambientes. ¿Querés que te agende una visita para esta semana?',
    dash_send: 'Enviar',
    dash_edit: 'Editar',
    dash_today: 'Hoy',
    stat_conversations: 'Conversaciones',
    stat_responded: 'Respondidas &lt;1 min',
    stat_scheduled_visits: 'Turnos agendados',
    stat_conversion_vs_month: 'Conversión vs. mes',

    eyebrow_smart_suggestions: 'Sugerencias inteligentes',
    headline_improve: 'Mejora sobre la marcha',
    feat_perf_title: 'Mejora del rendimiento',
    feat_perf_desc: 'Diseñado para ayudarte a alcanzar tus KPIs',
    feat_custom_sugg_title: 'Sugerencias personalizadas',
    feat_custom_sugg_desc: 'Basadas en los requisitos únicos de tu negocio',
    feat_auto_improve_title: 'Mejora automática',
    feat_auto_improve_desc: 'Mejoras de políticas listas para implementar',

    conv_stat1_desc: 'de los compradores elige la primera empresa que le responde, independientemente del precio o la marca.',
    conv_source1: 'Fuente · Website Builder / Vendasta',
    conv_stat2_desc: 'de las ventas requieren entre 5 y 8 contactos antes de cerrar.',
    conv_source2: 'Fuente · Qwilr / Sales Research',
    conv_stat3_desc: 'más conversiones cuando los equipos hacen intentos adicionales de contacto.',
    conv_source3: 'Fuente · Martal / Velocify',
    conv_chart_eyebrow: 'Curva de caída de conversión',
    conv_title_html: 'Cada minuto cuesta una <em>venta</em>.',
    bar1_label: 'Menos de 1 min',
    bar1_flag: '← Donde responde Briqia',
    bar2_label: 'Menos de 5 min',
    bar2_value: 'Base',
    bar3_label: '10 minutos',
    bar4_label: '30 minutos',
    bar5_label: '1 hora o más',
    conv_callout: 'Responder en el primer minuto puede multiplicar conversiones por casi 4× respecto a responder en 5 minutos. Cada minuto que pasa reduce la probabilidad de cierre un 1,5%. — Velocify / Kixie',

    eyebrow_natural_conv: 'Conversación natural',
    headline_empathy: 'Conecta con empatía',
    feat_custom_resp_title: 'Respuestas personalizadas',
    feat_custom_resp_desc: 'Adapta las respuestas de tu agente, según tu marca',
    feat_dyn_interrupt_title: 'Interrupciones dinámicas',
    feat_dyn_interrupt_desc: 'La IA puede ser interrumpida en cualquier momento por asesor humano',
    feat_latency_title: 'Latencia ultrabaja',
    feat_latency_desc: 'Tiempo de velocidad de respuesta líder en el mercado',

    roadmap_title: 'Cómo trabajamos',
    roadmap_desc_html: 'Un proceso claro y sin burocracia, orientado a <em>resultados medibles</em> desde el día uno.',
    step1_title: 'Diagnóstico',
    step1_desc: 'Analizamos tu stack tecnológico, procesos críticos y datos disponibles. Identificamos dónde la IA genera el mayor retorno.',
    step2_title: 'Arquitectura',
    step2_desc: 'Diseñamos la solución técnica: modelos, integraciones, infraestructura y roadmap de implementación. Sin promesas vacías.',
    step3_title: 'Desarrollo',
    step3_desc: 'Implementamos en sprints cortos con entregables tangibles. Prototipo funcional en las primeras dos semanas.',
    step4_title_html: 'Escala &amp; Soporte',
    step4_desc: 'Monitoreamos, iteramos y optimizamos. Tus modelos mejoran con el tiempo y tu equipo queda capacitado.',
    legend1_title: 'Sin burocracia',
    legend1_desc: 'Comunicación directa con los ingenieros que construyen tu solución, no con project managers intermediarios.',
    legend2_title: 'ROI medible',
    legend2_desc: 'Definimos KPIs de negocio desde el inicio. Medimos reducción de costos, tiempo y errores en cada entrega.',
    legend3_title: 'Stack actual',
    legend3_desc: 'Usamos las herramientas enterprise más probadas del mercado: OpenAI, AWS, Databricks, Kubernetes y más.',

    cta_eyebrow: 'Obtén una demo personalizada',
    cta_title: '¿Listo para ver al agente de Briqia en acción?',
    cta_p1: 'Briqia no es solo un agente que contesta. Es un sistema integral que no termina al lograr una agenda:',
    cta_p2: 'Califica a cada lead según su perfil e intención de compra, para posteriormente realizar seguimientos personalizados. Nutre a los prospectos que están fríos y, si se perdieron en la conversación, los reactiva cuando es el momento oportuno. Además, acumula toda la información de cada uno para que tu equipo tome decisiones basadas en datos, no en suposiciones.',
    cta_p3: 'El equipo comercial entra en juego cuando el lead ya está calificado y listo para hablar con una persona.',

    compliance_label: 'Cumplimiento',
    tooltip_soc2: 'Controles de seguridad, disponibilidad y confidencialidad auditados de forma independiente para sistemas SaaS.',
    tooltip_iso42001: 'Estándar de gestión de IA que garantiza un desarrollo y una gobernanza responsables de la inteligencia artificial.',
    tooltip_iso27001: 'Estándar global para la gestión de la seguridad de la información y la protección de datos.',
    aria_instagram: 'Briqia en Instagram',
    aria_linkedin: 'Briqia en LinkedIn',
  },
  en: {
    page_title: 'Briqia — AI that talks like a human',
    meta_description: 'Enterprises choose Briqia for AI agents that manage complex workflows and deliver human-like customer experiences at scale.',
    nav_main: 'Main',
    nav_product: 'Product',
    nav_company: 'Company',
    seedemo: 'See a demo',
    open_menu: 'Open menu',
    lang_switch_label: 'Switch language',
    briqia_home: 'Briqia — home',
    hero_badge: 'Briqia Launches Scout',
    hero_title: 'AI applied to real estate and its related sectors',
    hero_subtitle: 'AI agents for enterprise support',
    talk_to_us: 'Talk to us',
    hero_bg_alt: 'Purple and orange sunset over a mountain range, framed by pine branches',

    stats_lead: 'Turn every real-estate inquiry into a sale: AI qualifies leads, follows up, and books visits on autopilot.',
    stat_label_conversion: 'Conversion rate',

    canvas_title: 'Briqia Agent',
    dash_search_placeholder: 'Search leads…',
    dash_channels: 'Channels',
    dash_all: 'All',
    dash_pipeline: 'Pipeline',
    dash_new_leads: 'New',
    dash_followup: 'Following up',
    dash_scheduled_nav: 'Scheduled',
    dash_closed: 'Closed',
    dash_unified_inbox: 'Unified inbox',
    dash_live: 'LIVE',
    time_now: 'now',
    time_2min: '2 min',
    time_6min: '6 min',
    time_12min: '12 min',
    convo1_text: "Hi, I'm interested in the 2-bedroom apartment I saw on your website…",
    tag_hot: 'Hot',
    convo2_text: 'Do you have availability to visit the lot in Nordelta this Saturday?',
    tag_new: 'New',
    convo3_text: 'I wanted to know if this property qualifies for a mortgage loan.',
    tag_warm: 'Warm',
    convo4_text: "Confirming Thursday's apartment visit at 5 PM.",
    tag_scheduled: 'Scheduled',
    dash_sub_lucia: 'WhatsApp · interested in 2-bedroom apt.',
    dash_bubble_lucia: "Hi, I'm interested in the 2-bedroom apartment I saw on your website. Do you have availability?",
    dash_suggestion_label: '⚡ Briqia suggestion',
    dash_suggestion_text: "Hi Lucía 👋 Yes, we have 2 available units of the 2-bedroom apartment. Want me to schedule a visit for you this week?",
    dash_send: 'Send',
    dash_edit: 'Edit',
    dash_today: 'Today',
    stat_conversations: 'Conversations',
    stat_responded: 'Replied in &lt;1 min',
    stat_scheduled_visits: 'Visits scheduled',
    stat_conversion_vs_month: 'Conversion vs. last month',

    eyebrow_smart_suggestions: 'Smart suggestions',
    headline_improve: 'Improve as you go',
    feat_perf_title: 'Performance boost',
    feat_perf_desc: 'Designed to help you hit your KPIs',
    feat_custom_sugg_title: 'Custom suggestions',
    feat_custom_sugg_desc: "Based on your business's unique requirements",
    feat_auto_improve_title: 'Auto improve',
    feat_auto_improve_desc: 'Ready-to-implement policy improvements',

    conv_stat1_desc: 'of buyers choose the first company that responds to them, regardless of price or brand.',
    conv_source1: 'Source · Website Builder / Vendasta',
    conv_stat2_desc: 'of sales require between 5 and 8 touchpoints before closing.',
    conv_source2: 'Source · Qwilr / Sales Research',
    conv_stat3_desc: 'more conversions when teams make additional contact attempts.',
    conv_source3: 'Source · Martal / Velocify',
    conv_chart_eyebrow: 'Conversion drop-off curve',
    conv_title_html: 'Every minute costs a <em>sale</em>.',
    bar1_label: 'Under 1 min',
    bar1_flag: '← Where Briqia responds',
    bar2_label: 'Under 5 min',
    bar2_value: 'Baseline',
    bar3_label: '10 minutes',
    bar4_label: '30 minutes',
    bar5_label: '1 hour or more',
    conv_callout: 'Responding within the first minute can multiply conversions by nearly 4× compared to responding in 5 minutes. Every minute that passes lowers the odds of closing by 1.5%. — Velocify / Kixie',

    eyebrow_natural_conv: 'Natural conversation',
    headline_empathy: 'Connect with empathy',
    feat_custom_resp_title: 'Custom responses',
    feat_custom_resp_desc: "Adapt your agent's responses to match your brand",
    feat_dyn_interrupt_title: 'Dynamic interrupts',
    feat_dyn_interrupt_desc: 'The AI can be interrupted at any time by a human advisor',
    feat_latency_title: 'Ultra-low latency',
    feat_latency_desc: 'Industry-leading response speed',

    roadmap_title: 'How we work',
    roadmap_desc_html: 'A clear, bureaucracy-free process, focused on <em>measurable results</em> from day one.',
    step1_title: 'Diagnosis',
    step1_desc: 'We analyze your tech stack, critical processes, and available data. We identify where AI delivers the highest return.',
    step2_title: 'Architecture',
    step2_desc: 'We design the technical solution: models, integrations, infrastructure, and an implementation roadmap. No empty promises.',
    step3_title: 'Development',
    step3_desc: 'We implement in short sprints with tangible deliverables. Working prototype within the first two weeks.',
    step4_title_html: 'Scale &amp; Support',
    step4_desc: 'We monitor, iterate, and optimize. Your models improve over time and your team gets trained.',
    legend1_title: 'No bureaucracy',
    legend1_desc: 'Direct communication with the engineers building your solution, not with intermediary project managers.',
    legend2_title: 'Measurable ROI',
    legend2_desc: 'We define business KPIs from the start. We measure cost, time, and error reduction on every delivery.',
    legend3_title: 'Current stack',
    legend3_desc: 'We use the most proven enterprise tools on the market: OpenAI, AWS, Databricks, Kubernetes, and more.',

    cta_eyebrow: 'Get a personalized demo',
    cta_title: 'Ready to see the Briqia agent in action?',
    cta_p1: "Briqia isn't just an agent that replies. It's an end-to-end system that doesn't stop once it books a meeting:",
    cta_p2: "It qualifies every lead by profile and purchase intent, then follows up personally. It nurtures cold prospects and, if they drop out of the conversation, re-engages them at the right moment. It also stores every detail so your team makes decisions based on data, not guesswork.",
    cta_p3: 'The sales team steps in once the lead is qualified and ready to talk to a person.',

    compliance_label: 'Compliant',
    tooltip_soc2: 'Independently audited security, availability, and confidentiality controls for SaaS systems.',
    tooltip_iso42001: 'AI management system standard ensuring responsible AI development and governance.',
    tooltip_iso27001: 'Global standard for information security management and data protection.',
    aria_instagram: 'Briqia on Instagram',
    aria_linkedin: 'Briqia on LinkedIn',
  },
};

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1) ENTRADA DEL LOGO — anima cada letra "B-r-i-q-i-a" con stagger al cargar,
        igual que el original (spans con opacity:0 -> 1 vía JS, no CSS estático).
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.logo-word').forEach((word) => {
    const letters = word.querySelectorAll('.logo-letter');
    letters.forEach((letter, i) => {
      setTimeout(() => letter.classList.add('in'), 150 + i * 60);
    });
  });

  /* ------------------------------------------------------------------------
     2) HEADER — fondo/blur al hacer scroll (el original activa el fondo
        semitransparente del contenedor de navegación cuando bajas de 10px).
     ------------------------------------------------------------------------ */
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ------------------------------------------------------------------------
     3bis) TEMA DEL HEADER SEGÚN LA SECCIÓN VISIBLE
        El original marca las secciones claras con data-nav-theme="light" y
        oscurece el texto del header cuando pasan por debajo de él (si no,
        el logo/nav en blanco quedarían invisibles sobre el fondo blanco del
        spotlight/CTA/footer). Se comprueba qué sección cruza la línea del
        header en cada scroll y se alterna la clase .light en consecuencia.
     ------------------------------------------------------------------------ */
  const themedSections = Array.from(document.querySelectorAll('[data-nav-theme]'));
  const onScrollTheme = () => {
    const probeY = 40; // altura aproximada del centro del header fijo
    let theme = 'dark';
    themedSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom >= probeY) theme = section.dataset.navTheme;
    });
    header.classList.toggle('light', theme === 'light');
  };
  window.addEventListener('scroll', onScrollTheme, { passive: true });
  onScrollTheme();

  /* ------------------------------------------------------------------------
     3) MENÚ MÓVIL
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  /* ------------------------------------------------------------------------
     3bis) SELECTOR DE IDIOMA (ES/EN)
        Recorre [data-i18n] (textContent), [data-i18n-html] (innerHTML, para
        el <h1> con <br>) y [data-i18n-aria-label] / [data-i18n-tooltip]
        (atributos), y los reemplaza por la entrada correspondiente del
        diccionario I18N. El idioma elegido se recuerda en localStorage.
     ------------------------------------------------------------------------ */
  function applyLanguage(lang) {
    const dict = I18N[lang];
    document.documentElement.lang = lang;

    if (dict.page_title) document.title = dict.page_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.meta_description) metaDesc.setAttribute('content', dict.meta_description);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-i18n-tooltip]').forEach((el) => {
      const key = el.getAttribute('data-i18n-tooltip');
      if (dict[key] !== undefined) el.setAttribute('data-tooltip', dict[key]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key] !== undefined) el.setAttribute('alt', dict[key]);
    });

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    localStorage.setItem('briqia-lang', lang);
  }

  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });
  applyLanguage(localStorage.getItem('briqia-lang') || 'es');

  /* ------------------------------------------------------------------------
     4) REVEAL ON SCROLL — equivalente vanilla de:
          <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} />
        Un único IntersectionObserver observa todos los bloques marcados con
        [data-reveal] y añade la clase .is-in la primera vez que entran en viewport.
     ------------------------------------------------------------------------ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     5) CONTADORES ANIMADOS (Deflection rate, Supported languages, DWR rate)
        El HTML original de giga.ai renderiza 90/90 en el servidor pero las
        capturas muestran 98%/99 tras hidratar: confirma un count-up disparado
        al entrar en viewport. Se reproduce con requestAnimationFrame + easing.
     ------------------------------------------------------------------------ */
  function animateCount(el) {
    const target = parseInt(el.dataset.countTo, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count-to]').forEach((el) => countObserver.observe(el));

  /* ------------------------------------------------------------------------
     5bis) DASHBOARD "BANDEJA UNIFICADA" (panel de Agent Canvas, recreado a
        partir de pro.png). La imagen original es estática, así que se anima:
        - las filas de conversación entran con stagger al revelarse
        - la sugerencia de IA simula "escribiendo…" y vuelve a mostrar el
          mensaje en loop, para sugerir que Briqia la redacta en tiempo real
     ------------------------------------------------------------------------ */
  const dashWindow = document.querySelector('.dash-window');
  if (dashWindow) {
    const dashObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          dashObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    dashObserver.observe(dashWindow);
  }

  const dashSuggestion = document.getElementById('dashSuggestion');
  if (dashSuggestion) {
    setInterval(() => {
      dashSuggestion.classList.add('is-typing');
      setTimeout(() => dashSuggestion.classList.remove('is-typing'), 1400);
    }, 6000);
  }

  /* ------------------------------------------------------------------------
     6) PARALLAX DEL HERO — el CSS de producción define @keyframes
        hero-parallax-drift (translateY 0 -> -200px). Se aplica aquí como
        parallax ligado al scroll: el fondo se desplaza más lento que la página.
     ------------------------------------------------------------------------ */
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.25;
      heroBg.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     7) CÓMO TRABAJAMOS — panel animado (antes el waveform de Voice Experience).
        Recorre los 4 pasos en loop: marca como "hecho" los anteriores al
        activo, resalta el activo (nodo con pulso celeste) y anima el
        relleno de la línea conectora, todo en la misma paleta azul/celeste.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-roadmap]').forEach((roadmap) => {
    const steps = Array.from(roadmap.querySelectorAll('.roadmap-step'));
    const interval = parseInt(roadmap.dataset.interval, 10) || 3200;
    let current = 0;

    function setStep(index) {
      current = index;
      steps.forEach((step, i) => {
        step.classList.toggle('is-done', i < index);
        step.classList.toggle('is-active', i === index);
      });
    }

    const roadmapObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStep(0);
          setInterval(() => setStep((current + 1) % steps.length), interval);
          roadmapObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    roadmapObserver.observe(roadmap);
  });
});

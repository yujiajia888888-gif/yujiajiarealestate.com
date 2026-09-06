(() => {
  const id = 'G-722YWJFNCV';
  const key = 'jy-analytics-consent';
  const panel = document.querySelector('[data-analytics-panel]');
  const settings = document.querySelector('[data-analytics-settings]');
  if (!panel || !settings) return;
  let choice;
  let loaded = false;
  let viewed = false;
  try { choice = localStorage.getItem(key); } catch { /* Private browsing may block storage. */ }
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const consent = (value) => ({ analytics_storage: value, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'default', consent('denied'));
  // The site is a single landing page. Never send form values, URL parameters or fragments.
  const page = { page_location: 'https://yujiajiarealestate.ca/', page_title: 'Jiajia Yu Real Estate', page_referrer: '' };
  try { page.page_referrer = new URL(document.referrer).origin + '/'; } catch { /* Direct visit. */ }
  const send = (name, details = {}) => {
    if (choice === 'granted') window.gtag('event', name, { ...page, ...details });
  };
  const enable = () => {
    // Keep local previews and copied deployments out of the production property.
    if (window.location.origin !== 'https://yujiajiarealestate.ca') return;
    window['ga-disable-' + id] = false;
    window.gtag('consent', 'update', consent('granted'));
    if (!loaded) {
      loaded = true;
      window.gtag('js', new Date());
      window.gtag('config', id, { ...page, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      script.referrerPolicy = 'origin';
      document.head.appendChild(script);
    }
    if (!viewed) { send('page_view'); viewed = true; }
  };
  const select = (value) => {
    choice = value;
    try { localStorage.setItem(key, value); } catch { /* Still honor this visit's choice. */ }
    if (value === 'granted') enable();
    else {
      window['ga-disable-' + id] = true;
      window.gtag('consent', 'update', consent('denied'));
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ['', '; domain=yujiajiarealestate.ca', '; domain=.yujiajiarealestate.ca']) {
          document.cookie = name + '=; Max-Age=0; path=/' + domain;
        }
      }
    }
    panel.hidden = true;
    settings.focus();
  };
  document.querySelector('[data-analytics-accept]').addEventListener('click', () => select('granted'));
  document.querySelector('[data-analytics-decline]').addEventListener('click', () => select('denied'));
  settings.addEventListener('click', () => { panel.hidden = false; document.querySelector('[data-analytics-decline]').focus(); });
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    const href = link?.getAttribute('href') || '';
    if (href.startsWith('tel:')) send('contact_click', { contact_method: 'phone' });
    if (href.startsWith('mailto:')) send('contact_click', { contact_method: 'email' });
    const service = link?.getAttribute('data-exp-intent');
    if (['listings', 'valuation', 'contact'].includes(service)) send('exp_portal_click', { service });
  });
  document.querySelector('[data-contact-form]')?.addEventListener('submit', () => send('email_draft_opened'));
  const copy = {
    en: { title: 'Your privacy choices', text: 'With your permission, we use Google Analytics cookies to measure visits and contact-button clicks. Google receives usage and device data. We do not send your name, email address or message to Analytics. Optional analytics is off until you accept. You can change your choice below at any time.', accept: 'Allow analytics', decline: 'Decline analytics', settings: 'Privacy & analytics choices', more: 'How Google uses data', note: 'Your choice is stored in this browser. Questions: Yujiajia0514@hotmail.com. The contact form opens your own email app; it does not submit a message to this website.' },
    fr: { title: 'Vos choix de confidentialité', text: 'Avec votre permission, nous utilisons les témoins Google Analytics pour mesurer les visites et les clics de contact. Google reçoit des données d’utilisation et d’appareil. Nous ne transmettons pas votre nom, adresse courriel ou message à Analytics. Les statistiques facultatives restent désactivées avant votre accord. Vous pouvez modifier votre choix à tout moment.', accept: 'Accepter les statistiques', decline: 'Refuser les statistiques', settings: 'Confidentialité et statistiques', more: 'Utilisation des données par Google', note: 'Votre choix est enregistré dans ce navigateur. Questions : Yujiajia0514@hotmail.com. Le formulaire ouvre votre application courriel; il ne transmet pas de message à ce site.' },
    zh: { title: '你的隐私选择', text: '经你同意后，我们才使用 Google Analytics Cookie 统计网站访问和联系按钮点击。Google 会接收使用情况及设备数据；我们不会将你的姓名、邮箱或留言发送给 Analytics。默认关闭可选统计，你可以随时修改选择。', accept: '允许统计', decline: '拒绝统计', settings: '隐私与统计设置', more: 'Google 如何使用数据', note: '选择保存在此浏览器。隐私问题可联系 Yujiajia0514@hotmail.com。联系表单只打开你自己的邮件应用，不会向本网站提交留言。' }
  };
  const translate = () => {
    const lang = document.documentElement.lang.slice(0, 2);
    const text = copy[lang] || copy.en;
    for (const [name, value] of Object.entries(text)) {
      document.querySelectorAll('[data-privacy-text="' + name + '"]').forEach(el => { el.textContent = value; });
    }
  };
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  translate();
  panel.hidden = choice === 'granted' || choice === 'denied';
  if (choice === 'granted') enable();
})();

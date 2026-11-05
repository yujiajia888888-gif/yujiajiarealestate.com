(() => {
  const forms = document.querySelectorAll('[data-inquiry-form]');
  const origin = 'https://yujiajiarealestate.ca';
  const projects = ['buyer', 'seller', 'commercial'];
  const copy = {
    en: { title:'Tell Jiajia about your project', intro:'Send your inquiry here. Jiajia Yu will reply using the contact details you provide.', name:'Name', email:'Email', phone:'Phone (optional)', project:'Your project', choose:'Choose one', buyer:'Buying a property', seller:'Selling a property', commercial:'Commercial property', area:'Area (optional)', timeline:'Timeline (optional)', message:'Your needs', consent:'I agree that Jiajia Yu may use these details to respond to this inquiry by email or phone.', note:'Your inquiry is processed by Web3Forms and forwarded to Jiajia Yu. Please do not send identity documents or financial records.', privacy:'Privacy details', submit:'Send inquiry', sending:'Sending…', success:'Your inquiry has been submitted. Jiajia will reply using your contact details.', error:'We could not confirm submission. Your entries are still here. Please try again or contact Jiajia directly.', pending:'Online sending is not ready yet. Please contact Jiajia directly by email or phone.', invalid:'Please complete the required fields and agree to contact about this inquiry.' },
    fr: { title:'Présentez votre projet à Jiajia', intro:'Envoyez votre demande ici. Jiajia Yu vous répondra aux coordonnées fournies.', name:'Nom', email:'Courriel', phone:'Téléphone (facultatif)', project:'Votre projet', choose:'Choisir', buyer:'Achat immobilier', seller:'Vente immobilière', commercial:'Immobilier commercial', area:'Secteur (facultatif)', timeline:'Échéancier (facultatif)', message:'Vos besoins', consent:'J’accepte que Jiajia Yu utilise ces renseignements pour répondre à cette demande par courriel ou téléphone.', note:'Votre demande est traitée par Web3Forms et transmise à Jiajia Yu. N’envoyez pas de pièces d’identité ni de documents financiers.', privacy:'Confidentialité', submit:'Envoyer la demande', sending:'Envoi…', success:'Votre demande a été soumise. Jiajia vous répondra aux coordonnées fournies.', error:'Nous ne pouvons pas confirmer l’envoi. Vos renseignements restent dans le formulaire. Réessayez ou contactez Jiajia directement.', pending:'L’envoi en ligne n’est pas encore prêt. Contactez Jiajia directement par courriel ou téléphone.', invalid:'Remplissez les champs obligatoires et acceptez d’être contacté au sujet de cette demande.' },
    zh: { title:'告诉 Jiajia 你的地产需求', intro:'直接在这里提交咨询，Jiajia Yu 会通过你提供的联系方式回复。', name:'姓名', email:'邮箱', phone:'电话（选填）', project:'咨询类型', choose:'请选择', buyer:'买房', seller:'卖房', commercial:'商业地产', area:'区域（选填）', timeline:'时间安排（选填）', message:'你的需求', consent:'我同意 Jiajia Yu 使用以上资料，通过邮件或电话回复本次咨询。', note:'咨询资料由 Web3Forms 处理并转发给 Jiajia Yu。首次咨询请勿发送身份证件或银行、财务文件。', privacy:'隐私说明', submit:'提交咨询', sending:'正在提交…', success:'你的咨询已提交。Jiajia 会通过你提供的联系方式回复。', error:'暂时无法确认提交成功，填写内容仍保留在页面上。请重试，或直接通过邮件、电话联系 Jiajia。', pending:'在线发送暂未就绪，请先通过邮件或电话直接联系 Jiajia。', invalid:'请填写必填项，并同意接收本次咨询的回复。' }
  };
  const language = () => Object.hasOwn(copy, document.documentElement.lang.slice(0,2)) ? document.documentElement.lang.slice(0,2) : 'en';
  for (const form of forms) {
    let busy = false;
    let dirty = false;
    let statusKey = '';
    const status = form.querySelector('[data-inquiry-status]');
    const button = form.querySelector('[type="submit"]');
    const render = () => {
      const words = copy[language()];
      form.querySelectorAll('[data-inquiry-text]').forEach(el => { el.textContent = words[el.dataset.inquiryText] || ''; });
      button.textContent = words[busy ? 'sending' : 'submit'];
      status.textContent = statusKey ? words[statusKey] : '';
      const languageInput = form.querySelector('[name="language"]');
      if (languageInput) languageInput.value = language();
    };
    const setStatus = key => { statusKey = key; render(); };
    form.addEventListener('input',()=>{dirty=true;});
    form.addEventListener('change',()=>{dirty=true;});
    form.addEventListener('reset',()=>{dirty=false;});
    window.addEventListener('beforeunload',event=>{
      if (dirty) { event.preventDefault();event.returnValue=''; }
    });
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (busy) return;
      const data = new FormData(form);
      const get = (name, limit) => String(data.get(name) || '').trim().slice(0,limit);
      const project = get('project',20);
      if (!form.reportValidity() || get('contact_consent',10) !== 'yes' || !projects.includes(project) || get('botcheck',20)) {
        setStatus('invalid'); return;
      }
      const accessKey=get('access_key',80);
      if (!/^[a-f0-9-]{36}$/i.test(accessKey)) { setStatus('pending'); return; }
      const payload = {
        name:get('name',120),email:get('email',254),phone:get('phone',40),project,
        area:get('area',160),timeline:get('timeline',120),message:get('message',2000),
        contact_consent:'Contact about this inquiry only',language:language(),
        access_key:accessKey,subject:`Website inquiry — ${project}`,from_name:'Jiajia Yu Real Estate',website:origin+'/',botcheck:false
      };
      const route = /^\/(?:$|(?:fr|en|zh)-(?:home-evaluation|buy-property|commercial-real-estate)\.html$|fr-courtier-immobilier-(?:brossard|montreal|rive-sud)\.html$)/;
      payload.page = origin + (route.test(window.location.pathname) ? window.location.pathname : '/');
      const query = new URLSearchParams(window.location.search);
      const raw = query.get('utm_source');
      const source = ({ig:'instagram',fb:'facebook'})[raw] || raw;
      const mediums = {wechat:'organic_social',instagram:'organic_social',facebook:'organic_social',google:'organic'};
      const medium = query.get('utm_medium');
      if (Object.hasOwn(mediums,source) && (medium === mediums[source] || (['instagram','facebook'].includes(source) && medium==='social'))) {
        payload.source=source;payload.medium=mediums[source];
        const campaign=query.get('utm_campaign');
        if (['always-on','seller','buyer','commercial','business-profile','wechat-moments-buyer','wechat-moments-seller','wechat-moments-commercial','wechat-chat-buyer','wechat-chat-seller','wechat-chat-commercial'].includes(campaign)) payload.campaign=campaign;
      }
      busy=true;button.disabled=true;setStatus('');
      const controls=Array.from(form.querySelectorAll('input,select,textarea'));
      const priorDisabled=controls.map(control=>control.disabled);
      controls.forEach(control=>{control.disabled=true;});
      const controller = new AbortController();
      const timeout=setTimeout(()=>controller.abort(),20000);
      try {
        const response=await fetch('https://api.web3forms.com/submit',{
          method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
          body:JSON.stringify(payload),credentials:'omit',referrerPolicy:'origin',redirect:'error',signal:controller.signal
        });
        if (!response.ok) throw Error('relay rejected');
        const result=await response.json();
        if (/activat|confirm.{0,30}(?:form|email)|verif.{0,30}email/i.test(String(result.message || ''))) { setStatus('pending'); return; }
        if (!(result.success === true || result.success === 'true')) throw Error('not accepted');
        form.reset();setStatus('success');
        document.dispatchEvent(new CustomEvent('jy-inquiry-submitted',{detail:{segment:project}}));
      } catch { setStatus('error'); }
      finally { clearTimeout(timeout);controls.forEach((control,index)=>{control.disabled=priorDisabled[index];});busy=false;button.disabled=false;render(); }
    });
  }
})();

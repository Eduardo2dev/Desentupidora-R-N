// Basic interactivity: form validation, accordion, phone mask, cookie
document.addEventListener('DOMContentLoaded', function() {
  // Accordion
  document.querySelectorAll('.accordion').forEach(function(btn){
    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if(panel){
        if(expanded){ panel.hidden = true; }
        else { panel.hidden = false; }
      }
    });
  });

  // Form validation + mailto fallback
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    if(!name || !phone || !service){
      alert('Por favor preencha Nome, Telefone e Serviço.');
      return;
    }
    const subject = encodeURIComponent('Solicitação de orçamento - ' + service);
    const body = encodeURIComponent('Nome: ' + name + '\\nTelefone: ' + phone + '\\nServiço: ' + service + '\\nMensagem: ' + form.message.value);
    // mailto fallback
    window.location.href = 'mailto:{EMAIL}?subject='+subject+'&body='+body;
  });

  // Open WhatsApp helper
  window.openWhatsApp = function(topic){
    const text = encodeURIComponent('Olá, preciso de um orçamento: ' + topic);
    window.open('https://wa.me/{WHATSAPP}?text=' + text, '_blank');
  };

  window.openWhatsAppFromForm = function(){
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value || 'Orçamento';
    const text = encodeURIComponent('Olá, meu nome é ' + name + '. Preciso de: ' + service + '. Telefone: ' + phone);
    window.open('https://wa.me/{WHATSAPP}?text=' + text, '_blank');
  };

  // Simple phone mask (Brazilian-ish)
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e){
    let v = e.target.value.replace(/\D/g,'');
    if(v.length > 11) v = v.slice(0,11);
    if(v.length <= 2) v = v;
    else if(v.length <= 6) v = v.replace(/(\d{2})(\d+)/,'($1) $2');
    else if(v.length <= 10) v = v.replace(/(\d{2})(\d{4})(\d+)/,'($1) $2-$3');
    else v = v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    e.target.value = v;
  });

  // Cookie notice
  const cookie = document.getElementById('cookie');
  if(!localStorage.getItem('cookieAccepted')){ cookie.style.display = 'flex'; }
  window.acceptCookie = function(){ localStorage.setItem('cookieAccepted','1'); cookie.style.display='none'; };

  // Accessibility: focus outlines for keyboard users (simple)
  document.body.addEventListener('keydown', function(e){
    if(e.key === 'Tab'){ document.body.classList.add('user-is-tabbing'); }
  });
});

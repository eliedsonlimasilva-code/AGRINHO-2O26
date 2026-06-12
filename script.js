document.addEventListener('DOMContentLoaded', () => {
    initContadorAnimado();
    initFiltroSustentavel();
    initValidacaoFormulario();
});

// 1. ANIMAÇÃO DE NÚMEROS (Contador de Impacto)
function initContadorAnimado() {
    const contadores = document.querySelectorAll('.numero-impacto');
    
    contadores.forEach(contador => {
        const alvo = +contador.getAttribute('data-target');
        if(alvo === 0) return; // Trata o caso do "0% de desperdício"

        const atualizar = () => {
            const atual = +contador.innerText;
            const incremento = alvo / 100;

            if(atual < alvo) {
                contador.innerText = Math.ceil(atual + incremento);
                setTimeout(atualizar, 20);
            } else {
                contador.innerText = alvo;
            }
        };
        atualizar();
    });
}

// 2. FILTRO DINÂMICO DOS PILARES
function initFiltroSustentavel() {
    const botoes = document.querySelectorAll('.btn-filtro');
    const cards = document.querySelectorAll('.card-pilar');

    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            botoes.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            const categoria = botao.getAttribute('data-categoria');

            cards.forEach(card => {
                const catCard = card.getAttribute('data-categoria');
                if(categoria === 'todos' || categoria === catCard) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 3. VALIDAÇÃO DO FORMULÁRIO COM TOAST ALERTA
function initValidacaoFormulario() {
    const form = document.querySelector('#form-agro');
    if(!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio com sucesso
        const alerta = document.createElement('div');
        alerta.innerText = "Sua semente foi plantada! Ideia enviada com sucesso 🌱";
        alerta.style.cssText = "position:fixed; bottom:20px; right:20px; background:#2E7D32; color:white; padding:15px 25px; border-radius:8px; font-weight:bold; box-shadow: 0 4px 10px rgba(0,0,0,0.2); z-index:9999;";
        
        document.body.appendChild(alerta);
        form.reset();

        setTimeout(() => alerta.remove(), 4000);
    });
}
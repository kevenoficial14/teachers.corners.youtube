// Função para alternar canais na TV
function switchChannel(channelId) {
    // Remover classe ativa de todos os canais
    document.querySelectorAll('.tv-channel').forEach(channel => {
        channel.classList.remove('active');
    });
    
    // Remover classe ativa de todos os botões
    document.querySelectorAll('.channel-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Adicionar classe ativa ao canal atual
    const currentChannel = document.getElementById(channelId);
    if (currentChannel) {
        currentChannel.classList.add('active');
        
        // Mostrar estática por um breve momento durante a troca
        const staticEl = document.querySelector('.tv-static');
        staticEl.style.display = 'block';
        setTimeout(() => {
            staticEl.style.display = 'none';
        }, 400);
    }
    
    // Adicionar classe ativa ao botão correspondente
    document.querySelector(`.channel-button[data-channel="${channelId}"]`).classList.add('active');
}

// Alternar TV ligada/desligada
function toggleTV() {
    const tvScreen = document.getElementById('tvScreen');
    const tvOff = document.getElementById('tvOff');
    const channelSelector = document.getElementById('channelSelector');
    const tvStatic = document.querySelector('.tv-static');
    
    if (tvScreen.classList.contains('tv-turned-off')) {
        // Ligar a TV
        tvScreen.classList.remove('tv-turned-off');
        tvOff.style.display = 'none';
        channelSelector.style.opacity = '1';
        channelSelector.style.pointerEvents = 'auto';
        
        // Efeito de ligar
        tvStatic.style.display = 'block';
        
        // Mostrar o canal atual depois de um breve atraso
        setTimeout(() => {
            // Selecionar o canal ativo
            const activeChannel = document.querySelector('.channel-button.active');
            const channelId = activeChannel ? activeChannel.getAttribute('data-channel') : 'portuguese';
            
            // Alternar para esse canal
            switchChannel(channelId);
            tvStatic.style.display = 'none';
        }, 800);
    } else {
        // Desligar a TV
        tvScreen.classList.add('tv-turned-off');
        document.querySelectorAll('.tv-channel').forEach(channel => {
            channel.classList.remove('active');
        });
        tvOff.style.display = 'flex';
        channelSelector.style.opacity = '0.5';
        channelSelector.style.pointerEvents = 'none';
        tvStatic.style.display = 'none';
    }
}

// Atualizar data
function updateDate() {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('pt-BR', options);
    document.getElementById('lastUpdate').textContent = formattedDate;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    
    // Definir o canal inicial
    switchChannel('portuguese');
    
    // Adicionar event listeners para os botões de canal
    document.querySelectorAll('.channel-button').forEach(button => {
        button.addEventListener('click', () => {
            const channelId = button.getAttribute('data-channel');
            switchChannel(channelId);
        });
    });
    
    // Adicionar event listener para o botão de ligar/desligar
    document.getElementById('tvPower').addEventListener('click', toggleTV);
    
    // Iniciar com a TV ligada
    const tvScreen = document.getElementById('tvScreen');
    const tvOff = document.getElementById('tvOff');
    tvScreen.classList.remove('tv-turned-off');
    tvOff.style.display = 'none';
    
    // Atualizar o ano no rodapé
    document.querySelector('.copyright-year').textContent = new Date().getFullYear();
});

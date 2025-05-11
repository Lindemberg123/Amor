addEventListenerventListenerst DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1371268662455046144/M0wBYcUhZZdJwABc_6PnWlDrfGHxJrDFB-5FR3poMsk8o4EL86aUGa9mr1FD9HtUrczC';

let hasClicked = false;

document.getElementById('loveButton').addEventListener('click', function() {
  if (!hasClicked) {
    hasClicked = true;
    this.style.display = 'none';
    document.getElementById('message').classList.remove('hidden');
  } else {
    alert('Parece que algum erro aconteceu enquanto clicava... 💔');
  }
});

async function sendToDiscord(answer) {
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Resposta ao pedido de namoro: ${answer}`
      })
    });
  } catch (error) {
    console.error('Erro ao enviar para Discord:', error);
  }
}

function formatTimeDifference(startDate) {
  const now = new Date();
  const diff = now - startDate;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  let timeString = '';
  if (days > 0) timeString += `${days} dias, `;
  if (remainingHours > 0 || days > 0) timeString += `${remainingHours} horas, `;
  if (remainingMinutes > 0 || remainingHours > 0 || days > 0) timeString += `${remainingMinutes} minutos, `;
  timeString += `${remainingSeconds} segundos`;
  
  return timeString;
}

document.querySelectorAll('.answer-btn').forEach(button => {
  button.addEventListener('click', async function() {
    const answer = this.classList.contains('yes') ? 'SIM' : 'NÃO';
    await sendToDiscord(answer);
    
    if (answer === 'SIM') {
      localStorage.setItem('relationshipStart', new Date().toISOString());
    }
    
    document.getElementById('message').classList.add('hidden');
    const finalMessage = document.getElementById('final-message');
    finalMessage.classList.remove('hidden');
    
    if (answer === 'SIM') {
      const startDate = new Date(localStorage.getItem('relationshipStart'));
      const timeElement = document.createElement('p');
      timeElement.textContent = `Tempo de relacionamento: ${formatTimeDifference(startDate)}`;
      finalMessage.appendChild(timeElement);
      
      // Atualizar o tempo a cada segundo
      setInterval(() => {
        timeElement.textContent = `Tempo de relacionamento: ${formatTimeDifference(startDate)}`;
      }, 1000);
    }
  });
});

// Verificar se já existe um relacionamento ao carregar a página
window.addEventListener('load', () => {
  const startDateStr = localStorage.getItem('relationshipStart');
  if (startDateStr) {
    document.getElementById('message').classList.add('hidden');
    const finalMessage = document.getElementById('final-message');
    finalMessage.classList.remove('hidden');
    
    const startDate = new Date(startDateStr);
    const timeElement = document.createElement('p');
    timeElement.textContent = `Tempo de relacionamento: ${formatTimeDifference(startDate)}`;
    finalMessage.appendChild(timeElement);
    
    setInterval(() => {
      timeElement.textContent = `Tempo de relacionamento: ${formatTimeDifference(startDate)}`;
    }, 60000);
  }
});

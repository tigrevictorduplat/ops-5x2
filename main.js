/* Ops5x2 — comportamento: tema, parallax suave, listas e formulários (demo). */
const $=s=>document.querySelector(s);
const cell=(off,t)=>`<div class="cell${off?' is-off':''}">${t}</div>`;
const item=(t,d)=>({t,d});

/* Tema claro/escuro (lembra a escolha) */
$('#theme-toggle').onclick=()=>{const d=document.body.classList.contains('t-dark')?'light':'dark';document.body.className='t-'+d;try{localStorage.setItem('ops-theme',d)}catch(e){}};

/* Parallax com inércia: o mouse define o alvo, a posição "persegue" devagar.
   Ajuste a suavidade em SMOOTH (menor = mais lento). A profundidade de cada forma (--d) fica no CSS. */
const SMOOTH=.04,shapes=$('#shapes');
let mx=0,my=0,tx=0,ty=0,raf=0;
const step=()=>{mx+=(tx-mx)*SMOOTH;my+=(ty-my)*SMOOTH;shapes.style.setProperty('--mx',mx);shapes.style.setProperty('--my',my);raf=Math.abs(tx-mx)<.0004&&Math.abs(ty-my)<.0004?0:requestAnimationFrame(step)};
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)addEventListener('mousemove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5;if(!raf)raf=requestAnimationFrame(step)});

/* Conteúdo repetido */
const days='SQTQSSD'.split('');
$('#week').innerHTML=days.map(l=>`<div>${l}</div>`).join('')+days.map((l,i)=>i==1||i==4?cell(1,'•'):cell(0,'8h')).join('');
$('#crew').innerHTML=['M','J','A','R'].map(l=>`<span class="avatar">${l}</span>`).join('');
$('#sim-grid').innerHTML=Array.from({length:20},(_,i)=>i%5===(Math.floor(i/5)*2+2)%5?cell(1,'•'):cell(0,'8h')).join('');
const bar=n=>Array.from({length:10},(_,i)=>`<i${i<n?' class="on"':''}></i>`).join('');
$('#pains').innerHTML=[
['M22 17l-8.5-8.5-5 5L2 7M16 17h6v-6','Rotatividade','Custo de demitir e contratar a cada 4 meses. O treinamento nunca chega a se pagar.','Custo médio por desligamento','R$ 4.200',3],
['M12 6v6l4 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z','Ociosidade','Pagar salários para a equipe ficar parada em dias e turnos de baixa demanda.','Turnos sem demanda real','38%',4],
['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Passivo Trabalhista','Horas extras descontroladas, intervalos fora da regra e processos trabalhistas.','Risco por ação trabalhista','5 dígitos',8]
].map(p=>`<div class="card pain-card"><div class="pain-head"><span class="icon-box"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${p[0]}"/></svg></span><h3 class="pain-title">${p[1]}</h3></div><p class="muted pain-text">${p[2]}</p><div class="metric"><div class="eyebrow eyebrow--muted eyebrow--sm">${p[3]}</div><b class="metric-value">${p[4]}</b><div class="metric-bar">${bar(p[5])}</div></div></div>`).join('');
const checks=l=>l.map(x=>`<div class="check"><span class="check-icon"></span><span><b>${x.t}</b><p class="muted">${x.d}</p></span></div>`).join('');
$('#method').innerHTML=checks([item('Engenharia de Demanda','Alinhe demanda e margem e reduza a complexidade da operação sem perder receita.'),item('Matriz de Polivalência (Cross-Training)','Cada função com pelo menos duas pessoas aptas — a base para liberar folgas.'),item('3 Modelos Prontos de Escala 5x2','Aplique em varejo, serviços, indústria e equipes de alto volume.')]);
$('#software').innerHTML=checks([item('Simulador de Viabilidade Financeira','Veja o custo da nova escala antes de implantar — com a folha atual como base.'),item('Gerador Automático de Escalas','Monte a semana inteira respeitando folgas, funções e limites legais.'),item('Painel de Redução de Turnos Ociosos','Compare demanda real com equipe alocada e enxugue o que sobra.')]);
$('#program').innerHTML=['Validação de problema','Mentoria com especialistas','Rede de empresas parceiras'].map(t=>`<div class="check"><span class="check-icon"></span><span>${t}</span></div>`).join('');

/* Formulários — modo demonstração: nada é enviado */
document.querySelectorAll('.lead').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.reset();f.querySelector('.form-status').textContent='Obrigado! (Demonstração: nenhum dado foi enviado.)'}));

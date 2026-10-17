'use strict';
/* EventFlow Studio: PUBLIC DEMO ONLY.
   No network calls, company credentials, live accounts or production data. */
(function () {
  const KEY = 'eventflow-studio-public-demo-v2';
  const TODAY = new Date();
  const seed = () => ({
    events: [
      {id:101,name:'Aurora Music Festival',date:'2026-11-06',venue:'North Hall · Fictional',type:'Festival',status:'Confirmed',budget:12500,accent:'#ff7680'},
      {id:102,name:'Beyond the Curtain',date:'2026-11-14',venue:'Central Theatre · Fictional',type:'Theatre',status:'In production',budget:6700,accent:'#8b8dff'},
      {id:103,name:'Prisma Tech Summit',date:'2026-11-20',venue:'Agora Centre · Fictional',type:'Corporate',status:'Confirmed',budget:9200,accent:'#54c7d2'},
      {id:104,name:'Midnight Sessions',date:'2026-10-28',venue:'Studio 03 · Fictional',type:'Concert',status:'Confirmed',budget:4100,accent:'#e7a56c'},
      {id:105,name:'Atlas Product Launch',date:'2026-12-05',venue:'Design District · Fictional',type:'Corporate',status:'Draft',budget:7800,accent:'#a888ff'},
      {id:106,name:'Summer Lights',date:'2026-09-27',venue:'The Riverside · Fictional',type:'Festival',status:'Completed',budget:11200,accent:'#59d7ad'}
    ],
    crew:[
      {id:201,name:'Alex Rivera',role:'Sound engineer',location:'Valencia',availability:'Available',color:'#c77a83'},
      {id:202,name:'Sam Moreno',role:'Lighting designer',location:'Valencia',availability:'Available',color:'#8785d4'},
      {id:203,name:'Noa Vega',role:'Stage technician',location:'Castellón',availability:'Busy',color:'#7bb9a1'},
      {id:204,name:'Leo Torres',role:'Video operator',location:'Valencia',availability:'Available',color:'#cda779'},
      {id:205,name:'Maya Collins',role:'Production manager',location:'Alicante',availability:'Busy',color:'#bc84b2'},
      {id:206,name:'Jamie Brooks',role:'Audio technician',location:'Valencia',availability:'Available',color:'#76a1d5'}
    ],
    jobs:[
      {id:301,eventId:101,crewId:201,role:'FOH',hours:10,rate:24,paid:120},
      {id:302,eventId:101,crewId:202,role:'Lighting console',hours:10,rate:22,paid:0},
      {id:303,eventId:101,crewId:203,role:'Stage build',hours:9,rate:19,paid:171},
      {id:304,eventId:102,crewId:204,role:'Video playback',hours:8,rate:22,paid:0},
      {id:305,eventId:102,crewId:205,role:'Stage management',hours:9,rate:28,paid:80},
      {id:306,eventId:103,crewId:201,role:'System engineer',hours:8,rate:25,paid:0},
      {id:307,eventId:104,crewId:206,role:'Monitors',hours:7,rate:22,paid:154},
      {id:308,eventId:106,crewId:202,role:'Lighting',hours:9,rate:22,paid:198}
    ],
    history:[{at:'2026-10-17',message:'Public demo initialized with fictional data',kind:'system'}]
  });
  const ui={page:'overview',search:'',filter:'All',modal:null,month:10,year:2026,toast:''};
  const ICON={
    dashboard:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m2 10v-2a5 5 0 0 0-3-4.6"/>',
    brief:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18m-11-2v4h4v-4"/>',
    chart:'<path d="M3 3v18h18M7 16l4-5 4 3 5-8"/>',
    history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l4 3"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    arrow:'<path d="M5 12h14m-7-7 7 7-7 7"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    left:'<path d="m15 18-6-6 6-6"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    wallet:'<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M16 13h5M4 8h17"/>',
    shield:'<path d="m12 22 7-4V6l-7-4-7 4v12z"/><path d="m9 12 2 2 4-4"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 1.3 1-2 3.4-1.5-.6a9 9 0 0 1-2.2 1.2l-.3 1.6h-4l-.3-1.6a9 9 0 0 1-2.2-1.2l-1.5.6-2-3.4L6 15a9 9 0 0 1 0-2l-1.3-1 2-3.4 1.5.6A9 9 0 0 1 10.4 8l.3-1.6h4L15 8a9 9 0 0 1 2.2 1.2l1.5-.6 2 3.4-1.3 1a9 9 0 0 1 0 2"/>',
    edit:'<path d="m16 4 4 4M4 20l4-1 12-12-3-3L5 16l-1 4z"/>',
    trash:'<path d="M4 7h16M10 3h4m-8 4 1 14h10l1-14M10 11v6m4-6v6"/>',
    music:'<path d="M9 18V5l12-2v13M9 8l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    spark:'<path d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8zM20 18l.7 2 2.3.7-2.3.7-.7 2.3-.7-2.3L17 20.7l2.3-.7z"/>',
    logout:'<path d="M9 5H4v14h5m3-3 4-4-4-4m4 4H8"/>',
    bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>',
    euro:'<path d="M18 6a8 8 0 1 0 0 12M4 10h11M4 14h11"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
    theater:'<path d="M4 4h16v16H4zM4 10h16M8 4v16m8-16v16"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    close:'<path d="M5 5l14 14M19 5 5 19"/>',
    sliders:'<path d="M4 7h16M4 17h16M9 4v6m6 4v6"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>'
  };
  const svg=(name,extra='')=>'<svg '+extra+' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICON[name]||ICON.spark)+'</svg>';
  const escape=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const euro=x=>Number(x||0).toLocaleString('en-GB',{style:'currency',currency:'EUR',maximumFractionDigits:0});
  const euroExact=x=>Number(x||0).toLocaleString('en-GB',{style:'currency',currency:'EUR'});
  const eventBy=id=>db.events.find(x=>x.id===Number(id));
  const crewBy=id=>db.crew.find(x=>x.id===Number(id));
  const earned=j=>Math.round(Number(j.hours)*Number(j.rate)*100)/100;
  const nid=a=>Math.max(0,...a.map(x=>Number(x.id)||0))+1;
  const shortDate=iso=>{const date=new Date(String(iso)+'T12:00:00');return Number.isNaN(date.getTime())?'—':date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})};
  const dayMonth=iso=>{let d=new Date(String(iso)+'T12:00:00');return {day:Number.isNaN(d.getTime())?'—':d.getDate(),month:Number.isNaN(d.getTime())?'—':d.toLocaleDateString('en-GB',{month:'short'})}};
  const initials=name=>String(name||'??').split(' ').slice(0,2).map(w=>w[0]||'').join('').toUpperCase();
  const summary=()=>{let due=db.jobs.reduce((a,j)=>a+earned(j),0);let paid=db.jobs.reduce((a,j)=>a+Math.min(j.paid,earned(j)),0);return{due,paid,remaining:Math.max(0,due-paid),budget:db.events.reduce((a,e)=>a+e.budget,0),active:db.events.filter(e=>e.status!=='Completed').length}};
  const eventTeam=id=>db.jobs.filter(j=>j.eventId===id);
  const button=(label,action,cls='',data='')=>'<button type="button" class="btn '+cls+'" data-action="'+action+'" '+data+'>'+label+'</button>';
  const pill=status=>'<span class="status '+({'Confirmed':'confirmed','In production':'production','Draft':'draft','Completed':'completed'}[status]||'draft')+'">'+escape(status)+'</span>';
  const avatar=(person,small=false)=>'<span class="'+(small?'tiny-avatar':'person-avatar')+'" style="background:'+escape(person?.color||'#485b7d')+'">'+escape(initials(person?.name))+'</span>';
  const menu=[
    ['overview','Overview','dashboard'],
    ['events','Events','calendar'],
    ['crew','Crew & staff','users'],
    ['assignments','Assignments','brief'],
    ['calendar','Show calendar','calendar'],
    ['analytics','Analytics','chart'],
    ['activity','Activity log','history'],
    ['about','Demo & privacy','shield']
  ];
  let db;
  try{
    let value=window.localStorage.getItem(KEY);
    db=value?JSON.parse(value):seed();
    if(!db||!Array.isArray(db.events)||!Array.isArray(db.crew)||!Array.isArray(db.jobs)||!Array.isArray(db.history))throw Error('invalid data');
  }catch(_){db=seed()}
  const persist=message=>{
    db.history.unshift({at:new Date().toISOString().slice(0,10),message,kind:'change'});
    db.history=db.history.slice(0,70);
    try{window.localStorage.setItem(KEY,JSON.stringify(db))}catch(_){}
    render();
    toast('Demo changes saved locally');
  };
  const dateBox=e=>{let d=dayMonth(e.date);return'<span class="date-square"><b>'+d.day+'</b><small>'+d.month+'</small></span>'};
  const shell=(content)=>{
    let current=menu.find(x=>x[0]===ui.page)||menu[0];
    let nav=menu.map(n=>'<button type="button" class="nav-link '+(ui.page===n[0]?'active':'')+'" data-page="'+n[0]+'">'+svg(n[2])+'<span>'+escape(n[1])+'</span></button>');
    let miniNav=menu.slice(0,6).map(n=>'<button data-page="'+n[0]+'" class="'+(ui.page===n[0]?'active':'')+'">'+escape(n[1])+'</button>').join('');
    return '<div class="mobile-header"><div class="mobile-title">EventFlow</div><div class="mobile-nav">'+miniNav+'</div></div><div class="shell">'+
      '<aside class="sidebar"><div class="logo"><div class="logo-mark">'+svg('bolt')+'</div><div><div class="logo-word">Event<em>Flow</em></div><div class="logo-sub">STUDIO EDITION</div></div></div><div class="side-section">WORKSPACE</div><nav class="nav-list">'+nav.slice(0,6).join('')+'</nav><div class="side-section" style="margin-top:23px">SYSTEM</div><nav class="nav-list">'+nav.slice(6).join('')+'</nav><div class="sidebar-end"><div class="demo-box"><div class="mini"><span class="pulse-dot"></span> SAFE DEMO ENVIRONMENT</div><p>Fictional productions, crew and payments. Never connected to a real company database.</p>'+button('Reset sample data','reset','outline-small')+'</div><div class="credit">Portfolio prototype · 2026<br>Built for real-world production workflows.</div></div></aside>'+
      '<div class="content"><header class="topbar"><div class="breadcrumb">Workspace &nbsp;/&nbsp; <b>'+escape(current[1])+'</b></div><div class="topright"><span class="clock">'+escape(new Date().toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'}))+'</span><span class="tiny-divider"></span><span class="demo-chip"><span class="pulse-dot"></span> DEMO DATA</span><span class="avatar-user">VK</span></div></header>'+
      content+'<div class="footnote">EVENTFLOW STUDIO · PUBLIC PORTFOLIO DEMO · All names, venues and amounts are fictional. No backend or network integrations.</div></div></div>'+
      (ui.modal?modal(): '')+'<div id="toasts" class="toast-area" role="status" aria-live="polite"></div>';
  };
  const header=(eyebrow,title,subtitle,actions='')=>'<div class="view-header"><div><div class="eyebrow">'+escape(eyebrow)+'</div><h1>'+escape(title)+'</h1><p class="sub">'+escape(subtitle)+'</p></div><div class="header-actions">'+actions+'</div></div>';
  const metric=(label,value,icon,foot,color)=>'<div class="metric" style="--metric-color:'+color+'"><div class="metric-top"><span class="metric-name">'+label+'</span><span class="metric-icon">'+svg(icon)+'</span></div><div class="metric-value">'+value+'</div><div class="metric-foot">'+foot+'</div></div>';
  const stats=()=>{let s=summary();return'<div class="metric-grid">'+
    metric('Active productions',s.active,'calendar','<b>Live workspace</b>','#ff8578')+
    metric('Crew members',db.crew.length,'users','<b>'+db.crew.filter(w=>w.availability==='Available').length+' available</b>','#8e9cff')+
    metric('Planned budget',euro(s.budget),'wallet','All sample projects','#5ad5ba')+
    metric('Pending compensation',euro(s.remaining),'euro','Simulated balances only','#ffc18a')+'</div>'};
  const preview=e=>'<div class="event-preview">'+dateBox(e)+'<div><div class="preview-title">'+escape(e.name)+'</div><div class="preview-meta">'+svg('pin')+' '+escape(e.venue)+'</div></div>'+pill(e.status)+'</div>';
  const ring=()=>{
    let s=summary(),p=s.due?Math.round(s.paid/s.due*100):0,r=63,c=2*Math.PI*r;
    return '<div class="ring-row"><div class="ring"><svg viewBox="0 0 152 152"><circle cx="76" cy="76" r="'+r+'" fill="none" stroke="#344055" stroke-width="13"/><circle cx="76" cy="76" r="'+r+'" fill="none" stroke="#66ddb4" stroke-linecap="round" stroke-width="13" stroke-dasharray="'+(p/100*c)+' '+c+'"/></svg><div class="ring-label"><b>'+p+'%</b><small>settled</small></div></div><div class="legend"><div><span style="background:#62dbb5"></span> Simulated paid<br><b>'+euro(s.paid)+'</b></div><div><span style="background:#41506b"></span> Outstanding<br><b>'+euro(s.remaining)+'</b></div></div></div>'
  };
  const featuredCrew=()=>db.crew.slice(0,4).map(w=>'<div class="crew-item">'+avatar(w)+'<div class="person-info"><b>'+escape(w.name)+'</b><small>'+escape(w.role)+'</small></div><span class="availability '+(w.availability==='Busy'?'busy':'')+'">● '+escape(w.availability)+'</span></div>').join('');
  function overview(){
    let ev=db.events.slice().sort((a,b)=>a.date.localeCompare(b.date));
    let upcoming=ev.filter(e=>e.status!=='Completed').slice(0,4);
    let s=summary();
    return header('PRODUCTION CONTROL CENTER','Good to see you.','An interactive look at event operations — powered entirely by fictional data.',button(svg('plus')+' New event','event-add'))+
      '<section class="hero"><div class="hero-copy"><div class="overline">'+svg('spark')+' THE COMPLETE PRODUCTION PICTURE</div><h2>Every show. Every cue.<br><span>One clear overview.</span></h2><p>Plan productions, coordinate technicians, track assignments and monitor simulated payments — all in one space.</p><div style="margin-top:17px">'+button('Explore productions '+svg('arrow'),'go-events')+'</div></div><div class="hero-stat"><div class="hero-number">'+db.events.length.toString().padStart(2,'0')+'</div><small>projects in the workspace</small><div class="bars">'+[16,30,24,38,32,42,21,37,29,40,22,35].map(h=>'<i style="height:'+h+'px"></i>').join('')+'</div></div></section>'+
      stats()+
      '<div class="dashboard-grid"><div class="card"><div class="card-head"><h3>Upcoming productions</h3><button class="tiny-link" data-page="events">View all '+svg('arrow')+'</button></div>'+(upcoming.length?upcoming.map(preview).join(''):empty('No upcoming projects','Create a sample event to get started.'))+'</div>'+
      '<div class="card"><div class="card-head"><h3>Compensation overview</h3><button class="tiny-link" data-page="assignments">Assignments '+svg('arrow')+'</button></div>'+ring()+'<div class="mini-panel"><div class="mini-row"><span>Total assignment value</span><b>'+euro(s.due)+'</b></div><div class="progress"><i style="width:'+(s.due?Math.round(s.paid/s.due*100):0)+'%"></i></div><div class="mini-row"><span>Simulated payments recorded</span><b>'+euro(s.paid)+'</b></div></div></div></div>'+
      '<div class="two-col-bottom"><div class="card"><div class="card-head"><h3>Crew roster</h3><button class="tiny-link" data-page="crew">Manage crew '+svg('arrow')+'</button></div><div class="crew-list">'+featuredCrew()+'</div></div>'+
      '<div class="card"><div class="card-head"><h3>Workspace insights</h3><button class="tiny-link" data-page="analytics">Analytics '+svg('arrow')+'</button></div>'+
      '<div class="mini-panel"><div class="mini-row"><span>Confirmed / production</span><b>'+db.events.filter(e=>['Confirmed','In production'].includes(e.status)).length+' events</b></div><div class="progress"><i style="width:'+Math.round(db.events.filter(e=>['Confirmed','In production'].includes(e.status)).length/Math.max(db.events.length,1)*100)+'%"></i></div></div>'+
      '<div class="mini-panel"><div class="mini-row"><span>Assigned technician slots</span><b>'+db.jobs.length+'</b></div><div class="progress"><i style="width:'+Math.min(100,db.jobs.length*10)+'%"></i></div></div>'+
      '<div class="mini-panel"><div class="mini-row"><span>Data isolation</span><b style="color:#60dcb8">100% local</b></div><div class="progress"><i style="background:#60dcb8;width:100%"></i></div></div></div></div>';
  }
  const empty=(title,detail)=>'<div class="empty">'+svg('search')+'<h3>'+title+'</h3><p>'+detail+'</p></div>';
  const filters=()=>'<div class="filters"><div class="tabs">'+['All','Confirmed','In production','Draft','Completed'].map(f=>'<button class="tab '+(ui.filter===f?'active':'')+'" data-filter="'+f+'">'+f+'</button>').join('')+'</div><div class="search">'+svg('search')+'<input aria-label="Search events" data-search="1" placeholder="Search productions..." value="'+escape(ui.search)+'"></div></div>';
  const eventCard=e=>{
    let team=eventTeam(e.id);
    return '<article class="event-card"><div class="event-cover" style="--ev-accent:'+escape(e.accent)+'"><div class="event-symbol">'+svg(e.type==='Theatre'?'theater':e.type==='Corporate'?'brief':'music')+'</div>'+pill(e.status)+'</div>'+
      '<div class="event-content"><h3>'+escape(e.name)+'</h3><div class="event-data"><span>'+svg('calendar')+' '+shortDate(e.date)+'</span><span>'+svg('pin')+' '+escape(e.venue)+'</span><span>'+svg('wallet')+' '+euro(e.budget)+' project estimate</span></div>'+
      '<div class="event-bottom"><div><div class="crew-avatars">'+(team.length?team.slice(0,4).map(j=>avatar(crewBy(j.crewId),true)).join(''):'<small>No crew yet</small>')+'</div><small>'+team.length+' assigned</small></div><div class="table-actions">'+button(svg('edit'),'event-edit','small ghost','data-id="'+e.id+'"')+button(svg('trash'),'event-delete','small negative','data-id="'+e.id+'"')+'</div></div></div></article>';
  };
  function events(){
    let filtered=db.events.filter(e=>(ui.filter==='All'||e.status===ui.filter)&&[e.name,e.venue,e.type].join(' ').toLowerCase().includes(ui.search.toLowerCase())).sort((a,b)=>a.date.localeCompare(b.date));
    return header('PRODUCTION WORKSPACE','Events & productions','Organize every upcoming show, venue and crew call.',button(svg('plus')+' Create event','event-add'))+
      '<div class="subtle-note">'+svg('shield')+' All projects, clients, venues and budgets below are fictional demonstration data.</div>'+filters()+
      (filtered.length?'<div class="events-grid">'+filtered.map(eventCard).join('')+'</div>':empty('No matching productions','Try clearing the filters or adding a new event.'));
  }
  const personTable=()=>'<div class="table-wrap"><table class="data-table"><thead><tr><th>Team member</th><th>Specialty</th><th>Base city</th><th>Availability</th><th>Assignments</th><th>Actions</th></tr></thead><tbody>'+db.crew.filter(w=>[w.name,w.role,w.location].join(' ').toLowerCase().includes(ui.search.toLowerCase())).map(w=>
    '<tr><td><div class="crew-item">'+avatar(w)+'<div class="person-info"><b>'+escape(w.name)+'</b><small>Team member #'+w.id+'</small></div></div></td><td>'+escape(w.role)+'</td><td>'+escape(w.location)+'</td><td><span class="availability '+(w.availability==='Busy'?'busy':'')+'">● '+escape(w.availability)+'</span></td><td><strong>'+db.jobs.filter(j=>j.crewId===w.id).length+'</strong></td><td><div class="table-actions">'+button(svg('edit'),'crew-edit','small ghost','data-id="'+w.id+'"')+button(svg('trash'),'crew-delete','small negative','data-id="'+w.id+'"')+'</div></td></tr>').join('')+'</tbody></table></div>';
  function crew(){
    return header('PEOPLE & OPERATIONS','Crew management','Keep the fictional production team organized and ready for the next show.',button(svg('plus')+' Add technician','crew-add'))+
      '<div class="metric-grid">'+metric('Total crew',db.crew.length,'users','Fictional professionals','#ff8578')+metric('Available now',db.crew.filter(w=>w.availability==='Available').length,'check','Simulated status','#60dcb8')+metric('Active assignments',db.jobs.length,'brief','Across all productions','#8e9cff')+metric('Specialties',new Set(db.crew.map(w=>w.role)).size,'sliders','Audio · lighting · stage · video','#ffc18a')+'</div>'+
      '<div class="filters"><div class="search">'+svg('search')+'<input data-search="1" aria-label="Search crew" placeholder="Search people or specialties..." value="'+escape(ui.search)+'"></div></div>'+personTable();
  }
  const payButton=j=>button(svg('wallet')+' Pay','pay-add','small ghost','data-id="'+j.id+'"') ;
  function assignments(){
    let s=summary();
    return header('PEOPLE & COMPENSATION','Assignments & payments','Build crew calls and simulate partial payments — with no real transactions.',button(svg('plus')+' New assignment','job-add'))+
      '<div class="subtle-note">'+svg('info')+' Example hourly rates and sample amounts only. This is not a real payroll system.</div>'+
      '<div class="metric-grid">'+metric('Crew assignments',db.jobs.length,'brief','Scheduled slots','#ff8578')+metric('Assignment total',euro(s.due),'wallet','Sample compensation','#8e9cff')+metric('Simulated paid',euro(s.paid),'check','Demo payments','#60dcb8')+metric('Remaining',euro(s.remaining),'euro','Demo outstanding','#ffc18a')+'</div>'+
      '<div class="table-wrap"><table class="data-table"><thead><tr><th>Technician</th><th>Event</th><th>Role</th><th>Hours × rate</th><th>Total</th><th>Paid</th><th>Outstanding</th><th>Actions</th></tr></thead><tbody>'+
      db.jobs.map(j=>{let w=crewBy(j.crewId),e=eventBy(j.eventId);return'<tr><td><div class="crew-item">'+avatar(w)+'<div class="person-info"><b>'+escape(w?.name||'Unassigned')+'</b><small>'+escape(w?.role||'')+'</small></div></div></td><td><strong>'+escape(e?.name||'Unknown')+'</strong><small>'+escape(e?.date||'')+'</small></td><td>'+escape(j.role)+'</td><td>'+escape(j.hours)+' h × '+euroExact(j.rate)+'</td><td><strong>'+euroExact(earned(j))+'</strong></td><td>'+euroExact(j.paid)+'</td><td><strong>'+euroExact(Math.max(0,earned(j)-j.paid))+'</strong></td><td><div class="table-actions">'+(earned(j)>j.paid?payButton(j):'<span class="availability">Settled</span>')+button(svg('trash'),'job-delete','small negative','data-id="'+j.id+'"')+'</div></td></tr>'}).join('')+'</tbody></table></div>';
  }
  function calendar(){
    let year=ui.year,month=ui.month, first=new Date(year,month,1),offset=(first.getDay()+6)%7,days=new Date(year,month+1,0).getDate(),last=new Date(year,month,0).getDate();
    let monthTitle=first.toLocaleDateString('en-GB',{month:'long',year:'numeric'}),cells=[];
    for(let i=0;i<42;i++){
      let num=i-offset+1,within=num>=1&&num<=days,day=within?num:(num<1?last+num:num-days),date=within?year+'-'+String(month+1).padStart(2,'0')+'-'+String(num).padStart(2,'0'):'';
      let matches=db.events.filter(e=>e.date===date);
      const isToday=date===new Date().toISOString().slice(0,10);
      cells.push('<div class="cal-day '+(!within?'muted ':'')+(isToday?'today':'')+'" '+(within?'data-day="'+date+'"':'')+'><div class="cal-num">'+day+'</div>'+matches.slice(0,3).map(e=>'<div class="cal-event" title="'+escape(e.name)+'">'+escape(e.name)+'</div>').join('')+'</div>');
    }
    return header('PLANNING & SCHEDULING','Show calendar','Your entire sample production schedule in a single glance.',button(svg('plus')+' Add event','event-add'))+
      '<div class="card"><div class="cal-header"><div><h3 style="font-size:20px">'+escape(monthTitle)+'</h3><p class="sub" style="font-size:11px;margin-top:6px">Click a date to create a fictional event.</p></div><div class="month-buttons">'+button(svg('left'),'month-prev','small ghost')+button('Today','month-today','small ghost')+button(svg('chevron'),'month-next','small ghost')+'</div></div>'+
      '<div class="cal-grid">'+['MON','TUE','WED','THU','FRI','SAT','SUN'].map(x=>'<div class="cal-weekday">'+x+'</div>').join('')+cells.join('')+'</div></div>';
  }
  function analytics(){
    let s=summary();const ranked=db.events.slice().sort((a,b)=>b.budget-a.budget),max=Math.max(...ranked.map(e=>e.budget),1);
    let costs=db.events.map(e=>({event:e,cost:db.jobs.filter(j=>j.eventId===e.id).reduce((n,j)=>n+earned(j),0)})).sort((a,b)=>b.cost-a.cost).slice(0,5),cm=Math.max(...costs.map(x=>x.cost),1);
    const bars=(items,key,maxVal,color)=>'<div class="chart-bars">'+items.map(item=>'<div class="bar-group"><div title="'+escape(item.label)+' · '+euro(item.value)+'" class="bar-column '+(color?'bar-col-2':'')+'" style="height:'+Math.max(3,Math.round(item.value/maxVal*165))+'px"></div><small>'+escape(item.label)+'</small></div>').join('')+'</div>';
    return header('FINANCIAL SNAPSHOT','Production analytics','A visual overview of estimated project values and fictional compensation.',button(svg('download')+' Export CSV','export-csv','ghost'))+
      '<div class="subtle-note">'+svg('shield')+' All charts are calculated from sample data stored locally in this browser.</div>'+stats()+
      '<div class="analytics"><div class="card"><div class="card-head"><h3>Project estimates</h3><span class="muted" style="font-size:11px">Fictional budgets, EUR</span></div>'+
      bars(ranked.slice(0,6).map(e=>({label:e.name.split(' ')[0],value:e.budget})),null,max,false)+'</div>'+
      '<div class="card"><div class="card-head"><h3>Compensation status</h3></div>'+ring()+'<p class="sub" style="text-align:center">Simulated paid vs. pending assignment fees.</p></div></div>'+
      '<div class="card" style="margin-top:18px"><div class="card-head"><h3>Labor cost per production</h3><span class="muted" style="font-size:11px">Illustrative only</span></div>'+
      bars(costs.map(x=>({label:x.event.name.split(' ')[0],value:x.cost})),null,cm,true)+'</div>';
  }
  function activity(){
    return header('AUDIT TRAIL','Activity log','A local record of the changes you make while exploring this demo.',button(svg('download')+' Export sample data','export-json','ghost'))+
      '<div class="subtle-note">'+svg('shield')+' This activity history exists only in your current browser storage. It is not a server audit log.</div>'+
      '<div class="card">'+db.history.map(h=>'<div class="logline"><b>'+escape(h.message)+'</b><small>'+shortDate(h.at)+' · '+(h.kind==='system'?'Demo setup':'Browser-local change')+'</small></div>').join('')+'</div>';
  }
  function about(){
    return header('OPEN PORTFOLIO PROJECT','Built to demonstrate. Safe to explore.','A fictional interactive product showcase inspired by real live-event workflows.',button(svg('arrow')+' Source on GitHub','github','ghost'))+
      '<section class="hero"><div class="hero-copy"><div class="overline">'+svg('shield')+' ZERO CONNECTION TO PRODUCTION</div><h2>Real product thinking.<br><span>Fictional demonstration data.</span></h2><p>Explore the experience without signing in, accessing company systems or exposing employee information.</p></div><div class="hero-stat">'+svg('shield','style="width:120px;height:120px;color:#6ee5b6"')+'</div></section>'+
      '<div class="privacy-grid"><div class="privacy-tile">'+svg('shield')+'<h3>Fully isolated</h3><p>No private APIs, backend servers, production databases or credentials. All example names and values are invented.</p></div><div class="privacy-tile">'+svg('wallet')+'<h3>Safe simulated payments</h3><p>Assignment calculations and payments are fictional. This app never moves money or touches payroll records.</p></div><div class="privacy-tile">'+svg('bolt')+'<h3>Interactive and offline-friendly</h3><p>HTML, CSS and JavaScript run entirely in your browser. Your changes stay in browser storage.</p></div></div>'+
      '<div class="card" style="margin-top:18px"><h3>About the original inspiration</h3><p class="sub" style="margin-top:12px">This demonstration is a standalone portfolio application, inspired by an internal full-stack event management system developed with AI-assisted tools. It does not expose or duplicate the private source code. The original production technology includes Next.js, TypeScript, Prisma and Turso, while this public version uses a local simulation.</p><p class="sub" style="margin-top:12px">Developer: <a href="https://github.com/vicentektek" target="_blank" rel="noopener noreferrer" style="color:#ffa494">Vicentekk</a> · <a href="https://devpost.com/Vicentekk" target="_blank" rel="noopener noreferrer" style="color:#ffa494">Creator portfolio</a></p></div>';
  }
  const field=(name,label,value='',type='text',attrs='')=>'<label class="field"><span>'+escape(label)+'</span><input name="'+name+'" type="'+type+'" value="'+escape(value)+'" '+attrs+' required></label>';
  const select=(name,label,options,value)=>'<label class="field"><span>'+escape(label)+'</span><select name="'+name+'" required>'+options.map(o=>'<option value="'+escape(o[0])+'" '+(String(o[0])===String(value)?'selected':'')+'>'+escape(o[1])+'</option>').join('')+'</select></label>';
  const modal=()=>{
    let m=ui.modal, title='',detail='',fields='';
    if(m.kind==='event'){
      let e=eventBy(m.id)||{};title=m.id?'Edit production':'Create new production';detail='Project details are fictional and editable within your browser.';
      fields=field('name','Production name',e.name||'','text','maxlength="75" placeholder="New fictional event"')+
      '<div class="form-row">'+field('date','Show date',m.date||e.date||'2026-11-27','date')+select('type','Format',['Concert','Festival','Theatre','Corporate','Other'].map(x=>[x,x]),e.type||'Concert')+'</div>'+
      field('venue','Venue',e.venue||'','text','maxlength="85" placeholder="A fictional venue"')+
      '<div class="form-row">'+select('status','Production status',['Draft','Confirmed','In production','Completed'].map(x=>[x,x]),e.status||'Draft')+
      field('budget','Estimated budget (€)',e.budget??5000,'number','min="0" max="1000000" step="1"')+'</div>';
    }
    if(m.kind==='crew'){
      let w=crewBy(m.id)||{};title=m.id?'Edit technician':'Add crew member';detail='Please use invented names and contact-free profiles.';
      fields=field('name','Fictional name',w.name||'','text','maxlength="60"')+field('role','Technical specialty',w.role||'','text','maxlength="60"')+
      '<div class="form-row">'+field('location','Base city',w.location||'Valencia','text','maxlength="60"')+select('availability','Status',[['Available','Available'],['Busy','Busy']],w.availability||'Available')+'</div>';
    }
    if(m.kind==='job'){
      title='New crew assignment';detail='Create a role and hourly cost for one fictional production.';
      fields=select('eventId','Production',db.events.map(e=>[e.id,e.name]),db.events[0]?.id)+
      select('crewId','Technician',db.crew.map(w=>[w.id,w.name+' · '+w.role]),db.crew[0]?.id)+
      field('role','Assigned position','Sound technician','text','maxlength="70"')+
      '<div class="form-row">'+field('hours','Hours',8,'number','min="0.25" max="24" step="0.25"')+field('rate','Hourly rate (€)',22,'number','min="0" max="1000" step="0.01"')+'</div>';
    }
    if(m.kind==='pay'){
      let j=db.jobs.find(x=>x.id===m.id),remain=j?Math.max(0,earned(j)-j.paid):0;
      title='Record sample payment';detail='This only simulates a partial or full payment. No money is transferred.';
      fields='<div class="subtle-note">Outstanding balance: <b>'+euroExact(remain)+'</b></div>'+field('amount','Payment amount (€)',remain.toFixed(2),'number','min="0.01" max="'+remain.toFixed(2)+'" step="0.01"');
    }
    return '<div class="modal-overlay" data-overlay="1"><section class="modal" role="dialog" aria-modal="true" aria-label="'+escape(title)+'"><div class="modal-top"><div><div class="eyebrow">INTERACTIVE DEMO</div><h2>'+escape(title)+'</h2></div><button class="icon-btn" data-action="close-modal" aria-label="Close">'+svg('close')+'</button></div><p class="modal-note">'+escape(detail)+'</p><form id="demo-form">'+fields+'<div class="modal-actions">'+button('Cancel','close-modal','ghost')+'<button class="btn" type="submit">Save changes '+svg('arrow')+'</button></div></form></section></div>';
  };
  const routes={overview,events,crew,assignments,calendar,analytics,activity,about};
  let root=document.getElementById('app');
  function render(options){
    if(!root)return;
    root.innerHTML=shell((routes[ui.page]||overview)());
    if(options&&options.focus){
      let input=root.querySelector('[data-search]');
      if(input){input.focus();try{input.setSelectionRange(input.value.length,input.value.length)}catch(_){}}
    }
  }
  function toast(message){
    let area=document.getElementById('toasts');if(!area)return;
    area.innerHTML='<div class="toast">'+escape(message)+'</div>';
    // No timer needed: the notification is replaced or removed on next render.
  }
  function navigate(page){
    if(!routes[page])return;
    ui.page=page;ui.search='';ui.filter='All';ui.modal=null;
    render();
    window.scrollTo?.({top:0,behavior:'smooth'});
  }
  const openModal=(kind,id=0,date='')=>{ui.modal={kind,id:Number(id),date};render();const input=root.querySelector('#demo-form input');if(input)input.focus()};
  function reset(){
    if(!window.confirm('Reset all fictional productions, technicians and sample payments in this browser?'))return;
    db=seed();
    try{window.localStorage.removeItem(KEY)}catch(_){}
    ui.page='overview';ui.modal=null;render();toast('Sample data restored');
  }
  function remove(kind,id){
    const explanations={event:'Delete this fictional event and all of its assignments?',crew:'Delete this fictional technician and related assignments?',job:'Delete this fictional assignment and its simulated payments?'};
    if(!window.confirm(explanations[kind]))return;
    if(kind==='event'){db.events=db.events.filter(x=>x.id!==id);db.jobs=db.jobs.filter(x=>x.eventId!==id)}
    if(kind==='crew'){db.crew=db.crew.filter(x=>x.id!==id);db.jobs=db.jobs.filter(x=>x.crewId!==id)}
    if(kind==='job'){db.jobs=db.jobs.filter(x=>x.id!==id)}
    persist('Deleted fictional '+kind+' #'+id);
  }
  function exportFile(filename,contents,mimetype){
    const blob=new Blob([contents],{type:mimetype});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();
    URL.revokeObjectURL(url);
    toast('Sample data exported');
  }
  function csvEscape(v){const str=String(v??'');return '"'+str.replace(/"/g,'""')+'"'}
  function exportCsv(){
    let rows=[['Production','Date','Status','Budget EUR','Assigned roles','Crew cost EUR']];
    db.events.forEach(e=>{let jobs=db.jobs.filter(j=>j.eventId===e.id);rows.push([e.name,e.date,e.status,e.budget,jobs.length,jobs.reduce((s,j)=>s+earned(j),0)])});
    exportFile('eventflow-fictional-report.csv',rows.map(r=>r.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8');
  }
  function saveForm(form){
    const m=ui.modal;if(!m)return;
    const data=Object.fromEntries(new FormData(form).entries());
    if(m.kind==='event'){
      const budget=Number(data.budget);
      if(!Number.isFinite(budget)||budget<0||budget>1000000)return toast('Invalid budget');
      let record={name:data.name.trim(),date:data.date,venue:data.venue.trim(),type:data.type,status:data.status,budget,accent:eventBy(m.id)?.accent||'#fe867b'};
      if(!record.name||!record.venue||!/^\d{4}-\d{2}-\d{2}$/.test(record.date))return toast('Please enter valid event details');
      if(m.id)Object.assign(eventBy(m.id),record);else db.events.unshift({id:nid(db.events),...record});
    }else if(m.kind==='crew'){
      let record={name:data.name.trim(),role:data.role.trim(),location:data.location.trim(),availability:data.availability,color:crewBy(m.id)?.color||'#7e9fcb'};
      if(!record.name||!record.role||!record.location)return toast('Please complete the profile');
      if(m.id)Object.assign(crewBy(m.id),record);else db.crew.push({id:nid(db.crew),...record});
    }else if(m.kind==='job'){
      let hours=Number(data.hours),rate=Number(data.rate),eventId=Number(data.eventId),crewId=Number(data.crewId);
      if(!eventBy(eventId)||!crewBy(crewId)||!Number.isFinite(hours)||hours<=0||hours>24||!Number.isFinite(rate)||rate<0||rate>1000)return toast('Please enter valid assignment details');
      db.jobs.push({id:nid(db.jobs),eventId,crewId,role:data.role.trim().slice(0,70),hours,rate,paid:0});
    }else if(m.kind==='pay'){
      const job=db.jobs.find(j=>j.id===m.id),amount=Number(data.amount);
      if(!job||!Number.isFinite(amount)||amount<=0||amount>earned(job)-job.paid+0.0001)return toast('Payment must be within the outstanding balance');
      job.paid=Math.round((job.paid+amount)*100)/100;
    }
    ui.modal=null;
    persist('Updated fictional '+m.kind+' record');
  }
  root.addEventListener('click',e=>{
    const page=e.target.closest('[data-page]');if(page){navigate(page.dataset.page);return}
    const filter=e.target.closest('[data-filter]');if(filter){ui.filter=filter.dataset.filter;render();return}
    const day=e.target.closest('[data-day]');if(day){openModal('event',0,day.dataset.day);return}
    const button=e.target.closest('[data-action]');if(!button){
      if(e.target.dataset.overlay){ui.modal=null;render()}return;
    }
    const act=button.dataset.action,id=Number(button.dataset.id||0);
    if(act==='go-events'){navigate('events');return}
    if(act==='event-add'){openModal('event');return}
    if(act==='event-edit'){openModal('event',id);return}
    if(act==='event-delete'){remove('event',id);return}
    if(act==='crew-add'){openModal('crew');return}
    if(act==='crew-edit'){openModal('crew',id);return}
    if(act==='crew-delete'){remove('crew',id);return}
    if(act==='job-add'){if(!db.events.length||!db.crew.length)return toast('Add an event and crew member first');openModal('job');return}
    if(act==='job-delete'){remove('job',id);return}
    if(act==='pay-add'){openModal('pay',id);return}
    if(act==='close-modal'){ui.modal=null;render();return}
    if(act==='reset'){reset();return}
    if(act==='month-prev'||act==='month-next'||act==='month-today'){
      if(act==='month-today'){ui.year=TODAY.getFullYear();ui.month=TODAY.getMonth()}
      else{let date=new Date(ui.year,ui.month+(act==='month-next'?1:-1),1);ui.year=date.getFullYear();ui.month=date.getMonth()}
      render();return;
    }
    if(act==='export-csv'){exportCsv();return}
    if(act==='export-json'){exportFile('eventflow-fictional-data.json',JSON.stringify(db,null,2),'application/json');return}
    if(act==='github'){window.open('https://github.com/vicentektek/eventflow-demo','_blank','noopener,noreferrer')}
  });
  root.addEventListener('input',e=>{
    if(e.target.matches('[data-search]')){ui.search=e.target.value;render({focus:true})}
  });
  root.addEventListener('submit',e=>{
    if(e.target.id==='demo-form'){e.preventDefault();saveForm(e.target)}
  });
  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&ui.modal){ui.modal=null;render()}
  });
  render();
  window.__eventflowReady=true;
})();

let tasks = JSON.parse(localStorage.getItem('plannerTasks')||'[]');
function renderTasks(){
  const list=document.getElementById('taskList'); if(!list) return;
  list.innerHTML=''; tasks.forEach((t,i)=>{
    const d=document.createElement('div'); d.className='task-item'+(t.done?' completed':'');
    d.innerHTML=`<span onclick="toggleTask(${i})" style="cursor:pointer;flex:1"><input type="checkbox" ${t.done?'checked':''} style="width:auto;margin-right:6px">${t.text}</span><button onclick="toggleTask(${i})" style="background:#185adb;color:white;border:none;padding:.3rem .6rem;border-radius:5px">Done</button><button onclick="deleteTask(${i})" style="background:red;color:white;border:none;padding:.3rem .6rem;border-radius:5px;margin-left:4px">X</button>`;
    list.appendChild(d);
  });
  localStorage.setItem('plannerTasks',JSON.stringify(tasks));
  const c=document.getElementById('taskCount'); if(c) c.textContent=`${tasks.filter(t=>!t.done).length} pending, ${tasks.length} total`;
}
function addTask(){ const el=document.getElementById('taskInput'); if(!el.value.trim()){alert('Enter task');return;} tasks.push({text:el.value,done:false}); el.value=''; renderTasks(); }
function toggleTask(i){ tasks[i].done=!tasks[i].done; renderTasks(); }
function deleteTask(i){ tasks.splice(i,1); renderTasks(); }
document.addEventListener('DOMContentLoaded',()=>{
  const input=document.getElementById('taskInput'); if(input){ input.addEventListener('keypress',e=>{if(e.key==='Enter') addTask();}); renderTasks(); }
});
function validateContactForm(e){
  e.preventDefault(); let valid=true;
  const n=document.getElementById('cName'), em=document.getElementById('cEmail'), ph=document.getElementById('cPhone'), mg=document.getElementById('cMsg');
  ['eName','eEmail','ePhone','eMsg'].forEach(id=>document.getElementById(id).style.display='none');
  if(!n.value.trim()){document.getElementById('eName').textContent='Name required';document.getElementById('eName').style.display='block';valid=false;}
  if(!em.value.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)){document.getElementById('eEmail').textContent='Valid email required';document.getElementById('eEmail').style.display='block';valid=false;}
  if(!ph.value.trim()||!/^\d+$/.test(ph.value)){document.getElementById('ePhone').textContent='Phone must be digits only';document.getElementById('ePhone').style.display='block';valid=false;}
  if(!mg.value.trim()){document.getElementById('eMsg').textContent='Message required';document.getElementById('eMsg').style.display='block';valid=false;}
  if(valid){alert('Message sent successfully!'); e.target.reset();}
  return false;
}

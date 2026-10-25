import fs from 'node:fs/promises';
const base='https://avangardautocheck.com/';
const queue=['index.html','blog.html'];const seen=new Set();const pages=[];
while(queue.length){
 const batch=queue.splice(0,12).filter(p=>!seen.has(p));batch.forEach(p=>seen.add(p));
 await Promise.all(batch.map(async slug=>{
  try{const r=await fetch(new URL(slug,base)); const body=await r.text();await fs.writeFile('research/'+(slug==='index.html'?'original.html':slug==='blog.html'?'blog-original.html':slug),body);
  pages.push({slug,status:r.status,length:body.length,title:body.match(/<title>([\s\S]*?)<\/title>/i)?.[1]});
  for(const m of body.matchAll(/href=["']([^"']+\.html)(?:#[^"']*)?["']/g)){const url=new URL(m[1],base);if(url.origin===new URL(base).origin){const p=url.pathname.slice(1);if(!seen.has(p)&&!queue.includes(p))queue.push(p)}}
  }catch(e){pages.push({slug,error:e.message})}
 }));
}
await fs.writeFile('research/pages.json',JSON.stringify(pages,null,2));console.log(JSON.stringify(pages));
const assets=[
 ['masinaverificareautocheck.png',base+'masinaverificareautocheck.png'],['Volvo.jpg',base+'Volvo.jpg'],['BMW.jpg',base+'BMW.jpg'],['smoke.jpg',base+'masina%20in%20fum.jpg'],
 ['hero-car.jpg','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=85&auto=format&fit=crop'],
 ['workshop.jpg','https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=85&auto=format&fit=crop'],
 ['driving.jpg','https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80&auto=format&fit=crop'],
 ['fluids.jpg','https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80&auto=format&fit=crop']
];
await Promise.all(assets.map(async([name,url])=>{try{const r=await fetch(url);if(!r.ok)throw Error(r.status);const b=Buffer.from(await r.arrayBuffer());await fs.writeFile('dist/assets/'+name,b);console.log(name,b.length,r.headers.get('content-type'))}catch(e){console.log(name,'ERROR',e.message)}}));
await fs.writeFile('research/assets.json',JSON.stringify(assets.map(([name,url])=>({name,url})),null,2));

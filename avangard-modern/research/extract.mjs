import fs from 'node:fs/promises';
const pages=JSON.parse(await fs.readFile('research/pages.json','utf8'));
const plain=s=>s.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const mappings={
 'blog-article.html':['Ghid complet','driving.jpg'],
 'article-1-verificare-profesionala.html':['Inspecție auto','driving.jpg'],
 'article-2-kilometri-dati-inapoi.html':['Kilometraj','hero-car.jpg'],
 'article-3-accidente-ascunse.html':['Caroserie','workshop.jpg'],
 'article-4-fum-motor.html':['Motor','smoke.jpg'],
 'article-5-fluide-motor.html':['Întreținere','fluids.jpg']
};
const articles=[];
for(const [slug,[category,image]] of Object.entries(mappings)){
 const html=await fs.readFile('research/'+slug,'utf8');
 const marker=/<div\s+class="article-content"[^>]*>/g.exec(html);if(!marker)throw Error('No article-content '+slug);
 const offset=marker.index+marker[0].length;
 const tags=/<\/?div\b[^>]*>/g;tags.lastIndex=offset;let depth=1,end;
 for(let m;(m=tags.exec(html));){depth+=m[0].startsWith('</')?-1:1;if(depth===0){end=m.index;break}}
 if(!end)throw Error('Unbalanced article '+slug);
 const bodyHtml=html.slice(offset,end).replace(/\s+style="[^"]*"/g,'').replace(/\s+on\w+="[^"]*"/g,'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<!--[^]*?-->/g,'').replace(/(<a[^>]+target="_blank")/g,'$1 rel="noopener noreferrer"').trim();
 const title=plain(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'');
 const description=plain(bodyHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]||'');
 const date=plain(html.match(/<div class="article-meta">[\s\S]*?<span>([\s\S]*?)<\/span>/)?.[1]||'').replace(/^\S+\s/,'');
 articles.push({slug,title,description,category,bodyHtml,image:'assets/'+image,date,sourceUrl:'https://avangardautocheck.com/'+slug});
}
await fs.writeFile('research/articles.json',JSON.stringify(articles,null,2));console.log(articles.map(a=>({slug:a.slug,title:a.title,bodyLength:a.bodyHtml.length,date:a.date})));

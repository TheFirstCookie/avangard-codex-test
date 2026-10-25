# Audit Avangard Autocheck — 25 octombrie 2026

## Domeniu verificat

S-au descărcat homepage, blogul și toate cele șase articole HTML descoperite recursiv din legăturile interne. Toate răspund HTTP 200. Sursele și statusurile sunt în `research/pages.json`. Nu s-au trimis formulare sau mesaje reale.

## Probleme concrete

- `robots.txt` și `sitemap.xml` răspund cu întregul HTML al paginii principale (HTTP 200), nu cu fișierele solicitate. Lipsesc astfel documente valide pentru crawling/indexare.
- Articolele `article-1-verificare-profesionala.html`, `article-4-fum-motor.html` și `article-5-fluide-motor.html` au titlul HTML copiat de la articolul despre accidente ascunse, deși H1 și conținutul sunt diferite.
- `blog-article.html` și `article-1-verificare-profesionala.html` au elemente footer duplicate/imbricate.
- Există inconsistențe de preț între articole și homepage: ghidul principal citează Premium Check la 450 EUR într-un caz, homepage la 99 EUR. Articolul despre inspecție citează și 50–100 EUR. Aceste texte istorice nu trebuie prezentate ca ofertă actuală.
- Procentele din articole (de ex. 68% kilometraj modificat, 87% probleme nedeclarate) nu au surse verificabile în pagină. Au fost păstrate în fișierele originale, însă nu sunt recomandate ca argumente de vânzare în redesign.
- Homepage are butoane de programare cu `href="#"` și `data-page="contact"`, în loc de linkuri directe `#contact`.
- Contactul telefonic lipsește ca număr din footerul homepage (eticheta telefon trimite la Instagram), deși blogul afișează numărul real.
- Imaginile partenerilor și logo-ul sunt distribuite fără optimizare explicită; logo-ul PNG original are aproximativ 934 KB.
- Designul original repetă gradiente albastru-verde, chenare, carduri și emoji. Articolele folosesc CSS inline greu de întreținut și conținut cu structură vizuală foarte densă.
- Formularul original trimite POST către `send_email_gmail.php`. Sursa backendului nu este disponibilă în conținutul public; funcționarea trimiterii nu a fost testată pentru a evita mesaje reale.

## Date de contact confirmate în sursa site-ului

- Telefon: **069 448 878** (format internațional Moldova: +373 69 448 878).
- Email: **avangardautocheck@gmail.com**.
- Instagram: **https://www.instagram.com/verificare_auto**.
- Program: **Luni–Duminică, 09:00–18:00**.

## Ofertele afișate pe homepage

- Inspecție completă / Premium Check: **99 EUR**, aproximativ 90 minute.
- Cumpărare la cheie: **249 EUR**, analiză 15–20 anunțuri, verificare fizică 5–6 mașini, 3–4 săptămâni.
- Expert pentru o zi: **249 EUR**, în medie 7–8 mașini.
- Import auto: **499 EUR**, Europa / Coreea / America.
- Flote și dealeri: afișaj **49 EUR**, ofertă **25 EUR/verificare de la 50 de mașini**. Trebuie clarificate condițiile, nu dedus automat un preț universal.
- Pachet 1+1=3: **199 EUR**.
- Promoție prima inspecție: **−15%**, cod **AVANGARD2026**. Valabilitatea nu este confirmată în afara afișării pe site.

## Fișiere pregătite

- `research/articles.json`: șase articole extrase din wrapperul real `div.article-content`, fără navigație, scripturi, footer și stiluri inline. Conținutul editorial este păstrat pentru migrare. Include slug, title (din H1 corect), description, category, bodyHtml, image, date, sourceUrl.
- `dist/assets`: logo-ul original, fotografiile BMW și Volvo originale, imaginea originală cu fum, și fotografii Unsplash deja folosite de site, descărcate la dimensiuni adecvate.
- `research/assets.json`: proveniența imaginilor.

Acest audit este bazat pe HTML și răspunsuri HTTP; verificarea vizuală și interactivă a redesignului se face separat.

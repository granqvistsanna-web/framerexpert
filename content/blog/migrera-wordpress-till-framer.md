---
slug: migrera-wordpress-till-framer
page_id: post21
category: tips
date: 2026-08-05
date_modified: 2026-08-05
date_display: 5 augusti 2026
readtime: 9 min läsning
thumbnail: thumb-migrera-wordpress.svg
og_image: og-default.png
title: "Migrera från WordPress till Framer (2026): Steg-för-steg utan att tappa SEO"
meta_title: "Migrera WordPress till Framer (2026): Steg för steg"
description: "Praktisk guide till att flytta en WordPress-sajt till Framer — innehåll, redirects, CMS-import, DNS och de vanligaste fallgroparna som kostar SEO-ranking."
og_description: "Så flyttar du en WordPress-sajt till Framer steg för steg — utan att tappa rankingen på vägen."
intro: "Den vanligaste anledningen till att man letar efter den här guiden är en WordPress-sajt som blivit långsam, dyr att underhålla eller krånglig att uppdatera. Själva flytten är oftast rakare än den känns på förhand — om du gör stegen i rätt ordning. Här är hela processen, från kartläggning till lansering."
related: framer-vs-wordpress, framer-seo-guide
faqs:
  - q: Tappar jag SEO-ranking när jag migrerar från WordPress till Framer?
    a: Inte om du sköter redirects korrekt. Sätt upp 301-omdirigeringar från varje gammal URL till den nya innan du byter DNS, håll samma URL-struktur där det går, och bevaka Search Console de första veckorna. Viss kortsiktig svängning i rankingen är normalt vid vilket plattformsbyte som helst, men den återhämtar sig om grundjobbet är gjort.
  - q: Kan jag importera mitt WordPress-innehåll direkt till Framer?
    a: Det finns ingen ett-klicks-importer. Framer stödjer CSV-import till CMS-samlingar, så du exporterar WordPress-inlägg till CSV, mappar kolumnerna mot dina Framer-fält och importerar. För sidor och layout får du bygga om i Framers editor — det finns ingen automatisk konvertering av WordPress-teman.
  - q: Vad händer med gamla bild- och mediafiler?
    a: De följer inte med automatiskt. Bilder behöver laddas upp på nytt i Framer, och om de gamla bild-URL:erna är indexerade i Google bör du redirecta även dem, inte bara sidorna. Annars läcker du bort en del av det befintliga SEO-värdet från bildsök.
  - q: Kan jag ha kvar min WooCommerce-butik om jag migrerar till Framer?
    a: Nej, inte som den är. Framer har en egen enklare store-funktion för låg volym, men ingen motsvarighet till WooCommerce för lager, komplexa varianter eller stora kataloger. Har din sajt en aktiv butik, läs vår guide om Framer för e-handel innan du bestämmer dig.
  - q: Hur lång tid tar en migrering från WordPress till Framer?
    a: En mindre marknadssajt med 5–15 sidor tar ofta 1–3 veckor inklusive redesign. En bloggtung sajt med hundratals inlägg tar längre, mest på grund av CSV-mappning och kvalitetskontroll av importerat innehåll, snarare än det tekniska bytet i sig.
---

## Innan du börjar: är migrering rätt val?

Framer passar bäst för marknadssajter, landningssidor, portföljer och företagssajter med en normalstor blogg. Har din WordPress-sajt en aktiv WooCommerce-butik, medlemsinloggning eller tunga plugin-beroenden (bokningssystem, forum, komplexa formulärflöden) är en fullständig migrering sällan rätt drag — då är det ofta bättre att behålla WordPress för de bitarna, eller flytta bara marknadsdelen till Framer och länka vidare till en separat butik. Vår [Framer vs WordPress-jämförelse](/blog/framer-vs-wordpress.html) går igenom var gränsen brukar gå.

Är sajten i huvudsak sidor, blogginlägg och formulär — läs vidare.

## Steg 1: Kartlägg vad som faktiskt ska flytta

Innan du öppnar Framer, gör en enkel inventering:

- **Sidor** — hur många, och vilka är faktiskt aktuella? De flesta WordPress-sajter har gamla sidor ingen besökt på år.
- **Blogginlägg** — antal, kategorier och taggar. Avgör om alla ska flyttas eller om det är läge att gallra.
- **Formulär** — vilka fält samlar du in idag, och vart skickas svaren?
- **Plugin-beroenden** — finns funktioner (bokning, medlemskap, avancerad sök) som inte har någon motsvarighet i Framer?
- **Nuvarande URL-struktur** — exportera en lista på alla publicerade URL:er. Den listan blir grunden för redirect-arbetet i steg 4.

Gallring här sparar mest tid längre fram. Det är lättare att skippa tio inaktuella sidor nu än att bygga om dem för att sedan ta bort dem.

## Steg 2: Bygg om designen i Framer

Det finns ingen automatisk temakonvertering — designen byggs om från grunden, vilket i praktiken är en fördel. Du slipper släpa med gammal temakod, onödiga plugin-beroenden och CSS som ingen längre minns varför den finns.

Vill du ha en visuell utgångspunkt går det att kopiera element direkt från den befintliga sajten till Framer via [HTML to Framer](https://www.framer.com/guides/wordpress-to-framer-step-by-step/), en officiell webbläsartillägg som klistrar in visuella element från en live-sajt. Bra för att snabbt återskapa en sektion, men bygg om strukturen ordentligt snarare än att förlita dig på det som permanent lösning.

Strukturera om innehållet som CMS-samlingar där det är repetitivt — blogginlägg, case, teammedlemmar — på samma sätt som du skulle strukturera en ny sajt. Se vår [CMS-guide för Framer](/blog/framer-cms-i-praktiken.html) för hur fält och samlingar sätts upp i praktiken.

## Steg 3: Föra över innehåll till Framer CMS

För enstaka sidor med statiskt innehåll är copy-paste snabbast. För bloggposter och andra samlingar med många poster är CSV-import bättre:

- Exportera WordPress-inlägg till CSV (inbyggd exportfunktion eller ett plugin för strukturerad export).
- Formatera exporten så att varje rad är ett innehållsobjekt och varje kolumn matchar ett fält i din Framer-samling — rubrik, brödtext, publiceringsdatum, kategori, bild-URL.
- Importera CSV:n i din CMS-samling i Framer och kontrollera stickprov innan du fortsätter.

Bilder och andra mediafiler följer inte med i CSV-importen som filer — bara som URL:er om du länkar dem. Räkna med att ladda upp bildbiblioteket på nytt, och passa på att komprimera bilderna samtidigt, det gör sajten snabbare från dag ett.

## Steg 4: Sätt upp redirects innan du byter DNS

Det här är det steg som avgör om SEO-värdet följer med eller försvinner. Gör det innan sajten går live, inte efter.

I Framer sätter du upp redirects under **Site Settings → Redirects** (tillgängligt från Pro-planen och uppåt). Mappa varje gammal URL från inventeringen i steg 1 till motsvarande nya URL. Har du många liknande URL:er — till exempel ett helt bloggarkiv med samma mönster — går det att använda wildcard-mönster för att slå ihop flera redirects till en regel istället för att lägga upp tusentals rader manuellt, vilket annars kan påverka sajtens prestanda.

Har du en riktigt stor sajt med komplex routing kan det vara enklare att hantera redirects på DNS/CDN-nivå istället, till exempel via Cloudflare Page Rules, och låta Framer sköta själva sajten.

## Steg 5: SEO-kontroller innan lansering

Innan du byter DNS, gå igenom:

- **Titlar och meta descriptions** — förs inte över automatiskt, sätts per sida i Framers page settings.
- **Canonical-taggar** — kontrollera att de pekar på de nya URL:erna.
- **Sitemap** — Framer genererar `sitemap.xml` automatiskt. Se till att den innehåller alla sidor du vill ha indexerade.
- **Strukturerad data** — om den gamla sajten hade JSON-LD (artikel, produkt, organisation) behöver den läggas till på nytt via custom code. Vår [guide till strukturerad data i Framer](/blog/framer-strukturerad-data.html) visar hur.

Skicka in den nya sitemapen i Google Search Console samma dag du lanserar, så att Google upptäcker de nya URL:erna snabbt.

## Steg 6: DNS och lanseringsdagen

När redirects, innehåll och SEO-inställningar är på plats: peka domänens DNS mot Framer enligt plattformens instruktioner. Planera lanseringen till en tid med låg trafik om möjligt, och håll ett öga på 404-sidor och Search Console-täckning under de första dagarna — det är det snabbaste sättet att upptäcka en URL som glömdes bort i redirect-mappningen.

## Vanliga fallgropar

- **Byter DNS innan redirects är på plats.** Även några timmar utan redirects kan resultera i en våg av 404:or som Google hinner registrera.
- **Glömmer bild- och mediaURL:er.** Fokus hamnar ofta bara på sid-URL:er, men indexerade bilder tappar sitt SEO-värde om de bara 404:ar.
- **Lägger upp tusentals redirects i ett svep.** Kan påverka prestanda och projektets gränser — använd wildcard-mönster där mönstret är detsamma.
- **Antar att WooCommerce eller medlemskap "följer med".** Det gör de inte. Klargör det innan projektet startar, inte efter.
- **Hoppar över stickprovskontroll efter CSV-import.** Formatering, radbrytningar och specialtecken trasslar ibland till sig i konverteringen — kontrollera ett urval poster manuellt.

## Sammanfattning

En migrering från WordPress till Framer är sällan tekniskt svår — den blir svår när ordningen är fel. Kartlägg innehållet, bygg om designen på riktigt istället för att återanvända gammal temakod, för över innehållet metodiskt, och lägg redirects på plats innan DNS byts. Gör du de stegen i rätt ordning tar sajten med sig sitt SEO-värde och du slipper börja om från noll i Search Console.

---
slug: framer-ordlista
page_id: guideOrdlista
date: 2026-09-30
date_modified: 2026-09-30
date_display: 30 september 2026
thumbnail: thumb-framer-ordlista.svg
og_image: og-default.png
title: "Framer-ordlista (2026): Alla begrepp förklarade"
meta_title: "Framer-ordlista (2026): Alla begrepp förklarade"
description: "Stack, Breakpoint, Code Override, CMS Collection, Staging och fler. Alla viktiga Framer-begrepp förklarade på svenska, grupperade efter område."
og_description: "Framers begrepp förklarade på svenska: layout, komponenter, CMS, publicering, SEO, animation, lokalisering och AI."
excerpt: "Över 40 Framer-begrepp förklarade på svenska, från Stack och Breakpoint till Code Override, Staging och Scroll Transforms."
intro: "Framer har ett eget ordförråd, och de flesta som jobbar i verktyget i Sverige använder de engelska namnen rakt av. Här förklarar vi de begrepp du oftast stöter på, grupperade efter område. Varje begrepp har en kort definition som går att läsa för sig, så att du kan hoppa direkt till det ord du undrar över."
related: vad-ar-framer, framer-cms-i-praktiken
defined_terms: true
faqs:
  - q: Varför använder man engelska ord när man pratar om Framer på svenska?
    a: Framers gränssnitt, hjälpartiklar och kurser finns på engelska, och funktionerna har egna namn som Stack, Breakpoint och Code Override. Svenska designers och utvecklare använder därför oftast de engelska termerna, eftersom det är de orden som syns i verktyget och som gör det lätt att hitta rätt i Framers dokumentation.
  - q: Vad är skillnaden mellan en Code Component och en Code Override i Framer?
    a: En Code Component är en egen React-komponent som läggs ut på canvasen som ett nytt element och ställs in via Property Controls. En Code Override är en funktion som kopplas på ett element som redan finns och ändrar hur det renderas eller beter sig. Komponenten bygger alltså något nytt, medan overriden justerar något befintligt.
  - q: Vad är skillnaden mellan Fixed och Sticky i Framer?
    a: Ett lager med Fixed position sitter fast i webbläsarfönstret under hela sidan, till exempel en navigering som alltid syns. Ett lager med Sticky position följer med i scrollningen tills det når en vald kant av fönstret och stannar där bara så länge dess föräldersektion syns, sedan scrollar det iväg med sektionen.
  - q: Behöver jag kunna alla Framer-begrepp för att redigera min sajt?
    a: Nej. För att uppdatera texter, bilder och CMS-innehåll räcker det i regel att förstå CMS Collection, Collection List och hur man publicerar. Begrepp som Stack, Breakpoint och Variant blir viktiga först när du ändrar layout, och kodbegreppen behövs bara om sajten har egen kod.
---

## Så använder du ordlistan

Ordlistan förklarar de Framer-begrepp som oftast dyker upp i projekt, offerter och Framers egen dokumentation. Begreppen står under det namn Framer själv använder, eftersom det är det namnet du ser i verktyget. Vi har kontrollerat definitionerna mot Framers hjälpcenter, Framer Academy och utvecklardokumentationen per september 2026.

Framer döper ibland om funktioner. Ett exempel är Page Effects, som många fortfarande kallar page transitions. Tabellen visar några av de vanligaste svenska omskrivningarna och vilket Framer-begrepp de motsvarar.

| Svensk omskrivning | Framers begrepp |
| --- | --- |
| Brytpunkt, mobilversion | Breakpoint |
| Kodkomponent | Code Component |
| Samling, databas i CMS:et | CMS Collection |
| Flöde, lista av inlägg | Collection List |
| Språkversion | Locale |
| Omdirigering | Redirects |
| Sidövergång | Page Effects |

> ### Bra att veta
> - Framers gränssnitt och dokumentation finns på engelska, så de engelska termerna är lättast att söka på.
> - Flera funktioner, till exempel lokalisering och Triggers, ingår i tillägg eller vissa planer. Se [vad Framer kostar](/blog/framer-pris.html) för aktuella nivåer.
> - Definitionerna beskriver hur funktionerna fungerar, inte exakt var varje knapp sitter, eftersom menyer flyttas mellan versioner.

## Layout och stilar

Layoutbegreppen styr hur element placeras och anpassar sig efter skärmstorlek. Stilbegreppen samlar färg och typografi på ett ställe så att hela sajten går att ändra konsekvent.

### Frame

Frame är Framers grundläggande behållare, ett lager som kan ha bakgrund, kantlinje, hörnradie och innehålla andra lager. Nästan allt på en Framer-sida ligger i en Frame på någon nivå. En Frame kan få en Stack- eller Grid-layout för att ordna sina barn, och den fungerar som referens när ett lager ska positioneras absolut inuti den.

### Layers

Layers är de enskilda element som bygger upp en sida, till exempel frames, textlager, bilder och komponentinstanser. De visas i en hierarki i lagerpanelen till vänster, där ordningen avgör vad som ligger inuti vad. En tydlig lagerstruktur med beskrivande namn gör det mycket lättare att redigera sajten senare och att animera mellan varianter.

### Stack

Stack är en layout där en Frame ordnar sina barn i en riktning, vågrätt eller lodrätt, med inställbart avstånd, utfyllnad och justering. En Stack anpassar sig efter innehållet, så att element flyttar sig när något läggs till eller ändrar storlek. Framer rekommenderar Stack när innehållet följer en huvudriktning, som en rad knappar eller en kolumn med text.

### Grid

Grid är en layout där en Frame ordnar sina barn i rader och kolumner med gemensamma spår. Den passar när element ska linjera åt två håll samtidigt, som ett kortflöde eller ett galleri. Du ställer in avstånd och minsta kolumnbredd på föräldern, och antalet kolumner kan då anpassas efter tillgänglig bredd på olika skärmar.

### Fit och Fill

Fit och Fill är Framers storleksinställningar för hur ett lager förhåller sig till sitt innehåll och sin förälder. Fit Content gör att lagret sluter tätt kring sina barn, medan Fill låter lagret ta det utrymme som finns kvar i föräldern. Fill kräver att föräldern har en Stack- eller Grid-layout, och andelar som 1fr och 2fr styr fördelningen.

### Relative positioning

Relative positioning är standardläget där ett lager följer flödet bland sina syskon i en förälder med Stack eller Grid. Föräldern bestämmer riktning, avstånd och justering, och lagret flyttar sig automatiskt när storlekar ändras. Det är det läge som fungerar bäst för det mesta innehållet på en responsiv sida.

### Fixed positioning

Fixed positioning är ett läge där lagret förankras i webbläsarfönstret i stället för i en sektion på sidan. Lagret stannar på samma synliga plats medan besökaren scrollar. Det används typiskt för navigeringsfält och flytande knappar som alltid ska gå att nå, och för overlays som modaler och banners.

### Sticky positioning

Sticky positioning är ett läge där lagret scrollar med innehållet tills det når en vald kant av fönstret och sedan stannar där. Till skillnad från Fixed stannar lagret bara så länge dess föräldersektion syns, och när sektionen scrollar förbi följer lagret med ut. Det passar för rubriker i långa sektioner och sidokolumner.

### Breakpoint

Breakpoint är en skärmbredd där sajten byter till en anpassad layout, till exempel för surfplatta eller mobil. Framer utgår från en primär breakpoint, och nya breakpoints ärver från den så att du bara behöver justera det som skiljer. En komponent kan dessutom visa en annan variant på varje breakpoint.

### Text Styles

Text Styles är återanvändbara typografiinställningar med typsnitt, storlek, vikt, radavstånd och färg som sparas centralt i projektet. När du ändrar en textstil uppdateras alla texter som använder den. Textstilar kan ha olika värden per breakpoint, vilket gör dem till grunden för responsiv typografi.

### Color Styles

Color Styles är sparade färger som används i hela projektet och som tidigare hette Shared Colors. Ändrar du en färgstil får alla element som använder den den nya färgen direkt. En färgstil kan ha ett värde för ljust och ett för mörkt tema, och den fungerar även i interaktioner och animationer.

## Komponenter och kod

Komponenter gör att samma element kan återanvändas med ett ställe att ändra på. Kodbegreppen beskriver de sätt du kan utöka Framer med egen React-kod när de visuella verktygen inte räcker.

### Components

Components är återanvändbara byggblock, till exempel knappar, kort och menyer, som designas en gång och sedan används på många ställen. En komponent kan ha varianter, egna inställningar och interaktioner. Genom att bygga upprepade element som komponenter blir sajten enklare att hålla enhetlig, eftersom en ändring i komponenten slår igenom överallt.

### Instances

Instances är länkade kopior av en komponent som ärver sin utformning från huvudkomponenten. En instans uppdateras automatiskt när huvudkomponenten ändras, men du kan skriva över enskilda egenskaper lokalt, som text, bild eller vilken variant som visas. Det är så en och samma knappkomponent kan användas med olika texter på hela sajten.

### Variant

Variant är ett fördefinierat läge eller en version av en komponent, till exempel primär och sekundär knapp eller standard, hover och tryckt läge. Varianterna ligger samlade i komponenten, och Framer kan animera mjukt mellan dem när lagren har samma namn och struktur. Varianter kan också bytas av scrollning, klick eller breakpoint.

### Smart Component

Smart Component är Framers benämning på en komponent som samlar struktur, stil, redigerbart innehåll och flera lägen i ett återanvändbart block. Det som gör den smart är att den har varianter och interaktioner inbyggda, så att den reagerar på hover, klick eller andra händelser utan kod. Triggers kan också byta en Smart Component till en viss variant.

### Code Component

Code Component är en egen React-komponent, skriven i TypeScript i Framers kodeditor, som läggs ut på canvasen som vilket element som helst. Den används för funktioner som inte går att bygga visuellt, som kalkylatorer, filtrerbara listor eller inbäddningar. Läs mer om när det behövs i vår guide om [vad en Framer-utvecklare gör](/framer-utvecklare.html).

### Property Controls

Property Controls är de inställningar som en kodkomponent visar i Framers egenskapspanel när den markeras på canvasen. Utvecklaren definierar dem med funktionen addPropertyControls och olika kontrolltyper, till exempel text, färg, siffra eller bild. Med genomtänkta Property Controls kan en redaktör anpassa komponenten utan att någonsin öppna koden.

### Code Override

Code Override är en funktion som kopplas på ett befintligt lager och ändrar hur det renderas eller beter sig. Tekniskt är den en vanlig React Higher Order Component som skapas i en kodfil i projektet. Vanliga användningar är klickspårning och att lägga till id eller data-attribut på element. Framer betonar att befintliga props alltid ska föras vidare.

## CMS

Framers CMS lagrar innehåll som blogginlägg, case och medarbetare i strukturerade samlingar. Begreppen nedan beskriver hur innehållet organiseras och visas. En längre genomgång finns i [Framer CMS i praktiken](/blog/framer-cms-i-praktiken.html).

### CMS Collection

CMS Collection är en samling innehåll av samma typ, till exempel blogginlägg eller kundcase, där varje post har samma uppsättning fält. Fälten kan vara text, formaterad text, bild, datum, länk, val eller referenser till andra samlingar. En samling kan fyllas i för hand, importeras eller synkas från ett externt system via plugin.

### Collection List

Collection List är det element som visar poster från en CMS Collection på en sida, till exempel ett flöde med de senaste inläggen. Du designar ett kort en gång och kopplar dess lager till samlingens fält. Listan kan sorteras, filtreras, begränsas till ett visst antal poster och få paginering när samlingen växer.

### Detail Page

Detail Page är en CMS-sida som fungerar som mall och genererar en egen sida för varje post i en samling. Du designar sidan en gång och kopplar texter och bilder till fälten, så får varje blogginlägg eller case en egen adress. På en detaljsida kan du också visa innehåll från andra samlingar via en Collection List.

### Reference field

Reference field är ett CMS-fält som kopplar en post till en post i en annan samling, till exempel ett blogginlägg till sin författare. Varianten Multi-reference kopplar en post till flera poster, som taggar eller kategorier. Fördelen är att informationen bara finns på ett ställe, så en ändrad författarbio slår igenom på alla inlägg.

### Slug

Slug är den del av adressen som identifierar en viss sida eller CMS-post, till exempel "framer-ordlista" i en URL. I Framers CMS har varje post en slug som bestämmer adressen till dess detaljsida. Korta, beskrivande slugs är bra för både läsbarhet och SEO, och de bör inte ändras utan en redirect från den gamla adressen.

## Publicering och hosting

Framer sköter hosting, SSL och leverans själv. De här begreppen handlar om hur en sajt publiceras, hur ändringar testas innan de går live och hur projekt delas och organiseras.

### Site Settings

Site Settings är projektets inställningar för hela sajten, där bland annat domän, SEO-uppgifter, redirects, egen kod och publiceringsalternativ finns. Framers hjälpartiklar kallar det ibland även Project Settings. Här sätter du standardtitel och beskrivning för sajten, kopplar en egen domän och hanterar staging och versioner.

### Staging

Staging är ett läge där du publicerar ändringar till Framers bas-domän för att testa dem innan de når den egna domänen. Funktionen kräver att en egen domän är kopplad. När du är nöjd väljer du Deploy på den version som ska gå live. Hur du kopplar domänen beskriver vi i guiden om att [koppla en domän till Framer](/koppla-doman-framer.html).

### Versions

Versions är de ögonblicksbilder av sajten som Framer sparar varje gång du publicerar. I inställningarna för staging och versioner ser du varje versions status, vem som publicerade och när. Du kan när som helst gå tillbaka till en tidigare version, vilket gör det tryggt att publicera ändringar på en sajt som redan är live.

### Redirects

Redirects är regler som skickar besökare och sökmotorer från en gammal adress till en ny. De ställs in i Site Settings under hosting, där du anger den gamla och den nya sökvägen. Med jokertecknet * kan en regel matcha hela mappar, och reglernas ordning avgör vilken som gäller först. Redirects är avgörande vid migrering.

### Custom Code

Custom Code är egen HTML, CSS eller JavaScript som läggs in i sajtens kod via projektinställningarna. Du väljer var koden ska placeras, om den ska gälla hela sajten eller vissa sidor och om den ska köras en gång eller vid varje sidbesök. Vanliga exempel är spårningsskript, verifieringskoder och strukturerad data i JSON-LD.

### Workspace

Workspace är den gemensamma miljö i Framer där ett team samlar sina projekt, hanterar fakturering och styr vilka medlemmar som har åtkomst. Ett företag bör se till att sajten ligger i ett workspace som företaget själv äger, även när någon annan bygger den, så att åtkomsten inte försvinner vid ett leverantörsbyte.

### Remix link

Remix link är en delbar länk som låter någon annan kopiera ett projekt eller en komponent till sitt eget workspace. Mottagaren får en självständig kopia och ingen åtkomst till originalet. Du skapar länken via File-menyn. Köpta mallar levereras ofta som en remix-länk efter betalning.

## Formulär och analys

Framer har inbyggda formulär och inbyggd statistik, så en vanlig marknadssajt klarar sig ofta utan externa verktyg för just de delarna.

### Forms

Forms är Framers inbyggda formulär som läggs in via Insert-menyn och designas direkt på sidan. Svaren kan skickas till e-post, Google Sheets eller en webhook, och det finns färdiga kopplingar till flera externa tjänster. Spamskydd och begränsning av antalet inskick ingår, så formuläret skyddas mot skräp utan extra verktyg.

### Analytics

Analytics är Framers inbyggda statistik som visar trafik och aktivitet på den publicerade sajten direkt i Framer. Utöver besök kan du spåra klick på länkar och inskickade formulär med ett tracking-id, spåra egna händelser med kod, sätta upp trattar och köra A/B-tester. Google Analytics går också att koppla på.

## SEO

Framer genererar mycket av den tekniska SEO-grunden automatiskt. De två begrepp som oftast behöver förklaras är sitemap och canonical, eftersom de sköts i bakgrunden. Mer om helheten finns i vår [SEO-guide för Framer](/blog/framer-seo-guide.html).

### Sitemap

Sitemap är en XML-fil som listar sajtens sidor så att sökmotorer hittar dem. Framer skapar och uppdaterar den automatiskt varje gång du publicerar, och den nås genom att lägga till /sitemap.xml efter domänen. Filen kan skickas in i Google Search Console för att snabba på indexeringen av nya sidor.

### Canonical URL

Canonical URL är den adress som talar om för sökmotorer vilken version av en sida som ska indexeras när samma innehåll finns på flera adresser. Framer sätter canonical-taggar automatiskt på alla sidor. För särskilda behov går det att ange en egen canonical-adress i sidans inställningar, till exempel när innehåll publiceras på flera ställen.

## Interaktion och animation

Framer bygger animationer på biblioteket Motion, och det mesta går att ställa in utan kod. Begreppen här är de namn Framer använder i effektpanelen.

### Effects

Effects är Framers samlingsnamn för animationer och interaktioner som läggs på lager via egenskapspanelen. Hit hör bland annat effekter när ett element dyker upp, hover- och tryckeffekter, loopar och scrollstyrda effekter. Effekterna ställs in med värden för start och slut samt tid, fördröjning och easing.

### Appear Effect

Appear Effect är en animation som spelas när ett element blir synligt på skärmen, oftast när besökaren scrollar ner till det. Typiska varianter är att elementet tonas in, glider in, skalas upp eller går från suddigt till skarpt. Du styr när i fönstret effekten startar samt tid, fördröjning och easing. Mer om detta i [guiden om animationer i Framer](/blog/framer-animationer-interactions.html).

### Scroll Transforms

Scroll Transforms är en effekt som omvandlar scrollning till gradvisa förändringar av ett lagers position, skala, rotation eller opacitet. Du väljer ett start- och slutläge i sidans scrollområde, och lagret förändras steg för steg medan besökaren scrollar. Det används för parallax och element som rör sig i takt med sidan.

### Scroll Sections

Scroll Sections är namngivna delar av en sida som andra interaktioner kan rikta in sig på. Ett vanligt användningsområde är en navigering som byter variant, till exempel färg, beroende på vilken sektion besökaren befinner sig i. Du namnger sektionerna och kopplar sedan varje variant till rätt sektion.

### Page Effects

Page Effects är Framers funktion för övergångar mellan sidor, det många kallar page transitions. Du bestämmer hur den nuvarande sidan lämnar och hur nästa sida dyker upp, antingen för alla sidor eller för en viss sida. Man utgår från en förinställning och justerar sedan in- och utgång samt övergångens inställningar.

### Triggers

Triggers är en funktion som låter den publicerade sajten reagera på besökarens beteende genom att visa en overlay eller byta variant på en Smart Component. En trigger består av en handling, villkor som URL-parametrar, cookies eller schema, och interaktioner som väntetid, scrollning eller exit intent. Triggers ingår i Framers tillägg Convert.

## Lokalisering

Med lokalisering kan en Framer-sajt finnas på flera språk i samma projekt. Framer sköter lang- och hreflang-taggarna automatiskt. Hur du lägger upp en flerspråkig sajt beskriver vi i [guiden om flerspråkiga sajter i Framer](/blog/framer-flersprakiga-sajter.html).

### Locale

Locale är en språkversion av sajten, där varje locale motsvarar ett språk med en valfri region. Du lägger till locales i lokaliseringsvyn, där alla översättningsbara texter och bilder samlas utan att projektet behöver dupliceras. Översättning kan göras för hand eller med Framers inbyggda AI-översättning, och sidornas adresser kan också översättas.

### Automatic Locale

Automatic Locale är en funktion som skickar besökare till rätt språk- eller regionversion av sajten. Framer avgör det utifrån webbläsarens språkinställningar i kombination med enhetens tidszon. Funktionen passar när sajten har besökare från flera länder, men den bör kombineras med en synlig språkväljare så att besökaren själv kan byta.

## AI och plugins

Framer har AI inbyggt i editorn och ett eget ekosystem av plugins och mallar. Namnen har ändrats flera gånger, så här beskriver vi både dagens och tidigare begrepp. En fördjupning finns i [guiden om Framer AI](/framer-ai.html).

### Framer Agent

Framer Agent är den AI-agent som är inbyggd i Framers canvas och som skapar och ändrar sidor, sektioner, texter och bilder direkt i projektet utifrån en beskrivning. Resultatet blir vanliga redigerbara lager, inte en låst yta. Framer låter också externa AI-verktyg styra agenten och erbjuder återanvändbara instruktioner kallade Skills.

### Wireframer

Wireframer är Framers AI-verktyg för att generera responsiva layouter på canvasen från en textbeskrivning. Från en prompt skapas sektioner med navigering, rubriker, bildplatshållare och text, som sedan redigeras som vanligt. Framers egen produktsida för Wireframer leder numera till sidan om AI-agenten, där förmågan att generera layouter ingår.

### Workshop

Workshop är Framers AI-verktyg för att skapa komponenter, inklusive kodkomponenter, genom att beskriva dem i en chatt. Det lanserades i maj 2025 och skapar komponenter med färdiga Property Controls, till exempel kalkylatorer, formulär i flera steg och bildjämförelser. Precis som Wireframer leder Workshops produktsida numera till sidan om Framers AI-agent.

### Plugins

Plugins är små appar som körs inuti Framer-editorn och utökar vad du kan göra i projektet, till exempel importera innehåll, synka CMS-data eller hantera bilder. Tekniskt är ett plugin en liten webbplats som körs i en säker iframe och pratar med editorn via Framers API. Plugins behöver inte installeras utan öppnas direkt.

### Marketplace

Marketplace är Framers egen marknadsplats för mallar, plugins och komponenter från både Framer och fristående kreatörer. Gratis mallar kopieras direkt till ditt workspace, medan köpta mallar levereras med en remix-länk efter betalningen. Allt som hämtas från Marketplace kan sedan redigeras som ett vanligt Framer-projekt.

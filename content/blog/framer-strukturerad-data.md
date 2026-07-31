---
slug: framer-strukturerad-data
page_id: post16
category: seo
date: 2026-07-31
date_modified: 2026-07-31
date_display: 31 juli 2026
readtime: 9 min läsning
thumbnail: thumb-framer-jsonld.svg
og_image: og-default.png
title: "Strukturerad data i Framer (2026): Så lägger du till JSON-LD-schema"
meta_title: "Strukturerad data i Framer (2026): Så lägger du till JSON-LD — FramerExpert.se"
description: "Så lägger du till strukturerad data (JSON-LD) i Framer 2026 — vilka scheman som ger rich results, hur du lägger in dem via custom code, och hur du validerar."
og_description: "Så lägger du till JSON-LD-schema i Framer — vilka scheman ger rich results, var du klistrar in dem, och hur du validerar."
excerpt: "Vilka scheman ger rich results, hur du lägger in dem via custom code, och hur du validerar utan att bryta något."
intro: "Strukturerad data är hur du berättar för Google exakt vad en sida innehåller — att det här är en artikel, det här en FAQ, det här ett företag. Rätt använt ger det rich results i sökresultatet. Framer har inget inbyggt schemaverktyg, men du lägger till JSON-LD via custom code. Så här gör du, schema för schema."
related: framer-seo-guide, framer-seo-checklista
faqs:
  - q: Behöver jag strukturerad data om Framer redan lägger till metadata?
    a: Framer lägger till grundläggande meta och Open Graph automatiskt, men inte artikelspecifik strukturerad data som BlogPosting eller FAQPage. Vill du ha rich results som FAQ-dropdowns eller artikelhuvuden lägger du till JSON-LD själv.
  - q: Var lägger jag JSON-LD i Framer?
    a: I page settings under custom code, i fältet för sidans head. Klistra in ett script-block med type application/ld+json. Du kan lägga det per sida eller globalt för scheman som gäller hela sajten, som Organization.
  - q: Ger strukturerad data automatiskt rich results?
    a: Nej. Korrekt schema gör en sida berättigad till rich results, men Google avgör själv om och när de visas. Felfri och relevant markup ökar chansen, men garanterar inget.
  - q: Vad händer om min JSON-LD har fel?
    a: Felformaterad JSON-LD visas inte bara inte — den kan få Google att misstro övrig markup på sidan. Kör alltid varje sida genom Rich Results Test innan du publicerar.
---

## Vad strukturerad data faktiskt gör

Strukturerad data ändrar inte hur sidan ser ut för besökaren. Den lägger till ett osynligt lager, skrivet i formatet JSON-LD, som beskriver innehållet på ett sätt sökmotorer förstår exakt. I stället för att gissa att en text är en artikel med författare och datum får Google det serverat.

Belöningen är rich results: FAQ-dropdowns direkt i sökträffen, artikelhuvuden med bild och datum, brödsmulor i stället för en naken URL, stjärnbetyg på produkter. De tar mer plats, sticker ut och får fler klick.

Framer lägger till grundläggande meta och Open Graph på egen hand, men inte den här typen av sidspecifik markup. Den lägger du till själv, och det är enklare än det låter. Strukturerad data är ett steg i den bredare [Framer SEO-guiden](/blog/framer-seo-guide.html) — här går vi på djupet i just den delen.

## Så lägger du in JSON-LD i Framer

Du arbetar i page settings. Öppna sidan, gå till custom code och hitta fältet för sidans `<head>`. Där klistrar du in ett `<script type="application/ld+json">`-block med ditt schema inuti.

Två saker att hålla reda på:

- **Per sida eller globalt.** Scheman som beskriver en specifik sida — artikel, FAQ, produkt — läggs på just den sidan. Scheman som gäller hela sajten, som `Organization`, lägger du i site settings så att de finns överallt.
- **Ett block per schema, eller en graf.** Har en sida flera scheman kan du antingen lägga flera script-block eller samla dem i en `@graph`-array. Båda fungerar; flera block är enklast att överblicka.

## BlogPosting: för artiklar

Det här är schemat du använder mest om du bloggar. Det talar om att sidan är en artikel och ger Google rubrik, bild, datum och författare i strukturerad form.

De viktigaste egenskaperna att fylla i:

- `headline` — artikelns rubrik
- `image` — URL till en representativ bild, gärna 1200 px bred
- `datePublished` och `dateModified` — i ISO-format, `2026-07-31`
- `author` — ett `Person`- eller `Organization`-objekt med namn
- `publisher` — organisationen bakom sajten, med logotyp
- `mainEntityOfPage` — sidans kanoniska URL

Håll `dateModified` uppdaterat när du faktiskt reviderar innehållet. Färskhet är en signal, och ett ärligt datum är bättre än ett påhittat.

## FAQPage: för frågor och svar

`FAQPage` är det schema som ger snabbast synlig effekt. Har en sida en sektion med frågor och svar kan Google visa dem som utfällbara rader direkt i sökträffen.

Strukturen är en lista av `Question`-objekt, där varje fråga har en `acceptedAnswer` av typen `Answer` med själva svarstexten. Två regler avgör om det fungerar:

- Frågorna och svaren måste **synas på sidan** för besökaren, inte bara i markup. Dold FAQ-markup bryter mot Googles riktlinjer.
- Svaren ska vara **äkta svar**, inte länkar eller uppmaningar. Skriv dem så att de är begripliga lösryckta.

Just den här sajten använder `FAQPage` på de flesta artiklar — inklusive den du läser nu.

## BreadcrumbList: för navigering

`BreadcrumbList` ersätter den nakna URL:en i sökträffen med en läsbar sökväg, till exempel Hem › Blogg › Strukturerad data. Det ser proffsigare ut och hjälper Google förstå sajtens hierarki.

Schemat är en ordnad lista av `ListItem`, var och en med `position`, `name` och `item` (URL). Låt ordningen spegla den faktiska vägen till sidan, och se till att namnen matchar dina riktiga sidtitlar.

## Organization: för hela sajten

`Organization` läggs en gång, globalt, och beskriver företaget bakom sajten. Det kopplar ihop namn, logotyp och sociala kanaler, och är det som kan ge dig en kunskapspanel med rätt logotyp.

Fyll i `name`, `url`, en `logo` (URL till en kvadratisk logotyp) och `sameAs` med länkar till dina profiler på LinkedIn, Instagram och liknande. Det är ett litet schema med lång räckvidd.

## När du är redo för mer

När grunderna sitter finns fler scheman att lägga till, men bara när de speglar vad sidan faktiskt är:

- `Product` och `Review` för produkt- och tjänstesidor med betyg
- `HowTo` för stegvisa guider
- `LocalBusiness` om du har en fysisk verksamhet med adress
- `VideoObject` om video är en central del av sidan

Undvik att stapla schema för sakens skull. Google straffar irrelevant eller vilseledande strukturerad data, så varje schema du lägger till ska motsvara något som verkligen finns på sidan.

## Validera innan du publicerar

Det här steget hoppar folk över, och det är just där det går fel. Felformaterad JSON-LD visas inte bara inte — den kan få Google att misstro övrig markup på sidan.

Kör varje ny sida genom [Googles Rich Results Test](https://search.google.com/test/rich-results). Den säger både om schemat är giltigt och vilka rich results sidan blir berättigad till. För en bredare kontroll finns [Schema Markup Validator](https://validator.schema.org). När sidan väl är live kan du följa upp under Förbättringar i Search Console, som rapporterar fel och varningar på skarpa sidor.

Rätt strukturerad data är inte ett rankningstrick i sig, men det är skillnaden mellan en grå länk och en träff som tar plats och drar blicken till sig.

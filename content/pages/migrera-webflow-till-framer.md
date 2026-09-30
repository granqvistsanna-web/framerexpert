---
slug: migrera-webflow-till-framer
page_id: guideWebflowMigrering
date: 2026-09-30
date_modified: 2026-09-30
date_display: 30 september 2026
thumbnail: thumb-migrera-webflow-till-framer.svg
og_image: og-default.png
title: "Migrera från Webflow till Framer (2026): Steg för steg utan att tappa ranking"
meta_title: "Migrera Webflow till Framer (2026): Steg för steg"
description: "Så flyttar du en Webflow-sajt till Framer: URL-inventering, CSV-export av CMS, redirects, DNS och uppföljning i Search Console – utan att tappa ranking."
og_description: "URL-inventering, CMS-export, redirects och DNS – så flyttar du från Webflow till Framer utan att tappa ranking."
excerpt: "Hela flytten från Webflow till Framer i rätt ordning: inventering, CSV-export, ombyggnad, redirects, DNS och uppföljning efter lansering."
intro: "Webflow och Framer liknar varandra mer än WordPress och Framer gör. Båda bygger visuellt, båda har CMS och hosting inbyggt. Därför går en migrering ofta smidigt, men det finns ingen knapp som flyttar sajten åt dig. Här går vi igenom när flytten är värd besväret, hur du gör den steg för steg och var rankingen brukar tappas om ordningen blir fel."
related: migrera-wordpress-till-framer, framer-vs-webflow
faqs:
  - q: Finns det en officiell import från Webflow till Framer?
    a: Nej. Framer har ingen officiell importer som flyttar en hel Webflow-sajt. CMS-innehåll förs över genom att exportera varje Webflow-collection som CSV och importera den i Framer, medan sidor byggs om i Framer, bilder laddas ner och upp manuellt och interaktioner skapas på nytt.
  - q: Tappar jag ranking när jag flyttar från Webflow till Framer?
    a: Inte om grundarbetet görs. Behåll samma URL-struktur där det går, lägg 301-redirects för alla adresser som ändras innan DNS byts, för över titlar och metabeskrivningar och följ upp i Google Search Console de första veckorna. En kortare svängning i placeringarna är normal vid alla plattformsbyten.
  - q: Kan jag behålla samma URL:er som på Webflow?
    a: Oftast ja. I Webflow ligger CMS-sidor under en mapp, till exempel /post/artikelns-slug. I Framer väljer du själv sökvägen för CMS-sidan, så du kan sätta den till /post/:slug och få exakt samma adresser. Då behövs inga redirects för just de sidorna.
  - q: Följer Webflow-interaktioner med till Framer?
    a: Nej. Interaktioner och animationer från Webflow kan inte föras över. De byggs om med Framers egna effekter, varianter och övergångar, vilket ofta ger enklare och lättare animationer än originalet.
  - q: Vad kostar det att migrera från Webflow till Framer?
    a: På svenska marknaden kostar en migrering oftast 25 000–75 000 kr hos en frilansare och 50 000–150 000 kr hos en byrå. Priset styrs mest av antal sidor och CMS-poster, hur mycket av designen som görs om och hur många integrationer som ska kopplas på nytt.
  - q: Hur skiljer sig en flytt från Wix eller Squarespace?
    a: Exportmöjligheterna är mer begränsade. Wix låter dig exportera CMS-samlingar som CSV men inte hela sajten, och Squarespace exporterar bara viss innehållstyp till en XML-fil avsedd för WordPress. Räkna med mer manuellt arbete med sidor och bilder, medan redirects och DNS görs på samma sätt som från Webflow.
---

## Är det värt att flytta från Webflow till Framer?

Flytten är värd det när ni vill att marknadsavdelningen ska kunna bygga och ändra sidor själva, när sajten består av sidor, blogg och case, och när Webflows sätt att arbeta med klasser känns tyngre än det behöver vara. Den är sällan värd det om sajten fungerar bra, rankar bra och ingen i teamet upplever Webflow som ett hinder. En migrering kostar alltid tid, och den ger ingen SEO-vinst i sig.

Tecken på att flytten är rätt:

- Redaktörerna är beroende av en utvecklare för enkla layoutändringar.
- Designen ska ändå göras om, så ombyggnaden behövs oavsett plattform.
- Sajten är en marknadssajt med normalstort CMS, formulär och animationer.

Tecken på att ni bör vänta:

- Sajten har en omfattande e-handel eller medlemsfunktioner byggda i Webflow.
- CMS:et har väldigt många poster och komplexa kopplingar mellan samlingar. Kontrollera först vad ert Framer-abonnemang tillåter, eftersom antal samlingar och poster styrs av planen. Se [vår genomgång av Framers priser](/blog/framer-pris.html).
- Ni saknar tid att följa upp i Search Console efter lansering.

En bredare jämförelse av plattformarna finns i [Framer vs Webflow](/blog/framer-vs-webflow.html). Kommer ni från WordPress i stället gäller i stort sett samma metod, men exporten ser annorlunda ut. Den beskrivs i [guiden för WordPress till Framer](/blog/migrera-wordpress-till-framer.html).

> ### Det här flyttar inte automatiskt
> - Det finns ingen officiell import från Webflow till Framer.
> - Sidor och layout byggs om i Framer.
> - Bilder och andra filer laddas ner och upp igen manuellt.
> - Interaktioner följer inte med och skapas om med Framers egna verktyg.
> - CMS-innehåll förs över via CSV, en collection i taget.

## Webflow-begrepp och deras motsvarighet i Framer

Det mesta i Webflow har en direkt motsvarighet i Framer, men arbetssättet skiljer sig. Den största skillnaden är att Framer inte bygger på CSS-klasser. Tabellen hjälper dig att översätta när du planerar ombyggnaden.

| Webflow | Framer | Att tänka på |
| --- | --- | --- |
| Collections | CMS Collections | Skapa samlingar och fält i Framer innan du importerar |
| Collection List | Collection List | Fungerar på samma sätt, med filter, sortering och gräns för antal poster |
| Symbols / Components | Components | Varianter i Framer ersätter ofta flera Webflow-komponenter |
| Interactions | Effects och interaktioner | Byggs om med appear-, scroll- och hover-effekter samt varianter |
| Classes och combo classes | Styles och komponenter | Färg- och textstilar plus komponenter tar över rollen |
| Designer och Editor | Canvas och redaktörsbehörighet | Redaktörer kan få begränsad åtkomst till innehåll |
| Hosting-inställningar | Site Settings | Domän, redirects, SEO och egen kod samlas här |

## Steg 1: Inventera alla URL:er

Börja med en komplett lista över alla adresser sajten har i dag. Den listan styr både redirects och kontrollen efter lansering, så den behöver vara fullständig.

Hämta adresserna från två håll. Kör en crawl av sajten med ett crawlverktyg för att få allt som länkas internt. Exportera sedan sidor med visningar eller klick från Google Search Console, eftersom den visar adresser som Google känner till men som kanske inte längre länkas. Jämför listorna och lägg till sådant som bara finns i den ena.

Markera samtidigt vilka sidor som ska flytta, vilka som ska slås ihop och vilka som kan tas bort. Gallra hellre nu än efter att allt är ombyggt.

## Steg 2: Exportera CMS-innehållet som CSV

Webflow exporterar CMS-innehåll per collection. Öppna Collections-panelen, välj en collection och klicka på Export. Upprepa för varje samling. Två saker är bra att veta: arkiverade poster följer med i exporten, och bara det språk som är valt för tillfället exporteras. Har sajten flera språk behöver du exportera en gång per språk, eller hantera översättningarna separat.

I Framer skapar du först samlingarna och fälten, sedan importerar du via CMS-importen eller det officiella pluginet CSV Import, där du mappar varje kolumn mot rätt fält. Ordningen spelar roll när samlingar refererar till varandra. Importera de samlingar som det refereras till först, till exempel kategorier och författare, och därefter de samlingar som pekar på dem. Räkna med att fält med flera referenser (multi-reference) kan behöva kopplas ihop för hand efteråt.

Rensa bort arkiverade poster ur CSV-filen innan import om de inte ska publiceras. Läs mer om hur samlingar och fält bör byggas i [vår guide till Framer CMS](/blog/framer-cms-i-praktiken.html).

## Steg 3: Hantera formaterad text och bilder

Kontrollera formaterad text och bilder noga, för det är här importen oftast brister. Rubriker, listor och länkar i Webflows rich text-fält följer vanligtvis med som formatering, men inbäddade element, egna kodblock och specialtecken behöver stickprovas.

Bilderna ligger kvar på Webflows servrar tills sajten stängs. Ladda ner originalen och ladda upp dem i Framer, så att sajten inte är beroende av gamla filadresser. Passa på att komprimera och ge bilderna beskrivande alt-texter. Gå igenom ett urval poster från varje samling och jämför med originalet innan du fortsätter.

## Steg 4: Bygg om designen med stilar och komponenter

Designen byggs om i Framer, och det lönar sig att göra det ordentligt. Skapa färgstilar och textstilar först, bygg återkommande delar som komponenter med varianter och sätt upp brytpunkterna innan sidorna fylls med innehåll.

Försök inte återskapa Webflows klasstruktur. Det som i Webflow var en combo class blir i Framer oftast en variant på en komponent eller en egen textstil. För sektioner där du vill ha en snabb utgångspunkt listar Framers egen guide för Webflow-flytt även Framer Agents och Server API som hjälpmedel, men räkna med att strukturen ändå behöver ses över för hand.

## Steg 5: Skapa interaktionerna på nytt, native i Framer

Webflow-interaktioner följer inte med, så varje animation byggs om. Använd i första hand Framers inbyggda effekter: appear-effekter vid scroll, hover- och pressade lägen via varianter och övergångar mellan varianter. Kod behövs bara när beteendet inte går att uttrycka på canvasen.

Se det som ett tillfälle att rensa. Många Webflow-sajter har lager av animationer som gör sidan långsammare utan att tillföra något. Mer om hur effekterna fungerar finns i [guiden till animationer och interaktioner i Framer](/blog/framer-animationer-interactions.html).

## Steg 6: Koppla formulär och integrationer

Lista alla formulär och vart svaren skickas i dag, och bygg om dem i Framer med samma fält. Framers formulär kan skicka svar via e-post eller vidare till andra tjänster. Kontrollera också spårningsskript, cookiebanner, chattverktyg och annat som ligger som egen kod i Webflow, och lägg in det på nytt i Framers inställningar för egen kod. Testa varje formulär med riktiga inskick innan lansering. Automatiseringar går vi igenom i [guiden till formulär och automatisering](/blog/framer-formular-automatisering.html).

## Steg 7: För över SEO-fält, meta och OG

Titlar, metabeskrivningar och delningsbilder måste föras över aktivt. För statiska sidor sätts de per sida i sidinställningarna. För CMS-sidor skapar du fält för SEO-titel, beskrivning och OG-bild i samlingen, importerar dem från CSV:n och kopplar dem till CMS-sidans SEO-inställningar.

Kontrollera också canonical-adresser, att sidor som inte ska indexeras är markerade och att strukturerad data som fanns på den gamla sajten läggs in igen. Hela listan finns i [vår SEO-checklista för Framer](/blog/framer-seo-checklista.html).

## Steg 8: Mappa redirects från gammal till ny URL

Det enklaste sättet att undvika redirects är att behålla adresserna. I Webflow ligger en collections sidor under en mapp, till exempel /post/artikelns-slug. I Framer väljer du fritt sökvägen för CMS-sidan, så sätt den till /post/:slug om du vill ha exakt samma adresser. Redirects behövs då bara för det som faktiskt ändras.

Redirects läggs upp under Site Settings, Hosting och Redirects. Framer stöder wildcard med *, fångade värden som återanvänds med :1 och :2 samt namngivna parametrar som :slug. Reglerna kan dras i önskad ordning, de gäller bara sökvägar på den aktuella domänen och de uppdateras inte automatiskt om du senare byter en sidas adress. Redirects kräver betalt abonnemang, se [prisguiden](/blog/framer-pris.html).

| Gammal URL (Webflow) | Ny URL (Framer) | Typ av regel |
| --- | --- | --- |
| /post/:slug | /blog/:slug | Namngiven parameter, en regel för alla inlägg |
| /services/* | /tjanster/:1 | Wildcard med fångat värde |
| /om-oss-2 | /om-oss | Enskild sida |
| /kampanj-var-2024 | / | Borttagen sida till närmaste relevanta sida |

Gå igenom inventeringen från steg 1 rad för rad och se till att varje adress antingen finns kvar eller har en regel. Undvik att peka borttagna sidor mot startsidan om det finns en bättre matchning.

## Steg 9: Byt DNS

När innehåll, SEO-fält och redirects är på plats pekar du domänen mot Framer. Lägg till domänen i Framer, uppdatera DNS-posterna hos din domänleverantör och ta bort de gamla posterna som pekar mot Webflow. Säg inte upp Webflow-planen förrän den nya sajten är live och kontrollerad, så att du kan gå tillbaka om något går fel. Hur du gör själva kopplingen beskriver vi i [guiden om att koppla en domän till Framer](/koppla-doman-framer.html).

## Steg 10: Följ upp i Search Console efter lansering

Skicka in Framers sitemap i Google Search Console samma dag som sajten går live. Följ sedan rapporten över sidindexering och håll särskilt koll på 404-fel och sidor som plötsligt räknas som omdirigerade eller exkluderade.

Testa ett urval av de gamla adresserna direkt efter lansering och se att de hamnar rätt. Jämför klick och visningar veckovis med perioden före flytten. Små svängningar är normala. Tappar en viss sida mycket är det oftast en redirect som saknas eller en titel som inte följt med.

## Vad kostar en migrering från Webflow?

En migrering kostar oftast 25 000–75 000 kr hos en frilansare och 50 000–150 000 kr hos en byrå på svenska marknaden. Det som driver priset är antal sidor och CMS-poster, om designen görs om samtidigt och hur många formulär och integrationer som ska kopplas på nytt. Till det kommer Framers abonnemang.

| Upplägg | Frilansare | Byrå |
| --- | --- | --- |
| Migrering | 25 000–75 000 kr | 50 000–150 000 kr |
| Timpris för tillägg | 1 000–1 500 kr | 1 400–2 200 kr |

Be om en offert där inventering, CMS-import, redirects och uppföljning efter lansering redovisas som egna delar. Då ser du vad som ingår.

## Vanliga misstag

- **DNS byts innan redirects är klara.** Google hinner registrera 404-fel på några timmar.
- **URL-strukturen ändras i onödan.** Framer kan spegla Webflows mappar, så använd det.
- **Arkiverade poster publiceras av misstag** eftersom de följer med i CSV-exporten.
- **Bara ett språk flyttas** för att exporten bara tar med det valda språket.
- **Referensfält kopplas inte om** efter importen, så listor och filter visar fel innehåll.
- **Bilderna ligger kvar på Webflow** och slutar fungera när planen sägs upp.
- **Gamla animationer kopieras rakt av** i stället för att förenklas med Framers egna effekter.

## Kommer du från Wix eller Squarespace?

Metoden är densamma, men exporten är mer begränsad och mer arbete blir manuellt. Inventering, redirects, DNS och uppföljning görs precis som ovan.

Wix låter dig exportera CMS-samlingar som CSV, men hela sajten kan inte exporteras eftersom den är byggd för att köras på Wix egen plattform. Blogginlägg kan enligt Wix hjälpcenter inte exporteras direkt till andra plattformar, så räkna med att föra över dem på annat sätt. Squarespace kan exportera visst innehåll till en XML-fil avsedd för WordPress, men långt ifrån allt följer med och bara en bloggsida exporteras. Den filen behöver ofta bearbetas till CSV innan den kan importeras i Framer. Kontrollera alltid plattformens aktuella hjälpsidor innan du planerar flytten, eftersom exportfunktionerna ändras över tid.

## Sammanfattning

En flytt från Webflow till Framer är tekniskt rak men kräver disciplin. Inventera alla adresser, exportera CMS-innehållet per collection, bygg om designen med stilar och komponenter, skapa interaktionerna på nytt och behåll URL-strukturen där det går. Lägg redirects för resten innan DNS byts och följ upp i Search Console tills trafiken har stabiliserat sig. Gör du stegen i den ordningen följer rankingen med.

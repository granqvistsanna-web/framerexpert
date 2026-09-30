---
slug: framer-tillganglighet
page_id: guideTillganglighet
date: 2026-09-30
date_modified: 2026-09-30
date_display: 30 september 2026
thumbnail: thumb-framer-tillganglighet.svg
og_image: og-default.png
title: "Tillgänglighet i Framer (2026): WCAG, tillgänglighetslagen och vad du måste göra"
meta_title: "Tillgänglighet i Framer (2026): WCAG och lagkraven"
description: "Vem omfattas av tillgänglighetslagen, vad Framer löser åt dig och vad du måste göra själv. Vanliga fallgropar, testmetod och checklista för WCAG."
og_description: "Tillgänglighetslagen, WCAG och Framer – vem som omfattas, vad plattformen löser och vad du måste göra själv."
excerpt: "Vem omfattas av tillgänglighetslagen, vilka verktyg Framer har för tillgänglighet och vad du fortfarande måste kontrollera själv."
intro: "Sedan den 28 juni 2025 gäller nya krav på tillgänglighet för bland annat e-handel och banktjänster i Sverige. Framer har flera inbyggda verktyg som gör det lättare att bygga en tillgänglig sajt, men plattformen kan inte fatta besluten åt dig. Här går vi igenom vilka som omfattas av lagen, vad Framer löser, vad du måste göra själv och hur du testar resultatet."
related: responsiv-typografi-framer, framer-ecommerce-guide
faqs:
  - q: Omfattas min Framer-sajt av tillgänglighetslagen?
    a: Lagen (2023:254) om vissa produkters och tjänsters tillgänglighet gäller sedan 28 juni 2025 för bland annat e-handel, banktjänster, elektroniska kommunikationstjänster, persontransporter, e-böcker och audiovisuella medietjänster. En vanlig företagssajt som bara presenterar verksamheten omfattas normalt inte, men en webbshop gör det. Mikroföretag med färre än tio anställda och högst två miljoner euro i årsomsättning eller balansomslutning är undantagna för tjänster.
  - q: Vilken standard ska en tillgänglig webbplats följa?
    a: I praktiken utgår man från den europeiska standarden EN 301 549, som för webbinnehåll hänvisar till WCAG 2.1 på nivå AA. För offentlig sektor är det uttryckligen den nivån som gäller enligt DOS-lagen. För privata tjänster under tillgänglighetslagen är WCAG 2.1 AA det riktmärke de flesta arbetar efter.
  - q: Gör Framer min sajt tillgänglig automatiskt?
    a: Nej. Framer har verktyg som alt-texter, semantiska taggar för rubriker och sektioner, ARIA-etiketter, anpassad tabbordning, inställning för reducerad rörelse och språkattribut. Men kontrast, rubrikstruktur, beskrivande texter, formulär och egna kodkomponenter måste du själv se till att de fungerar.
  - q: Hur testar jag tillgängligheten på en Framer-sajt?
    a: Börja med att navigera hela sajten med bara tangentbordet. Testa sedan med en skärmläsare som VoiceOver på Mac eller NVDA på Windows, kör en automatisk kontroll med axe eller Lighthouse, mät kontrasten på text och knappar och zooma sidan till 200 procent. Automatiska verktyg hittar bara en del av felen, så de manuella testerna behövs.
  - q: Vad är en tillgänglighetsredogörelse?
    a: En tillgänglighetsredogörelse är en sida som beskriver hur tillgänglig webbplatsen är, vilka brister som finns och hur besökare kan påtala problem. Den är obligatorisk för offentlig sektor enligt DOS-lagen och tillsynen sköts av DIGG. För privata verksamheter är en liknande sida ett bra sätt att visa hur ni arbetar med tillgänglighet.
---

## Vem omfattas av tillgänglighetslagen?

Lagen omfattar vissa utpekade tjänster, främst e-handel, banktjänster, elektroniska kommunikationstjänster, persontransporter, e-böcker och audiovisuella medietjänster. Den heter lag (2023:254) om vissa produkters och tjänsters tillgänglighet, kompletteras av förordning (2023:676) och är Sveriges genomförande av EU:s tillgänglighetsdirektiv (European Accessibility Act, direktiv 2019/882). Kraven började gälla den 28 juni 2025.

En vanlig företagssajt som presenterar tjänster, visar case och har ett kontaktformulär faller normalt utanför. Säljer du varor eller tjänster direkt på sajten till konsumenter ser det annorlunda ut. Då räknas det som e-handel och sajten ska uppfylla kraven.

Mikroföretag som tillhandahåller tjänster är undantagna. Det gäller företag med färre än tio anställda och en årsomsättning eller balansomslutning på högst två miljoner euro. Båda villkoren måste vara uppfyllda, och undantaget gäller tjänster, inte produkter.

| Verksamhet | Omfattas? | Tillsyn |
| --- | --- | --- |
| Företagssajt utan försäljning | Normalt inte | – |
| E-handel till konsumenter | Ja, om inte mikroföretag | PTS |
| Banktjänster | Ja | PTS |
| Elektroniska kommunikationstjänster | Ja | PTS |
| Persontransporter (webbplats och app) | Ja | Konsumentverket |
| Terminaler för persontransport | Ja | Transportstyrelsen |
| Audiovisuella medietjänster | Ja | Mediemyndigheten |
| E-böcker | Ja | Myndigheten för tillgängliga medier |
| Offentlig sektor | Ja, enligt DOS-lagen | DIGG |

Det här är ingen juridisk rådgivning. Är du osäker på om din verksamhet omfattas, läs [PTS vägledning om lagen](https://pts.se/digital-inkludering/lagen-om-vissa-produkters-och-tjansters-tillganglighet/) eller fråga en jurist. Övergångsregler och sanktioner går vi inte in på här.

### Offentlig sektor har egna regler

Myndigheter, kommuner, regioner och andra offentliga aktörer omfattas i stället av [lagen (2018:1937) om tillgänglighet till digital offentlig service](https://www.digg.se/analys-och-uppfoljning/lagen-om-tillganglighet-till-digital-offentlig-service-dos-lagen), ofta kallad DOS-lagen. Där är kraven tydligare formulerade. Webbplatsen ska följa EN 301 549, vilket för webbinnehåll innebär WCAG 2.1 på nivå AA, och det ska finnas en publicerad tillgänglighetsredogörelse. DIGG har tillsynen.

## Vilken standard gäller i praktiken?

I praktiken utgår man från WCAG 2.1 på nivå AA, via den europeiska standarden EN 301 549. Det är den nivå offentlig sektor måste följa och det riktmärke de flesta privata verksamheter också arbetar efter.

WCAG är uppbyggt kring fyra principer. Innehållet ska gå att uppfatta, hantera, förstå och tolka med olika hjälpmedel. Varje princip bryts ner i konkreta krav, till exempel att bilder har textalternativ, att allt går att nå med tangentbord och att text har tillräcklig kontrast mot bakgrunden.

> ### Några krav att ha i huvudet
> - **Kontrast:** minst 4,5:1 för vanlig text och 3:1 för stor text, ikoner och gränssnittskomponenter.
> - **Tangentbord:** allt som går att klicka på ska gå att nå och använda utan mus, med synligt fokus.
> - **Textalternativ:** bilder som bär information behöver en alt-text som beskriver innehållet.
> - **Förstoring:** sidan ska fungera när texten förstoras till 200 procent.
> - **Rörelse:** animationer ska inte hindra läsning och ska gå att stänga av.

## Vad Framer löser och vad du måste göra själv

Framer ger dig verktygen, men du måste använda dem rätt. Plattformen har inbyggt stöd för det mesta som behövs på en vanlig marknadssajt. Resultatet beror ändå på hur sajten är designad och uppbyggd. Framer beskriver funktionerna i sin [guide till webbtillgänglighet](https://www.framer.com/help/articles/guide-to-web-accessibility-in-framer/).

| Område | Det Framer ger dig | Det du måste göra |
| --- | --- | --- |
| Bilder | Fält för alt-text i tillgänglighetspanelen | Skriva beskrivande alt-texter och lämna dekorativa bilder tomma |
| Rubriker | [Textstilar med semantiska taggar](https://www.framer.com/help/articles/text-styles-and-semantic-tags/) h1–h6 och p, som går att ändra per instans | Välja nivå efter struktur, en h1 per sida och inga hopp i ordningen |
| Sidstruktur | Taggar för frames: Article, Header, Footer, Nav och Section | Sätta rätt tagg på rätt del av sidan |
| Tangentbord | Anpassad tabbordning | Kontrollera att ordningen följer sidans logik och att fokus syns |
| Etiketter | [ARIA-etiketter](https://www.framer.com/help/articles/improving-accessibility-with-aria-labels/) på element | Ge ikonknappar och otydliga länkar en etikett som beskriver funktionen |
| Rörelse | Inställning för reducerad rörelse som stänger av parallax, transform- och layoutanimationer | Slå på den och kontrollera att sidan fungerar utan animationerna |
| Språk | [Standardspråk](https://www.framer.com/help/articles/default-language-settings/) under Settings → General som sätter lang-attributet, och som byts per språkversion med lokalisering | Välja rätt språk, även på varje översatt version |
| Färg | Färgstilar i projektet | Mäta kontrast på alla kombinationer, även hover- och fokuslägen |
| Formulär | Inbyggda formulärfält | Synliga etiketter, tydliga felmeddelanden och tangentbordsstöd |

Två saker bör du testa själv i stället för att utgå från att de finns. Det ena är hur fokusmarkeringen ser ut när man tabbar genom sajten, särskilt på knappar och länkar med egen design. Det andra är om det finns en hopplänk som låter tangentbordsanvändare gå direkt till huvudinnehållet, och hur huvudinnehållet är märkt i den publicerade koden. Kontrollera det på den publicerade sajten.

Har sajten flera språk hänger språkinställningen ihop med lokaliseringen. Vi beskriver det mer i [guiden till flerspråkiga sajter i Framer](/blog/framer-flersprakiga-sajter.html).

## Vanliga fallgropar i Framer

De flesta tillgänglighetsfel på Framer-sajter kommer från designval, inte från plattformen. Här är de vi ser oftast.

### Text i bilder

En rubrik eller ett erbjudande som ligger i en bild går inte att läsa med skärmläsare, förstoras dåligt och syns inte för sökmotorer. Lägg texten som riktig text ovanpå bilden och använd alt-texten för att beskriva själva motivet.

### Låg kontrast i hover-lägen

Grundläget har ofta bra kontrast, men i hover-varianten byts färgen till något ljusare eller mer genomskinligt. Samma sak gäller inaktiva knappar, platshållartext i formulär och text ovanpå bilder. Mät varje variant, inte bara den som syns i designen.

### Ikonknappar utan etikett

En hamburgermeny, ett kryss eller en pil utan text läses upp som "knapp" utan sammanhang. Ge varje sådan knapp en ARIA-etikett som säger vad den gör, till exempel "Öppna meny" eller "Nästa bild".

### Formulär utan etiketter

Formulär där fältets namn bara finns som platshållartext blir svåra att använda. Texten försvinner när man börjar skriva och läses inte alltid upp. Använd synliga etiketter och kontrollera att felmeddelanden går att uppfatta utan färg. Mer om formulär finns i [guiden till formulär och automatisering](/blog/framer-formular-automatisering.html).

### Video som spelas upp automatiskt

Bakgrundsvideo med rörelse kan störa läsning och orsaka obehag. Rörligt innehåll som startar automatiskt och pågår längre än några sekunder ska gå att pausa eller stoppa. Det enklaste är ofta att låta besökaren starta videon själv.

### Tunga scrollanimationer

Parallax, element som flyger in och text som byter plats när man scrollar kan ge yrsel och gör sidan svårare att följa. Slå på inställningen för reducerad rörelse i Framer och testa sajten med den aktiverad i operativsystemet. Vi går igenom hur animationerna fungerar i [guiden till animationer och interactions](/blog/framer-animationer-interactions.html).

### Rubriknivåer valda efter storlek

Det är lätt att välja h3 för att den har rätt storlek, fast den logiskt borde vara h2. Skärmläsaranvändare navigerar ofta via rubrikerna, så ordningen måste spegla innehållet. Styr utseendet med textstilen och välj taggen efter struktur. Hur du bygger en skala som fungerar på alla skärmar beskriver vi i [guiden till responsiv typografi](/blog/responsiv-typografi-framer.html).

### Kodkomponenter som inte fungerar med tangentbord

En egen kodkomponent, till exempel en karusell, ett filter eller en kalkylator, ärver inget tillgänglighetsstöd automatiskt. Den som bygger den måste använda rätt HTML-element, hantera fokus och ge kontrollerna namn. Ställ den frågan när du anlitar en [Framer-utvecklare](/framer-utvecklare.html).

## Så testar du tillgängligheten

Kombinera automatiska verktyg med manuella tester. Automatiska kontroller hittar tekniska fel som saknade alt-texter och låg kontrast, men de kan inte avgöra om en alt-text är begriplig eller om tabbordningen är logisk.

- **Bara tangentbord:** lägg undan musen och ta dig igenom hela sajten med Tab, Skift+Tab, Enter och mellanslag. Du ska alltid se var fokus är och kunna öppna menyn, använda formulär och stänga dialogrutor.
- **Skärmläsare:** testa med VoiceOver på Mac eller iPhone och NVDA på Windows. Lyssna på rubrikerna, länktexterna och formulären.
- **Automatisk kontroll:** kör axe som webbläsartillägg eller tillgänglighetsdelen i Lighthouse på de viktigaste sidorna.
- **Kontrast:** mät text, knappar och ikoner med en kontrastkontroll, i alla lägen.
- **Zoom 200 procent:** förstora sidan i webbläsaren och kontrollera att inget innehåll klipps av eller hamnar ovanpå annat.
- **Reducerad rörelse:** aktivera inställningen i operativsystemet och se hur sajten beter sig.

Testa den publicerade sajten, inte bara förhandsvisningen i editorn, och gör om testerna när du lägger till nya sektioner eller komponenter.

## Tillgänglighetsredogörelse

En tillgänglighetsredogörelse är en sida som beskriver hur tillgänglig webbplatsen är, vilka kända brister som finns och hur besökare kan höra av sig om något inte fungerar. För offentlig sektor är den ett krav enligt DOS-lagen, och DIGG har anvisningar för hur den ska se ut.

För en privat verksamhet under tillgänglighetslagen är en tydlig sida om tillgänglighet ett bra sätt att visa hur tjänsten uppfyller kraven. Vilken information som krävs i ditt fall framgår av PTS vägledning. Den går att bygga som en vanlig sida i Framer och länka från sidfoten, på samma sätt som integritetspolicyn. Hur du hanterar cookies och personuppgifter tar vi upp i [guiden om GDPR och cookies i Framer](/framer-gdpr-cookies.html).

## Checklista

- Ta reda på om verksamheten omfattas av tillgänglighetslagen eller DOS-lagen.
- Sätt rätt standardspråk i Settings → General, och på varje språkversion.
- Använd en h1 per sida och rubriknivåer i logisk ordning.
- Märk upp header, nav, sektioner och footer med rätt taggar.
- Skriv alt-texter för informativa bilder och lämna dekorativa tomma.
- Ge ikonknappar och otydliga länkar ARIA-etiketter.
- Mät kontrasten på text, knappar och ikoner i alla lägen.
- Ge formulärfält synliga etiketter och tydliga felmeddelanden.
- Kontrollera tabbordningen och att fokus syns.
- Testa om det finns en hopplänk till huvudinnehållet.
- Slå på reducerad rörelse och undvik autoplay-video.
- Kontrollera att kodkomponenter fungerar med tangentbord och skärmläsare.
- Testa med tangentbord, skärmläsare, axe eller Lighthouse och zoom 200 procent.
- Publicera en sida om tillgänglighet med kontaktväg för synpunkter.

## Sammanfattning

Tillgänglighet i Framer handlar mest om beslut du fattar under design och bygge. Plattformen har verktygen: semantiska taggar, alt-texter, ARIA-etiketter, tabbordning, reducerad rörelse och språkattribut. Kontrast, rubrikstruktur, formulär och egna kodkomponenter är ditt ansvar. Driver du e-handel eller en annan tjänst som omfattas av lagen är det ett krav sedan juni 2025. Annars är det fortfarande god praxis, och ofta bra för [SEO](/blog/framer-seo-guide.html) också. Bygg in testerna i arbetet från början, så slipper du stora ändringar i efterhand.

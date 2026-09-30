---
slug: framer-gdpr-cookies
page_id: guideGdpr
date: 2026-09-30
date_modified: 2026-09-30
date_display: 30 september 2026
thumbnail: thumb-framer-gdpr-cookies.svg
og_image: og-default.png
title: "GDPR och cookies i Framer (2026): Cookiebanner, Google Analytics och svenska regler"
meta_title: "GDPR och cookies i Framer (2026): Banner, GA och regler"
description: "När behöver en Framer-sajt en cookiebanner? Så fungerar Framer Analytics, Google Analytics, Tag Manager och Consent Mode, och vad svenska regler kräver."
og_description: "Cookiebanner, Google Analytics, Tag Manager och Consent Mode i Framer, och vad svenska regler kräver av din sajt."
excerpt: "Vilka verktyg på en Framer-sajt som kräver samtycke, hur du sätter upp Framers cookiebanner med Tag Manager och vad PTS och IMY tittar på."
intro: "En Framer-sajt utan tredjepartsverktyg klarar sig oftast utan cookiebanner, eftersom Framers egen analys inte använder cookies. Så fort du lägger till Google Analytics, en Meta-pixel eller en inbäddad YouTube-film ändras läget. Här går vi igenom vilka verktyg som kräver samtycke, hur du sätter upp Framers inbyggda cookiebanner tillsammans med Google Tag Manager och vad svenska regler säger om cookies och Google Analytics."
related: framer-seo-guide, framer-formular-automatisering
faqs:
  - q: Behöver en Framer-sajt en cookiebanner?
    a: Inte om sajten bara använder Framers inbyggda funktioner. Framer Analytics sätter inga cookies, och Framer skriver att ingen banner behövs för den. En banner behövs när du lägger till tredjepartsverktyg som sätter icke nödvändiga cookies, till exempel Google Analytics, Meta Pixel, HubSpot eller inbäddade YouTube-filmer.
  - q: Har Framer en inbyggd cookiebanner?
    a: Ja. Framer har en inbyggd komponent som heter Cookie Banner. Den går att formge, placera i en gemensam komponent på alla sidor och koppla till ett Google Tag Manager-container-ID. Bannern skickar besökarens val vidare till Google Consent Mode, har separata inställningar för EU och resten av världen och kan länka till en cookiepolicy per region.
  - q: Är det lagligt att använda Google Analytics i Sverige 2026?
    a: Ja, med samtycke till cookies och korrekt information till besökarna. Sedan 2023 kan överföringar till amerikanska företag som är certifierade enligt EU–US Data Privacy Framework ske på den grunden. EU:s tribunal ogiltigförklarade inte ramverket i september 2025, men ett överklagande ligger hos EU-domstolen. Faller ramverket kan läget förändras igen.
  - q: Vilken myndighet granskar cookies i Sverige?
    a: Post- och telestyrelsen, PTS, har tillsyn över cookieregeln i lagen om elektronisk kommunikation, som kräver samtycke för cookies som inte är nödvändiga. Integritetsskyddsmyndigheten, IMY, har tillsyn över hur personuppgifter behandlas enligt GDPR, till exempel när data från analysverktyg förs över till länder utanför EU.
  - q: Blockerar Framers cookiebanner skript som lagts in som egen kod?
    a: Det har vi inte kunnat bekräfta i Framers dokumentation. Bannern skickar samtyckessignaler till Google Tag Manager och Google Consent Mode. Det säkraste är därför att ladda alla tredjepartsskript via Tag Manager och låta samtycket styra dem där, i stället för att klistra in dem direkt i sajtens egen kod.
  - q: Var lagras data från en Framer-sajt?
    a: Framer körs på Amazon Web Services, främst i USA, med infrastruktur även i Europa och Asien och leverans via CloudFronts CDN. Framers personuppgiftsbiträdesavtal gäller automatiskt för kunder, och överföringar till USA sker enligt EU–US Data Privacy Framework och EU-kommissionens standardavtalsklausuler från 2021.
---

## Behöver din Framer-sajt en cookiebanner?

Nej, inte om du bara använder det som ingår i Framer. Ja, så fort du lägger till verktyg som sätter cookies som inte är nödvändiga för att sajten ska fungera. Den gränsen är den viktigaste att hålla koll på, och den flyttas ofta utan att någon märker det, till exempel när någon lägger in en YouTube-film eller en pixel från en annonsplattform.

Framers inbyggda analys sätter inga cookies och skapar inga bestående identifierare. Unika besökare räknas inom ett fönster på en dag, och IP-adresser hashas med ett salt som byts varje dygn. Framer skriver därför att analysen inte kräver någon banner. Ansvaret för det du själv lägger till, som Google Analytics, HubSpot eller inbäddningar från tredje part, ligger hos dig som äger sajten.

En sak till innan vi går vidare: den här sidan är en praktisk genomgång, inte juridisk rådgivning. För sajter med känsliga data eller stora mängder personuppgifter är det värt att stämma av med någon som arbetar med dataskydd.

> ### Kort sagt
> - **Bara Framer Analytics och Framers formulär:** ingen cookiebanner behövs för själva analysen.
> - **Google Analytics, pixlar, HubSpot, YouTube, Google Maps:** samtycke krävs innan cookies sätts.
> - **Framer har en inbyggd Cookie Banner** som kopplas till Google Tag Manager och Consent Mode.
> - **Tillsyn i Sverige:** PTS för cookies, IMY för personuppgifter.

## Vad svenska regler säger om cookies

Cookies som inte är nödvändiga får bara användas om besökaren har samtyckt. Regeln finns i lagen om elektronisk kommunikation (LEK), 9 kap. 28 §, och gäller all lagring och läsning av information i besökarens enhet, alltså även liknande tekniker som localStorage och pixlar. Nödvändiga cookies, till exempel för en varukorg eller en inloggning som besökaren själv har bett om, är undantagna.

I Sverige delas ansvaret mellan två myndigheter. Post- och telestyrelsen, PTS, har tillsyn över själva cookieregeln och har publicerat vägledande beslut om hur samtycke ska inhämtas. Integritetsskyddsmyndigheten, IMY, har tillsyn över GDPR, alltså över vad som händer med personuppgifterna efter att de har samlats in. För en vanlig Framer-sajt betyder det att bannern och samtycket är en fråga om LEK och PTS, medan valet av analysverktyg och var datan hamnar är en fråga om GDPR och IMY.

I praktiken innebär ett giltigt samtycke att besökaren aktivt har valt, att det är lika lätt att neka som att godkänna, att inga icke nödvändiga cookies sätts före valet och att det går att ändra sig i efterhand.

## Vilka verktyg kräver samtycke?

Tumregeln är enkel: allt som sätter cookies eller läser information från besökarens webbläsare för analys, marknadsföring eller tredjepartsinnehåll kräver samtycke. Tabellen visar de vanligaste verktygen på Framer-sajter.

| Verktyg | Sätter cookies? | Kräver samtycke? |
| --- | --- | --- |
| Framer Analytics | Nej, inga cookies eller bestående identifierare | Nej, enligt Framer |
| Google Analytics 4 | Ja | Ja |
| Google Tag Manager | Inte i sig, men laddar taggar som gör det | Taggarna den laddar kräver samtycke |
| Meta Pixel | Ja | Ja |
| HubSpot (spårningskod, chatt) | Ja | Ja, för spårning och marknadsföring |
| YouTube-inbäddning | Ja, via youtube.com | Ja. youtube-nocookie.com minskar spårningen men tar inte bort den helt |
| Google Maps-inbäddning | Ja, via Google | Ja, eller visa en bild med länk tills besökaren samtycker |
| Framers formulär | Inga cookies enligt Framers dokumentation om inbyggda funktioner | Inget cookiesamtycke, men personuppgifterna kräver rättslig grund och information |

Formulären är värda en egen kommentar. Även om de inte kräver någon cookiebanner behandlar de personuppgifter så fort någon skriver in namn eller e-post. Då behöver du en rättslig grund, till exempel samtycke till ett nyhetsbrev eller att besvara en förfrågan, och en integritetspolicy som beskriver vad som händer med uppgifterna. Skickas datan vidare till Zapier, Make eller ett CRM tillkommer fler mottagare att redovisa. Mer om det finns i [formulär och automatisering i Framer](/blog/framer-formular-automatisering.html).

## Framers inbyggda Cookie Banner

Framer har sedan september 2023 en inbyggd komponent som heter Cookie Banner. Den räcker för de flesta marknadssajter, så länge tredjepartsverktygen laddas via Google Tag Manager.

Det här kan komponenten enligt Framers egen dokumentation:

- Formges fritt och placeras i en gemensam komponent, till exempel sidfoten, så att den finns på alla sidor.
- Kopplas till ett Google Tag Manager-container-ID direkt i komponentens inställningar.
- Skickar besökarens val vidare till Google Consent Mode.
- Har separata inställningar för besökare i EU och för resten av världen.
- Visas automatiskt när besökaren inte har gjort något val tidigare.
- Kan få en synlig eller osynlig knapp som öppnar bannern igen, så att besökaren kan ändra sitt val.
- Har inställbara standardval för samtycke.
- Kan länka till en cookiepolicy per region.

Det finns saker vi inte har kunnat bekräfta i dokumentationen. Framer beskriver inte att bannern blockerar skript som du klistrat in som egen kod under Site Settings, och det framgår inte heller i detalj vilka samtyckeskategorier som skickas eller hur stödet för Consent Mode v2 ser ut. Vår rekommendation är därför att lägga alla tredjepartstaggar i Tag Manager och låta samtycket styra dem där.

## Så sätter du upp banner, Tag Manager och Consent Mode

Den mest robusta uppsättningen är Framers Cookie Banner plus Google Tag Manager, där GA4 och andra verktyg ligger som taggar i Tag Manager. Stegen nedan förutsätter att du har ett Google Tag Manager-konto och en container.

### Steg 1: Inventera vad sajten laddar

Gå igenom sajten och lista allt som hämtar något från tredje part: analys, pixlar, chattar, inbäddade filmer, kartor, typsnitt från externa servrar och formulärverktyg. Öppna även Site Settings och se vad som redan ligger under egen kod. Det som står där kommer att laddas oavsett vad besökaren väljer.

### Steg 2: Flytta tredjepartsskript till Tag Manager

Lägg in GA4, Meta Pixel och liknande som taggar i Tag Manager i stället för som egen kod i Framer. Om du tidigare har fyllt i fältet för Google Analytics Measurement ID i Site Settings bör du ta bort det när GA4 i stället laddas via Tag Manager, så att det inte finns två vägar in och så att samtycket styr mätningen.

### Steg 3: Lägg in Cookie Banner i Framer

Infoga Cookie Banner-komponenten och placera den i en komponent som finns på alla sidor. Formge den med sajtens egna färg- och textstilar. Se till att knapparna för att godkänna och neka är lika synliga, eftersom ett samtycke som bara går att ge med en tydlig knapp är svårt att försvara.

### Steg 4: Koppla bannern till Tag Manager

Fyll i ditt container-ID från Tag Manager i bannerns inställningar. Framer beskriver också ett manuellt sätt att lägga in Tag Manager, via två poster under egen kod i Site Settings: en i början av head och en i början av body, båda på alla sidor och en gång. Välj ett av sätten, inte båda.

### Steg 5: Ställ in Consent Mode och standardval

Välj EU-inställningen för besökare från EU, så att inga icke nödvändiga cookies sätts innan besökaren har valt. Kontrollera sedan i Tag Manager att taggarna är inställda på att vänta på rätt samtyckessignal, till exempel analys för GA4 och annonsering för pixlar.

### Steg 6: Lägg till en knapp för att ändra valet

Koppla bannerns återöppningsfunktion till en länk i sidfoten, till exempel "Cookieinställningar". Besökare ska kunna ändra sig lika enkelt som de gav sitt samtycke.

### Steg 7: Testa innan du publicerar

Använd förhandsvisningsläget i Tag Manager och webbläsarens utvecklarverktyg. Ladda sajten i ett privat fönster, neka allt och kontrollera att inga analys- eller marknadsföringscookies sätts. Godkänn sedan och kontrollera att taggarna startar.

## Google Analytics och svenska myndigheter

Google Analytics går att använda lagligt i Sverige i dag, med samtycke till cookies och korrekt information, men frågan har varit omstridd och kan bli det igen. Det hänger på reglerna för överföring av personuppgifter till USA.

I juli 2023 meddelade IMY beslut i granskningar av CDON, Coop, Dagens Industri och Tele2, efter klagomål från organisationen NOYB. Tele2 fick en sanktionsavgift på 12 miljoner kronor och CDON på 300 000 kronor. CDON, Coop och Dagens Industri beordrades att sluta använda Google Analytics, medan Tele2 redan hade slutat. Skälet var att personuppgifter fördes över till USA utan tillräckliga skyddsåtgärder. Besluten gällde läget före det nya ramverket för dataöverföringar.

Sedan juli 2023 finns EU–US Data Privacy Framework, som gör det möjligt att föra över personuppgifter till certifierade amerikanska företag. Ramverket prövades av EU:s tribunal i målet Latombe (T-553/23), och den 3 september 2025 ogillades talan. Beslutet har överklagats till EU-domstolen i mål C-703/25 P, som ännu inte är avgjort.

Vad betyder det i praktiken? Just nu finns en giltig grund för överföringar till Google. Om EU-domstolen underkänner ramverket kan läget snabbt bli likt det 2023. Därför är det klokt att bara samla in det du faktiskt använder, att ha samtycket på plats och att veta vilket alternativ du skulle byta till. För många sajter räcker Framer Analytics för att följa besök och sidvisningar, och den påverkas inte av samtycket eftersom den inte sätter cookies.

## Var Framer lagrar data

Framer körs på Amazon Web Services, främst i USA, med infrastruktur även i Europa och Asien–Stillahavsområdet och leverans via Amazons CDN CloudFront. Det betyder att data om besök på sajten kan behandlas utanför EU.

Framers personuppgiftsbiträdesavtal, version 2.0, gäller från den 16 juni 2026 och gäller automatiskt för kunder, utan att du behöver signera något separat. Överföringar till USA sker enligt EU–US Data Privacy Framework och EU-kommissionens standardavtalsklausuler från 2021 (2021/914). Nämn Framer som personuppgiftsbiträde i din integritetspolicy, tillsammans med de andra tjänster som tar emot data från sajten.

## Vad cookiepolicyn ska innehålla

En cookiepolicy ska tala om, på begriplig svenska, vilka cookies sajten använder, varför och hur besökaren ändrar sitt val. Lägg den som en vanlig sida i Framer och länka till den från bannern och sidfoten. Den kan vara en del av integritetspolicyn eller en egen sida.

- Vem som ansvarar för sajten och hur man kontaktar er.
- Vilka kategorier av cookies som används: nödvändiga, analys och marknadsföring.
- Varje cookie eller tjänst med namn, leverantör, syfte och lagringstid.
- Vilka tredje parter som tar emot data och om data förs över till länder utanför EU.
- Att Framer Analytics används utan cookies, om ni använder den.
- Hur besökaren ändrar eller återkallar sitt samtycke, med en länk eller knapp.
- Datum för senaste uppdatering.

Håll policyn uppdaterad. En vanlig brist är en policy som skrevs vid lansering och sedan inte har följt med när nya verktyg lagts till.

## Checklista för en GDPR-anpassad Framer-sajt

- Alla tredjepartsverktyg är inventerade och listade.
- Skript för analys och marknadsföring laddas via Google Tag Manager, inte som egen kod.
- Google Analytics ligger inte dubbelt, både i Site Settings och i Tag Manager.
- Framers Cookie Banner är infogad på alla sidor, med EU-inställning för EU-besökare.
- Knapparna för att godkänna och neka är lika tydliga.
- Det finns en länk i sidfoten som öppnar bannern igen.
- Inga icke nödvändiga cookies sätts innan besökaren har valt, testat i ett privat fönster.
- YouTube-filmer och kartor laddas först efter samtycke, eller via youtube-nocookie.com och en statisk bild.
- Formulären har en tydlig text om vad uppgifterna används till och en länk till integritetspolicyn.
- Cookiepolicy och integritetspolicy finns, är länkade och nämner Framer och övriga mottagare.
- Någon ansvarar för att uppdatera bannern och policyn när nya verktyg läggs till.

## Sammanfattning

En Framer-sajt som bara använder Framers egna funktioner behöver ingen cookiebanner, eftersom Framer Analytics inte sätter cookies. När du lägger till Google Analytics, pixlar eller inbäddningar krävs samtycke enligt LEK, med PTS som tillsynsmyndighet, och personuppgifterna omfattas av GDPR, med IMY som tillsynsmyndighet. Framers inbyggda Cookie Banner fungerar bäst ihop med Google Tag Manager och Consent Mode, så låt alla tredjepartstaggar gå den vägen och testa att inget laddas före samtycket. Google Analytics är tillåtet i dag tack vare Data Privacy Framework, men ha ett alternativ i bakhuvudet om EU-domstolen ändrar förutsättningarna.

Vill du veta hur mätningen hänger ihop med sökmotoroptimering går vi igenom det i [Framer SEO-guiden](/blog/framer-seo-guide.html). Behöver du hjälp med Tag Manager, egen kod eller integrationer finns mer om det i [när du behöver en Framer-utvecklare](/framer-utvecklare.html), och den bredare bilden av vad en sajt i Framer innebär finns i [Framer-hemsida](/framer-hemsida.html). Ska sajten få en egen domän först läser du [koppla domän till Framer](/koppla-doman-framer.html). Kostnaden för Framers abonnemang hittar du i [prisguiden för Framer](/blog/framer-pris.html).

---
slug: koppla-doman-framer
page_id: guideDoman
date: 2026-09-30
date_modified: 2026-09-30
date_display: 30 september 2026
thumbnail: thumb-koppla-doman-framer.svg
og_image: og-default.png
title: "Koppla domän till Framer (2026): Steg för steg hos Loopia, One.com, Binero och GoDaddy"
meta_title: "Koppla domän till Framer (2026): DNS steg för steg"
description: "Så kopplar du din domän till Framer: rätt A- och CNAME-poster, steg för steg hos Loopia, One.com, Binero och GoDaddy, utan att e-posten slutar fungera."
og_description: "Rätt DNS-poster för Framer, steg för steg hos svenska domänleverantörer, och hur du behåller e-posten under bytet."
excerpt: "Vilka DNS-poster Framer behöver, var du ändrar dem hos Loopia, One.com, Binero och GoDaddy, och hur du byter utan avbrott eller tappad e-post."
intro: "För att koppla en egen domän till Framer lägger du till domänen under Site Settings i Framer och pekar sedan om den hos din domänleverantör: två A-poster för huvuddomänen och en CNAME för www. Här går vi igenom exakt vilka poster som behövs, var du hittar dem hos de leverantörer svenska företag oftast använder, hur du låter e-posten vara orörd och vad du gör när något inte fungerar."
related: framer-hemsida, migrera-wordpress-till-framer
faqs:
  - q: Vilka DNS-poster behöver Framer?
    a: För en huvuddomän som exempel.se behöver Framer två A-poster med värdena 31.43.160.6 och 31.43.161.6 samt en CNAME-post där www pekar på sites.framer.app. För en subdomän som blogg.exempel.se räcker en CNAME-post som pekar på sites.framer.app. Övriga A- och AAAA-poster för samma namn ska tas bort.
  - q: Påverkas min e-post när jag kopplar domänen till Framer?
    a: Nej, inte så länge du bara ändrar A-, AAAA- och CNAME-posterna för webbplatsen. E-posten styrs av MX-poster och tillhörande TXT-poster som SPF och DKIM, och de ska lämnas som de är. Säg inte heller upp ett webbhotellspaket innan du har kontrollerat att e-posten inte ingår i det.
  - q: Hur lång tid tar det innan domänen fungerar med Framer?
    a: Ofta fungerar domänen inom någon timme efter att DNS-posterna har ändrats, men Framer anger att det kan ta upp till 48 timmar innan ändringen har slagit igenom överallt. SSL-certifikatet skapas automatiskt av Framer när posterna pekar rätt.
  - q: Kan jag koppla en egen domän på Framers gratisplan?
    a: Nej. På gratisplanen kan sajten bara ligga på en Framer-subdomän. För att koppla en egen domän krävs ett betalt abonnemang för sajten.
  - q: Behöver jag köpa ett SSL-certifikat till min Framer-sajt?
    a: Nej. Framer skapar och förnyar SSL-certifikat automatiskt för egna domäner. Om domänen har CAA-poster måste de tillåta de certifikatutfärdare Framer använder, annars kan certifikatet inte utfärdas.
  - q: Ska jag använda Cloudflares proxy framför Framer?
    a: Nej, inte vid en vanlig koppling. Framer rekommenderar att posterna i Cloudflare står på DNS only, alltså utan proxy. Att köra Cloudflare som omvänd proxy framför Framer är en separat uppsättning som bara stöds på vissa av Framers högre planer.
---

## Kort svar: det här behöver du göra

Du lägger till domänen i Framer, ändrar två eller tre DNS-poster hos din domänleverantör och väntar tills Framer visar att domänen är verifierad. SSL ordnas automatiskt. Det enda som kräver lite eftertanke är att ta bort gamla poster som krockar och att låta e-postens poster vara ifred.

Innan du börjar behöver sajten ett betalt Framer-abonnemang, eftersom gratisplanen bara tillåter en Framer-subdomän. Vilka planer som finns och vad de kostar går vi igenom i [prisguiden för Framer](/blog/framer-pris.html). Du behöver också inloggning till kontot där domänen är registrerad, eller till den tjänst som sköter domänens DNS om det är en annan.

> ### Innan du ändrar något
> - Ta en skärmdump av alla nuvarande DNS-poster, så att du kan återställa om något går fel
> - Kontrollera var e-posten ligger och vilka MX-poster den använder
> - Publicera sajten på Framer-subdomänen först och kontrollera att allt fungerar
> - Lägg upp redirects från gamla adresser innan bytet, inte efter

## Vilka DNS-poster Framer kräver

Framer använder två A-poster för huvuddomänen och en CNAME för www. Värdena nedan kommer från Framers egen hjälpartikel om att koppla en egen domän och är desamma för alla sajter.

| Namn (värd) | Typ | Värde | Används för |
| --- | --- | --- | --- |
| @ (huvuddomänen) | A | 31.43.160.6 | exempel.se |
| @ (huvuddomänen) | A | 31.43.161.6 | exempel.se |
| www | CNAME | sites.framer.app | www.exempel.se |
| subdomän, t.ex. blogg | CNAME | sites.framer.app | Om bara en subdomän ska till Framer |
| MX, SPF, DKIM, DMARC | MX / TXT | Lämnas orörda | E-post |

Två regler gäller oavsett leverantör. Det får inte finnas några andra A- eller AAAA-poster för samma namn, och huvuddomänen kan aldrig ha en CNAME, bara A-poster. Framer stöder inte IPv6, så en kvarglömd AAAA-post kan hindra både att sajten laddar och att SSL-certifikatet skapas.

Olika leverantörer skriver huvuddomänen på olika sätt. Loopia använder @, medan Websupport låter dig lämna fältet för subdomän tomt. Ser du inget fält för namnet alls är det oftast huvuddomänen som redigeras.

## Så lägger du till domänen i Framer

Öppna projektet, gå till Site Settings och sedan till Domains under Hosting. Välj att koppla en domän du redan äger och skriv in domänen. Framer visar då vilka poster som ska läggas in och markerar domänen som verifierad när den ser att posterna pekar rätt.

### Primär domän och redirect

Bestäm tidigt om sajten ska ligga på exempel.se eller www.exempel.se. Den du väljer blir primär domän, och den andra adressen skickas vidare dit med en redirect. För SEO spelar valet mindre roll än att det är konsekvent. Välj den form som redan används i Google Search Console, på visitkort och i gamla länkar, så slipper du onödiga omdirigeringar. Lägg alltid in både A-posterna och www-posten, så att båda adresserna fungerar och den ena kan skickas vidare.

## Loopia

Hos Loopia ändrar du posterna i DNS-editorn i Loopia Kundzon. Logga in, klicka på domännamnet och välj DNS-editor. Där ser du bland annat raderna @ för huvuddomänen och www.

- Under @: ändra eller ersätt A-posterna så att de pekar på 31.43.160.6 och 31.43.161.6. Ta bort eventuella AAAA-poster på samma rad.
- Under www: ta bort den befintliga A-posten om det finns en och lägg till en CNAME med värdet sites.framer.app.
- Byter du posttyp, till exempel från A till CNAME, tar du först bort den gamla posten och lägger sedan till den nya.

Loopia skriver själva i sin supportwiki att e-posten inte påverkas så länge du bara tar bort A-poster och CNAME. Rör alltså inte MX-posterna, och byt inte namnservrar. Framer kräver inga egna namnservrar, bara att posterna ovan finns.

## One.com

Hos One.com hittar du posterna i kontrollpanelen under DNS-inställningar, som ligger under avancerade inställningar. Där finns en flik för DNS-poster och en funktion för att skapa nya poster av typen A och CNAME.

- Skapa två A-poster för huvuddomänen med Framers två IP-adresser.
- Skapa en CNAME med värdnamnet www och värdet sites.framer.app.
- Ta bort eller ersätt de A- och AAAA-poster som tidigare pekade på One.com:s webbhotell.

Många små företag har både webbplats och e-post hos One.com. E-posten styrs av MX-posterna, så låt dem stå kvar. Om webbhotellet säger upp sig självt när du slutar använda det, eller om du funderar på att säga upp paketet, kontrollera först om e-posten ingår i samma paket.

## Binero, i dag Websupport

Binero ingår sedan 2019 i Loopia Group, och Bineros domän- och webbhotellskunder har flyttats över till systerbolaget Websupport. Har du en äldre Binero-domän redigerar du den alltså i Websupports kontrollpanel. Klicka på domänen, välj DNS och sedan DNS-inställningar.

- Klicka på posttypen A och ange de två IP-adresserna för huvuddomänen. Lämna subdomänfältet tomt för att redigera huvuddomänen.
- Välj CNAME och lägg till www med värdet sites.framer.app.
- Kontrollera att inga andra A- eller AAAA-poster finns kvar för huvuddomänen eller www.

Websupport påpekar, precis som Loopia, att huvuddomänen inte kan ha en CNAME. Är du osäker på var din domän faktiskt administreras, se efter vilka namnservrar den använder. Det är där posterna ska ändras.

## GoDaddy

Hos GoDaddy väljer du domänen, går till domäninställningarna och öppnar DNS. Där finns en knapp för att lägga till en ny post där du väljer typ A eller CNAME. Enligt GoDaddy slår de flesta ändringar igenom inom en timme, men det kan ta upp till 48 timmar.

- Ersätt A-posten för @ med Framers två IP-adresser. GoDaddy har ofta en förinställd A-post som pekar på en parkeringssida, och den måste bort.
- Ändra www-posten så att den är en CNAME med värdet sites.framer.app.
- Stäng av eventuell domänvidarebefordran, eftersom den skapar egna poster som krockar med Framers.

Har domänen extra skydd kan GoDaddy be om en verifieringskod innan ändringen sparas.

## Andra leverantörer och Cloudflare

Hos andra leverantörer, till exempel Namecheap, gäller samma poster. Leta efter en sida som heter något i stil med DNS, DNS-poster eller avancerad DNS, lägg in A-posterna och CNAME-posten och ta bort det som krockar. Framers hjälpcenter har egna guider för flera internationella leverantörer.

Sköts DNS av Cloudflare ska posterna stå på DNS only, alltså utan Cloudflares proxy. Med proxyn påslagen ser Framer Cloudflares adresser i stället för sina egna, och domänen kan inte verifieras. Att köra Cloudflare som omvänd proxy framför Framer är en separat uppsättning som Framer bara stöder på vissa högre planer, och den behövs sällan för en vanlig företagssajt.

## Behåll e-posten orörd

E-posten påverkas inte av en domänkoppling så länge du bara ändrar posterna för webbplatsen. Det är MX-posterna som bestämmer vart e-post levereras, och TXT-posterna för SPF, DKIM och DMARC som gör att den inte hamnar i skräpposten. De ska stå kvar exakt som de är.

Det som faktiskt brukar slå ut e-posten är tre saker. Att någon byter namnservrar och därmed tappar alla gamla poster, att någon rensar hela DNS-zonen i stället för enskilda poster, eller att webbhotellspaketet sägs upp trots att e-posten ingick i det. Ta en skärmdump före ändringen, ändra bara A, AAAA och CNAME för @ och www, och vänta med uppsägningar tills du vet var e-posten ligger.

## Byt från gammal sajt utan avbrott

Du undviker avbrott genom att ha Framer-sajten helt klar innan du rör DNS. Själva bytet tar sedan bara några minuter, och den gamla sajten svarar för de besökare som fortfarande har de gamla posterna sparade.

- **Dagen innan:** sänk TTL på de poster som ska ändras, om leverantören tillåter det, så att bytet slår igenom snabbare.
- **Före bytet:** publicera på Framer-subdomänen, lägg in redirects från gamla adresser och testa formulär.
- **Bytet:** lägg till domänen i Framer, ändra posterna och välj primär domän.
- **Efter bytet:** låt den gamla sajten ligga kvar ett par dygn innan du säger upp något.

Flyttar du från WordPress eller Webflow finns det mer att tänka på kring innehåll och adresser. Läs [migrera från WordPress till Framer](/blog/migrera-wordpress-till-framer.html) eller [migrera från Webflow till Framer](/migrera-webflow-till-framer.html), och gå igenom [SEO-checklistan för Framer](/blog/framer-seo-checklista.html) innan lansering.

## Kontrollera att posterna är rätt

Det snabbaste sättet att kontrollera är att fråga DNS direkt från datorn. I Terminal på Mac eller Linux skriver du `dig +short exempel.se A`, som ska svara med 31.43.160.6 och 31.43.161.6, och `dig +short www.exempel.se CNAME`, som ska svara med sites.framer.app. På Windows fungerar `nslookup exempel.se` och `nslookup -type=CNAME www.exempel.se`.

Svarar din dator med gamla värden kan det bero på cache. Då kan en DNS-kontroll på webben, som visar svar från servrar i flera länder, ge en bättre bild av hur långt ändringen har kommit. Kör också `dig +short exempel.se AAAA`. Svaret ska vara tomt.

## Vanliga fel och hur du löser dem

De flesta problem beror på en gammal post som ligger kvar eller på att ändringen inte har slagit igenom än. Tabellen bygger på Framers felsökningsguide för egna domäner.

| Fel | Trolig orsak | Lösning |
| --- | --- | --- |
| Framer visar att DNS är fel | Ändringen har inte slagit igenom, eller fel värde | Kontrollera med dig och vänta upp till 48 timmar |
| Sajten laddar ibland gamla sidan | En gammal A-post ligger kvar bredvid Framers | Ta bort alla A-poster utom Framers två |
| HTTPS fungerar inte | AAAA-post finns kvar | Ta bort AAAA-posten, kontakta leverantören om den läggs till automatiskt |
| SSL-certifikatet skapas inte | CAA-post begränsar utfärdare | Tillåt letsencrypt.org, pki.goog och sectigo.com |
| Domänen verifieras inte i Cloudflare | Proxyn är påslagen | Ställ posterna på DNS only |
| Parkeringssida visas | Leverantörens standardpost eller vidarebefordran | Ta bort parkeringsposten och stäng av vidarebefordran |
| Ändringarna syns inte alls | Domänen använder andra namnservrar | Ändra posterna där namnservrarna pekar |
| E-posten slutade fungera | MX-poster eller namnservrar ändrades | Återställ MX och TXT från skärmdumpen |

Om du fortfarande sitter fast efter ett dygn med rätt poster är det dags att kontakta Framers support eller domänleverantören, med en skärmdump av DNS-posterna till hands.

## Sammanfattning

Att koppla en domän till Framer handlar om tre poster: två A-poster för huvuddomänen och en CNAME för www. Lägg in dem hos Loopia, One.com, Websupport, GoDaddy eller där din DNS ligger, ta bort gamla A- och AAAA-poster och låt e-postens poster vara. SSL sköter Framer, och ändringen slår oftast igenom inom några timmar. Planerar du en ny sajt från början beskriver vi hela vägen i [Framer-hemsida](/framer-hemsida.html), och behöver du hjälp med mer tekniska delar som proxy eller integrationer finns [Framer-utvecklare](/framer-utvecklare.html).

---
slug: responsiv-typografi-framer
page_id: post27
category: tips
date: 2026-08-05
date_modified: 2026-08-05
date_display: 5 augusti 2026
readtime: 7 min läsning
thumbnail: thumb-responsiv-typografi.svg
og_image: og-default.png
title: "Typografi i Framer (2026): Bygg en responsiv typskala som håller"
meta_title: "Typografi i Framer (2026): Responsiv typskala som håller"
description: "Så bygger du en responsiv typskala i Framer med textstilar och brytpunkter — konkreta storlekar, radavstånd och misstagen som förstör mobilvyn."
og_description: "Responsiv typskala i Framer — konkreta storlekar och stegen som håller."
intro: "De flesta typografiproblem i Framer-sajter kommer inte från typsnittsvalet. De kommer från att storlekarna sattes en i taget, sida för sida, tills ingen längre vet varför en rubrik är 42 pixlar på ett ställe och 44 på ett annat. Lösningen är en typskala: en fast uppsättning storlekar, definierade som textstilar, med egna värden per brytpunkt. Den tar en timme att sätta upp och betalar tillbaka på varje sida du bygger efteråt."
related: 5-tips-bygga-snabbare, framer-core-web-vitals
faqs:
  - q: Vilken textstorlek ska brödtext ha i Framer?
    a: 16–17 pixlar på desktop är rätt utgångspunkt för längre text, med radavstånd runt 1,5. Gå inte under 16 pixlar på mobil — det straffar både läsbarheten och hur sajten upplevs på nära håll.
  - q: Vad är en typskala?
    a: En fast uppsättning textstorlekar härledda ur en gemensam kvot, till exempel 1,25. I stället för att välja storlek fritt varje gång väljer du en nivå ur skalan. Resultatet är konsekvent hierarki och betydligt färre beslut per sida.
  - q: Hur många textstilar behöver en Framer-sajt?
    a: Sex rubriknivåer plus två till tre brödtextvarianter räcker för de flesta sajter. Fler stilar än så brukar betyda att skalan saknar förankring — då är det bättre att revidera nivåerna än att lägga till fler.
  - q: Hur gör jag rubriker mindre på mobil i Framer?
    a: Öppna textstilen, växla till mobil-brytpunkten och sätt en egen storlek där. Ändringen slår igenom överallt där stilen används. Sätt aldrig mobilstorlekar lokalt på enskilda textlager — då tappar du den centrala kontrollen.
  - q: Påverkar typsnittsvalet sajtens prestanda?
    a: Ja. Varje vikt och variant är en fil som ska laddas innan texten visas rätt. Två typsnittsfamiljer i två till tre vikter räcker för de flesta sajter — fler vikter kostar laddtid och syns i Core Web Vitals.
---

## Varför en typskala slår enskilda beslut

Utan system blir varje textstorlek ett nytt beslut, och besluten glider isär med tiden. En typskala vänder på det: du bestämmer en gång — en basstorlek och en kvot — och alla storlekar följer ur det.

Vinsten är inte bara estetisk konsekvens. Skalan gör sajten snabbare att bygga, eftersom valet står mellan sex nivåer i stället för oändligt många pixelvärden. Den gör sajten billigare att underhålla, eftersom en justering i textstilen slår igenom överallt. Och den gör samarbete möjligt — nästa person som öppnar projektet ser ett system i stället för hundra undantag.

Det är samma princip som gör att välbyggda mallar tål att ändras: utseendet styrs från stilar, inte från enskilda lager.

## Börja med brödtexten, inte rubrikerna

Rubrikerna är det roliga, men brödtexten är grunden — det är den besökaren faktiskt läser. Sätt den först: 16–17 pixlar på desktop för längre text, med radavstånd runt 1,5.

När brödtexten sitter härleder du resten. Bildtexter och etiketter ett steg ner, rubriker i steg uppåt enligt en fast kvot. En kvot på 1,25 ger en lugn, redaktionell skala som passar de flesta sajter. Vill du ha större kontrast mellan rubrik och text — vanligt på landningssidor med korta texter — fungerar 1,333 eller mer.

I praktiken ser en skala med kvoten 1,25 ut ungefär så här på desktop: 17, 21, 27, 34, 42 och 53 pixlar. Avrunda till hela pixlar — ingen läsare ser skillnaden mellan 33,2 och 34, men du slipper decimaler i panelen.

## Så bygger du skalan med textstilar

Allt i Framer bygger på textstilar. Skapa en stil per nivå — till exempel `Heading 1` till `Heading 6`, `Body`, `Body Small` och `Caption` — och arbeta sedan så här:

- **Sätt desktopvärdena först**, enligt skalan du valt. Desktop är basen som de andra brytpunkterna ärver från.
- **Definiera egna värden för tablet och mobil** direkt i varje textstil. Öppna stilen, växla brytpunkt, sätt storleken — ändringen slår igenom överallt där stilen används.
- **Använd alltid stilarna, aldrig lokala storlekar.** Behöver en rubrik vara mindre på ett ställe är det ett tecken på att skalan saknar en nivå. Lägg till en stil i stället för att skriva över — ett lokalt undantag är osynligt nästa gång du justerar skalan.
- **Låt även komponenter använda stilarna.** Textlager inne i kort, knappar och navigation ska peka på samma textstilar. Annars uppdaterar du skalan och undrar varför korten inte följde med.

Det är hela metoden. Ingen kod, inga plugins — bara disciplinen att låta stilarna äga alla storlekar.

## Krymp rubrikerna mer än brödtexten

Det vanligaste mobilmisstaget är att skala ner allt lika mycket. Brödtext på 17 pixlar kan stå kvar på 16 på mobil — men en rubrik på 53 pixlar behöver ofta ner mot 32–36 för att inte radbrytas till en vägg av text.

Tumregeln: ju större storlek, desto mer krymper den. Skalan blir alltså flackare på mobil, och det är rätt. Kontrasten mellan nivåerna får komma från vikt och spacing i stället för enbart storlek.

Glöm inte tablet på vägen ner. Desktopvärden som står kvar på tablet ger rubriker som är för stora precis i det läge där många beslutfattare granskar sajten.

## Radavstånd och radlängd

Radavstånd följer storleken åt motsatt håll: brödtext behöver runt 1,5, stora rubriker mår bäst kring 1,1–1,2. Sätter du 1,5 på en rubrik i 53 pixlar ser tvåradiga rubriker ut att glida isär.

Radlängden styr du med maxbredd på textblocket, inte med typstorleken. Sikta på 60–75 tecken per rad för löptext. I Framer betyder det i praktiken en maxbredd runt 640–700 pixlar på textcontainern — inte text som flödar över hela sektionsbredden. Det är en av de justeringar som gör störst skillnad för läsbarheten och som tar under en minut att göra.

## Typsnittsval och prestanda

Typografi är också en prestandafråga. Varje typsnittsvikt är en fil som laddas innan texten visas rätt, och det syns i mätvärdena.

- **Begränsa antalet vikter.** Två familjer i två till tre vikter räcker för de flesta sajter. Regular, medium och bold täcker nästan alla behov.
- **Överväg en variabel font** om du vill ha många vikter — en fil ersätter flera, ofta med mindre total vikt.
- **Testa efteråt.** Kör sajten genom PageSpeed Insights och titta särskilt på om texten hoppar när typsnittet laddats in. Hur du läser resultaten går vi igenom i guiden till [Core Web Vitals i Framer](/blog/framer-core-web-vitals.html).

## Tre misstag som sabbar skalan

- **För många stilar.** Tolv rubriknivåer betyder att ingen är förankrad. Klarar du dig med sex nivåer plus brödtextvarianterna har du ett system — fler är oftast obeslutsamhet i förklädnad.
- **Hoppa över tablet.** Den bortglömda brytpunkten, och den där felen oftast upptäcks av fel person: kunden.
- **Lokala undantag i komponenter.** Ett textlager med hårdkodad storlek inne i en komponent är en tidsinställd inkonsekvens. Den syns inte i dag, men den syns dagen du ändrar skalan.

## Sammanfattning

En typskala är inte ett estetiskt val utan ett underhållsval: sex stilar med värden per brytpunkt ersätter hundratals enskilda beslut, och varje framtida justering blir en ändring i stället för femtio. Sätt brödtexten först, härled resten ur en kvot, ge rubrikerna egna mobilvärden och låt textstilarna äga varje storlek på sajten.

Vill du ha fler arbetssätt som snabbar upp bygget på samma sätt fortsätter vi i [5 tips för att bygga snabbare i Framer](/blog/5-tips-bygga-snabbare.html).

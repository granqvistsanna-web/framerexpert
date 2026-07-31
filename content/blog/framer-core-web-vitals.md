---
slug: framer-core-web-vitals
page_id: post17
category: seo
date: 2026-07-31
date_modified: 2026-07-31
date_display: 31 juli 2026
readtime: 9 min läsning
thumbnail: thumb-framer-cwv.svg
og_image: og-default.png
title: "Core Web Vitals i Framer (2026): Så får du grönt"
meta_title: "Core Web Vitals i Framer (2026): Så får du grönt — FramerExpert.se"
description: "Core Web Vitals i Framer 2026 — vad LCP, INP och CLS mäter, vad som sänker dem i Framer, och hur du får gröna värden på riktiga besökare."
og_description: "Vad LCP, INP och CLS mäter, vad som sänker dem i Framer, och hur du får gröna värden på riktiga besökare."
excerpt: "Vad LCP, INP och CLS mäter, vad som sänker värdena i Framer, och hur du får grönt på riktiga besökare."
intro: "Framer ger dig bra Core Web Vitals nästan gratis — statiska sidor på ett CDN är en stark utgångspunkt. Men du kan sänka värdena själv med tunga bilder, för många animationer eller fel typsnittsinställning. Den här guiden går igenom de tre måtten och exakt vad som påverkar dem i just Framer."
related: framer-seo-guide, framer-seo-checklista
faqs:
  - q: Har Framer bra Core Web Vitals som standard?
    a: Ja. Framer publicerar statisk HTML via ett globalt CDN, serverar bilder i WebP och AVIF och sätter font-display på sina egna typsnitt. De flesta Framer-sajter börjar med gröna värden — problemen uppstår när man lägger till tunga bilder eller animationer.
  - q: Var mäter jag Core Web Vitals?
    a: PageSpeed Insights för en enskild URL, och Core Web Vitals-rapporten i Google Search Console för fältdata från riktiga besökare. Det är fältdatan Google rankar på, inte labbtestet.
  - q: Påverkar Framers animationer Core Web Vitals?
    a: De kan göra det på mobil om de är tunga. Scroll-bibliotek som Lenis och GSAP kostar JavaScript-körning som visar sig i INP. Håll animationer CSS- och transform-baserade och mät på mobil innan du lägger till fler.
  - q: Vad är ett bra LCP-värde?
    a: Under 2,5 sekunder räknas som bra. INP bör vara under 200 millisekunder och CLS under 0,1. Alla tre mäts på det sämre utfallet för verkliga besökare, så mobil väger tungt.
---

## Vad Core Web Vitals är

Core Web Vitals är tre mått Google använder för att bedöma upplevd prestanda, och de är en rankningssignal. De mäter tre olika saker: hur snabbt sidan känns laddad, hur snabbt den svarar på klick, och hur mycket den hoppar medan den laddar.

- **LCP** (Largest Contentful Paint) — tiden tills det största elementet syns. Bra: under 2,5 sekunder.
- **INP** (Interaction to Next Paint) — hur snabbt sidan svarar på interaktion. Bra: under 200 millisekunder.
- **CLS** (Cumulative Layout Shift) — hur mycket layouten flyttar sig oväntat. Bra: under 0,1.

Det viktiga att förstå: Google rankar på **fältdata** — mätningar från riktiga besökare, samlade i Search Console — inte på labbtestet i PageSpeed Insights. Labbtestet är din verkstad, fältdatan är domen.

## Varför Framer börjar starkt

Framer publicerar statiska sidor bakom ett CDN. Det finns ingen databas att fråga och inget PHP att köra, så servern svarar snabbt och LCP får en bra start. Bilder serveras automatiskt i WebP och AVIF till webbläsare som stöder dem, kritisk CSS injiceras per sida, och Framers egna typsnitt laddas med `font-display: swap`.

Med andra ord: en tom Framer-sajt är nästan alltid grön. Problemen uppstår när du fyller den. Resten av guiden handlar om att inte förstöra ett bra utgångsläge — en pusselbit i den bredare [Framer SEO-guiden](/blog/framer-seo-guide.html).

## LCP: håll det största elementet lätt

LCP-elementet är oftast en hero-bild eller en stor rubrik högst upp. Den vanligaste orsaken till dålig LCP i Framer är en tung hero-bild.

Så håller du den nere:

- **Ladda upp bilden i rätt storlek.** Framer komprimerar det du ger den, men kan inte trolla — en 24-megapixelsexport blir en stor fil även som WebP. Ladda upp i rimlig upplösning från början.
- **Undvik video eller tunga bakgrunder ovanför fold-en** som huvudinnehåll. En autospelande hero-video är nästan alltid det som drar ner LCP mest.
- **Låt hero-bilden ladda tidigt.** Bilder långt ner på sidan ska vara lazy-laddade, men just LCP-elementet ska inte fördröjas.

Mät på mobil, för det är där LCP oftast fastnar — mindre bandbredd och svagare hårdvara.

## INP: passa dig för tung JavaScript

INP mäter hur snabbt sidan reagerar när någon klickar, trycker eller skriver. Statiska sidor svarar snabbt, så INP-problem i Framer kommer nästan alltid från tillagd JavaScript.

De vanligaste bovarna:

- **Scroll-bibliotek som Lenis och GSAP.** De ger mjuk scroll och effektfulla animationer, men kostar JavaScript-körning som direkt visar sig i INP på mobil. Använd dem sparsamt och mät effekten.
- **Tunga inbäddningar.** Chattwidgetar, bokningsverktyg och tredjepartsskript kör sin egen kod. Varje sådant tillägg är en potentiell INP-kostnad.
- **För många samtidiga animationer.** En sida där allt rör sig samtidigt tvingar webbläsaren att arbeta hårt precis när användaren vill interagera.

Regeln: det som går att göra i CSS ska göras i CSS. Transform- och opacity-baserade animationer är billiga; JavaScript-drivna är det inte. Lägg inte till ett scroll-bibliotek förrän du sett att du behöver det.

## CLS: reservera plats i förväg

CLS är oftast enklast att fixa. Layouten hoppar när något laddar in sent och knuffar undan det som redan syns.

- **Sätt explicita dimensioner på bilder.** När webbläsaren vet höjd och bredd i förväg reserverar den utrymmet, så att texten under inte hoppar när bilden dyker upp.
- **Var försiktig med custom-typsnitt.** Framer sätter `font-display: swap` på sina egna fonter, men laddar du in ett eget typsnitt via custom code måste du sätta det själv — annars riskerar du ett hopp när fonten byts.
- **Undvik innehåll som skjuts in ovanför befintligt.** En banner eller cookie-ruta som dyker upp och trycker ner sidan är en klassisk CLS-källa.

## Fallgroparna som är specifika för Framer

Tre sätt att omedvetet sänka sina värden i just Framer:

- **CMS-listor med tunga bilder.** När en hel samling renderas på en listsida staplas bildvikten snabbt. Filtrera, paginera eller lazy-ladda allt nedanför fold-en.
- **Animationer staplade på animationer.** Framer gör det lätt att lägga till scroll-effekter, och just därför blir de lätt för många. Varje effekt är billig, summan är det inte.
- **Custom code som laddar externa resurser tidigt.** Ett skript i sidans head som hämtar något från en annan domän kan blockera renderingen. Lägg det så sent som möjligt och ladda asynkront.

## Så mäter du rätt

Arbeta i två steg. Använd [PageSpeed Insights](https://pagespeed.web.dev) för att testa en enskild URL medan du bygger — kör alltid på mobilfliken, för det är den hårdare domen. Fixa det som är rött; gult duger oftast.

När sidan är live är det fältdatan som räknas. Öppna Core Web Vitals-rapporten i Google Search Console, som visar hur riktiga besökare upplever sajten över tid. Det är den siffran Google rankar på, och den släpar några veckor efter dina ändringar — så mät, vänta, mät igen.

Framer ger dig ett försprång på Core Web Vitals. Din uppgift är enklare än på de flesta plattformar: inte att jaga gröna värden, utan att låta bli att förstöra dem.

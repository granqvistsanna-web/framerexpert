---
slug: framer-ai
page_id: guideAi
date: 2026-09-30
date_modified: 2026-09-30
date_display: 30 september 2026
thumbnail: thumb-framer-ai.svg
og_image: og-default.png
title: "Framer AI och agenter (2026): Vad de kan och hur du använder dem"
meta_title: "Framer AI och agenter (2026): Vad de kan och inte kan"
description: "Vad Framers AI-agent klarar 2026: sidgenerering, CMS, kodkomponenter, översättning och externa agenter. Plus vad som fortfarande kräver en människa."
og_description: "Framers agent, externa agenter och Auto Translate – vad de gör, var gränserna går och ett arbetssätt som håller."
excerpt: "Framers agent bygger sidor, fyller CMS:et och översätter. Här går vi igenom vad den klarar, vad du måste granska och hur du arbetar säkert med branches."
intro: "Sedan Framer 3.0 lanserades i juni 2026 är AI inte längre en samling separata verktyg i Framer utan en agent som arbetar direkt på canvasen. Den kan bygga sidor, ändra stilar, fylla CMS:et och skriva metadata, och den går att styra från Claude Code, Codex eller Cursor. Här beskriver vi vad agenten faktiskt gör, vad som hänt med Wireframer och Workshop, var gränserna går och hur vi rekommenderar att du arbetar."
related: framer-cms-i-praktiken, framer-flersprakiga-sajter
faqs:
  - q: Vad är Framer Agents?
    a: Framer Agents är den AI som sedan Framer 3.0 i juni 2026 är inbyggd i Framers editor. Agenten öppnas från panelen till höger och kan skapa och ändra sidor, sektioner, stilar, animationer, CMS-innehåll, SEO-inställningar och kodkomponenter i samma projekt som du själv redigerar. Resultatet är vanliga, redigerbara Framer-lager.
  - q: Finns Wireframer och Workshop kvar i Framer?
    a: Framers egna sidor beskriver inte längre Wireframer som en egen funktion, och sidgenerering sköts nu av agenten. Workshop, pluginet som skapade kodkomponenter från en beskrivning, markeras i Framer Marketplace som på väg att avvecklas till förmån för Agents. Kodkomponenter byggs i stället genom att du ber agenten om dem.
  - q: Kostar Framers AI något extra?
    a: Agenten och andra AI-funktioner drar AI-krediter från en månatlig pott som följer med projektens abonnemang. Hur mycket en uppgift kostar beror på hur stor den är, och en hel sida kostar mer än en textändring. Tar krediterna slut pausas AI-funktionerna tills de förnyas eller tills du köper till fler. Aktuella nivåer finns på Framers prissida.
  - q: Kan jag använda Claude Code, Codex eller Cursor med Framer?
    a: Ja. Framer har ett officiellt sätt att koppla externa agenter som Claude Code, Codex i ChatGPT och Cursor till ett projekt. Du godkänner åtkomsten i webbläsaren första gången, och agenten kan därefter läsa och ändra canvas, komponenter, CMS, stilar och lokalisering. Enligt Framer görs ändringarna på en branch så att du kan granska dem innan de når huvudversionen.
  - q: Kan Framers AI översätta min sajt?
    a: Ja. Auto Translate i Framers lokalisering översätter nytt och ändrat innehåll på canvasen och i CMS:et till alla aktiverade språk. Översättningarna går att filtrera efter status och redigera för hand, och manuella ändringar går före de automatiska. En modersmålstalare bör ändå läsa igenom viktiga sidor före publicering.
  - q: Behöver jag fortfarande en designer om Framer har AI?
    a: Agenten gör mycket av grovjobbet snabbare, men den fattar inte besluten åt dig. Varumärke, budskap, informationsarkitektur, SEO-strategi och tillgänglighet kräver fortfarande någon som vet vad sajten ska uppnå och som granskar resultatet. För en enkel sida räcker det ofta att du själv granskar noggrant. För en företagssajt är en erfaren Framer-designer fortfarande värd pengarna.
---

## Vad Framers AI är 2026

Framers AI är i dag en agent, Framer Agents, som arbetar direkt i editorn och ändrar samma lager, komponenter, stilar och CMS-poster som du själv arbetar med. Den lanserades med Framer 3.0 den 16 juni 2026, tillsammans med branches för att testa ändringar innan de går live. Du skriver vad du vill ha, agenten gör ändringen på canvasen och du justerar vidare för hand eller i chatten.

Enligt Framers egen beskrivning täcker agenten fem områden: design, text, organisering av innehåll, analys och lokalisering. I praktiken betyder det att den kan generera sidor och sektioner, göra layouter responsiva, uppdatera färger och typsnitt, skriva innehåll och metadata, skapa CMS-samlingar, bygga kodkomponenter och granska sajten efter brutna länkar, saknade alt-texter och kontrastproblem.

Skillnaden mot tidigare AI-verktyg är att resultatet inte är en bild eller en separat kodfil. Det är vanliga Framer-lager som du kan redigera, flytta och publicera. Det gör agenten användbar i riktigt arbete, men det betyder också att det agenten gör blir en del av sajten om ingen granskar det.

> ### Kort sagt
> - **Agenten** finns i panelen till höger i editorn och arbetar på canvasen, i CMS:et och i inställningarna.
> - **Externa agenter** som Claude Code, Codex och Cursor kan kopplas till ett projekt och göra samma sorts ändringar.
> - **AI-krediter** styr hur mycket du kan använda. Priser och nivåer finns i vår [genomgång av vad Framer kostar](/blog/framer-pris.html).

## Vad hände med Wireframer och Workshop?

Båda har i praktiken gått upp i agenten. Wireframer var funktionen som genererade en responsiv sidstruktur från en textbeskrivning, och Workshop var ett plugin som skapade kodkomponenter från en beskrivning i chatten. Framers produktsidor för AI beskriver i dag sidgenerering och kodkomponenter som saker agenten gör, och Workshop markeras i Framer Marketplace som på väg att avvecklas till förmån för Agents.

Det du läser i äldre guider om Wireframer och Workshop stämmer alltså i sak, men arbetsflödet ser annorlunda ut. I stället för att öppna ett särskilt verktyg ber du agenten om en sida, en sektion eller en komponent. Vi har inte kunnat verifiera exakt när Wireframer försvann som eget namn i gränssnittet, så räkna med att du kan stöta på det i äldre projekt och kurser.

## Så fungerar agenten i editorn

Du öppnar agenten under **Agent** i panelen till höger, skriver en instruktion och ser ändringen hända på canvasen. Om du markerar en sektion eller ett lager innan du skriver begränsas ändringen till det området, vilket är det enklaste sättet att undvika att agenten rör sådant du redan är nöjd med.

Framers egna råd är att bygga sektion för sektion i stället för hela sidor på en gång, att vara konkret om struktur och innehåll och att bifoga referenser. Skärmdumpar, skisser, logotyper och riktiga bilder ger bättre resultat än en allmän beskrivning. Vill du ha en viss interaktion hjälper det att visa både en bild och en länk till en sida där beteendet finns.

Några funktioner är värda att känna till:

- **Val av modell.** Agenten låter dig välja mellan flera AI-modeller som är olika bra på olika saker och drar olika mycket krediter. Listan ändras ofta, så kolla hjälpsidan för det aktuella utbudet.
- **Skills.** Sedan september 2026 kan du spara instruktioner om designsystem, skrivstil eller CMS-flöden som agenten återanvänder. De sparas i projektet och följer med när någon remixar det.
- **Branches och Changes-panelen.** Större ändringar kan göras på en branch, granskas i Changes-panelen och sedan föras över till huvudversionen med **Apply to main**.

## Externa agenter och MCP

Du kan också styra ett Framer-projekt från en AI som körs utanför Framer. Framer har officiellt stöd för Claude Code, Codex i ChatGPT och Cursor, och anger att det fungerar med andra AI-verktyg som kan köra ett terminalkommando eller anropa ett MCP-verktyg. Första gången agenten ansluter godkänner du åtkomsten i webbläsaren.

Enligt Framer kan en extern agent läsa och ändra sidor, canvasstruktur, CMS-samlingar, kodkomponenter, färg- och textstilar, filer och lokalisering. Den kommer bara åt projekt du uttryckligen kopplar, inte kontoinställningar eller fakturering, och den arbetar i editorn, inte direkt på den publicerade sajten. Framer skriver också att ändringarna hamnar på en branch så att du kan granska dem. Funktionen beskrivs delvis som beta, och vilka operationer som finns beror på projektet och dina behörigheter.

Innan Framers egen koppling fanns löste många det med MCP-plugins från tredje part i Framer Marketplace. De finns kvar, men de är inte officiella Framer-produkter. Överväg noga vilken åtkomst du ger dem, särskilt i kundprojekt.

Externa agenter passar bäst för uppgifter som är stora, upprepade eller hämtar data från någon annanstans: import och synk av CMS-innehåll, massändringar av text, genomgång av stilar och tekniska granskningar. För den typen av arbete är det ofta en [Framer-utvecklare](/framer-utvecklare.html) som sätter upp flödet första gången.

## AI-översättning i lokaliseringen

Auto Translate översätter automatiskt nytt och ändrat innehåll till alla språk du har aktiverat, både på canvasen och i CMS:et. Du slår på det i lokaliseringsinställningarna för varje språk, där du också kan välja modell eller låta Framer välja. Översättningarna drar AI-krediter, och tar de slut kan du fortfarande översätta för hand.

I lokaliseringsvyn kan du filtrera översättningar efter status och redigera dem direkt. Manuella ändringar går alltid före de automatiska, så en korrigerad formulering skrivs inte över nästa gång originaltexten ändras. Hur du bygger upp en flerspråkig sajt i övrigt går vi igenom i [guiden om flerspråkiga sajter i Framer](/blog/framer-flersprakiga-sajter.html).

Maskinöversatt svenska blir ofta grammatiskt rätt men lite stel, med engelsk ordföljd och ordval som ingen svensk skulle använda. Det spelar mindre roll i en supportartikel och mer på startsidan eller i en offertsida.

## Vad AI kan göra och vad du ska kontrollera

Agenten klarar det mesta av det mekaniska arbetet på en Framer-sajt, men varje uppgift har något som en människa behöver titta på. Tabellen visar hur vi ser på de vanligaste uppgifterna.

| Uppgift | Kan AI göra det? | Det här ska du kontrollera |
| --- | --- | --- |
| Första utkast av en sida | Ja, bra som start | Att strukturen följer ditt budskap och inte en generisk mall |
| Sektioner som FAQ, formulär och prisblock | Ja | Att innehållet stämmer och att formuläret skickar dit det ska |
| Responsiva brytpunkter | Ja, till stor del | Varje brytpunkt för hand, särskilt menyer, tabeller och långa rubriker |
| Färger, typsnitt och stilar | Ja | Att agenten använder projektets stilar och inte skapar nya engångsvärden |
| Texter och rubriker | Ja, som utkast | Tonläge, fakta, påståenden och att det låter som ert företag |
| Titlar, beskrivningar och alt-texter | Ja | Sökord, längd och att alt-texten beskriver bilden på riktigt |
| CMS-samlingar och import | Ja | Fältnamn, typer, slugs och att inget innehåll tappats |
| Kodkomponenter | Ja | Prestanda, beteende på alla brytpunkter och att en redaktör kan använda den |
| Översättning | Ja | Språkkänsla på viktiga sidor och termer som inte ska översättas |
| Granskning av länkar, kontrast och alt-text | Ja, som första pass | Tangentbordsnavigering, rubrikordning och hela sidan med skärmläsare |
| Migrering från Webflow eller WordPress | Delvis | Gamla adresser, redirects och att allt innehåll kommit med |
| Varumärke och positionering | Nej | Det är ett beslut ni fattar, inte något agenten kan härleda |

## Det som fortfarande kräver en människa

Agenten är bra på att göra det du ber om, men den vet inte vad sajten ska uppnå. De delar som avgör om en sajt fungerar för verksamheten kräver fortfarande någon som tar ansvar för besluten.

**Varumärke.** Agenten kan följa en stilguide om den finns, gärna sparad som en Skill, men den kan inte avgöra vad som gör just ert företag igenkännbart. Utan tydliga ramar blir resultatet snyggt men likt tusentals andra AI-genererade sajter.

**Textkvalitet.** AI-text på svenska är ofta korrekt men platt, med samma satsrytm, överdrivet säljande ordval och svengelska vändningar. Den kan också hitta på detaljer om ert erbjudande. Läs allt och stryk det ni inte kan stå för.

**Struktur.** Vilka sidor som ska finnas, i vilken ordning besökaren ska mötas av informationen och vad varje sida ska få besökaren att göra är frågor om er verksamhet. Agenten bygger den struktur du beskriver, så beskrivningen behöver vara genomtänkt.

**SEO.** Agenten skriver metadata och alt-texter snabbt, men den gör ingen sökordsanalys åt dig och vet inte vilka sidor som redan rankar. Använd vår [SEO-checklista för Framer](/blog/framer-seo-checklista.html) efter varje större AI-ändring.

**Tillgänglighet.** En automatisk granskning hittar saknade alt-texter och låg kontrast, men inte om rubrikerna är i logisk ordning, om en animerad komponent går att använda med tangentbordet eller om en skärmläsare förstår formuläret. Det behöver testas för hand, och vi går igenom hur i [guiden om tillgänglighet i Framer](/framer-tillganglighet.html).

## Ett arbetssätt som håller

Det säkraste sättet att arbeta med agenten är att låta den göra grovjobbet på en branch och att du själv granskar innan något når huvudversionen. Så här ser flödet ut hos oss:

- **Börja med underlaget.** Skriv ner syfte, målgrupp, sidor och tonläge innan du öppnar agenten. Lägg in färg- och textstilar och spara riktlinjerna som en Skill.
- **Skapa en branch.** Gör större ändringar på en branch med ett tydligt namn, så att den publicerade sajten inte påverkas medan du testar.
- **Bygg sektion för sektion.** Markera det du vill ändra och ge konkreta instruktioner med referenser. Hela sidor på en gång ger mer att rätta.
- **Justera för hand.** Det är ofta snabbare att flytta ett element själv än att beskriva flytten i chatten.
- **Granska i Changes-panelen.** Gå igenom texter, bilder, länkar och varje brytpunkt innan du för över ändringarna.
- **Kontrollera SEO och tillgänglighet.** Kör agentens granskning som första pass och gör sedan manuella kontroller.
- **Publicera och följ upp.** Håll koll på trafik och sökresultat de närmaste veckorna efter en större ändring.

> ### Tumregel
> Låt agenten göra det du snabbt kan kontrollera, som layout, CMS-fält och metadata. Var mer försiktig med det som är svårt att kontrollera, som påståenden i texter, översättningar till språk du inte kan och kod du inte förstår.

## Sammanfattning

Framers AI har gått från separata verktyg som Wireframer och Workshop till en agent som arbetar direkt i projektet och som även kan styras från externa AI-verktyg. Den gör mycket av det mekaniska arbetet snabbare: utkast, responsivitet, CMS, metadata, översättning och första granskningen. Besluten om varumärke, budskap, struktur, SEO och tillgänglighet är fortfarande dina, och det är där kvaliteten avgörs. Arbeta på en branch, granska innan du applicerar och se agenten som en snabb assistent snarare än en ersättare. Vill du se vad andra har byggt med agenterna finns en sammanställning från [Framer Agents Hackathon 2026](/framer-agents-hackathon-2026.html). Står du i början av ett nytt projekt kan du läsa [så går det till att skaffa en Framer-hemsida](/framer-hemsida.html).

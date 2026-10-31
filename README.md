# Skorpió Pizzéria Gyula — webdesign-koncepció

Független, statikus webdesign-demo a gyulai Skorpió Pizzéria számára. Nem a vállalkozás hivatalos weboldala, nem áll kapcsolatban vele, és nem használható hivatalos oldalként a pizzéria engedélye nélkül.

A koncepció célja egy konkrét hiányosság bemutatása: a Google- és directory-adatlapok a `skorpiopizzeria.hu` domaint adják meg weboldalként, de a cím 2026. október 31-én parkolóoldalt szolgál ki. Az étlap, a rendelés és a nyitvatartás egyetlen saját felületen sem érhető el – ezt a demót egy saját, mobilon is működő étlap- és rendelési felülettel tölti ki.

**Élő demó:** https://archimre.github.io/pizzeria-skorpio-gyula/ — nyilvánosan elérhető, de `noindex` jelöléssel. A linket csak a bemutatás céljára ossza meg.

## Futtatás

```bash
cd website-mockups/pizzeria-skorpio-gyula
python3 -m http.server 8000
```

Ezután nyissa meg a `http://localhost:8000` címet. Az `index.html` közvetlen megnyitása is működik: nincs build, nincs framework, nincs külső függőség.

## Mi van benne

- **Étlap** – 27 minta tétel hat csoportban (pizzák, tészták, főételek, saláták, desszertek, italok), szűrhető kategóriákkal és darabszámokkal.
- **Pizza-méretek** – 28 / 42 / 52 cm, plusz feltét választóval; az ár a méret és a feltét szerint élőben frissül.
- **Kosár** – lebegő dock a képernyő alján, benne a tételszám és az összeg. A kosár egy jobb oldali panelben (mobilon alulról felcsúszó lapon) nyílik meg.
- **Rendelés (demó)** – két lépés: kosár és átvételi mód, majd név/telefon/cím és fizetési mód. Mennyiségállítás, törlés, szállítási díj, minimumrendelés, űrlapvalidáció, fiktív rendelésszám és visszaigazolás.
- **Nyitvatartás** – a mai nap kiemelése és „nyitva / zárva” állapot a böngésző helyi ideje alapján.
- **Kapcsolat** – telefon, e-mail, cím, Google Térkép- és Facebook-hivatkozás.
- **Koncepció-jelölés** – a felső sáv, a navigáció „Demó” jelölése és a lábléc egyértelműen jelzi, hogy nem hivatalos oldal; a HTML `noindex, nofollow`.

A rendelés szándékosan **nem küld semmit sehova**: nincs backend, API, adatbázis vagy analitika, és a bevitt adatok nem tárolódnak. A kosár a lap újratöltésekor elvész.

## Fájlok

```
pizzeria-skorpio-gyula/
├── index.html
├── styles.css
├── app.js
├── README.md
├── .github/workflows/pages.yml
└── assets/
    ├── favicon.svg
    └── fonts/   (Bricolage Grotesque + Instrument Sans, WOFF2 + OFL licencek)
```

## Dizájn és technológia

- Sötét, meleg alap (korom, krém, paradicsomvörös, borostyán, zsályazöld), nagy Bricolage Grotesque címsorokkal és Instrument Sans szöveggel.
- A komponensnyelve a megadott referenciákból épül fel, natív HTML/CSS/JS-ben újraértelmezve:
  - **mobbin** – ételkiszállító-app logika: ragadós kategóriasáv, kompakt kártyák mobilon, alulról nyíló kosár;
  - **magicui** – marquee, bento grid, number ticker, border beam, shimmer gomb, dock;
  - **reactbits / aceternity** – sortöréses hero-reveal, spotlight-kártyák, finom dőlés (tilt), count-up;
  - **uiverse** – méret- és fizetésválasztó chipek, mennyiségszabályzó;
  - **21st.dev** – szekció- és kártyaritmus.
- A hero pizza saját CSS-illusztráció (forgó felület, pepperoni, bazsalikom, sajtfoltok); a menü ikonjai saját SVG-k. Nincs fotó, nincs AI-kép.
- Betűtípusok helyben: Bricolage Grotesque és Instrument Sans (SIL Open Font License, a licencek az `assets/fonts/` mappában). Nincs Google Fonts CDN-hívás.
- Nincs külső szkript, iframe, térkép-beágyazás vagy követő. A Térkép és a Facebook csak hivatkozásként szerepel.
- Reszponzív: 320, 360, 390, 414, 768, 1024 és 1440 px szélességen ellenőrizve, vízszintes túlcsordulás nélkül. Mobilon (≤760 px) a kártyák vízszintes, kompakt elrendezésre váltanak.
- Akadálymentesség: skip link, látható fókuszgyűrű, billentyűzetes menü (`aria-expanded`, Escape), `aria-modal` rendelési panel fókuszcsapdával és fókusz-visszaállítással, `aria-live` hibák és állapotok, egyedi `aria-label`-ek a „Kosárba” gombokon. A `prefers-reduced-motion` kikapcsolja a marquee-t, az aurorát, a forgást, a reveal-t és a számolást.

## Ellenőrzött tények és források

- **Név:** Skorpió Pizzéria / Pizzéria Skorpió. Forrás: Visit Gyula, Restaurant Guru, Facebook.
- **Cím:** 5700 Gyula, Jókai Mór utca 17. Forrás: Visit Gyula, Restaurant Guru, pizza-etterem.hu.
- **Telefon:** +36 70 314 0417. Forrás: Visit Gyula, Restaurant Guru, Cylex.
- **E-mail:** `skorpiopizzeria@gmail.com`. Forrás: Visit Gyula.
- **Facebook:** `https://www.facebook.com/pizzeria.skorpio/` — 6 607 követő, 4,9/5 (484 értékelés) a gyűjtéskori nyilvános adatok szerint.
- **Google-értékelés:** 4,7/5, 1 129 értékelés (Restaurant Guru, 2026. október 18-i frissítés). A Restaurant Guru összesítése 1 646 szavazat, a 14 gyulai pizzéria között a 3. hely.
- **Árszint:** 2 000–4 000 Ft/fő (Restaurant Guru).
- **Nyitvatartás:** hétfő–csütörtök 11:00–22:00, péntek–szombat 11:00–23:00, vasárnap 16:00–22:00. Forrás: Restaurant Guru, pizza-etterem.hu, valamint a domain 2026. június 16-i Wayback-mentése – mindhárom egyezik.
- **Jellemzők:** kültéri ülőhely/terasz, elvitel, kiszállítás, Wi-Fi, asztalfoglalás, élőzene, születésnapi rendezvények, gyerekmenü, kártyás fizetés. Forrás: Restaurant Guru és pizza-etterem.hu.
- **Leírás:** „Gyula első pizzériája”, a belvárosban; kétszintes ház, légkondicionált pincehelyiség, mediterrán terasz; kézzel dagasztott tészta, gázkemence. Forrás: Facebook-bemutató, kornyeke.hu adatlap, Visit Gyula.
- **Domainállapot (2026. 10. 31.):** a `skorpiopizzeria.hu` HTTP 200-zal SecureLayer parkolóoldalt szolgál ki („Domain aktiválás alatt”), étlap nélkül. A 2026. június 16-i Wayback-mentés még egy egyszerű egyoldalas bemutatót mutat (Rólunk, nyitvatartás, kapcsolat), étlap nélkül.

### Ellentmondások, amelyeket a szöveg szándékosan kerül

- Az alapítás éve ellentmondásos: a kornyeke.hu adatlap „1992 óta üzemel”, a 2026-os Wayback-mentés „2010 óta”. Ezért a látható szöveg nem állít évszámot, csak a pizzéria saját „Gyula első pizzériája” megfogalmazását idézi.
- A nyitvatartás több adatlapon szerepel; a demó a három forrásban egyező sávot használja, és jelzi, hogy ünnepnapokon eltérhet.

## Mintaadatok, amelyek nem valósak

- **A teljes étlap és minden ár.** A pizzéria étlapja szöveges formában nem érhető el: a Restaurant Guru csak felhasználói menüfotókat tartalmaz, a saját domain parkol. A fogásnevek és árak a helyi piaci sáv (2 000–4 000 Ft/fő) és a nyilvános értékelésekben említett fogások (pizza, pasta, lasagne, pizza bolognese, burger, csokoládétorta) alapján készült minták.
- **Pizza-méretek (28/42/52 cm), plusz feltétek és áraik.** Demó-adatok.
- **A rendelési folyamat összes szabálya:** kiszállítási díj (590 Ft), ingyenes szállítás 8 000 Ft felett, 3 000 Ft-os minimum, 45–60 perces kiszállítás, 20–25 perces elvitel, rendelésszám-formátum.
- **A „nyitva / zárva” állapot** a látogató böngészőjének helyi idejéből számol, nem a pizzéria valós, élő rendszeréből.
- **A hero pizza, a menüikonok és a márkajel** saját CSS/SVG munka, nem a pizzéria logója vagy fotója.

## Közzététel GitHub Pages-en

1. Hozzon létre külön repositoryt, és a **jelen mappa tartalmát** tegye a repository gyökerébe (a `website-mockups` mappa egésze nem jó, mert a Pages csak a gyökeret vagy a `/docs` mappát szolgálja ki).
2. `git add . && git commit -m "Skorpió Pizzéria Gyula webdesign concept" && git push`.
3. GitHub → Settings → Pages → Source: **GitHub Actions** (a `.github/workflows/pages.yml` végzi a deployt), vagy állítsa be a `main` ágat gyökérként.
4. A demo `noindex, nofollow` metát tartalmaz, hogy ne versenyezzen a hivatalos oldallal. Ezt csak a pizzéria írásos engedélyével, hivatalos átadás után érdemes eltávolítani.

GitHub Actions vagy build nem szükséges a helyi futtatáshoz; a deployhoz a workflow igen.

## Következő lépés egy valódi megbízás felé

1. Mutassa meg a demót telefonon vagy külön linken (GitHub Pages + `noindex`), és nyissa meg előtte a `skorpiopizzeria.hu`-t: a parkolóoldal önmagában elmagyarázza a problémát.
2. Kérjen írásos engedélyt a név, az étlap, az árak és a fotók használatára; tisztázza, ki frissíti az étlapot.
3. Első fizetett fázis: domain és HTTPS rendbetétele, a Google-adatlapokban szereplő webcím javítása, majd a valós étlap és árak betöltése.
4. A rendelés élesítéséhez backend vagy űrlapszolgáltatás kell (e-mail/értesítés a konyhának), valamint döntés a fizetésről. A jelenlegi demó ehhez csak a felületet adja.
5. Hivatalossá tétel csak a pizzéria jóváhagyásával: a „koncepció” jelölések és a `noindex` eltávolítása, valódi logó/fotók, impresszum és adatvédelmi tájékoztató.

A demó nem hivatalos, és nem szabad úgy publikálni, mintha a pizzéria saját oldala lenne.

# Ferdi Hero — מוכן לשילוב

## קבצים בתיקייה:

```
components/landing/
├── Hero.tsx              ← הקומפוננטה הראשית — ייבא אותה ל-page.tsx
├── Navbar.tsx            ← navbar זכוכית (use client — scroll detection)
├── HeroBackground.tsx    ← וידאו + blobs + vignette
├── HeroContent.tsx       ← טקסט + כפתורים + trust bar
├── HeroMockup.tsx        ← כרטיס זכוכית עם סריקת קבלה
└── hero.module.css       ← כל הסטיילים
```

## שלב 1 — העתק את הקבצים

העתק את כל התיקייה `components/landing/` לתוך `src/components/landing/` בפרויקט שלך.

## שלב 2 — שים את הלוגו

העתק את `ferdi_logo_final.svg` ל-`public/ferdi-logo.svg`

## שלב 3 — שים את הוידאו (אופציונלי)

שים את קובץ הוידאו שלך ב-`public/hero-bg.mp4`  
אם אין לך עדיין — הרקע יהיה midnight כהה, הכל עובד בלי וידאו.

## שלב 4 — וודא שיש את הפונטים ב-globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

## שלב 5 — שלח לקודקס

### הפרומפט:

```
I've added new Hero components in src/components/landing/.
Import the Hero component from src/components/landing/Hero.tsx 
and use it as the first section in app/page.tsx.

Make sure:
1. The page has no conflicting styles on the <main> or <body> that would add 
   padding/margin around the hero
2. Remove any existing hero section code
3. The hero should be the first element after any providers/wrappers
4. Keep the rest of the page sections below the hero as they are

That's it — the Hero components are self-contained with their own CSS module.
```

## להחליף את הלוגו בעתיד

פשוט החלף את הקובץ `public/ferdi-logo.svg` — ה-component טוען אותו מה-path הזה.

## להחליף את הוידאו

החלף את `public/hero-bg.mp4`. הוידאו צריך להיות:
- 6-10 שניות loop
- slow motion
- צולם/נערך כהה
- רזולוציה: 1920x1080 מספיק (הוא מטושטש ומוחשך ב-CSS)
- גודל: נסה לשמור מתחת ל-5MB (compressed)

## לשנות טקסטים

ערוך ישירות ב-`HeroContent.tsx` — הכותרת, תת-כותרת, כפתורים, trust items.

## לשנות את נתוני ה-Mockup

ערוך את ה-arrays `FIELDS` ו-`RECEIPT_LINES` ב-`HeroMockup.tsx`.

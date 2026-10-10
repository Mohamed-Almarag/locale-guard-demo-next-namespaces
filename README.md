# Locale Guard demo: Next.js with namespace files

A small Next.js workspace app in English, Arabic, French and German, translated
with [next-intl](https://next-intl.dev). Each language is a folder, and each
file in it is a namespace. It shows what
[Locale Guard](https://github.com/Mohamed-Almarag/locale-guard) reports on real
pull requests.

## Setup

| | |
|---|---|
| Framework | Next.js 16, App Router |
| Translation library | `next-intl` (ICU messages) |
| Locale files | `messages/{locale}/*.json`: `messages/ar/dashboard.json` holds the `dashboard` messages in Arabic |
| Base locale | `en` |

The whole setup is one workflow file,
[.github/workflows/translations.yml](.github/workflows/translations.yml):

```yaml
- uses: Mohamed-Almarag/locale-guard@v1
  with:
    files: messages/{locale}/*.json
    format: next-intl
```

## Pull requests to look at

| Pull request | What it shows | Result |
|---|---|---|
| [#1 Add team invitations](https://github.com/Mohamed-Almarag/locale-guard-demo-next-namespaces/pull/1) | A new namespace file that German never got, a French ordinal (`selectordinal`) without the form for 1st, an Arabic plural with two of its six forms, a missing rich text tag, a renamed `select` argument and untranslated text | ❌ Fails |
| [#2 Show usage limits](https://github.com/Mohamed-Almarag/locale-guard-demo-next-namespaces/pull/2) | The first commit forgets French and German, the second one adds them, and the same comment turns green | ✅ Passes |
| [#3 Space out the project list](https://github.com/Mohamed-Almarag/locale-guard-demo-next-namespaces/pull/3) | A change that touches no translation file, so the check finishes in seconds | ✅ Passes |

The `main` branch already has two old issues: a key French never got, and a
German label still in English. Locale Guard lists them apart from the issues
each pull request adds, collapsed, and they do not fail the check.

## Run the app

```bash
npm install
npm run dev
```

Below is a step‐by‐step guide (based on Languine’s official documentation) to set up your project so that Languine will manage and auto‑translate your strings. This guide assumes you already have a working Next.js setup with next‑intl and a messages folder (with files like `en.json`, etc.).

---

## 1. Install Languine

Open your terminal in your project’s root directory and install the CLI as a dev dependency:

```bash
npm install --save-dev languine
```

*You can also use yarn or pnpm if that’s your preference.*

---

## 2. Prepare Your Configuration File

You already have a configuration file that looks like this:

```json
{
  "projectId": "prj_XdKMc9P2GIKtGEqV3rr7b",
  "locale": {
    "source": "en",
    "targets": [
      "fr",
      "ar"
    ]
  },
  "files": {
    "include": [
      "messages/[locale].json"
    ]
  }
}
```

### What This Means:
- **projectId**: Your unique Languine project identifier.
- **locale.source**: The source language (in your case, English).
- **locale.targets**: The target locales you want to translate into (French and Arabic).
- **files.include**: Tells Languine where your translation files are. Here, it looks for files like `messages/en.json`, `messages/fr.json`, and `messages/ar.json`.

> **Tip:** Make sure your folder structure matches this pattern. For example:
>
> ```
> ├─ messages
> │  ├─ en.json
> │  ├─ fr.json
> │  └─ ar.json
> ```

---

## 3. Prepare Your Translation Files

1. **Source File:**  
   Create or update `messages/en.json` with your key–value pairs. For example:
   ```json
   {
     "greeting": "Hello, welcome to our site!",
     "footer": "© 2025 My Company. All rights reserved."
   }
   ```
2. **Target Files:**  
   If you haven’t translated them yet, your target files (`fr.json`, `ar.json`) can be empty or include the source keys with empty values:
   ```json
   {
     "greeting": "",
     "footer": ""
   }
   ```

---

## 4. Run Languine Commands to Sync Your Translations

Languine provides several commands to automate the translation workflow:

- **Push Your Source Strings:**  
  This command extracts strings from your source file(s) and sends them to your translation service (or stores them in your project if you use Languine’s AI feature).  
  ```bash
  npx languine push
  ```

- **Pull Translated Files:**  
  Once translations are available (either auto‑translated by Languine or provided by a translator), run:
  ```bash
  npx languine pull
  ```
  This command updates your local `messages/fr.json` and `messages/ar.json` with the latest translations.

- **(Optional) Translate Automatically:**  
  If you’d like to auto‑translate using Languine’s built‑in translation engine, you may run:
  ```bash
  npx languine translate
  ```
  (Note: This may require additional configuration such as API keys or a subscription plan—check the [official docs](https://languine.ai/en/docs) for details.)

*Make sure to run these commands before you build and deploy so that your translation files are current.*

---

## 5. Integrate with Your Next.js App

Since your Next.js code (using next‑intl) loads translations from the `messages` folder via your `i18n.ts` and `layout.tsx`, no changes are needed in your app. For example, your layout already does:

```tsx
const messages = await getMessages();
...
<NextIntlClientProvider messages={messages} locale={locale}>
  <LanguageSwitcher />
  {children}
</NextIntlClientProvider>
```

After you run Languine and update the files, next‑intl will load the updated translations automatically.

---

## 6. (Optional) Set Up CI/CD Integration

If you want your translations to update automatically on deploy, consider adding a CI step. For example, using GitHub Actions:

```yaml
name: Languine Translations

on:
  push:
    branches: [ "main" ]

jobs:
  update-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Dependencies
        run: npm install
      - name: Push New Strings
        run: npx languine push
      - name: Pull Translations
        run: npx languine pull
      - name: Build Project
        run: npm run build
```

This ensures your `/messages` folder is up-to-date with translations every time you deploy.

---

## 7. Build and Deploy Your Project

Once your translation files are updated:

1. Build your project:
   ```bash
   npm run build
   ```
2. Deploy your app (using your deployment provider, e.g., Vercel).

Your Next.js app will now serve the translated strings from the updated `messages` folder.

---

## Final Summary

1. **Install Languine** using npm (or yarn/pnpm).  
2. **Configure** your `languine.config` (which you already have) to point at your `messages` folder and specify your source and target locales.  
3. **Prepare** your source and target translation files (e.g., `en.json`, `fr.json`, `ar.json`).  
4. **Run** the appropriate Languine commands (`push`, `pull`, or `translate`) to update your translation files.  
5. **Build and Deploy**—next‑intl will automatically load the updated translations from the `/messages` folder.

For more details and advanced configuration options, please refer to the [Languine Official Documentation](https://languine.ai/en/docs) .

---

Let me know if you need any more help or further clarification on any of these steps!
import { Inter } from "next/font/google";
import { Noto_Naskh_Arabic } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "./globals.css";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });
const arabic = Noto_Naskh_Arabic({ subsets: ["arabic"] });

export const metadata = {
  title: "Street photography",
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body
        className={cn(
          isRTL ? arabic.className : inter.className,
          "min-h-full flex flex-col grow"
        )}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Camera, ArrowRight, Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const features = [
    { key: "community" as const, icon: Globe },
    { key: "discover" as const, icon: Camera },
    { key: "curated" as const, icon: Sparkles },
  ] as const;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px] bg-grid" />

        {/* Gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary/20 to-transparent blur-3xl" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-secondary/20 to-transparent blur-3xl" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-primary via-primary/50 to-secondary opacity-30 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-l from-primary via-secondary/50 to-secondary opacity-30 blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="container relative px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          {/* Enhanced Badge */}
          <div
            className={`group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 shadow-[0_0_15px_rgba(0,0,0,0.1)] backdrop-blur-xl hover:bg-primary/10 hover:border-primary/20 hover:scale-105 transition-all duration-500 cursor-pointer ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div className="p-1.5 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="h-4 w-4 text-primary-foreground animate-pulse" />
            </div>
            <span className="text-sm font-medium tracking-wide text-foreground/90 group-hover:text-foreground transition-colors">
              {t("subtitle")}
            </span>
          </div>

          {/* Enhanced Main content */}
          <div className="space-y-8 max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent pb-2 animate-gradient">
                {t("title")}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              {t("description")}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="?q=popular"
                className={`group px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                <span>{t("cta.explore")}</span>
                <ArrowRight
                  className={`h-4 w-4 group-hover:translate-x-1 transition-transform duration-500 ${
                    isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
                  }`}
                />
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 rounded-full bg-secondary/5 text-foreground font-medium border border-secondary/10 hover:bg-secondary/10 hover:border-secondary/20 hover:scale-105 transition-all duration-500"
              >
                {t("cta.learnMore")}
              </Link>
            </div>
          </div>

          {/* Enhanced Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
            {features.map(({ key, icon: Icon }) => (
              <Card
                key={key}
                className="group border border-primary/10 bg-background/50 hover:bg-background/80 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5 rotate-0 group-hover:rotate-12 transition-transform duration-500">
                      <div className="h-full w-full rounded-full bg-background flex items-center justify-center backdrop-blur-sm">
                        <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-foreground">
                        {t(`features.${key}.title` as const)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`features.${key}.description` as const)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
}

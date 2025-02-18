import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "fr", name: "Français", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
] as const;

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1 px-3">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline-block">
              {currentLanguage?.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          {languages.map((lang) => (
            <div key={lang.code}>
              <Link href="/" locale={lang.code}>
                <DropdownMenuItem className="cursor-pointer">
                  <span
                    className={`${
                      currentLocale === lang.code ? "font-medium" : ""
                    }`}
                  >
                    {lang.name}
                  </span>
                </DropdownMenuItem>
              </Link>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

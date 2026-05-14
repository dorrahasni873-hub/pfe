import { IconSettings, IconSun, IconMoon, IconTypography, IconLayoutSidebarLeftExpand, IconLayoutColumns, IconLayoutSidebarRightExpand, IconLayoutSidebar, IconPalette, IconDroplet, IconFlame, IconLayoutNavbar } from "@tabler/icons-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useSettings } from "@/app/providers/SettingsProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

const ParametresPage = () => {
  const { theme, setTheme } = useTheme();
  const { settings, setFontSize, setSidebarSide, setSidebarVariant, setSidebarCollapsible, setSidebarDefaultOpen, setThemePreset, setMenuStyle } = useSettings();

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3 px-4 lg:px-6">
        <div className="rounded-full bg-primary/10 p-2.5">
          <IconSettings className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-sm text-muted-foreground">Personnalisez votre expérience</p>
        </div>
      </div>

      <div className="grid gap-6 px-4 lg:px-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconSun className="size-4" />
              Thème
            </CardTitle>
            <CardDescription>Choisissez entre le thème clair et sombre</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={theme === "dark" ? "dark" : "light"}
              onValueChange={(v) => { if (v) setTheme(v as "dark" | "light"); }}
            >
              <ToggleGroupItem value="light" className="gap-2 px-4">
                <IconSun className="size-4" />
                Clair
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" className="gap-2 px-4">
                <IconMoon className="size-4" />
                Sombre
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">Palette de couleurs</p>
              <ToggleGroup
                type="single"
                value={settings.themePreset}
                onValueChange={(v) => { if (v) setThemePreset(v as "default" | "deep-purple" | "solar-dusk"); }}
              >
                <ToggleGroupItem value="default" className="gap-2 px-4">
                  <IconPalette className="size-4" />
                  Défaut
                </ToggleGroupItem>
                <ToggleGroupItem value="deep-purple" className="gap-2 px-4">
                  <IconDroplet className="size-4" />
                  Deep Purple
                </ToggleGroupItem>
                <ToggleGroupItem value="solar-dusk" className="gap-2 px-4">
                  <IconFlame className="size-4" />
                  Solar Dusk
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTypography className="size-4" />
              Taille de la police
            </CardTitle>
            <CardDescription>Ajustez la taille du texte dans l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={settings.fontSize}
              onValueChange={(v) => { if (v) setFontSize(v as "small" | "medium" | "large"); }}
            >
              <ToggleGroupItem value="small" className="gap-2 px-4">
                <span className="text-xs">A</span>
                Petit
              </ToggleGroupItem>
              <ToggleGroupItem value="medium" className="gap-2 px-4">
                <span className="text-sm">A</span>
                Normal
              </ToggleGroupItem>
              <ToggleGroupItem value="large" className="gap-2 px-4">
                <span className="text-base">A</span>
                Grand
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLayoutSidebarLeftExpand className="size-4" />
              Position de la barre latérale
            </CardTitle>
            <CardDescription>Déplacez la barre latérale à gauche ou à droite</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={settings.sidebarSide}
              onValueChange={(v) => { if (v) setSidebarSide(v as "left" | "right"); }}
            >
              <ToggleGroupItem value="left" className="gap-2 px-4">
                <IconLayoutColumns className="size-4" />
                Gauche
              </ToggleGroupItem>
              <ToggleGroupItem value="right" className="gap-2 px-4">
                <IconLayoutColumns className="size-4 rotate-180" />
                Droite
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLayoutSidebarRightExpand className="size-4" />
              Variante de la barre latérale
            </CardTitle>
            <CardDescription>Change l'apparence et l'intégration de la barre latérale</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={settings.sidebarVariant}
              onValueChange={(v) => { if (v) setSidebarVariant(v as "sidebar" | "floating" | "inset"); }}
            >
              <ToggleGroupItem value="sidebar" className="gap-2 px-4">
                Sidebar
              </ToggleGroupItem>
              <ToggleGroupItem value="floating" className="gap-2 px-4">
                Flottant
              </ToggleGroupItem>
              <ToggleGroupItem value="inset" className="gap-2 px-4">
                Inset
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLayoutSidebar className="size-4" />
              Réduction de la barre latérale
            </CardTitle>
            <CardDescription>Contrôle comment la barre latérale se réduit</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={settings.sidebarCollapsible}
              onValueChange={(v) => { if (v) setSidebarCollapsible(v as "offcanvas" | "icon" | "none"); }}
            >
              <ToggleGroupItem value="offcanvas" className="gap-2 px-4">
                Hors-champ
              </ToggleGroupItem>
              <ToggleGroupItem value="icon" className="gap-2 px-4">
                Icônes
              </ToggleGroupItem>
              <ToggleGroupItem value="none" className="gap-2 px-4">
                Aucun
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLayoutSidebar className="size-4" />
              État par défaut
            </CardTitle>
            <CardDescription>Ouvrir ou fermer la barre latérale au chargement</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={settings.sidebarDefaultOpen ? "open" : "closed"} onValueChange={(v) => setSidebarDefaultOpen(v === "open")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Ouverte</SelectItem>
                <SelectItem value="closed">Fermée</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconLayoutNavbar className="size-4" />
              Menu horizontal
            </CardTitle>
            <CardDescription>Remplace la barre latérale par un menu horizontal</CardDescription>
          </CardHeader>
          <CardContent>
            <ToggleGroup
              type="single"
              value={settings.menuStyle}
              onValueChange={(v) => { if (v) setMenuStyle(v as "sidebar" | "floating" | "fixed" | "fullWidth"); }}
            >
              <ToggleGroupItem value="sidebar" className="gap-2 px-4">
                Barre latérale
              </ToggleGroupItem>
              <ToggleGroupItem value="floating" className="gap-2 px-4">
                Flottant
              </ToggleGroupItem>
              <ToggleGroupItem value="fixed" className="gap-2 px-4">
                Fixé
              </ToggleGroupItem>
              <ToggleGroupItem value="fullWidth" className="gap-2 px-4">
                Pleine largeur
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParametresPage;

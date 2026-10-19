import type { Component } from "vue"
import { Home, User, Mail, Globe } from "@lucide/vue"
import BrandIcons from "@/components/icons/BrandIcons.vue"


import { h } from "vue"
const GithubIcon = () => h(BrandIcons, { name: "github" })
const DiscordIcon = () => h(BrandIcons, { name: "discord" })

export const DISCORD_ID = "784483333149163540"
export const GITHUB_USERNAME = "Doume-20"
export const GITHUB_ORG = "NowYouKnow-nYk"
export const SUBDOMAIN = "20"
export const DOMAIN = "doume.be"
export const EMAIL = `20@${DOMAIN}`
export const FULL_DOMAIN = `https://${SUBDOMAIN}.${DOMAIN}`

export const INDEX_DESC   = `Portfolio de ${GITHUB_USERNAME}`
export const ME_DESC      = `À propos de moi`
export const GITHUB_DESC  = `Github de ${GITHUB_USERNAME}`

export interface NavSection {
  path: string
  label: string
  icon: Component
}

export const NAV_SECTIONS: NavSection[] = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/me", label: "À propos", icon: User },
  { path: "/github", label: "GitHub", icon: GithubIcon },
]

export interface SocialLink {
  label: string
  href: string
  icon: Component
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: `https://github.com/${GITHUB_USERNAME}/`,
    icon: GithubIcon,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "Site",
    href: `https://${SUBDOMAIN}.${DOMAIN}`,
    icon: Globe,
  },
  {
    label: "Discord",
    href: `https://discord.com/users/${DISCORD_ID}`,
    icon: DiscordIcon,
  }
]

export type Items = { icon?: string | Component; nom?: string; hl?: string }
export type SkillGroup = { titre?: string; items: Items[] }

export type BiographyEntry =
  | { type: "presentation"; texte: string[] }
  | { type: "skills-vertical"; texte: SkillGroup[] }
  | { type: "skills-horizontal"; texte: SkillGroup[] }
  | { type: "devices"; texte: { nom: string; description?: string }[] }

export type Biography = BiographyEntry[]

export const BIOGRAPHY: Biography = [
  {
    type: "presentation",
    texte: [
      "'jour, je suis un élève de première au lycée Louis Bascan. J'ai choisi comme spé STI2D, mais hors de l'ingénerie, j'aime faire des CTFs comme HackTonLycée, Root-Me, PortSwigger, etc...",
      "Pour HackTonLycée, j'ai finit l'édition de 2025 en 53ème place (dégouté car il fallait être dans le top 50 pour l'épreuve suivante) et pour 2026, je suis actuellement 2ème (il n'est pas encore finit)", 
      "J'ai pas d'idées d'autres trucs à rajouter, donc pour l'instant, ce sera vide", 
    ],
  },
  {
  type: "skills-vertical",
  texte: [
    { titre: "IDE", items: [
      { icon: "logos:visual-studio-code", nom: "VSCode", hl: "Utilisé actuellement" },
      { icon: "devicon:neovim", nom: "Neovim", hl: "Utilisé avec NV Chad" },
      { icon: "logos:pycharm", nom: "Pycharm", hl: "Utilisé pendant 30j seulement" },
    ]},
    { titre: "Langages", items: [
      { icon: "logos:python", nom: "Python", hl: "Premier langage de programmation appris" },
      { icon: "logos:c-plusplus", nom: "C++", hl: "Pour programmer des arduinos" },
      { icon: "logos:vue", nom: "Vue", hl: "Le langage utilisé pour ce site" },
      { icon: "logos:javascript", nom: "JS", hl: "Aussi utilisé pour ce site" },
    ]},
    { titre: "Frameworks", items: [
      { icon: "logos:nuxt-icon", nom: "Nuxt", hl: "Utilisé pour faire ce site" },
      { icon: "logos:tailwindcss-icon", nom: "Tailwind CSS", hl: "Aussi utilisé pour ce site" },
    ]},
    { titre: "Versionning", items: [
      { icon: "logos:git-icon", nom: "Git", hl: "Afin d'avoir un moyen de changer de version facilement" },
      { icon: "simple-icons:github", nom: "Github", hl: "Site utilisé pour host tout mon code et autre" },
    ]},
    { titre: "Systèmes", items: [
      { icon: "logos:archlinux", nom: "Arch", hl: "I use Arch btw" },
      { icon: "logos:microsoft-windows-icon", nom: "Windows", hl: "MicroSlop ?" },
      { icon: "logos:android-icon", nom: "Android", hl: "Utilisé avant" },
      { icon: "simple-icons:e", nom: "e/OS", hl: "A été flashé sur mon tel en août, donc récent" },
      { icon: "logos:ubuntu", nom: "Ubuntu", hl: "Trash (mon opinion)" },
      { icon: "simple-icons:kalilinux", nom: "Kali", hl: "Trop d'outils dessus, mais bien en daily" },
    ]},
  ],
},
  {
    type: "devices",
    texte: [
      { nom: "Lenovo ThinkPad x13 gen4 (CachyOS)", description: "Ordinateur que j'utilise au quotidien" },
      { nom: "FairPhone Gen. 6 (/e/OS rooté)", description: "Mon téléphone principal, dont je suis fier (FairPhone est très bien je trouve, en tout cas, pour mon usage)" },
      { nom: "Unowhy Gen2 2025 (Arch linux)", description: "Ordinateur donné par la RIDF lors de mon année de seconde (2025)" },
      { nom: "Asus Chromebook (ChromeOS)", description: "Ordinateur des secondes de 2026, qui est complètement bloqué de partout" },
      { nom: "Packard Bell Nav50 (Windows 7)", description: "Petit ordi sous win7, eu pour 5€ à une brocante xD" },
      { nom: "Samsung Galaxy Tab a7 (Andoid)", description: "Tablette trouvé dans ma déchetterie, tout fonctionne sauf l'usb-C qui est capricieux" },
    ],
  },
]

export const FEATURED_REPOS: string[] = [
  `${GITHUB_USERNAME}/${SUBDOMAIN}.${DOMAIN}`,
  `${GITHUB_ORG}/ykw.doume.be`,
] 

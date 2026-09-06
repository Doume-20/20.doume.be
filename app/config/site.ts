import type { Component } from "vue"
import { Home, User, Mail, Globe } from "@lucide/vue"
import BrandIcons from "@/components/icons/BrandIcons.vue"

import { h } from "vue"
const GithubIcon = () => h(BrandIcons, { name: "github" })
const DiscordIcon = () => h(BrandIcons, { name: "discord" })

export const DISCORD_ID = "784483333149163540"
export const GITHUB_USERNAME = "Doume-20"
export const SUBDOMAIN = "20"
export const DOMAIN = "doume.be"
export const EMAIL = `20@${DOMAIN}`

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
    href: `https://github.com/${GITHUB_USERNAME}/${SUBDOMAIN}.${DOMAIN}`,
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

export interface Biography {
  [index: number]: string[]
}

export const BIOGRAPHY: Biography = [
  [
    "Étudiant au lycée Louis Bascan à Rambouillet, j'aime m'amuser avec du reverse engineering, de la programmation, de la cybersécurité, de l'électronique, de la 3D, et la liste est encore longue...",
    "Pour le DOX que je me fais moi-même : de toute façon, plus personne n'a vraiment de vie privée aujourd'hui. Alors autant partager mes infos moi-même, plutôt que d'attendre qu'une institution (hum hum, l'État français) se fasse hacker et que ces mêmes infos finissent vendues sur le net sans que j'aie mon mot à dire.",
    "Ce site a entièrement été fait par moi, à part à certains moments où j'ai demandé un coup de main à l'IA (comme pour un bug de couleurs, qui venait en fait d'une extension que j'avais activée et qui changeait les couleurs sur tous les sites que je visitais — oui, je suis bête).",
  ],
  [
    "J'ai fait mes années de collège dans la cambrousse, avant de partir dans un lycée à 1h de route de chez moi pour aller en STI2D (actuellement en 1STI2D2, oui c'est long). Je suis interne là-bas, et le règlement devient de plus en plus strict au fil de l'année — les nouvelles règles sont débiles, mais bon, c'est la vie...",
    "Je m'intéresse à l'informatique depuis tout petit, mais j'ai vraiment commencé à coder à Noël, en 6ème, il y a 4 ans et demi (bientôt 5, dans quelques mois). Mon premier ordi était un Unowhy de 2020, 64 Go de stockage et 4 Go de RAM — une petite fortune dans cette économie.",
  ],
  [
    "Cet ordinateur Unowhy a commencé à m'intriguer en fin de 3ème, début de 2nde, quand j'ai appris que j'allais en avoir un en passant au lycée (merci l'État). Sauf qu'en le récupérant, j'ai vite compris qu'il était bridé, et je me suis mis à chercher comment le débrider (merci STY, tes tutos sont parfaits).",
    "C'est là que j'ai aussi réalisé que cet ordinateur avait autant de performances que mon prof de SES en 2nde avait de cheveux, c'est-à-dire aucune. J'ai donc commencé à débrider des ordinateurs pour des amis, ce qui m'a valu une petite réputation dans mon lycée (j'en ai un peu marre d'être le technicien de la classe, mais bon, ceux qui savent, savent).",
    "Je faisais ça gratuitement. Au milieu de ma 2nde, je me suis aussi penché sur les batteries Unowhy mises à disposition par le lycée : super pratiques sur le papier, mais super chiantes à cause d'un dock merdique qui se connecte en 4G dans une salle qui n'en capte pas (merci Unowhy — ou plutôt LLWPower, vu qu'Unowhy n'est qu'un revendeur qui se fait de l'argent grâce à la RIDF, laquelle le laissait vendre à l'État des ordinateurs de marque Emdoor à 600€ pièce, alors qu'ils venaient tout droit de Chine).",
    "Je pense que ça fait déjà pas mal pour l'instant. Au pire, j'ajouterai du texte ou des sections plus tard.",
  ],
];

export const FEATURED_REPOS: string[] = [
  `${GITHUB_USERNAME}/${SUBDOMAIN}.${DOMAIN}`,
  `${GITHUB_USERNAME}/${DOMAIN}`,
  `${GITHUB_USERNAME}/RIDF`,
] 
/* 
    !   Il n'est pas recommandé d'avoir cet array vide ou d'avoir plus de 3 repos non plus
    !   pour un meilleur layout, 3 est le max (recommandé)
    !   mais si vous voulez en avoir plus, 6 est vraiment le max (visible) 
    !   parce que la page ne permet pas ce scroller, ce qui bloque la possibilité de voir plus de repos

    TODO: Régler le problème
*/
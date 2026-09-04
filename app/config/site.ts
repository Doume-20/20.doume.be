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
    "Étudiant au lycée Louis Bascan à Rambouillet, j'aime m'amuser avec du reverse engineering, de la programmation, de la cybersécurité, de l'électronique, de la 3D et la liste est encore longue... ",
    "Pour le DOX que je me fais à moi même, c'est parce que je pars du principe que dans le monde où l'on est, nous n'avons plus aucune vie privée, donc mieux vaut partager ses infos soi-même, plutôt que d'attendre qu'une certaine institution (hum hum l'état français) se fasse hacker et que mes infos soient vendues sur le net.",
    "Ce site a entièrement été fait par moi, à part à certains moment où j'ai demandé à l'IA de m'aider (comme pour un problème de couleurs, alors que j'avais juste activé une extension qui changeait certaines couleurs sur tous les sites que je visitais (oui je suis bête)).",
  ],
  [
    "Je suis un étudiant ayant fait ses années de collège dans la cambrousse, puis étant allé dans un lycée à 1h de route de chez moi afin d'aller en STI2D (je suis en 1STI2D2 (oui c'est long) actuellement). Je dois aller à l'internat de mon lycée, qui devient de plus en plus stricts au fil de l'année (alors que les nouvelles règles sont débiles, mais bon, c'est la vie)...",
    "J'ai commencé à m'intéresser à l'informatique très tôt, mais j'ai vraiment commencé à coder à mon Noël de 6ème, soit il y a 4 ans et demi, et bientôt 5 :) dans quelques mois. J'avais commencé sur un ordinateur unowhy de 2020, qui était équipé avec 64Go de stockage et 4Go de RAM, soit une petite fortune dans cette économie.",
  ],
  [
    "Cet ordinateur UNOWHY a commencé à m'intriguer en fin de 3ème, début 2nd, quand j'ai appris que j'allais en avoir un car je passais au lycée (merci l'état), mais quand j'ai appris qu'il était aussi bridé que les yeux d'un chin- non... pas de blague raciste... bref, quand j'ai appris qu'il était bridé, j'ai commencé à m'intéresser à la manière utilisé pour le débrider (encore merci STY, tes tutos sont parfaits).",
    "C'est là que j'ai aussi découvert que l'ordinateur avait autant de performances que mon prof de SES en 2nd avait de cheuveux, c'est à dire aucun (là ça va, c'est pas raciste). J'ai donc commencé à débrider des ordinateurs pour des amis, ce qui m'a valut une certaine réputation dans mon lycée pour mes amis (j'en ai marre d'être le technicien de la classe, ceux qui savent, savent).",
    "Je faisais ce boulot gratuitement contre une petite donnation (aucun argent ne m'a été donné, je n'ai que eu de quoi boire ou manger, donc rien d'illégal). Au milieu de mon année de seconde, j'ai commencé à m'intéresser aux batteries UNOWHY que mon lycée nous laissais à disposition, car elles étaient super pratiques, mais aussi super chiantes à avoir à cause d'un dock merdique qui se connecte en 4G dans une salle qui n'en a pas (merci UNOWHY, enfin devrais-je dire LLWPOWER étant donné que UNOWHY est juste un revendeur qui se fait de l'argent grâce à la RIDF qui les laissait vendre des ordinateurs à 600€ à l'état, alors qu'ils vennaient tout droit de Chine).",
    "Je pense que c'est déjà pas mal là non ? au pire je rajouterais du texte ou des sections après."
  ],
]

export const FEATURED_REPOS: string[] = [
  `${GITHUB_USERNAME}/${SUBDOMAIN}.${DOMAIN}`,
  `${GITHUB_USERNAME}/${DOMAIN}`,
  `${GITHUB_USERNAME}/RIDF`,
] 
/* 
    !   Il n'est pas recommandé d'avoir cet array vide ou d'avoir plus de 3 repos non plus
    !   pour un meilleur layout, 3 est le max
    !   mais si vous voulez en avoir plus, 6 est vraiment le max (visible) 
    !   parce que la page ne permet pas ce scroller, ce qui bloque la possibilité de voir plus de repos

    TODO: Régler le problème
*/
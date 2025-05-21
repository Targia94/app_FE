import { FileSyncOutlined } from '@ant-design/icons'
import { CogIcon, DocumentMagnifyingGlassIcon, DocumentPlusIcon, ListBulletIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

export type Route = {
  label: string
  key: `/${string}`
  hidden?: boolean
  icon?: ReactNode
  children?: Route[]
  permissions?: string[]
}

export const routes: Route[] = [
  {
    label: 'Home',
    key: '/dashboard',
    icon: <HomeIcon width={20} />,
  },
  {
    label: 'Cerca Materiale',
    key: '/dashboard/cerca-materiale',
    icon: <MagnifyingGlassIcon width={20} />,
    permissions: [
      'admin',
      'contractor',
      'supervisor',
      'operatore_meccanico',
      'operatore_ovm',
      'operatore_elettrico',
      'operatore_produzione',
      'ptl',
      'alternate',
    ],
  },
  /* {
    label: "Preleva",
    key: "/dashboard/preleva-materiali",
    icon: <InboxArrowDownIcon width={20} />,
  }, */
  {
    label: 'Approvazione prelievo',
    key: '/dashboard/prelievi-da-approvare',
    icon: <ClipboardDocumentCheckIcon width={20} />,
    permissions: ['admin', 'supervisor', 'ptl', 'alternate'],
  },
  {
    label: 'Ordine',
    key: '/dashboard/prelievi-da-approvare/[order]',
    hidden: true,
    permissions: ['admin', 'supervisor', 'ptl', 'alternate'],
  },
  /* {
    label: 'Cronologia Prelievi',
    key: '/dashboard/storico-lista',
    icon: <BookOpenIcon width={20} />,
    permissions: [
      'contractor',

      'operatore_meccanico',
      'operatore_ovm',
      'operatore_elettrico',
      'operatore_produzione',
      'ptl',

    ],
  }, */
  /* {
    label: 'Cronologia Rda',
    key: '/dashboard/cronologia-rda',
    icon: <DocumentMagnifyingGlassIcon width={20} />,
    permissions: [
      'rda_procurement',
      'rda_L1',
      'rda_L2',
      'admin',
      'rda_spv'
    ],
  }, */
  
  {
    label: 'Richieste di Acquisto in corso',
    key: '/dashboard/richieste',
    icon: <FileSyncOutlined style={{ fontSize: "20px" }} />,
    permissions: ['rda_L1', 'rda_L2', 'rda_admin', 'rda_procurement', 'rda_spv'],
  },
  {
    label: 'Cronologie',
    key: '/dashboard/cronologie',
    icon: <></>,
    permissions: [
      'admin',
      'contractor',
      'supervisor',
      'operatore_meccanico',
      'operatore_ovm',
      'operatore_elettrico',
      'operatore_produzione',
      'ptl',
      'alternate',
      'rda_procurement',
      'rda_L1',
      'rda_L2',
      'rda_spv',
      'rda_admin'
    ],
    children: [
      {
        label: 'Cronologia Prelievi',
        key: '/dashboard/storico-lista',
        icon: <BookOpenIcon width={20} />,
        permissions: [
          'admin',
          'contractor',
          'supervisor',
          'operatore_meccanico',
          'operatore_ovm',
          'operatore_elettrico',
          'operatore_produzione',
          'ptl',
          'alternate',
        ],
      },
      {
        label: 'Cronologia Rda',
        key: '/dashboard/cronologia-rda',
        icon: <DocumentMagnifyingGlassIcon width={20} />,
        permissions: [
          'rda_procurement',
          'rda_L1',
          'rda_L2',
          'rda_admin',
          'rda_spv'

        ],
      },
    ]
  },


  {
    label: 'Ordini da prelevare',
    key: '/dashboard/preleva-dal-magazzino',
    icon: <ArrowDownTrayIcon width={20} />,
    permissions: ['admin', 'ptl', 'contractor'],
  },
  {
    label: 'Ordine',
    key: '/dashboard/preleva-dal-magazzino/[orderId]',
    hidden: true,
    permissions: ['admin', 'ptl', 'contractor'],
  },
  {
    label: 'Utenti',
    key: '/dashboard/utenti',
    icon: <UserIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Gestione utente',
    key: '/dashboard/utenti/[uid]',
    hidden: true,
    permissions: ['admin'],

  },
  {
    label: 'Ruoli',
    key: '/dashboard/ruoli',
    icon: <UserGroupIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Gestione ruolo',
    key: '/dashboard/ruoli/[roleId]',
    icon: <UserGroupIcon width={20} />,
    permissions: ['admin'],
    hidden: true,
  },
  {
    label: 'Reparti',
    key: '/dashboard/reparti',
    icon: <BuildingOffice2Icon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Gestione reparto',
    key: '/dashboard/reparti/[departmentId]',
    icon: <UserGroupIcon width={20} />,
    permissions: ['admin'],
    hidden: true,
  },
  /* {
    label: 'Parti Macchine',
    key: '/dashboard/parti_macchina',
    icon: <ArrowPathIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Categorie',
    key: '/dashboard/categorie',
    icon: <ArrowPathIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Gl-Account',
    key: '/dashboard/gl-account',
    icon: <ArrowPathIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Fornitori',
    key: '/dashboard/fornitori',
    icon: <ArrowPathIcon width={20} />,
    permissions: ['admin'],
  }, */
  {
    label: 'Budget',
    key: '/dashboard/budget',
    icon: <PresentationChartBarIcon width={20} />,
    permissions: ['rda_admin','rda_L2'],
   
  },
  {
    label: 'Budget Storico',
    key: '/dashboard/budget/storico',
    icon: <PresentationChartBarIcon width={20} />,
    permissions: ['rda_admin','rda_L2'],
    hidden: true,
  },
  {
    label: 'Nuova Richiesta',
    key: '/dashboard/richieste/nuova-richiesta',
    icon: <DocumentPlusIcon width={20} />,
    permissions: ['rda_admin', 'rda_L1', 'rda_spv'],
    hidden: true,
  },

  {
    label: 'Info Richiesta',
    key: '/dashboard/richieste/[id]',
    icon: <ListBulletIcon width={20} />,
    permissions: ['rda_admin', 'rda_L1', 'rda_L2', 'rda_procurement', 'rda_spv'],
    hidden: true
  },
  {
    label: 'Pannello di Controllo Rda',
    key: '/richieste',
    icon: <></>,
    permissions: ['rda_admin'],
    children: [
      {
        label: 'Ruoli Rda',
        key: '/dashboard/ruoli-rda',
        icon: <CogIcon width={20} />,
        permissions: ['rda_admin'],
      },
      {
        label: 'Centri di Costo Rda',
        key: '/dashboard/cdc-rda',
        icon: <CogIcon width={20} />,
        permissions: ['rda_admin'],
      },
      {
        label: 'Parti Macchine',
        key: '/dashboard/parti_macchina',
        icon: <CogIcon width={20} />,
        permissions: ['rda_admin'],
      },
      {
        label: 'Categorie',
        key: '/dashboard/categorie',
        icon: <CogIcon width={20} />,
        permissions: ['rda_admin'],
      },
      {
        label: 'GL-Account',
        key: '/dashboard/gl-account',
        icon: <CogIcon width={20} />,
        permissions: ['rda_admin'],
      },
      {
        label: 'Fornitori',
        key: '/dashboard/fornitori',
        icon: <CogIcon width={20} />,
        permissions: ['rda_admin'],
      }
    ]
  },
  /* {
    label: 'Richieste',
    key: '/dashboard/richieste',
    icon: <ListBulletIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Nuova Richiesta',
    key: '/dashboard/richieste/nuova-richiesta',
    icon: <ListBulletIcon width={20} />,
    permissions: ['admin'],
    hidden: true,
  },
  {
    label: 'Esportazione',
    key: '/dashboard/esportazione',
    icon: <ListBulletIcon width={20} />,
    permissions: ['admin'],
  }, */
  {
    label: 'Aggiorna Database',
    key: '/dashboard/aggiorna-database',
    icon: <ArrowPathIcon width={20} />,
    permissions: ['admin'],
  },
  {
    label: 'Stato richiesta',
    key: '/dashboard/stato-richiesta',
    hidden: true,
    permissions: [
      'admin',
      'supervisor',
      'contractor',
      'operatore_meccanico',
      'operatore_ovm',
      'operatore_elettrico',
      'operatore_produzione',
      'alternate',
    ],
  },
  {
    label: 'Richiesta',
    key: '/dashboard/stato-richiesta/[order]',
    hidden: true,
    permissions: [
      'admin',
      'supervisor',
      'contractor',
      'operatore_meccanico',
      'operatore_ovm',
      'operatore_elettrico',
      'operatore_produzione',
      'alternate',
    ],
  },
]

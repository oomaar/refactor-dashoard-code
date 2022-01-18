import {
    Home,
    Anchor,
    Headphones
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: '/dashboard/resource', title: 'Resource Manager', type: 'link' },
            { path: '/dashboard/itManager', title: 'ItManager', type: 'link' },
            { path: '/dashboard/assets', title: 'Assets Manager', type: 'link' }
           
        ]
    },
    {
        title: 'Support Ticket', icon: Anchor, type: 'link', path: '/support-ticket/supportTicket', active: false
    },
    {
        path: 'http://support.pixelstrap.com/help-center', title: 'Raise Support', icon: Headphones, type: 'exteral_link', active: false
    },
]


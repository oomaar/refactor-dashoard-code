import {
    Home,
    Box,
    DollarSign,
    UserPlus,
    Users,
    Chrome,
    Settings,
    Airplay,
    FolderPlus,
    File,
    Command, Cloud, Book, FileText, Server, Image, Sliders, Map, GitPullRequest, Calendar, Edit, Mail, MessageSquare, UserCheck, Layers, HelpCircle, Database, Headphones, Mic, ShoppingBag, Search, AlertOctagon, Lock, Briefcase, BarChart,Target, List, Package
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: '/dashboard/resource', title: 'resource Manager', type: 'link' },
            { path: '/dashboard/Itmanager', title: 'it Manager', type: 'link' },
            { path: '/dashboard/assets', title: 'Assets Manager', type: 'link' },
           
        ]
    },
    {
        title: 'Social Media', icon: List, type: 'sub', badgeType: 'primary', active: false, children: [
            { path: '/social', title: 'Twitter', type: 'link' },
            { path: '/facebook', title: 'Facebook', type: 'link' },
            { path: '/orange'  , title: 'Orange Facebook' , type:'link'}
        ]
    }   
    ,
    {
        title: 'Users', icon: Users, type: 'sub', active: false, children: [
            { path: '/users/userProfile', type: 'link', title: 'Users Profile ' },
            { path: '/users/userEdit', type: 'link', title: 'Users Edit' },
            { path: '/users/userCards', type: 'link', title: 'Users Cards' },
        ]
    },
    {
        title: 'Calender', path: '/calender/calender1', icon: Calendar, type: 'sub', active: false, bookmark: true, children: [
            { path: '/calender/calender1', type: 'link', title: 'Calender', },
            { path: '/calender/calender2', type: 'link', title: 'Draggable Calender' },
        ]
    },
    {
        title: 'Tasks', icon: List, type: 'link', path: '/taks-app/task', active: false
    },
    
    {
        title: 'FAQ', icon: HelpCircle, type: 'link', path: '/faq/faqComponent', active: false
    },
    ,
    {
        title: 'Maintenance', icon: Settings, path: '/pages/maintenance', type: 'link', active: false
    }
]

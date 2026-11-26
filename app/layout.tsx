import {entities} from '../lib/entities';
import type {Metadata, Viewport} from 'next';
import './globals.css';
import {Json, SiteFooter, SiteHeader} from '../components/Site';
import {domain} from '../lib/site';
export const metadata:Metadata={ metadataBase:new URL(domain), title:'Grzegorz Plebaniak', icons:{icon:'/favicon-32.png'}, verification:{google:'CzlhzCDS5zGi-A7dtgAl5kU80WTzUisLFFLmqwd5wD4'} };
export const viewport:Viewport={themeColor:'#2D5A4E'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pl"><body><Json data={entities}/><a href="#tresc" className="skip-link">Przejdź do treści</a><SiteHeader/>{children}<SiteFooter/></body></html>;}

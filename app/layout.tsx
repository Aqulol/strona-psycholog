import ConversionMeasurement from '../components/ConversionMeasurement';
import {entities} from '../lib/entities';
import type {Metadata, Viewport} from 'next';
import './globals.css';
import './editorial.css';
import {Json, SiteFooter, SiteHeader} from '../components/Site';
import {domain} from '../lib/site';
export const metadata:Metadata={ metadataBase:new URL(domain), referrer:'no-referrer', title:'Grzegorz Plebaniak', icons:{icon:'/favicon-32.png'}, verification:{google:'CzlhzCDS5zGi-A7dtgAl5kU80WTzUisLFFLmqwd5wD4'} };
export const viewport:Viewport={themeColor:'#2D5A4E'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pl"><body><Json data={entities}/><a href="#tresc" className="skip-link">Przejdź do treści</a><SiteHeader/>{children}<SiteFooter/><ConversionMeasurement/></body></html>;}

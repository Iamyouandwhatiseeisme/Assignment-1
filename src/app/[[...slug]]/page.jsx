import "../styles/global.css";
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [''] } , {slug: ['blog']}, {slug: ['profile']}, {slug: ['about']}, {slug: ['contact']}, {slug: ['settings']}, {slug: ['products']},
  {slug: ['posts']}]
}
 
export default function Page() {
  return <ClientOnly />
}
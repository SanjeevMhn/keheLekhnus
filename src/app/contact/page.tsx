import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb"

export default function Page() {
  const crumbs: Array<TBreadCrumb> = [
    {
      link: '/',
      name: 'home'
    },
    {
      link: '/contact',
      name: 'contact'
    }
  ]
  return (
    <div className="main-wrapper">
      <BreadCrumb crumbs={crumbs} />
    </div>
  )
}

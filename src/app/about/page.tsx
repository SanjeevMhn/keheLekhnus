import BreadCrumb, { TBreadCrumb } from "../(components)/breadcrumb"

export default function Page() {
	const crumbs: Array<TBreadCrumb> = [
		{
			link: '/',
			name: 'home'
		},
		{
			link: '/about',
			name: 'about'
		}
	]
	return (
		<div className="main-wrapper">
			<BreadCrumb crumbs={crumbs} />
		</div>
	)
}

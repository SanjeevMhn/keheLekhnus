'use client'
import Link from 'next/link';
import { FC } from 'react';

export type TBreadCrumb = {
  name: string,
  link: string,
}

const BreadCrumb: FC<{ crumbs: Array<TBreadCrumb>}> = ({ crumbs }) => {
  return (
    <nav className="breadcrumb-nav">
      <ul className="breadcrumb-list">
        {
          crumbs.map((crumb:TBreadCrumb, index: number) => (
            <li className="breadcrumb-item" key={index}>
              <Link href={crumb.link} className="breadcrumb-link">
                {crumb.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default BreadCrumb;

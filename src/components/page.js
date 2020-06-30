import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const renderBreadCrumb = (rootPageLabel, breadCrumbs) => (
  <div>
    <Link to="/">{rootPageLabel}</Link>
    <div> {breadCrumbs.map((b,i) => <div key={i}>{b.label}</div>)}</div>
  </div>
);

export const Page = ({ children, rootPageLabel, breadCrumbs = [] }) => (
  <Fragment>
    <div>
      {breadCrumbs.length > 0 ? renderBreadCrumb(rootPageLabel, breadCrumbs) : ''}
    </div>
    <div className="page-content">
      {children}
    </div>
  </Fragment>
);

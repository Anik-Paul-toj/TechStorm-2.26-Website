import React from 'react';
import './pagination.css';

export const Pagination = ({ children, className = '' }) => (
  <nav className={`pagination-8bit ${className}`} role="navigation" aria-label="Pagination">
    {children}
  </nav>
);

export const PaginationContent = ({ children, className = '' }) => (
  <ul className={`pagination-content-8bit ${className}`}>
    {children}
  </ul>
);

export const PaginationItem = ({ children, className = '' }) => (
  <li className={`pagination-item-8bit ${className}`}>{children}</li>
);

export const PaginationPrevious = ({ href, onClick, disabled, className = '', children }) => {
  const content = children ?? 'Prev';
  const common = { className: `pagination-prev-8bit ${className}`, 'aria-label': 'Previous page' };
  if (href && !disabled) {
    return <a href={href} {...common}>{content}</a>;
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} {...common}>
      {content}
    </button>
  );
};

export const PaginationNext = ({ href, onClick, disabled, className = '', children }) => {
  const content = children ?? 'Next';
  const common = { className: `pagination-next-8bit ${className}`, 'aria-label': 'Next page' };
  if (href && !disabled) {
    return <a href={href} {...common}>{content}</a>;
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} {...common}>
      {content}
    </button>
  );
};

export const PaginationLink = ({ href, isActive, onClick, className = '', children }) => {
  const content = children;
  const activeClass = isActive ? 'pagination-link-active' : '';
  const common = { className: `pagination-link-8bit ${activeClass} ${className}` };
  if (href && !isActive) {
    return <a href={href} {...common}>{content}</a>;
  }
  return (
    <button type="button" onClick={() => !isActive && onClick?.()} aria-current={isActive ? 'page' : undefined} {...common}>
      {content}
    </button>
  );
};

export const PaginationEllipsis = ({ className = '' }) => (
  <span className={`pagination-ellipsis-8bit ${className}`} aria-hidden>…</span>
);

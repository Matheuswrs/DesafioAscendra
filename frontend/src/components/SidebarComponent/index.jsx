import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarComponent() {
  return (
    <>
        <div className="d-md-none p-2">
            <button
                className="btn btn-outline-secondary d-md-none m-2 bi bi-list"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
            />
        </div>

      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        style={{
          width: '80vw',
          maxWidth: '300px',
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Fechar"></button>
        </div>
        <div className="offcanvas-body p-3">
          <SidebarContent />
        </div>
      </div>

      <div
        className="d-none d-md-flex flex-column bg-light"
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRight: '1px solid #dee2e6',
          padding: '1rem',
          zIndex: 1045,
        }}
      >
        <SidebarContent />
      </div>
    </>
  );
}

function SidebarContent() {
  return (
    <>
      <h5 className="mb-3">Menu</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : " link-dark")}>
            <i className="bi bi-house" /> Página Inicial
          </NavLink>
        </li>
        <li>
          <NavLink to="/relatorios" className={({ isActive }) => "nav-link" + (isActive ? " active" : " link-dark")}>
            <i className="bi bi-bar-chart-line" /> Relatórios
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default SidebarComponent;

import Header from './Header';

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="page">{children}</main>
  </div>
);

export default Layout;

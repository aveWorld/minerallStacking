import Header from './Header';
// import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="page">{children}</main>
  </div>
);

export default Layout;

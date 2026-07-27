import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className='app-background  text-white'>
            <Navbar/>
            <main >
                {children}
            </main>
        </div>
    );
}

export default Layout;
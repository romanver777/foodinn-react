import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

import routes from "../../routes/routes";
import style from "./app.module.scss";

const App = () => {
  const [isOpenSb, setIsOpenSb] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 992 && isOpenSb) {
      setIsOpenSb(!isOpenSb);
    }
  }, [location]);

  const getPageName = (pathName: string) => {
    const route = routes.filter((item) => item.path === pathName);
    return route[0].name;
  };

  const handleSidebarOpen = () => setIsOpenSb(!isOpenSb);
  const styleMainPanel = style["main-panel"];
  const styleContent = isOpenSb
    ? style.content + " " + style["content_sidebar-open"]
    : style.content;

  return (
    <div className={style.wrapper}>
      <Sidebar
        isOpen={isOpenSb}
        routes={routes}
        activePage={location.pathname.slice(1)}
        onClickHandle={handleSidebarOpen}
      />
      <main className={styleMainPanel}>
        <Navbar
          title={getPageName(location.pathname.slice(1))}
          onClickHandle={handleSidebarOpen}
        />
        <div className={styleContent}>
          <Routes>
            {routes.map((item) => {
              return (
                <Route
                  path={item.path}
                  element={<item.element />}
                  key={item.name}
                />
              );
            })}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;

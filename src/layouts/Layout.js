import React from 'react';
import {Menu} from "../components/Inicio/Menu";
import { Footer } from "../page/Footer";

export  function Plantilla({children}) {
  return (
    <div>
          <div className="menu">
            <Menu />
          </div>
          <div className="body">{children}</div>
          <div className="footer">
            <Footer />
          </div>
        </div>
  )
}

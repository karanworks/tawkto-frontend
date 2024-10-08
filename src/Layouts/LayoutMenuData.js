import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedinUser } from "../helpers/api_helper";

//Import Icons
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

const Navdata = () => {
  const history = useNavigate();

  // const menuDataOfUser = useSelector((state) => state.Login.user.menus);
  const userData = getLoggedinUser();
  const menuDataOfUser = userData.data.menus;

  //state data
  const [isSettings, setIsSettings] = useState(false);

  const [isManagement, setIsManagement] = useState(false);

  const [isDashboard, setIsDashboard] = useState(false);

  //
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Home");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (iscurrentState !== "Settings") {
      setIsSettings(false);
    }

    if (iscurrentState !== "Management") {
      setIsManagement(false);
    }

    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }

    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
  }, [
    history,
    iscurrentState,
    isSettings,
    isManagement,
    isDashboard,
    isAuth,
    isPages,
  ]);

  const parentMenuStates = {
    Settings: isSettings,
    Management: isManagement,
    Dashboard: isDashboard,
  };

  const handleClick = (menuLabelId) => {
    return function (e) {
      e.preventDefault();
      switch (menuLabelId) {
        case "Settings":
          setIsSettings(!isSettings);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);

        case "Management":
          setIsManagement(!isManagement);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);

        case "Dashboard":
          setIsDashboard(!isDashboard);
          setIscurrentState(menuLabelId);
          updateIconSidebar(e);
      }
    };
  };

  const dynamicMenuData = menuDataOfUser?.map((menu) => {
    // menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha
    const updatedMenu = {
      ...menu,
      icon: <FeatherIcon icon={menu.icon} className="icon-dual" />,
      stateVariables: parentMenuStates[menu.menuLableId],
      click: handleClick(menu.menuLableId),
    };
    return updatedMenu;
  });

  // menuLableId me "label" ki spelling galat hai database me glt thi to testing ke liye galat likh kar hi check kr rha
  return <React.Fragment>{dynamicMenuData}</React.Fragment>;
};

export default Navdata;

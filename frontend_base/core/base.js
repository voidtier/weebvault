const imageIcons = {
  light: {
    themeIcon:
      "M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-221 51q-56-56-56-136t56-136q56-56 136-56t136 56q56 56 56 136t-56 136q-56 56-136 56t-136-56ZM216-444H48v-72h168v72Zm696 0H744v-72h168v72ZM444-744v-168h72v168h-72Zm0 696v-168h72v168h-72ZM269-642 166-742l51-55 102 104-50 51Zm474 475L642-268l49-51 103 101-51 51ZM640-691l102-101 51 49-100 103-53-51ZM163-217l105-99 49 47-98 104-56-52Zm317-263Z",

    searchIcon:
      "M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z",
  },

  dark: {
    themeIcon:
      "M479.96-144Q340-144 242-242t-98-238q0-140 97.93-238t237.83-98q13.06 0 25.65 1 12.59 1 25.59 3-39 29-62 72t-23 92q0 85 58.5 143.5T648-446q49 0 92-23t72-62q2 13 3 25.59t1 25.65q0 139.9-98.04 237.83t-238 97.93Zm.04-72q82 0 148.78-47.07Q695.55-310.15 727-386q-20 5-39.67 8.5Q667.67-374 648-374q-113.86 0-193.93-80.07Q374-534.14 374-648q0-19.67 3.5-39.33Q381-707 386-727q-75.85 31.45-122.93 98.22Q216-562 216-480q0 110 77 187t187 77Zm-14-250Z",

    searchIcon:
      "M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z",
  },
};

themeChanger();
avatarModalSetup();

function themeChanger() {
  const theme = document.querySelector(".theme");
  const theme_state = document.querySelector(".theme_state");
  const themePath = document.querySelector(".theme path");

  const themeInfo = localStorage.getItem("userTheme") || "dark";
  setIcons(themeInfo);

  theme.addEventListener("click", () => {
    const darkThemed = document.documentElement.classList.contains("dark");
    if (darkThemed) {
      setIcons("light");
    } else {
      setIcons("dark");
    }
  });

  function setIcons(themeKey) {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeKey);
    themePath.setAttribute("d", imageIcons[themeKey].themeIcon);
    theme_state.textContent = themeKey;
    localStorage.setItem("userTheme", themeKey);
  }
}

function avatarModalSetup() {
  const avatarWrapper = document.querySelector(".avatarWrapper");
  const avatar_modal = document.querySelector(".avatar_modal");
  const account_name = document.querySelector(".account_name");
  const user_session_wrapper = document.querySelector(".user_session_wrapper");
  const logMeOut = document.querySelector(".logMeOut");

  avatarModalGetUserInfo();

  avatarWrapper.addEventListener("click", (e) => {
    e.stopPropagation();

    if (avatar_modal.open) {
      avatar_modal.close();
    } else {
      const positioning = avatarWrapper.getBoundingClientRect();
      avatar_modal.style.top = `${positioning.bottom + 16}px`;
      avatar_modal.style.left = `${positioning.left - 120}px`;
      avatar_modal.show();
    }
  });

  async function avatarModalGetUserInfo() {
    const account_name = document.querySelector(".account_name");
    const user_session_text = document.querySelector(".user_session_text");

    try {
      const responseDataJson = await fetch("/user");

      if (!responseDataJson.ok) {
        throw new Error();
      }

      const responseData = await responseDataJson.json();
      account_name.textContent = responseData.username;
      user_session_text.textContent = "Logged in";
      // console.log(` user data : ${responseData}`);
    } catch (error) {
      console.log(`couldn't fetch userdata : ${error}`);
    }
  }

  logMeOut.addEventListener("click", function () {
    window.location.href = "/signout";
  });

  window.addEventListener("click", (e) => {
    const wrapperNeedToClose = avatarWrapper.contains(e.target);
    const ModalNeedToClose = avatar_modal.contains(e.target);

    if (!wrapperNeedToClose && !ModalNeedToClose) {
      avatar_modal.close();
    }
  });
}

search_toggle();

function search_toggle() {
  const search_li = document.querySelector(".search_li");
  const search_background = document.querySelector(".search_background");
  const search_close_button = document.querySelector(".search_close_button");

  search_li.addEventListener("click", (e) => {
    e.preventDefault();
    search_background.classList.add("show");
    document.body.classList.add("modal_opened");
  });

  search_close_button.addEventListener("click", () => {
    search_background.classList.remove("show");
    document.body.classList.remove("modal_opened");
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      search_background.classList.remove("show");
      document.body.classList.remove("modal_opened");
    }
  });
}

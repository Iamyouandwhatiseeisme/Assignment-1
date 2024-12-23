"use client";
import Link from "next/link";
import Logo from "../../../../public/images/Header Logo.webp";
import DropDown from "../DropDown/DropDown";
import AuthenticationButton from "../logoutButton/LoggoutButton";
import { useLocale } from "../providers/LanguageContext";

import LocaleChange from "../LanguageChange/LanguageChange";
import { User } from "@supabase/supabase-js";
import { DictionaryChapter } from "../../[lang]/dictionaries";
import useTheme from "../../hooks/useTheme";
import { useCallback, useEffect, useRef, useState } from "react";
import CartDialog from "../CartDialog/CartDialog";

interface HeaderProps {
  dict: DictionaryChapter;
  currentUser: User | null;
}

const Header = (props: HeaderProps) => {
  const { locale } = useLocale();
  const { currentTheme, themeOptions, themeHandler } = useTheme();
  const [isAnimationTriggered, setIsAnimationTriggered] =
    useState<boolean>(false);
  const isAnimationTriggeredRef = useRef(isAnimationTriggered);
  useEffect(() => {
    isAnimationTriggeredRef.current = isAnimationTriggered;
  }, [isAnimationTriggered]);

  const listItemStyle: string =
    " hover:bg-teal-200 w-32   dark:hover:bg-header-hover-dark hover:rounded-3xl font-serif font-normal dark:text-yellow-500 p-5 text-center transition-header-hover-transition cursor-pointer";

  const handleScroll = useCallback(() => {
    const triggered = isAnimationTriggeredRef.current;

    const header = document.getElementById("header");
    const scrollable = document.getElementById("info-charity");

    if (header && scrollable) {
      if (window.scrollY > 0 && !triggered) {
        header.classList.remove("animate-first-scroll-header-reverse");
        header.classList.add("animate-first-scroll-header");
        setIsAnimationTriggered(true);
      } else if (window.scrollY === 0 && triggered) {
        header.classList.remove("animate-first-scroll-header");
        header.classList.add("animate-first-scroll-header-reverse");
        setIsAnimationTriggered(false);
      }
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <header
      id="header"
      className={`flex flex-row fixed justify-between items-center bg-slate-50 dark:bg-black text-header-green   w-full overflow-hidden  z-20 `}
    >
      <div className="w-60 ml-5">
        <LocaleChange></LocaleChange>
      </div>

      <div className="flex gap-38 items-center  pt-5 pb-5 ml-20 ">
        <Link
          href={`/${locale}`}
          className="mt-4   pr-2 w-14 h-14 bg-transparent  cursor-pointer items-center "
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <nav className="rounded-3xl  flex- flex-row  border border-solid dark:border-header-hover-dark h-20 items-center p-2  hidden sm:block">
          <ul className="gap-5 flex  list-none flex-row">
            <Link href={`/${locale}/equipment`}>
              <li className={listItemStyle}>{props.dict.Equipment}</li>
            </Link>
            <li className={listItemStyle}>{props.dict.Trainers}</li>
            <li className={listItemStyle}>{props.dict.Certificates}</li>
            <li className={listItemStyle}>{props.dict.Schedules}</li>
            <li className={`${listItemStyle} hidden l:block`}>
              {props.dict.Locations}
            </li>
            <Link href={`/${locale}/profile`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {props.dict.Profile}
              </li>
            </Link>

            <Link href={`/${locale}/pricing`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {props.dict.Subscribe}
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row gap-2 items-center mr-5 justify-end w-full z-10">
        <div className="">
          <DropDown
            content={themeOptions}
            buttonText={currentTheme}
            toggleHandler={themeHandler}
            type="Theme"
          ></DropDown>
        </div>
        <div>
          <CartDialog></CartDialog>
        </div>
        <div className="mb-2  ">
          {props.currentUser === null ? (
            <AuthenticationButton
              locale={locale}
              href={`/${locale}/login`}
              type="login"
              buttonText={props.dict.Login}
            />
          ) : (
            <AuthenticationButton
              locale={locale}
              href={`/${locale}/login`}
              type="logout"
              buttonText={props.dict.Logout}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

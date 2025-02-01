"use client";
import Link from "next/link";
import Logo from "../../../../public/images/Header Logo.webp";
import { useLocale } from "../providers/LanguageContext";
import React, { useState } from "react";
import { User } from "@supabase/supabase-js";
import { DictionaryChapter } from "../../[lang]/dictionaries";
import { TbSquareRoundedChevronRightFilled } from "react-icons/tb";
import { PiBarbell } from "react-icons/pi";
import { PiNewspaper } from "react-icons/pi";
import { PiClipboardText } from "react-icons/pi";
import { PiShoppingBagOpen } from "react-icons/pi";
import { PiCreditCard } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";

interface HeaderProps {
  dict: DictionaryChapter;
  currentUser: User | null;
}

export default function Header(props: HeaderProps) {
  const { locale } = useLocale();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const listItemStyle: string =
    "hover:bg-teal-200 w-40 gap-2 transition-all duration-300 transform hover:scale-110 hover:shadow-xl dark:hover:bg-header-hover-dark hover:rounded-3xl font-serif font-normal dark:text-yellow-500 p-5 text-start cursor-pointer flex flex-row items-center justify-start";
  if (!props.currentUser) return null;
  return (
    <>
      <div
        className={`fixed items-center  flex justify-center left-0 top-1/2 transform -translate-y-1/2 w-20 h-16 bg-transparent  cursor-pointer z-20  ${
          !isHovered ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        data-cy="header"
        onMouseEnter={() => setIsHovered(true)}
      >
        <TbSquareRoundedChevronRightFilled className="w-20 h-20 "></TbSquareRoundedChevronRightFilled>
      </div>
      <header
        id="header"
        className={`flex flex-col  h-full fixed rounded justify-start items-center bg-gradient-to-r from-slate-50 to-gray-300 bg-opacity-50 dark:bg-opacity-80 dark:bg-gradient-to-r dark:from-black dark:to-gray-800 text-header-green w-40  overflow-hidden z-20 transition-transform duration-300 ${
          isHovered ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-38 items-center   flex-col  pt-5 pb-5 ml-2  ">
          <Link
            href={`/${locale}`}
            className="mt-4   pr-2 w-14 h-14 bg-transparent  cursor-pointer items-center "
          >
            <img src={Logo.src} alt="logo"></img>
          </Link>
          <nav className="rounded-3xl  flex- flex-col   dark:border-header-hover-dark h-20 items-start justify-start p-2  hidden sm:block">
            <ul className="gap-5 flex  list-none flex-col">
              <Link href={`/${locale}/equipment`}>
                <li className={listItemStyle}>
                  {" "}
                  {props.dict.Equipment}
                  <PiBarbell></PiBarbell>
                </li>
              </Link>
              <Link href={`/${locale}/blogs`}>
                <li className={listItemStyle}>
                  {props.dict.Blog}
                  <PiNewspaper></PiNewspaper>
                </li>
              </Link>
              <Link href={`/${locale}/orders`} data-cy="orders-button">
                <li className={listItemStyle}>
                  {props.dict.Orders}
                  <PiClipboardText></PiClipboardText>
                </li>
              </Link>
              <Link href={`/${locale}/products`} data-cy="products-page-button">
                <li className={listItemStyle}>
                  {props.dict.Products}
                  <PiShoppingBagOpen></PiShoppingBagOpen>
                </li>
              </Link>
              <li className={`${listItemStyle} hidden l:flex`}>
                {props.dict.Locations}
              </li>
              <Link href={`/${locale}/profile`} data-cy="profile-button">
                <li className={`${listItemStyle} hidden xl:flex`}>
                  {props.dict.Profile}
                  <PiUserCircle></PiUserCircle>
                </li>
              </Link>

              <Link href={`/${locale}/pricing`}>
                <li className={`${listItemStyle} hidden xl:flex `}>
                  {props.dict.Subscribe}
                  <PiCreditCard></PiCreditCard>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

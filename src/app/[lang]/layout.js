// "use client";
// import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/global.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { getDictionary } from "./dictionaries";
import { LocaleProvider } from "../components/providers/LanguageContext";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Core Fitness",
  description: "Your Fitness Friend",
};

export default async function RootLayout({ children, params: { lang } }) {
  const dict = await getDictionary(lang);
  const supabase = await createClient();

  const dictHeader = dict.header;
  const dictChat = dict.chatWindow;
  const informationBoard = dict.informationBoard;
  const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  // var user = !data["user"] === null ? data["user"] : null;
  const { user } = data;

  return (
    <html lang="en">
      <LocaleProvider dictChat={dictChat} informationBoard={informationBoard}>
        <body className="bg-neutral-200 dark:bg-neutral-900">
          <Header user={user} dict={dictHeader}></Header>
          {children}
          <Footer></Footer>
        </body>
        {/* </UserProvider> */}
      </LocaleProvider>
    </html>
  );
}

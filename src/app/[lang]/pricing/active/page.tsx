"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "../../../utils/supabase/client";
import { Plan } from "../../../components/types";
import { plans } from "src/app/constants/plans";
import { useLocale } from "src/app/components/providers/LanguageContext";
import { DictionaryChapter } from "../../dictionaries";
export default function ActivePage() {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<Plan | null>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const {
    dictionary: { subscription: subscriptionDict, dialog },
  } = useLocale();
  const benefitDescriptions: Record<string, string> = {
    "Access to gym": subscriptionDict.AccessToGym,
    "Free group classes": subscriptionDict.FreeGroupClasses,
    "1 personal training session per month": subscriptionDict["1Personal"],
    "3 personal training sessions per month": subscriptionDict["2Personal"],
    "5 personal training sessions per year": subscriptionDict["5Personal"],
    "10 personal training sessions per year": subscriptionDict["10Personal"],
    "Unlimited personal training sessions": subscriptionDict.UnlimitedPersonal,
    "Access to pool": subscriptionDict.AccessToPool,
    "Access to spa": subscriptionDict.AccessToSpa,
  };

  const benefitsChapter = subscriptionDict.benefits as unknown;
  const dictionaryChaPter = benefitsChapter as DictionaryChapter;

  const benefits: Record<string, string> = {
    "Access to gym": dictionaryChaPter.AccessToGym,
    "Free group classes": dictionaryChaPter.FreeGroupClasses,
    "1 personal training session per month":
      dictionaryChaPter.OnePersonalTraining,
    "3 personal training sessions per month":
      dictionaryChaPter.TwoPersonalTraining,
    "5 personal training sessions per year":
      dictionaryChaPter.FivePersonalTraining,
    "10 personal training sessions per year":
      dictionaryChaPter.TenPersonalTraining,
    "Unlimited personal training sessions":
      dictionaryChaPter.UnlimitedPersonalTraining,
    "Access to pool": dictionaryChaPter.AccessToPool,
    "Access to spa": dictionaryChaPter.AccessToSpa,
  };

  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user?.email) {
        const response = await fetch("/api/subscription", {
          headers: {
            email: user?.email,
          },
        });
        if (response) {
          const subscriptionData = await response.json();
          const name = subscriptionData.name;
          plans.forEach((plan) => {
            if (plan.name === name) {
              setSubscription(plan);
              setIsLoading(false);
            }
          });
        }
      }
    }

    fetchUser();
  }, []);
  async function handleCancel() {
    if (user?.email) {
      const response = await fetch("/api/subscriptionCancel/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email: user?.email,
        },
      });
      if (response.status === 200) {
        router.push("/pricing");
      }
    }
  }
  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Your Subscription</h2>
          <ul className="space-y-4">
            {subscription?.benefits.map((benefit, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {benefits[benefit]}
                </span>
                {benefitDescriptions[benefit] && (
                  <span className="text-sm text-gray-500 italic">
                    {benefitDescriptions[benefit]}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div>
            <button
              data-cy="delete-button"
              className="rounded-lg h-10 w-40 bg-red-500 text-white dark:bg-red-700 transform  hover:scale-105 dark:text-gray-200 hover:bg-red-600 dark:hover:bg-red-800 active:bg-red-700 dark:active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              {dialog.Delete}
            </button>
            {showDialog && (
              <div
                data-cy="delete-dialog"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                onClick={() => setShowDialog(false)}
              >
                <div
                  className="bg-white dark:text-black text-black p-6 rounded-lg shadow-lg z-40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>{dialog.AreYouSure}</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => setShowDialog(false)}
                    >
                      {dialog.Cancel}
                    </button>
                    <button
                      data-cy="confirm-delete-button"
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleCancel}
                    >
                      {dialog.Delete}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 text-gray-600">
            <p>{subscriptionDict.ContactUs}</p>
            <p className="font-bold">+1 (800) 123-4567</p>
            <p className="font-bold">support@coreFitness.com</p>
          </div>
        </div>
      )}
    </div>
  );
}

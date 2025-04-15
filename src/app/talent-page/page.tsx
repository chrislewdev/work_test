// app/talent-page/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Card } from "@/components/ui_blocks/Card";
import { Container } from "@/components/ui_blocks/Container";
import {
  InstagramIcon,
  XIcon,
  TikTokIcon,
  XiaohongshuIcon,
} from "@/components/ui_blocks/SocialIcons";
import NavigationWrapper from "@/components/ui_blocks/NavigationWrapper";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

const logoAirbnb = "/images/logos/airbnb.svg";
const logoFacebook = "/images/logos/facebook.svg";
const logoPlanetaria = "/images/logos/planetaria.svg";
const logoStarbucks = "/images/logos/starbucks.svg";

const image1 = "/images/photos/image-1.jpg";
const image2 = "/images/photos/image-2.jpg";
const image3 = "/images/photos/image-3.jpg";
const image4 = "/images/photos/image-4.jpg";
const image5 = "/images/photos/image-5.jpg";

import { type ArticleWithSlug, getAllArticles } from "@/app/lib/articles";
import { formatDate } from "@/app/lib/formatDate";
import Header from "@/components/header/Header";

function ProfilePicture({
  size = "medium",
  imagePath = "",
  className = "",
}: {
  size?: "small" | "medium" | "large";
  imagePath?: string;
  className?: string;
}) {
  const sizeClasses = {
    small: "w-16 h-16", // 64px
    medium: "w-24 h-24", // 96px
    large: "w-32 h-32", // 128px
  };

  const dimensions = {
    small: 64,
    medium: 96,
    large: 128,
  };

  return (
    <div className={`flex justify-start mb-8 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700 shadow-md ${sizeClasses[size]}`}
      >
        <Image
          src={imagePath || "/images/photos/profile-pic.jpg"}
          alt="Profile picture"
          width={dimensions[size]}
          height={dimensions[size]}
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

function StatsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7 9h10M7 13h10M7 17h10M7 5h10"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function Stats({ userStats }: { userStats: any }) {
  const stats = [
    {
      id: 1,
      name: "Tasks Fulfilled",
      value: userStats.tasksFulfilled.toString(),
    },
    { id: 2, name: "Success Score", value: `${userStats.successScore}%` },
    { id: 3, name: "Task Rating", value: userStats.taskRating.toFixed(1) },
    { id: 4, name: "Response Rate", value: `${userStats.responseRate}%` },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <StatsIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stats</span>
      </h2>
      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col gap-y-2 border-l border-zinc-200 pl-4 dark:border-zinc-700/40"
          >
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">
              {stat.name}
            </dt>
            <dd className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700/40 text-sm text-zinc-500 dark:text-zinc-400">
        Profile {userStats.profileCompleteness}% complete • Member since{" "}
        {new Date(userStats.memberSince).toLocaleDateString()}
      </div>
    </div>
  );
}

interface Role {
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === "string" ? role.start : role.start.label;
  let startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime;

  let endLabel = typeof role.end === "string" ? role.end : role.end.label;
  let endDate = typeof role.end === "string" ? role.end : role.end.dateTime;

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full ring-1 shadow-md shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={role.logo}
          width={640}
          height={640}
          alt=""
          className="h-7 w-7"
          unoptimized
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
}

function Brands() {
  let resume: Array<Role> = [
    {
      company: "Planetaria",
      title: "CEO",
      logo: logoPlanetaria,
      start: "2019",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: "Airbnb",
      title: "Product Designer",
      logo: logoAirbnb,
      start: "2014",
      end: "2019",
    },
    {
      company: "Facebook",
      title: "iOS Software Engineer",
      logo: logoFacebook,
      start: "2011",
      end: "2014",
    },
    {
      company: "Starbucks",
      title: "Shift Supervisor",
      logo: logoStarbucks,
      start: "2008",
      end: "2011",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Brands</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
    </div>
  );
}

function Photos() {
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex overflow-x-auto pb-4 pt-4 snap-x snap-mandatory scrollbar-hide md:justify-center gap-5 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image}
            className={clsx(
              "relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800 snap-center",
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              width={640}
              height={640}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfile,
  } = useProfileStore();
  const [articles, setArticles] = useState<ArticleWithSlug[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await getAllArticles();
        setArticles(allArticles.slice(0, 4)); // Get the first 4 articles
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (isAuthenticated && user && !profile) {
      // If authenticated but no profile loaded, fetch it
      fetchProfile(user.id);
    }
  }, [isAuthenticated, user, profile, router, fetchProfile]);

  // If not authenticated, show nothing yet
  if (!user || !isAuthenticated) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  // If profile is loading, show loading state
  if (profileLoading) {
    return (
      <div className="flex justify-center p-8">Loading profile data...</div>
    );
  }

  // If there's an error loading the profile
  if (profileError) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error: {profileError}
      </div>
    );
  }

  // If we have no profile, show error
  if (!profile) {
    return (
      <div className="flex justify-center p-8">No profile data available</div>
    );
  }

  // Provide default stats if user doesn't have stats
  const defaultStats = {
    tasksFulfilled: 0,
    successScore: 0,
    taskRating: 0,
    responseRate: 0,
    lastLogin: new Date().toISOString(),
    memberSince: new Date().toISOString(),
    profileCompleteness: 0,
  };

  // Get user stats from the profile object
  const userStats = profile.stats || defaultStats;

  return (
    <>
      <Header />
      <Container>
        <NavigationWrapper />
      </Container>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <ProfilePicture
            size="large"
            className="mb-6"
            imagePath={profile.profilePic}
          />
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {profile.bio ||
              "No bio available yet. Update your profile in the dashboard."}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="#"
              aria-label="Follow on Facebook"
              icon={(props) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            />
            <SocialLink href="#" aria-label="Follow on X" icon={XIcon} />
            <SocialLink
              href="#"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="#"
              aria-label="Follow on GitHub"
              icon={TikTokIcon}
            />
            <SocialLink
              href="#"
              aria-label="Follow on LinkedIn"
              icon={XiaohongshuIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {loading ? (
              <div className="text-zinc-500">Loading articles...</div>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))
            ) : (
              <div className="text-zinc-500">No articles available</div>
            )}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Stats userStats={userStats} />
            <Brands />
          </div>
        </div>
      </Container>
    </>
  );
}

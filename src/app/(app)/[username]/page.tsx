import { currentUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Badge from "~/app/_components/badge";
import HomeFeed from "~/app/_components/feeds/home-feed";
import PostFeed from "~/app/_components/feeds/post-feed";
import { CalendarIcon, FollowersIcon } from "~/app/_components/icons";
import { Avatar, AvatarImage } from "~/app/_components/shadcn-ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/_components/shadcn-ui/tabs";
import { api } from "~/trpc/server";
import { type User } from "~/utils/types";

export const runtime = "edge";
export const preferredRegion = ["pdx1"];

interface ProfileProps {
  params: { username: string };
}

interface ProfileSectionProps {
  profile: User;
  isOwner: boolean;
}

export async function generateMetadata({
  params: { username },
}: ProfileProps): Promise<Metadata> {
  
  const user = await api.users.getName.query({ username });
  const title = user
    ? `${user.firstName} ${user.lastName} (@${user.username}) - Bookclub`
    : "Error 404 - Bookclub";
    
  return { title };
}

export default async function Profile({ params: { username } }: ProfileProps) {
  const profile = await api.users.getProfile.query({ username });
  if (!profile) notFound();

  const user = await currentUser();
  const isOwner = user?.id === profile.id;

  return (
    <main>
      <div className="mx-auto my-8 flex max-w-4xl flex-col gap-6 px-4 md:flex-row">
        <Sidebar profile={profile} isOwner={isOwner} />
        <PrimarySection profile={profile} isOwner={isOwner} />
      </div>
    </main>
  );
}

function Sidebar({ profile }: ProfileSectionProps) {
  return (
    <section className="flex flex-col gap-4 md:max-w-64 lg:max-w-72">
      <div className="flex items-center gap-3 md:flex-col md:items-start">
        <Avatar className="h-24 w-24 border-2 border-stone-400 md:h-auto md:w-full">
          <AvatarImage
            src={profile.imageUrl}
            alt={`${profile.username}'s avatar`}
          />
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </span>
            <Badge size="lg" type={profile.type} />
          </div>
          <span className="text-xl text-muted-foreground">
            @{profile.username}
          </span>
        </div>
      </div>
      {profile.bio.length > 0 && (
        <div className="flex flex-col gap-3">
          <p>{profile.bio}</p>
          {/* {isOwner && (
            <Button variant="outline" size="lg" className="h-8">
              Edit profile
            </Button>
          )} */}
        </div>
      )}
      <div>
        <div className="mb-2 flex items-center">
          <FollowersIcon className="mr-1.5 h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">100</span> followers
            <span className="mx-1">·</span>
            <span className="font-bold text-foreground">100</span> following
          </span>
        </div>
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="mr-1.5 h-5 w-5" />
          <span className="text-sm">
            Joined {dayjs(profile.createdAt).format("MMMM YYYY")}
          </span>
        </div>
      </div>
    </section>
  );
}

async function PrimarySection({ profile }: ProfileSectionProps) {
  return (
    <section className="flex grow flex-col gap-4">
      <Tabs defaultValue="posts">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="w-full">
            Posts
          </TabsTrigger>
          <TabsTrigger value="replies" className="w-full">
            Replies
          </TabsTrigger>
          <TabsTrigger value="likes" className="w-full">
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="flex flex-col gap-2">
            <PostFeed userId={profile.id} />
          </div>
        </TabsContent>
        <TabsContent value="replies">
          <div className="flex flex-col gap-2">
            {/* <Feed userId={profile.id} type="replies" /> */}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="flex flex-col gap-2">
            <HomeFeed />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
